const WIDTH = 600;
const newGridSlider = document.querySelector("#new-grid-slider");
const gridSizeLabel = document.querySelector("#grid-size-label");

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

function enterField(e) {
    e.target.style.color = e.target.style.backgroundColor;

    e.target.style.backgroundColor = "magenta";
}

function leaveField(e) {
    if (!mouseDownFlag) {
        e.target.style.backgroundColor = e.target.style.color;
    }

    if (e.toElement === document.body) {
        mouseDownFlag = false;
    }
}

function containerMouseDown(e) {
    if (e.button !== 0) {
        return;
    }

    mouseDownFlag = true;
}

function containerMouseUp(e) {
    if (e.button !== 0) {
        return;
    }

    mouseDownFlag = false;
}

let mouseDownFlag = false;
let drawingContainer = document.createElement("div");
drawingContainer.classList.add("drawing-container");

createNewGrid(16);

drawingContainer.addEventListener("mouseover", enterField);
drawingContainer.addEventListener("mouseout", leaveField);
drawingContainer.addEventListener("mousedown", containerMouseDown);
drawingContainer.addEventListener("mouseup", containerMouseUp);
newGridSlider.addEventListener("input", (e) => {
    createNewGrid(newGridSlider.value);
    gridSizeLabel.textContent = newGridSlider.value;
});

document.body.appendChild(drawingContainer);