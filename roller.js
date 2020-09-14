const button = document.querySelector('[data-attr="js-roller"]')

if (button) {
  button.addEventListener('click', () => {
    rollDice()
  })
}

const rollDice = () => {
  const dices = document.querySelectorAll('.dice-container')
  const ROLLING_ANIMATOIN = 700
  const ROLLING_ANIMATION_CLASSNAME = 'rolling'

  dices.forEach((dice) => dice.classList.add(ROLLING_ANIMATION_CLASSNAME))

  setTimeout(() => {
    dices.forEach((dice) => {
      // stop animation
      dice.classList.remove(ROLLING_ANIMATION_CLASSNAME)
      // set the value to each dice element
      setValueToDice(dice)
    })
  }, ROLLING_ANIMATOIN)
}

const setValueToDice = (diceElement) => {
  const randomDiceValue = () => Math.round(Math.random() * (6 - 1) + 1)
  diceElement.dataset.value = randomDiceValue()
}
