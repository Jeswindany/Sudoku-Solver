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

const resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', reset);

function reset() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            inputBoxes[i][j].value = "";
            inputBoxes[i][j].style.color = "white";
            inputBoxes[i][j].disabled = false;
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
    
    resetBtn.disabled = true;

    let solutionFound = solveSudoku(0, 0);
    if (!solutionFound) {
        wrongInputMsg.textContent = "No Solution Found!";
        wrongInputMsg.style.display = "block";
        setTimeout(reset, 5000);
    }

    resetBtn.disabled = false;
}

function solveSudoku(row, col) {
    if (row == 8 && col == 9) {
        return true;
    }

    if (col == 9) {
        row++;
        col = 0;
    }

    if (hasValue(row, col)) {
        return solveSudoku(row, col + 1);
    }

    for (let num = 1; num <= 9; num++) {
        if (isValidPosition(num, row, col)) {
            inputBoxes[row][col].value = num;
            inputBoxes[row][col].disabled = true;

            if (solveSudoku(row, col + 1)) {
                return true;
            }
        }
        inputBoxes[row][col].value = "";
    }

    return false;
}

const wrongInputMsg = document.getElementById("wrongInputMsg");

function hasValidInputs() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let val = inputBoxes[i][j].value;

            if (val == "") {
                continue;
            }

            if (!/^[1-9]$/.test(val)) {
                wrongInputMsg.textContent = "Invalid input detected! Please enter numbers between 1 and 9 only.";
                wrongInputMsg.style.display = "block";
                return false;
            } else if (!isValidPosition(parseInt(val), i, j)) {
                wrongInputMsg.textContent = "One of the entered values appears twice in the same row, column, or sub-box.";
                wrongInputMsg.style.display = "block";
                return false;
            }

            inputBoxes[i][j].style.color = "#907294";
            inputBoxes[i][j].disabled = true;
        }
    }
    wrongInputMsg.style.display = "none";
    return true;
}

function isValidPosition(val, x, y) {
    for (let i = 0; i < 9; i++) {
        if (i != x && parseInt(inputBoxes[i][y].value) === val) {
            return false;
        } else if (i != y && parseInt(inputBoxes[x][i].value) === val) {
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
            if ((subRow !== x || subCol !== y) && parseInt(inputBoxes[subRow][subCol].value) === val) {
                return false;
            }
        }
    }
    return true;
}

function hasValue(i, j) {
    if (inputBoxes[i][j].value !== "") {
        return true;
    } else {
        return false;
    }
}