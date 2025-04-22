const { simpleGit, CleanOptions } = require('simple-git');

const path = require("path");

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

async function initializeRepo(){
    try{
        // await git.init();
    }
    catch(error){
        console.log(`git-command-error: ${error}`);
        return "Error Occured";
    }
}

async function add(){
    try{

    }
    catch(error){
        console.log(`git-command-error: ${error}`);
        return "Error Occured";
    }
}

async function commit(){
    try{

    }
    catch(error){
        console.log(`git-command-error: ${error}`);
        return "Error Occured";
    }
}

async function status(){
    try{

    }
    catch(error){
        console.log(`git-command-error: ${error}`);
        return "Error Occured";
    }
}

async function log(){
    try{

    }
    catch(error){
        console.log(`git-command-error: ${error}`);
        return "Error Occured";
    }
}

async function push(){
    try{

    }
    catch(error){
        console.log(`git-command-error: ${error}`);
        return "Error Occured";
    }
}

module.exports = {

    initializeRepo,
    add,
    commit,
    status,
    log,
    push,
    setGitDir

}