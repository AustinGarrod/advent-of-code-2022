import { readFileSync } from 'fs'

enum Direction {
  Up,
  Down,
  Left,
  Right,
}

interface Coordinate {
  x: number
  y: number
}

const getTreeMap = (): number[][] => {
  const lines = readFileSync('./day08/input.txt', 'utf-8').split(/\r?\n/)
  let treeMap: number[][] = []

  lines.map((line) =>
    treeMap.push(line.split('').map((treeHeight) => parseInt(treeHeight)))
  )

  return treeMap
}

const getIsVisible = (
  treeMap: number[][],
  direction: Direction,
  startCoords: Coordinate
): boolean => {
  const treeHeight = treeMap[startCoords.x][startCoords.y]
  let isVisible = true

  switch (direction) {
    case Direction.Up:
      for (let y = startCoords.y - 1; y >= 0; y--) {
        if (treeHeight <= treeMap[startCoords.x][y]) {
          isVisible = false
        }
      }
      break
    case Direction.Down:
      for (let y = startCoords.y + 1; y < treeMap.length; y++) {
        if (treeHeight <= treeMap[startCoords.x][y]) {
          isVisible = false
        }
      }
      break
    case Direction.Left:
      for (let x = startCoords.x - 1; x >= 0; x--) {
        if (treeHeight <= treeMap[x][startCoords.y]) {
          isVisible = false
        }
      }
      break
    case Direction.Right:
      for (let x = startCoords.x + 1; x < treeMap[0].length; x++) {
        if (treeHeight <= treeMap[x][startCoords.y]) {
          isVisible = false
        }
      }
      break
    default:
      break
  }

  return isVisible
}

const part1 = () => {
  const treeMap = getTreeMap()
  let visibleTreeCount = treeMap[0].length * 2 + (treeMap.length - 2) * 2

  for (let x = 1; x < treeMap[0].length - 1; x++) {
    for (let y = 1; y < treeMap.length - 1; y++) {
      if (
        getIsVisible(treeMap, Direction.Up, { x, y }) ||
        getIsVisible(treeMap, Direction.Down, { x, y }) ||
        getIsVisible(treeMap, Direction.Left, { x, y }) ||
        getIsVisible(treeMap, Direction.Right, { x, y })
      ) {
        visibleTreeCount++
      }
    }
  }

  console.log(`Total visible trees in part 1: ${visibleTreeCount}`)
}

part1()
