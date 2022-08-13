import Board4x4 from "./board-4x4.js";

window.addEventListener('DOMContentLoaded', () => {
    let board = new Board4x4();

    let currentMinute = document.getElementById("current-minute");
    let currentSecond = document.getElementById("current-second");

    let seconds = 0;
    const timer = (val) => {
        return val > 9 ? val : "0" + val;
    };

    setInterval(() => {
        currentMinute.innerHTML = timer(parseInt(seconds / 60, 10));
        currentSecond.innerHTML = timer(++seconds % 60);
    }, 1000);

    timer();
});