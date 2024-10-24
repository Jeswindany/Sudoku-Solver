for (let i = 0; i < 9; i++) {
    document.querySelector(`#box-${19 + i}`).style.borderBottom = "1px solid white";
    document.querySelector(`#box-${55 + i}`).style.borderTop = "1px solid white";
}

const inputBoxes = [];

for (let i = 1; i <= 73; i += 9) {
    let row = [];
    for (let j = 0; j < 9; j++) {
        row.push(document.getElementById(`box-${i + j}`));
    }
    inputBoxes.push(row);
}
