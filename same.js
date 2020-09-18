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

// TESTS
if (false) {
  console.log(
    getTheSame(
      [1, 2, 3, 4, 6, 9].sort((a, b) => b - a),
      2
    )
  )

  console.log(
    getTheSame(
      [1, 2, 3, 4, 2, 9, 9, 9].sort((a, b) => b - a),
      2
    )
  )

  console.log(
    getTheSame(
      [1, 2, 3, 4, 2, 9, 9, 9].sort((a, b) => b - a),
      3
    )
  )

  console.log(
    getTheSame(
      [4, 4, 2, 2].sort((a, b) => b - a),
      2,
      4
    )
  )
}
