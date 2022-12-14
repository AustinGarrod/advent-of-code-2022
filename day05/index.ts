import { readFileSync } from 'fs'

console.clear()

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

const part2 = async () => {
  const piles = [...getPiles()]
  const instructions = getInstructions()

  instructions.forEach((instruction) => {
    const grabbedElements = piles[instruction.from - 1].splice(
      -instruction.count,
      instruction.count
    )
    if (grabbedElements) piles[instruction.to - 1].push(...grabbedElements)
  })

  let toppers = ''
  piles.forEach((pile) => {
    toppers += pile.pop()
  })

  console.log(`Your answer for part 2 is: ${toppers}`)
}

part1()
part2()
