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
      case 'pair':
        targetEl.value = getPair(targetEl)
        break
      case 'twopair':
        targetEl.value = getTwoPair(targetEl)
      default:
        return false
    }
  }
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

// default to two for a pair
const getTheSame = (array, amount = 2) => {
  let result = 0

  const getSame = (array, index = 0) => {
    const same = array.filter((n) => n === array[index])

    if (same.length >= amount) {
      result = same[0] * amount
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
  return getTheSame(dices, 2)
}

const getTwoPair = () => {
  // const dices = diceToArray()
  const dices = [2, 4, 5, 3, 3, 3, 3].sort((a, b) => b - a)
  console.log(getTheSame(dices, 2))

  return 666
}

getTwoPair()

document.getElementById('jsYatzyTable').addEventListener('click', handleResult)
