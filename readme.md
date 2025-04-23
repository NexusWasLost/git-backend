# Git Backend Prototype (Work in progress)
![Static Badge](https://img.shields.io/badge/git-white?style=flat-square&logo=git)


This project is a prototype of GUI based git functionalities. This was made as a Proof of concept (PoC) for [DMP: 2025] Sugar Labs issue #4534 Git backend for Turtle Blocks and Music Blocks.

### 💡 Objective

This prototype aims to apply git methods programatically in the backend and use them using a simple UI from the frontend without being overwhelmed by the complexity of traditional Git interfaces.

This project features a single repo based git architecture where users can use simple interfaces like buttons to interact with the backend and use git commands like ```add```, ```commit```, ```status```, ```log```, etc.

### 💻 Tech Stack
- Frontend: HTML, CSS and JavaScript
- Backend: Node.js and simple-git

### 📦 Installation
To install this and launch locally follow these steps: 

- Clone this repository
    ```bash
    git clone https://github.com/nexus949/git-backend.git
    ```
    
- Navigate into the directory
    ```bash
    cd git-backend
    ```

- Install the dependencies
    ```bash
    npm install
    ```

- Run the server
    ```bash
    npm start
    ```

The Server runs on PORT 3000

### 📄 Screenshots

This screenshot shows a finished prototype.
[![git-backend.png](https://i.postimg.cc/9MDNF4fY/git-backend.png)](https://postimg.cc/jwrhMSPD)

### ℹ Information
- This Project is just a simple prototype for reference and not a finished product.
- Others are invited to fork this repo and update the project as their liking.
- This project only features a single - repo architecture, so no multiple repos can be created. But a idea to a multi-repo architecture is provided in the ```multi-repo-idea.md```.
- This is a very simple and basic prototype and lacks all major features of git like branching, forking, history, etc.