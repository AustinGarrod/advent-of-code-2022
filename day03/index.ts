import fs from 'fs'
import readline from 'readline'

const getPoints = (letter: string) => {
  return (
    [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ].indexOf(letter) + 1
  )
}

const part1 = async () => {
  const fileStream = fs.createReadStream('./day03/input.txt')
  const fileLines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  let total = 0

  for await (const line of fileLines) {
    const firstContainer = line.split('').slice(0, line.length / 2)
    const secondContainer = line.split('').slice(line.length / 2)

    for (
      let itemPosition = 0;
      itemPosition < firstContainer.length;
      itemPosition++
    ) {
      const firstItem = firstContainer[itemPosition]
      if (secondContainer.some((secondItem) => secondItem === firstItem)) {
        total += getPoints(firstItem)
        itemPosition = firstContainer.length
      }
    }
  }

  console.log(`Your total for part 1 is: ${total}`)
}

const part2 = async () => {
  const fileStream = fs.createReadStream('./day03/input.txt')
  const fileLines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })
  let total = 0
  let groups: Array<string[]> = []

  for await (const line of fileLines) {
    if (groups.length === 0 || groups[groups.length - 1].length === 3) {
      groups.push([line])
    } else {
      groups[groups.length - 1].push(line)
    }
  }

  for (let groupPosition = 0; groupPosition < groups.length; groupPosition++) {
    const group = groups[groupPosition]
    const firstContainer = group[0].split('')
    const secondContainer = group[1].split('')
    const thirdContainer = group[2].split('')

    for (
      let firstContainerPosition = 0;
      firstContainerPosition < firstContainer.length;
      firstContainerPosition++
    ) {
      const firstItem = firstContainer[firstContainerPosition]

      if (
        secondContainer.some((secondItem) => secondItem === firstItem) &&
        thirdContainer.some((thirdItem) => thirdItem === firstItem)
      ) {
        total += getPoints(firstItem)
        firstContainerPosition = firstContainer.length
      }
    }
  }

  console.log(`Your total for part 2 is: ${total}`)
}

part1()
part2()
