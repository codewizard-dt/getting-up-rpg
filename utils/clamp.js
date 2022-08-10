function clamp(min, max, delta, value) {
  value += delta
  if (value < min) return min
  if (value > max) return max
  return value
}

module.exports = clamp