import fs from 'fs'
import readline from 'readline'

enum Hand {
  Rock = 'rock',
  Paper = 'paper',
  Scissors = 'scissors',
}

enum Result {
  Win = 'win',
  Lose = 'lose',
  Tie = 'tie',
}

const Play = (play: Hand) => {
  const values = {
    [Hand.Rock]: {
      [Result.Win]: Hand.Scissors,
      [Result.Tie]: Hand.Rock,
      [Result.Lose]: Hand.Paper,
      vs: (otherPlayersPlay: Hand) => {
        switch (otherPlayersPlay) {
          case Hand.Rock:
            return 4
          case Hand.Paper:
            return 1
          case Hand.Scissors:
            return 7
          default:
            throw new Error(`Uncaught VS: ${play} vs ${otherPlayersPlay}`)
        }
      },
    },
    [Hand.Paper]: {
      [Result.Win]: Hand.Rock,
      [Result.Tie]: Hand.Paper,
      [Result.Lose]: Hand.Scissors,
      vs: (otherPlayersPlay: Hand) => {
        switch (otherPlayersPlay) {
          case Hand.Rock:
            return 8
          case Hand.Paper:
            return 5
          case Hand.Scissors:
            return 2
          default:
            throw new Error(`Uncaught VS: ${play} vs ${otherPlayersPlay}`)
        }
      },
    },
    [Hand.Scissors]: {
      [Result.Win]: Hand.Paper,
      [Result.Tie]: Hand.Scissors,
      [Result.Lose]: Hand.Rock,
      vs: (otherPlayersPlay: Hand) => {
        switch (otherPlayersPlay) {
          case Hand.Rock:
            return 3
          case Hand.Paper:
            return 9
          case Hand.Scissors:
            return 6
          default:
            throw new Error(`Uncaught VS: ${play} vs ${otherPlayersPlay}`)
        }
      },
    },
  }
  return values[play]
}

const MapHands = (val: string) => {
  const values = {
    A: Hand.Rock,
    B: Hand.Paper,
    C: Hand.Scissors,
    X: Hand.Rock,
    Y: Hand.Paper,
    Z: Hand.Scissors,
  }

  if (!values[val as keyof typeof values]) {
    throw new Error(`Uncaught MapHands: ${val}`)
  }
  return values[val as keyof typeof values]
}

const MapResult = (val: string) => {
  const values = {
    X: Result.Lose,
    Y: Result.Tie,
    Z: Result.Win,
  }

  if (!values[val as keyof typeof values]) {
    throw new Error(`Uncaught MapResult: ${val}`)
  }
  return values[val as keyof typeof values]
}

const Opposite = (result: Result) => {
  const values = {
    [Result.Win]: Result.Lose,
    [Result.Tie]: Result.Tie,
    [Result.Lose]: Result.Win,
  }

  if (!values[result]) {
    throw new Error(`Uncaught Opposite: ${result}`)
  }
  return values[result]
}

const WINNING_POINTS = 6

const part1 = async () => {
  const fileStream = fs.createReadStream('./day02/input.txt')
  const fileLines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  let total = 0

  for await (const line of fileLines) {
    const theirPlay = line.split(' ')[0]
    const mayPlay = line.split(' ')[1]

    console.log(theirPlay, mayPlay)

    total += Play(MapHands(mayPlay)).vs(MapHands(theirPlay))
  }

  console.log(`Your total for part 1 is ${total}`)
}

const part2 = async () => {
  const fileStream = fs.createReadStream('./day02/input.txt')
  const fileLines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  let total = 0

  for await (const line of fileLines) {
    const theirHand = MapHands(line.split(' ')[0])
    const myResult = MapResult(line.split(' ')[1])
    const myPlay = Play(theirHand)[Opposite(myResult)]

    total += Play(myPlay).vs(theirHand)
  }

  console.log(`Your total for part 2 is ${total}`)
}

part1()
part2()
