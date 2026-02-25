const WIDTH = 600;

const newGridButton = document.querySelector("#new-grid");
const newGridInput = document.querySelector("#new-grid-input");

function createNewGrid(n) {

    while (drawingContainer.firstChild) {
        drawingContainer.firstChild.remove();
    }

    for (let i = 0; i < n; i++) {

        for (let j = 0; j < n; j++) {
            let tempField = document.createElement("div");
            tempField.classList.add("field");
            tempField.style.width = WIDTH/n + "px";
            tempField.style.height = WIDTH/n + "px";

            drawingContainer.appendChild(tempField);
        }

    }
}

function handleField(e) {
    e.target.style.backgroundColor = "magenta";
}


let drawingContainer = document.createElement("div");
drawingContainer.classList.add("drawing-container");

document.body.appendChild(drawingContainer);

newGridButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(e);
    
    // this will definitely have to go. more ideas later?
    createNewGrid(parseInt(newGridInput.value));
    newGridInput.value = "";
});

createNewGrid(16);

drawingContainer.addEventListener("mouseover", handleField);