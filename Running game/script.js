const hero = document.querySelector(".hero");
const heroBoy = document.querySelector(".hero-boy");
const vilan = document.querySelector(".vilan");

function jump() {
    if (hero.classList != "animate") {
        hero.classList.add("animate");
        vilan.style.animation = "move 1s infinite linear";


    }

    setTimeout(function() {
        hero.classList.remove("animate");
    }, 300);
}

document.addEventListener("keydown", function() {
    jump();
})

let isAlive = setInterval(function() {
    let heroTop = parseInt(window.getComputedStyle(hero).getPropertyValue("top"));
    //   console.log(heroTop);
    let vilanLeft = parseInt(window.getComputedStyle(vilan).getPropertyValue("left"));

    if (vilanLeft < 40 && vilanLeft > 20 && heroTop >= 130) {
        vilan.style.animation = "none";

        alert("Game Over. Press spacebar to restart");



    }


}, 10);