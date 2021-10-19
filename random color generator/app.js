const btn = document.getElementById("btn");
const color = document.querySelector(".color");

btn.addEventListener("click", changeColor);

function changeColor() {
    const hexColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = hexColor;
    color.textContent = hexColor;
    color.style.color = hexColor;
}
