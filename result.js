const setScore = (element, score) => {
  element.dataset.score = score
  element.value = score
  element.innerHTML = score

  return true
}

const handleResult = (event) => {
  const targetEl = event.srcElement
  const { attr, target } = targetEl.dataset

  if (attr === 'js-result') {
    switch (target) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
        setScore(targetEl, score(Number(target)))
        break
      case 'sum':
        setScore(targetEl, sum(targetEl))
        break
      case 'bonus':
        setScore(targetEl, getBonus(targetEl) ? 50 : 0)
        break
      case 'pair':
        setScore(targetEl, getPair())
        break
      case 'twopair':
        setScore(targetEl, getTwoPair())
        break
      case 'three':
        setScore(targetEl, threeOfAKind())
        break
      case 'four':
        setScore(targetEl, fourOfAkind())
        break
      case 'fullhouse':
        setScore(targetEl, fullHouse())
        break
      case 'lowstraight':
        setScore(targetEl, loLadder())
        break
      case 'histraight':
        setScore(targetEl, hiLadder())
        break
      case 'chance':
        setScore(targetEl, chance())
        break
      case 'yatzy':
        setScore(targetEl, yatzee())
        break
      case 'total':
        setScore(targetEl, getTotal(targetEl))
        break
      default:
        return false
    }
  }

  // unselect dice
  const diceCheckboxes = document.querySelectorAll('.dice-container input')
  diceCheckboxes.forEach((check) => (check.checked = false))
}

// Returns score of active dice into given target number
const score = (target) => {
  const dices = diceToArray()

  return dices
    .filter((dice) => {
      return dice === target
    })
    .reduce((a, b) => a + b, 0)
}

// Sumarize score for 1-6
const sum = (el) => {
  const data = el.parentNode.querySelectorAll('[data-target]')

  const values = []
  data.forEach((el) => {
    !isNaN(el.dataset.target) ? values.push(Number(el.value)) : false
  })
  return values.reduce((a, b) => a + b, 0)
}

const getBonus = (el) => {
  const partSum = el.parentNode.querySelector('[data-target="sum"]').value
  return partSum >= 63
}

const getTotal = (el) => {
  const scores = [sum(el), getBonus(el) ? 50 : 0]

  document
    .querySelectorAll(
      '[data-target="pair"], [data-target="three"], [data-target="four"], [data-target="twopair"], [data-target="yatzy"], [data-target="chance"], [data-target="histraight"], [data-target="lowstraight"], [data-target="fullhouse"]'
    )
    .forEach((element) => {
      scores.push(Number(element.value))
    })

  return scores.reduce((a, b) => a + b, 0)
}

const getPair = () => {
  // hi to low
  const dices = diceToArray().sort((a, b) => b - a)

  const pair = getTheSame(dices)
  if (pair.length === 2) {
    return pair.reduce((a, b) => a + b, 0)
  }

  return 0
}

const getTwoPair = () => {
  let result = 0
  const dices = diceToArray()

  const first = getTheSame(dices, 2)
  const second = getTheSame(dices, 2, first[0])

  if (first.length === 2 && second.length === 2) {
    result = [...first, ...second].reduce((a, b) => a + b, 0)
  }

  return result
}

const threeOfAKind = () => {
  const dices = diceToArray()
  const first = getTheSame(dices, 3)

  if (first.length === 3) {
    return first.reduce((a, b) => a + b, 0)
  } else {
    return 0
  }
}

const fourOfAkind = () => {
  const dices = diceToArray()

  const first = getTheSame(dices, 4)
  if (first.length === 4) {
    return first.reduce((a, b) => a + b, 0)
  } else {
    return 0
  }
}

const yatzee = () => {
  const dices = diceToArray()

  const first = getTheSame(dices, 5)
  if (first.length === 5) {
    return 50
  } else {
    return 0
  }
}

const hiLadder = () => {
  const dices = diceToArray().sort((a, b) => b - a)

  if (
    dices[0] === 6 &&
    dices[1] === 5 &&
    dices[2] === 4 &&
    dices[3] === 3 &&
    dices[4] === 2
  ) {
    return 20
  }

  return 0
}

const loLadder = () => {
  const dices = diceToArray().sort((a, b) => b - a)

  if (
    dices[0] === 5 &&
    dices[1] === 4 &&
    dices[2] === 3 &&
    dices[3] === 2 &&
    dices[4] === 1
  ) {
    return 15
  }

  return 0
}

const fullHouse = () => {
  let result = 0
  const dices = diceToArray().sort((a, b) => b - a)

  const three = getTheSame(dices, 3)
  if (three.length === 3) {
    const two = getTheSame(dices, 2, three[0])

    if (two.length === 2) {
      result = [...three, ...two].reduce((a, b) => a + b, 0)
    }
  }

  return result
}

const chance = () => {
  return diceToArray().reduce((a, b) => a + b, 0)
}

document.getElementById('jsYatzyTable').addEventListener('click', handleResult)
