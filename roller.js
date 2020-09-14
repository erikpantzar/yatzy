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

  dices.forEach((dice) => {
    // check if dice is not checked
    if (!dice.querySelector('input').checked) {
      dice.classList.add(ROLLING_ANIMATION_CLASSNAME)
    } else {
      return false
    }
  })

  setTimeout(() => {
    dices.forEach((dice) => {
      // stop animation
      if (dice.classList.contains(ROLLING_ANIMATION_CLASSNAME)) {
        dice.classList.remove(ROLLING_ANIMATION_CLASSNAME)
        // set the value to each dice element
        setValueToDice(dice)
      }
    })
  }, ROLLING_ANIMATOIN)
}

const setValueToDice = (diceElement) => {
  const randomDiceValue = () => Math.round(Math.random() * (6 - 1) + 1)
  diceElement.dataset.value = randomDiceValue()
}

// initial roll
rollDice()
