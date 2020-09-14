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

// TESTS
if (false) {
  console.log(
    getTheSame(
      [1, 2, 3, 4, 6, 9].sort((a, b) => b - a),
      2
    ) === 0
  )

  console.log(
    getTheSame(
      [1, 2, 3, 4, 2, 9, 9, 9].sort((a, b) => b - a),
      2
    ) === 18
  )

  console.log(
    getTheSame(
      [1, 2, 3, 4, 2, 9, 9, 9].sort((a, b) => b - a),
      3
    ) === 27
  )
}
