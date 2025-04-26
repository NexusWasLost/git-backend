const displayArea = document.querySelector(".display-area");
const form = document.querySelector("#upload-files-form");

async function callGitAPI(route, body = {}) {
    const response = await fetch(route, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    const data = await response.json();

    displayArea.scrollTo({
        top: displayArea.scrollHeight,
        behavior: "smooth"
    })
    showInDisplay(data.message);
}

function showInDisplay(data) {
    const message = document.createElement('p');
    message.innerText = `>>> ${data}`;
    message.classList.add("output-display");
    displayArea.appendChild(message);
}

function callCommit() {
    const commitMsg = prompt("Write a commit message: ");

    if (commitMsg) {
        callGitAPI("/git-commit", { commit : commitMsg });
    }
}

form.addEventListener("submit", async function(e){
    e.preventDefault();

    const formData = new FormData(form);

    try{
        let response = await fetch("/upload-to-repo", {
            method: "POST",
            body: formData
        });
    
        const jsonResponse = await response.json();
        showInDisplay(jsonResponse.message);
    }
    catch(error){
        console.log(error);
        showInDisplay(error);
    }
})

function clearScreen(){
    displayArea.innerHTML = "";
    showInDisplay("Output will appear here...");
}