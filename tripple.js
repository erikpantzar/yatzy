// default to two for a pair
const getTheTriple = (array) => {
  let result = 0

  const getTriple = (array, index = 0) => {
    const same = array.filter((n) => n === array[index])

    if (same.length >= 3) {
      result = same[0] * 3
    } else {
      if (index !== array.length) {
        getTriple(array, index + 1)
      }
    }
  }

  if (!result) {
    getTriple(array)
  }

  return result
}

console.log(getTheTriple([1, 2, 3, 4, 2, 9, 9, 9].sort((a, b) => a - b)))
