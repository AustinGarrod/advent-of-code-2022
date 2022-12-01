import fs from 'fs'
import readline from 'readline'

const getLongBoi = async () => {
  const fileStream = fs.createReadStream('./day01/input.txt')
  const fileLines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })

  let accumulator: number[] = []
  let largestTotal = 0

  for await (const line of fileLines) {
    if (!line) {
      const total = accumulator.reduce((a, b) => a + b, 0)
      if (total > largestTotal) largestTotal = total
      accumulator = []
    } else {
      accumulator.push(parseInt(line))
    }
  }

  console.log(`Largest calories held: ${largestTotal}`)
}

getLongBoi()