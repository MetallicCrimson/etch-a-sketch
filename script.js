const WIDTH = 600;
const BGCOLOR = "white";
const newGridSlider = document.querySelector("#new-grid-slider");
const gridSizeLabel = document.querySelector("#grid-size-label");
const colorInput = document.querySelector("#color-input");
const resetFieldsButton = document.querySelector("#reset-fields-button");
const drawingContainerContainer = document.querySelector("#drawing-container-container");

let mouseDownFlag = false;
let currentGridSize = 0;
let mainColor = "#e01dc6";
let drawingContainer = document.createElement("div");

// technically this doesn't *create* a new grid,
// just uncovers/hides what it has to uncover/hide
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
            fields[i].style.display = "none";
        }
    }

    currentGridSize = n;
}

function enterField(e) {
    if (e.target.classList[0] !== "field") return;

    e.target.style.color = e.target.style.backgroundColor;

    e.target.style.backgroundColor = mainColor;
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
            e.toElement.style.backgroundColor = mainColor;
        }
    }
}

// the following two functs are just to enable drawing by mouse click,
// and having it not break when the user moves the mouse out of the grid
function containerMouseDown(e) {
    if (e.target.classList[0] !== "field") return;

    if (e.button !== 0) {
        return;
    }

    e.target.style.color = mainColor;
    console.log(e.target);
    mouseDownFlag = true;
}

function containerMouseUp(e) {
    if (e.button !== 0) {
        return;
    }

    mouseDownFlag = false;
}

function setColor(e) {
    console.log(e);
    mainColor = e.target.value;
}

function resetFields(e) {
    for (let i = 0; i < currentGridSize**2; i++) {
        fields[i].style.backgroundColor = BGCOLOR;
    }
}



drawingContainer.classList.add("drawing-container");
drawingContainer.addEventListener("mouseover", enterField);
drawingContainer.addEventListener("mouseout", leaveField);
drawingContainer.addEventListener("mousedown", containerMouseDown);
drawingContainer.addEventListener("mouseup", containerMouseUp);
window.addEventListener("mouseup", containerMouseUp);
resetFieldsButton.addEventListener("click", resetFields);
newGridSlider.addEventListener("input", (e) => {
    createNewGrid(newGridSlider.value);
    gridSizeLabel.textContent = newGridSlider.value + "x" + newGridSlider.value;
});

colorInput.value = mainColor;
colorInput.addEventListener("change", setColor);

drawingContainerContainer.appendChild(drawingContainer);

newGridSlider.value = 16;
gridSizeLabel.textContent = "16x16";
let fields = [];

for (let i = 0; i < 10000; i++) {
    let tempField = document.createElement("div");
    tempField.classList.add("field");
    tempField.style.display = "none";
    fields.push(tempField);
    
    drawingContainer.appendChild(tempField);
}

createNewGrid(16);
