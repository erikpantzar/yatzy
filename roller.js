const button = document.querySelector('[data-attr="js-roller"]');

if (button) {
  button.addEventListener("click", () => {
    rollDice();
  });
}

const rollDice = () => {
  const dice = document.querySelector(".dice");
  const ROLLING_ANIMATOIN = 700;
  const ROLLING_ANIMATION_CLASSNAME = "rolling";

  dice.classList.add(ROLLING_ANIMATION_CLASSNAME);

  setTimeout(() => {
    dice.classList.remove(ROLLING_ANIMATION_CLASSNAME);
  }, ROLLING_ANIMATOIN);
};
