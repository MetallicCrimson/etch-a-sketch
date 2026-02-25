const WIDTH = 600;
const newGridSlider = document.querySelector("#new-grid-slider");
const gridSizeLabel = document.querySelector("#grid-size-label");

function createNewGrid(n) {

    // while (drawingContainer.firstChild) {
    //     drawingContainer.firstChild.remove();
    // }

    // for (let i = 0; i < n; i++) {

    //     for (let j = 0; j < n; j++) {
    //         let tempField = document.createElement("div");
    //         tempField.classList.add("field");
    //         tempField.style.width = WIDTH/n + "px";
    //         tempField.style.height = WIDTH/n + "px";

    //         drawingContainer.appendChild(tempField);
    //     }

    // }

    for (let i = 0; i < n**2; i++) {
        fields[i].style.width = WIDTH/n + "px";
        fields[i].style.height = WIDTH/n + "px";
        fields[i].style.display = "initial";
    }

    for (let i = n**2; i < 10000; i++) {
        fields[i].style.display = "none";
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




drawingContainer.addEventListener("mouseover", enterField);
drawingContainer.addEventListener("mouseout", leaveField);
drawingContainer.addEventListener("mousedown", containerMouseDown);
drawingContainer.addEventListener("mouseup", containerMouseUp);
newGridSlider.addEventListener("input", (e) => {
    createNewGrid(newGridSlider.value);
    gridSizeLabel.textContent = newGridSlider.value + "px";
});

document.body.appendChild(drawingContainer);

newGridSlider.value = 16;
gridSizeLabel.textContent = "16px";
let fields = [];

for (let i = 0; i < 10000; i++) {
    let tempField = document.createElement("div");
    tempField.classList.add("field");
    fields.push(tempField);
    // tempField.style.width = WIDTH/100 + "px";
    // tempField.style.height = WIDTH/100 + "px";
    
    drawingContainer.appendChild(tempField);
}

createNewGrid(16);
