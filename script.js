const WIDTH = 600;
const BGCOLOR = "white";
const newGridSlider = document.querySelector("#new-grid-slider");
const gridSizeLabel = document.querySelector("#grid-size-label");

function createNewGrid(n) {
    n = parseInt(n);

    for (let i = 0; i < n**2; i++) {
        fields[i].style.width = WIDTH/n + "px";
        fields[i].style.height = WIDTH/n + "px";
        fields[i].style.display = "initial";
        fields[i].style.backgroundColor = BGCOLOR;
    }

    if (n < currentGridSize) {
        console.log(n,currentGridSize);
        for (let i = n**2; i < currentGridSize**2; i++) {
            // console.log(i);
            fields[i].style.display = "none";
        }
    }

    currentGridSize = n;
}

function enterField(e) {
    if (e.target.classList[0] !== "field") return;

    e.target.style.color = e.target.style.backgroundColor;

    e.target.style.backgroundColor = "magenta";
}

function leaveField(e) {
    if (e.target.classList[0] !== "field") return;
    
    if (!mouseDownFlag) {
        e.target.style.backgroundColor = e.target.style.color;
    }

    if (e.toElement === document.body) {
    } else {
        if (mouseDownFlag && e.toElement.classList[0] === "field") {
            e.toElement.style.color = e.toElement.style.backgroundColor;
            e.toElement.style.backgroundColor = "magenta";
        }
    }
}

function containerMouseDown(e) {
    if (e.target.classList[0] !== "field") return;

    if (e.button !== 0) {
        return;
    }

    e.target.style.color = "magenta";
    console.log(e.target);
    mouseDownFlag = true;
}

function containerMouseUp(e) {
    if (e.button !== 0) {
        return;
    }

    mouseDownFlag = false;
}

let mouseDownFlag = false;
let currentGridSize = 0;
let drawingContainer = document.createElement("div");
drawingContainer.classList.add("drawing-container");




drawingContainer.addEventListener("mouseover", enterField);
drawingContainer.addEventListener("mouseout", leaveField);
drawingContainer.addEventListener("mousedown", containerMouseDown);
drawingContainer.addEventListener("mouseup", containerMouseUp);
window.addEventListener("mouseup", containerMouseUp);
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
    tempField.style.display = "none";
    fields.push(tempField);
    
    drawingContainer.appendChild(tempField);
}

createNewGrid(16);
