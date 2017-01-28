function createIndices(length) {
  let indices = new Uint16Array((length - 1) * 6)
  let c = 0, index = 0
  for (let j=0; j<length - 1; j++) {
    let i = index
    indices[c++] = i + 0
    indices[c++] = i + 1
    indices[c++] = i + 2
    indices[c++] = i + 2
    indices[c++] = i + 1
    indices[c++] = i + 3
    index += 2
  }

  return indices
}

module.exports = createIndices;