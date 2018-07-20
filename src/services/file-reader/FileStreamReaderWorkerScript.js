const FileStreamReaderWorkerScript = () => {
  // eslint-disable-next-line no-undef
  const reader = new FileReaderSync()
  let start
  let endExclusive
  let file
  let numberOfChunks

  const computeNumberOfChunks = file => {
    const sizeOfLastDataChunk = file.size % 4096
    return Math.floor(file.size / 4096) + (sizeOfLastDataChunk === 0 ? 0 : 1)
  }

  const setup = input => {
    file = input.file
    numberOfChunks = input.numberOfChunks
    start = 0
    endExclusive = 4096
  }

  const progressMarkers = () => {
    start = start + 4096
    endExclusive = start + 4096
  }

  const readDataChunk = index => {
    const blob =
      index === numberOfChunks - 1
        ? file.slice(start)
        : file.slice(start, endExclusive)
    return new Uint8Array(reader.readAsArrayBuffer(blob))
  }

  const send = dataChunk => {
    // eslint-disable-next-line no-restricted-globals
    self.postMessage(dataChunk)
  }

  const readChunks = () => {
    for (let i = 0; i < numberOfChunks; i++) {
      send(readDataChunk(i))
      progressMarkers()
    }
  }

  const read = file => {
    setup({
      file,
      numberOfChunks: computeNumberOfChunks(file)
    })
    readChunks()
  }

  // eslint-disable-next-line no-restricted-globals
  self.onmessage = e => {
    read(e.data.file)
  }
}

// let code = workercode.toString()
// code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'))

// const blob = new Blob([code], { type: 'application/javascript' })

// const FileStreamReaderWorkerScript = URL.createObjectURL(blob)

export { FileStreamReaderWorkerScript }
