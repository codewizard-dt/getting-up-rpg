function withLikelihood(array) {
  let weightedArray = []
  for (let { choice_outcome: { likelihood }, ...props } of array) {
    while (likelihood > 0) {
      weightedArray.push({ ...props })
      likelihood--
    }
  }
  return weightedArray
}

module.exports = withLikelihood