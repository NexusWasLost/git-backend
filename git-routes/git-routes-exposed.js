const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, "base-dir"));
    },

    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})
const upload = multer({ storage: storage });

const { 

    initializeRepo,
    add,
    commit,
    status,
    log

} = require("./git-commands.js");

router.post("/init-repo", async (req, res) => {
    try {
        initializeRepo();
        res.status(200).json({ message: "Successfully Intialized repository" });
    }
    catch (error) {
        console.log(`error: ${error}`);
        res.status(500).json({ message: "Some error occured ! Try Again !" });
    }
})

router.post("/git-add", async (req, res) => {
    try {
        add(upload.array("code-files", 10));
        res.status(200).json({ message: "Successfully Added files to the staging area !" });
    }
    catch (error) {
        console.log(`error: ${error}`);
        res.status(500).json({ message: "Some error occured ! Try Again !" });
    }
})

router.post("/git-commit", async (req, res) => {
    try {
        commit();
        res.status(200).json({ message: "Successfully commited !" });
    }
    catch (error) {
        console.log(`error: ${error}`);
        res.status(500).json({ message: "Some error occured ! Try Again !" });
    }
})

router.post("/git-log", async (req, res) => {
    try {
        log();
        res.status(200).json({ message: "Git log shown" });
    }
    catch (error) {
        console.log(`error: ${error}`);
        res.status(500).json({ message: "Some error occured ! Try Again !" });
    }
})

router.post("/git-status", async (req, res) => {
    try {
        status();
        res.status(200).json({ message: "Git Status shown" });
    }
    catch (error) {
        console.log(`error: ${error}`);
        res.status(500).json({ message: "Some error occured ! Try Again !" });
    }
})

module.exports = router;