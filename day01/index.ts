import fs from 'fs'
import readline from 'readline'

const part1 = async () => {
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

const part2 = async () => {
  const fileStream = fs.createReadStream('./day01/input.txt')
  const fileLines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })

  let accumulator: number[] = []
  let totals: number[] = []

  for await (const line of fileLines) {
    if (!line) {
      const total = accumulator.reduce((a, b) => a + b, 0)
      totals.push(total)
      accumulator = []
    } else {
      accumulator.push(parseInt(line))
    }
  }

  const topThreeTotal = totals.sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a + b, 0)

  console.log(`Total of top 3 calories held: ${topThreeTotal}`)
}

part1()
part2()