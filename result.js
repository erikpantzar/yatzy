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
        targetEl.value = score(Number(target))
        break
      case 'sum':
        targetEl.value = sum(targetEl)
        break
      case 'bonus':
        targetEl.value = getBonus(targetEl) ? 50 : 0
        break
      case 'pair':
        targetEl.value = getPair()
        break
      case 'twopair':
        targetEl.value = getTwoPair()
        break
      case 'three':
        targetEl.value = threeOfAKind()
        break
      case 'four':
        targetEl.value = fourOfAkind()
        break
      case 'fullhouse':
        targetEl.value = fullHouse()
        break
      case 'lowstraight':
        targetEl.value = loLadder()
        break
      case 'histraight':
        targetEl.value = hiLadder()
        break
      case 'chance':
        targetEl.value = chance()
        break
      case 'yatzy':
        targetEl.value = yatzee()
        break
      case 'total':
        targetEl.value = getTotal(targetEl)
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

// default to two for a pair
const getTheSame = (array, amount = 2, not = null) => {
  let result = []

  const getSame = (array, index = 0) => {
    const same = array.filter((n) => n === array[index] && n !== not)

    if (same.length >= amount) {
      result = new Array(amount).fill(same[0])
    } else {
      if (index !== array.length) {
        getSame(array, index + 1)
      }
    }
  }

  getSame(array)
  return result
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
