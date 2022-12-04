import fs from 'fs'
import readline from 'readline'

console.clear()

const parseValues = (group: string) => {
  const groupStart = parseInt(group.split('-')[0])
  const groupEnd = parseInt(group.split('-')[1])

  const accumulator: number[] = []

  for (let i = groupStart; i <= groupEnd; i++) {
    accumulator.push(i)
  }

  return accumulator
}

const part1 = async () => {
  const fileStream = fs.createReadStream('./day04/input.txt')
  const fileLines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  let fullyOverlappingGroups = 0

  for await (const line of fileLines) {
    const firstGroup = line.split(',')[0]
    const secondGroup = line.split(',')[1]

    const firstJobs = parseValues(firstGroup)
    const secondJobs = parseValues(secondGroup)

    if (
      firstJobs.every((job) => secondJobs.includes(job)) ||
      secondJobs.every((job) => firstJobs.includes(job))
    ) {
      fullyOverlappingGroups += 1
    }
  }

  console.log(`Total for part one: ${fullyOverlappingGroups}`)
}

const part2 = async () => {
  const fileStream = fs.createReadStream('./day04/input.txt')
  const fileLines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  let fullyOverlappingGroups = 0

  for await (const line of fileLines) {
    const firstGroup = line.split(',')[0]
    const secondGroup = line.split(',')[1]

    const firstJobs = parseValues(firstGroup)
    const secondJobs = parseValues(secondGroup)

    if (
      firstJobs.some((job) => secondJobs.includes(job)) ||
      secondJobs.some((job) => firstJobs.includes(job))
    ) {
      fullyOverlappingGroups += 1
    }
  }

  console.log(`Total for part two: ${fullyOverlappingGroups}`)
}

part1()
part2()
