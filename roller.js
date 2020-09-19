const diceToArray = () => {
  const dices = document.querySelectorAll('[data-value]')
  let values = []

  dices.forEach((dice) => {
    values.push(Number(dice.dataset.value))
  })

  return values
}

const setValueToDice = (diceElement) => {
  const randomDiceValue = () => Math.round(Math.random() * (6 - 1) + 1)

  const newValue = randomDiceValue()
  diceElement.dataset.value = newValue

  return newValue
}

const button = document.querySelector('[data-attr="js-roller"]')

if (button) {
  button.addEventListener('click', () => {
    rollDice()
  })
}

const rollDice = (skipAnimation = false) => {
  const dices = document.querySelectorAll('.dice-container')
  const ROLLING_ANIMATION_TIME = skipAnimation ? 1 : 700
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
  }, ROLLING_ANIMATION_TIME)
}

// initial roll
const skipAnimation = true
rollDice(skipAnimation)
