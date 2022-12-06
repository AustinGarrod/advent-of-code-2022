import { readFileSync } from 'fs'

console.clear()

const getFile = () => readFileSync('./day06/input.txt', 'utf-8')

const part1 = () => {
  const signal = getFile().split('')

  let lastFourChars = ['', '', '', '']
  let foundIndex = 0

  signal.forEach((char, index) => {
    lastFourChars.shift()
    lastFourChars.push(char)
    const uniqueChars = [...new Set(lastFourChars)]

    if (uniqueChars.length === 4 && foundIndex === 0 && index > 3) {
      foundIndex = index + 1
    }
  })

  console.log(`Found start of packet marker at ${foundIndex}`)
}

const part2 = () => {
  const signal = getFile().split('')

  let lastFourChars = ['', '', '', '', '', '', '', '', '', '', '', '', '', '']
  let foundIndex = 0

  signal.forEach((char, index) => {
    lastFourChars.shift()
    lastFourChars.push(char)
    const uniqueChars = [...new Set(lastFourChars)]

    if (uniqueChars.length === 14 && foundIndex === 0 && index > 14) {
      foundIndex = index + 1
    }
  })

  console.log(`Found start of message marker at ${foundIndex}`)
}

part1()
part2()
