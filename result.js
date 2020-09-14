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

const getPair = () => {
  // low to high
  const dices = diceToArray().sort((a, b) => a - b)

  let pair = 0

  dices.forEach((dice, index) => {
    if (dices.slice(index + 1, dices.length).includes(dice)) {
      pair = dice * 2
    }
  })

  return pair
}

const getTwoPair = () => {
  // const dices = diceToArray().sort((a, b) => a - b)
  const dices = [3, 3, 9, 8, 2].sort((a, b) => a - b)
  const first = dices.filter((a) => a === dices[0])
  let second = []

  if (first.length === 2) {
    console.log('one pair atleast')
    const dicesFiltered = dices.filter((b) => b !== first[0])
    second = dicesFiltered.filter((b) => b === dicesFiltered[0]).splice(0, 2)
  }

  console.log({ first, second })

  return 666
}

getTwoPair()

document.getElementById('jsYatzyTable').addEventListener('click', handleResult)
