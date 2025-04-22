const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");

const {  
    initializeRepo,
    add,
    commit,
    status,
    log,
    push,
    setGitDir
} = require("./git-commands.js");

const baseDir = path.join(process.cwd(), "base-dir");

router.post("/init-repo", async (req, res) => {
    try {
        const parentFolder = path.join(baseDir, `repo${Date.now()}`);
        
        setGitDir(parentFolder); //set parent folder as base directory for .git folder

        const srcFolder = path.join(parentFolder, "src");
        const publicFolder = path.join(parentFolder, "public");

        fs.mkdir(parentFolder, { recursive: true }, (error) =>{
            if(error){
                console.log(error);
                return res.status(500).json({ message: "Some error occured !" })
            }

            //make the sub folders
            fs.mkdir(srcFolder, { recursive: true }, (error) =>{
                if(error){
                    console.log(error);
                    return res.status(500).json({ message: "Some error occured !" })
                }
            });
    
            fs.mkdir(publicFolder, { recursive: true }, (error) =>{
                if(error){
                    console.log(error);
                    return res.status(500).json({ message: "Some error occured !" })
                }
            });
        })

        res.status(200).json({ message: "Successfully Intialized repository" });
    }
    catch (error) {
        console.log(`error: ${error}`);
        res.status(500).json({ message: "Some error occured !" });
    }
})

router.post("/git-add", async (req, res) => {
    try {
        res.status(200).json({ message: "Successfully Added files to the staging area !" });
    }
    catch (error) {
        console.log(`error: ${error}`);
        res.status(500).json({ message: "Some error occured !" });
    }
})

router.post("/git-commit", async (req, res) => {
    try {
        res.status(200).json({ message: "Successfully commited !" });
    }
    catch (error) {
        console.log(`error: ${error}`);
        res.status(500).json({ message: "Some error occured !" });
    }
})

router.post("/git-log", async (req, res) => {
    try {
        res.status(200).json({ message: "Git log shown" });
    }
    catch (error) {
        console.log(`error: ${error}`);
        res.status(500).json({ message: "Some error occured !" });
    }
})

router.post("/git-status", async (req, res) => {
    try {
        res.status(200).json({ message: "Git Status shown" });
    }
    catch (error) {
        console.log(`error: ${error}`);
        res.status(500).json({ message: "Some error occured !" });
    }
})

router.post("/git-push", async (req, res) => {
    try {
        res.status(200).json({ message: "Successfully pushed files to the remote !" });
    }
    catch (error) {
        console.log(`error: ${error}`);
        res.status(500).json({ message: "Some error occured !" });
    }
})

module.exports = router;