const express = require('express');
const app = express();
const path = require('path');
const gitRoutes = require("./git-routes/git-routes-exposed");

const PORT = 3000;
app.listen(PORT, () =>{
    console.log("listening on port " + PORT);
})

app.use(express.static(path.join(__dirname, "public")));
app.use(gitRoutes);

app.get('/', function(req, res){
    try{
        res.status(200).sendFile(path.join(__dirname, "index.html"));
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: "Some error occured !" });
    }
})