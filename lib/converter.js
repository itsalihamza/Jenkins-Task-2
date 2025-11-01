function cToF(c) {
  if (typeof c !== 'number' || Number.isNaN(c)) {
    throw new TypeError('c must be a number');
  }
  return +(c * 9 / 5 + 32).toFixed(2);
}

module.exports = { cToF };
