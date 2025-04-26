const { simpleGit } = require('simple-git');
const path = require("path");

let options = {
    baseDir: path.join(process.cwd(), "base-dir"),
    binary: "git",
    maxConcurrentProcesses: 6,
    trimmed: false,
}

const git = simpleGit(options);

//fix code juggling first of all
//this is for reference ->
/*

status -> the status object recieved from git.status() containing the sub arrays:

staged -> an array containing staged files (added)
modified -> an array containing modified files (already commited then modified)
not_added -> an array containing untracked files (untracked)

*/

async function status() {
    try {
        const status = await git.status();

        // Necessary for debugging purposes
        // console.log(`untracked: ${status.not_added}`);
        // console.log(`Staged: ${status.staged}`);
        // console.log(`Modified: ${status.modified}`);

        //commit done -> Nothing left to commit (Commited)
        if (status.staged.length === 0 && status.modified.length === 0 && status.not_added.length === 0){
            return {
                code: 3,
                message: `On branch ${status.current}, Working tree clean, Nothing to add or commit !`
            }
        }
        
        //files staged -> git add performed, commit left to be performed (Added)
        if (status.staged.length > 0 && (status.modified.length === 0 || status.not_added.length === 0)){
            return { 
                code: 2,
                message:  `On branch ${status.current}, ${status.staged.length} files staged. Yet to commit.`
            }
        }

        //nothing staged -> git add not performed yet (Untracked)
        let fileList = "";
        //files not staged but there are changes in the directory(modified or new files) (Untracked)
        if (status.staged.length === 0 && (status.modified.length > 0 || status.not_added.length > 0)){
            const allFiles = [...status.not_added, ...status.modified];
            fileList = allFiles.join(", ");

            return {
                code: 1,
                message: `On branch ${status.current}, Untracked or Modified: ${fileList}`,
                files: allFiles.map(file => path.join(__dirname, "../base-dir", file))
            }
        }
    
        //fallback
        return {
            code: 0,
            message: `On branch ${status.current}, Status unclear...`
        }
    }
    catch (error) {
        console.log(`git-command-error: ${error}`);
        return "Error Occured";
    }
}

async function log() {
    try {
        const logResponse = await git.log();

        // Now map it into a clean JSON array
        let formattedLogs = logResponse.all.map(item =>{
            return `${item.author_name} committed "${item.message}" on ${item.date}`;
        });
        
        formattedLogs = formattedLogs.join("\n>>> ");
        return formattedLogs;
    }
    catch (error) {
        console.log(`git-command-error: ${error}`);
        return "Error Occured";
    }
}

async function initializeRepo() {
    try {
        await git.init();
    }
    catch (error) {
        console.log(`git-command-error: ${error}`);
        return "Error Occured";
    }
}

async function add() {
    try {
        const { code, message, files } = await status();

        //if files are not staged or already committed
        if(code !== 1){
            return { code, message };
        }

        await git.add(files);
        return { code: 0 }
    }
    catch (error) {
        console.log(`git-command-error: ${error}`);
        return "Error Occured";
    }
}

async function commit(commitMsg) {
    try {
        // const statusSummary = await git.status();
        const { code, message } = await status();

        //nothing to commit !
        if(code === 3) return { code, message };

        //if files are not staged
        if(code !== 2){
            return { code, message: "Files need to be staged first before committing..." };
        }
        
        console.log(commitMsg);
        await git.commit(commitMsg);
        return { code: 0 };
    }
    catch (error) {
        console.log(`git-command-error: ${error}`);
        return "Error Occured";
    }
}

module.exports = {

    initializeRepo,
    add,
    commit,
    status,
    log

}