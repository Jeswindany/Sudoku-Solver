// Styling Sudoku Box

for (let i = 0; i < 9; i++) {
    document.querySelector(`#box-${19 + i}`).style.borderBottom = "1px solid white";
    document.querySelector(`#box-${55 + i}`).style.borderTop = "1px solid white";
}

// Initializing inputBoxes

const inputBoxes = [];

for (let i = 1; i <= 73; i += 9) {
    let row = [];
    for (let j = 0; j < 9; j++) {
        let box = document.getElementById(`box-${i + j}`);
        row.push(box);
    }
    inputBoxes.push(row);
}

// Reset Event Handling

document.getElementById('reset').addEventListener('click', reset);

function reset() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            inputBoxes[i][j].value = "";
        }
    }
    wrongInputMsg.style.display = "none";
}

// Solve btn Event Handling

document.getElementById('solve').addEventListener('click', solve);

function solve() {
    if (!hasValidInputs()) {
        return;
    }
}

const wrongInputMsg = document.getElementById("wrongInputMsg");

function hasValidInputs() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let val = inputBoxes[i][j].value;

            if (val == "") {
                continue;
            } else if (parseInt(val) < 1 || parseInt(val) > 9) {
                wrongInputMsg.textContent = "One of the entered values is not in the range [1 - 9]!";
                wrongInputMsg.style.display = "block";
                return false;
            } else if (!isValidPosition(i, j)) {
                wrongInputMsg.textContent = "One of the entered values appears twice in the same row, column, or sub-box.";
                wrongInputMsg.style.display = "block";
                return false;
            }
        }
    }
    wrongInputMsg.style.display = "none";
    return true;
}

function isValidPosition(x, y) {
    let val = inputBoxes[x][y].value;

    for (let i = 0; i < 9; i++) {
        if (i != x && inputBoxes[i][y].value === val) {
            return false;
        } else if (i != y && inputBoxes[x][i].value === val) {
            return false;
        }
    }

    // sub-box validation

    let startRow = Math.floor(x / 3) * 3;
    let startCol = Math.floor(y / 3) * 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let subRow = startRow + i;
            let subCol = startCol + j;
            if ((subRow !== x || subCol !== y) && inputBoxes[subRow][subCol].value === val) {
                return false;
            }
        }
    }
    return true;
}