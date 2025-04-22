const displayArea = document.querySelector(".display-area");

async function callGitAPI(route, body = {}) {
    const response = await fetch(route, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    const data = await response.json();
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
        callGitAPI("/git-commit");
    }
}