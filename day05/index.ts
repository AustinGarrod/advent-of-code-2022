import fs, { readFileSync, ReadStream } from 'fs'
import readline from 'readline'

console.clear()

console.log('STARING ==================')
console.log('')
console.log('')

// const chunkLines = async (array: string) => {
//   var results = []
//   while (array.length) {
//     results.push(array.splice(0, size))
//   }
//   return results
// }

const getPiles = () => {
  const file = readFileSync('./day05/input.txt', 'utf-8')
  const lines = file.split(/\r?\n/)

  let processedLines: string[][] = []
  let chunkedLines: string[][] = []

  const totalRows = lines.indexOf('') - 1
  const tableLines = lines.splice(0, totalRows)

  tableLines.forEach((line, index) => {
    const lineArray = line.split('')
    while (lineArray.length) {
      if (!chunkedLines[index]) {
        chunkedLines.push([])
      }
      chunkedLines[index].push(
        lineArray.splice(0, 4).join('').trim().replace('[', '').replace(']', '')
      )
    }
  })

  for (
    let chunkedLineNumber = chunkedLines.length - 1;
    chunkedLineNumber >= 0;
    chunkedLineNumber--
  ) {
    for (
      let itemNumber = 0;
      itemNumber < chunkedLines[chunkedLineNumber].length;
      itemNumber++
    ) {
      if (!processedLines[itemNumber]) {
        processedLines.push([])
      }

      if (chunkedLines[chunkedLineNumber][itemNumber] !== '') {
        processedLines[itemNumber].push(
          chunkedLines[chunkedLineNumber][itemNumber]
        )
      }
    }
  }

  return processedLines
}

interface InstructionSet {
  count: number
  from: number
  to: number
}

const getInstructions = (): InstructionSet[] => {
  const file = readFileSync('./day05/input.txt', 'utf-8')
  const lines = file.split(/\r?\n/)

  const instructionRows = lines.splice(lines.indexOf('') + 1)

  return instructionRows.map((row) => ({
    count: parseInt(row.split(' ')[1]),
    from: parseInt(row.split(' ')[3]),
    to: parseInt(row.split(' ')[5]),
  }))
}

const part1 = async () => {
  const fileStream = fs.createReadStream('./day05/input.txt')
  const fileLines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  const piles = [...getPiles()]
  const instructions = getInstructions()

  instructions.forEach((instruction) => {
    for (let index = 1; index <= instruction.count; index++) {
      const grabbedElement = piles[instruction.from - 1].pop()
      if (grabbedElement) piles[instruction.to - 1].push(grabbedElement)
    }
  })

  let toppers = ''
  piles.forEach((pile) => {
    toppers += pile.pop()
  })

  console.log(`Your answer for part 1 is: ${toppers}`)
}

part1()
