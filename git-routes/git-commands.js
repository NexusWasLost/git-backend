const { simpleGit } = require('simple-git');
const path = require("path");

let options = {
    baseDir: path.join(process.cwd(), "base-dir"),
    binary: "git",
    maxConcurrentProcesses: 6,
    trimmed: false,
}

const git = simpleGit(options);

async function initializeRepo(){
    try{
        await git.init();
    }
    catch(error){
        console.log(`git-command-error: ${error}`);
        return "Error Occured";
    }
}

async function add(files){
    try{
        await git.add(files);
    }
    catch(error){
        console.log(`git-command-error: ${error}`);
        return "Error Occured";
    }
}

async function commit(){
    try{
        await git.commit();
    }
    catch(error){
        console.log(`git-command-error: ${error}`);
        return "Error Occured";
    }
}

async function status(){
    try{
        const status = await git.status();
        console.log(status);
    }
    catch(error){
        console.log(`git-command-error: ${error}`);
        return "Error Occured";
    }
}

async function log(){
    try{
        const logResposne = await git.log();
        console.log(logResposne);
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
    log
    
}