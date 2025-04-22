# Multi-Repo Git Backend Vision

## Problem:
In the current prototype, only one git repository can be managed at a time.
This is due to lack of persistent repo-tracking logic.

## Idea:
Support multiple repositories by assigning unique values to corresponding directory.
This idea is still a vague one so take it with a pinch of salt.

## Base directory design for a repo
BaseDir(contains all the repos) -> Repo -> public(folder), src(folder), .git(folder)

## Steps

- Create a base repo with an unique name:
(git-routes)
```js

//get the base directory
const baseDir = path.join(process.cwd(), "base-dir");

//create a repo with a unique number
const parentFolder = path.join(baseDir, `repo${Date.now()}`);

//STORE THE GIT REPO NUMBER AS AN UNIQUE IDENTIFIER IN A DB.
//...lines of code for DB storage...

//imported from the git-commands file
setGitDir(parentFolder);

const srcFolder = path.join(parentFolder, "src");
const publicFolder = path.join(parentFolder, "public");

fs.mkdir(parentFolder, { recursive: true }, (error) =>{
    if(error){
        console.log(error);
        return; //or end the request - response cycle with a status code
    }

    //make the sub folders
    fs.mkdir(srcFolder, { recursive: true }, (error) =>{
        if(error){
            console.log(error);
            return;
        }
    });
    
    fs.mkdir(publicFolder, { recursive: true }, (error) =>{
        if(error){
            console.log(error);
            return;
        }
    });
})

```

- Set up and intialize a simpleGit instance(git-commands)
```js

//import from the git-rotes file
let dynamicDir = null;
function setGitDir(dirPath){

    //set dynamic directory path for .git folder intialization
    dynamicDir = dirPath;
}

function getGitInstance(){
    if(!dynamicDir){
        throw new Error("Directory is null !");
    }

    return simpleGit({
        baseDir: path.join(process.cwd(), "base-dir", dynamicDir),
        binary: git,
        maxConcurrentProcesses: 6,
        trimmed: false,
    });
}

```
Call the git function to get a simpleGit instance for each request response cycle.

## ⚠ Caution
- Its still a vague and incomplete idea so take it with a pinch of salt.