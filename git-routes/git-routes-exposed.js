const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../base-dir"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
const upload = multer({ storage: storage });
let filePaths = []; //for storing file paths

const {

    initializeRepo,
    add,
    commit,
    status,
    log

} = require("./git-commands.js");

router.post("/init-repo", async (req, res) => {
    try {
        await initializeRepo();
        res.status(200).json({ message: "Successfully Intialized repository" });
    }
    catch (error) {
        console.log(`error: ${error}`);
        res.status(500).json({ message: "Some error occured ! Try Again !" });
    }
})

router.post("/upload-to-repo", upload.array("code-files", 10), async (req, res) =>{
    try{
        filePaths = req.files.map(file => path.join(__dirname, "../base-dir", file.filename));
        res.status(200).json({ message: "Successfully Uploaded files !" });
    }
    catch(error){
        console.log(`error: ${error}`);
        res.status(500).json({ message: "Some error occured ! Try Again !" });
    }
})

router.post("/git-add", async (req, res) => {
    try {
        //call git-add
        const resObj = await add();
        if(resObj.code !== 0) return res.status(400).json({ message: resObj.message });

        res.status(200).json({ message: "Successfully Added files to the staging area !" });
    }
    catch (error) {
        console.log(`error: ${error}`);
        res.status(500).json({ message: "Some error occured ! Try Again !" });
    }
})

router.post("/git-commit", async (req, res) => {
    try {
        let commitMsg = req.body.commit;
        
        //sanitize the message
        commitMsg = commitMsg.replace(/[^a-zA-Z0-9\s\-\.,!?'"]+/g, '');

        const resObj = await commit(commitMsg);
        if(resObj.code !== 0) return res.status(400).json({ message: resObj.message });

        res.status(200).json({ message: "Successfully commited !" });
    }
    catch (error) {
        console.log(`error: ${error}`);
        res.status(500).json({ message: "Some error occured ! Try Again !" });
    }
})

router.post("/git-log", async (req, res) => {
    try {
        const logs = await log();
        res.status(200).json({ message: logs });
    }
    catch (error) {
        console.log(`error: ${error}`);
        res.status(500).json({ message: "Some error occured ! Try Again !" });
    }
})

router.post("/git-status", async (req, res) => {
    try {
        const { message } = await status();

        res.status(200).json({ message: message });
    }
    catch (error) {
        console.log(`error: ${error}`);
        res.status(500).json({ message: "Some error occured ! Try Again !" });
    }
})

module.exports = router;