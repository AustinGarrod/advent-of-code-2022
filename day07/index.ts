import { readFileSync, writeFile } from 'fs'

console.clear()

interface FileSystem {
  label: string
  size: number
}

interface Directory extends FileSystem {
  contents: { [key: string]: Directory | File }
  parent?: Directory
}

interface File extends FileSystem {}

const getLines = () => readFileSync('./day07/input.txt', 'utf-8').split(/\r?\n/)

const extractDirectories = (dir: Directory): Directory[] => {
  let foundValues: Directory[] = []

  Object.values(dir.contents).forEach((content) => {
    if ((<Directory>content).contents) {
      // Its a directory
      foundValues = [
        ...foundValues,
        content as Directory,
        ...extractDirectories(content as Directory),
      ]
    }
  })

  return foundValues
}

const part1 = () => {
  const fileSystem: Directory = {
    label: '/',
    contents: {},
    size: 0,
  }
  let presentWorkingPath = '/'
  let presentWorkingDirectory = fileSystem
  const lines = getLines()

  lines.forEach((line) => {
    if (line.startsWith('$')) {
      if (line.startsWith('$ cd')) {
        if (line === '$ cd /') {
          // Return to root
          presentWorkingPath = '/'
          presentWorkingDirectory = fileSystem
        } else if (line.endsWith('..')) {
          // Go up one directory
          const newPath = presentWorkingPath.split('/')
          newPath.pop()

          presentWorkingPath = newPath.join('/')
          presentWorkingDirectory = presentWorkingDirectory.parent!
        } else {
          // Enter subdirectory
          const dirToEnter = line.split(' ')[2]
          presentWorkingPath =
            presentWorkingPath === '/'
              ? dirToEnter
              : presentWorkingPath + `/${dirToEnter}`
          const newPath = presentWorkingPath.split('/')
          newPath.shift()

          if (!presentWorkingDirectory.contents[dirToEnter]) {
            presentWorkingDirectory.contents[dirToEnter] = {
              label: dirToEnter,
              contents: {},
              parent: presentWorkingDirectory,
              size: 0,
            }
          }

          presentWorkingDirectory = presentWorkingDirectory.contents[
            dirToEnter
          ] as Directory
        }
      } else {
        // ls command
      }
    } else {
      if (line.startsWith('dir')) {
        // listed directory
        const dirName = line.split(' ')[1]

        if (!presentWorkingDirectory.contents[dirName]) {
          presentWorkingDirectory.contents[dirName] = {
            parent: presentWorkingDirectory,
            label: dirName,
            contents: {},
            size: 0,
          }
        }
      } else {
        // listed file
        const size = parseInt(line.split(' ')[0])
        const fileName = line.split(' ')[1]
        // console.log('pwd', presentWorkingDirectory)

        presentWorkingDirectory.contents = {
          ...presentWorkingDirectory.contents,
          [fileName]: { label: fileName, size },
        }

        presentWorkingDirectory.size += size

        let presentTotallingDirectory = presentWorkingDirectory.parent
        while (!!presentTotallingDirectory) {
          presentTotallingDirectory.size += size
          presentTotallingDirectory = presentTotallingDirectory.parent
        }
      }
    }
  })

  const total = extractDirectories(fileSystem)
    .filter((dir) => dir.size <= 100000)
    .reduce((a, b) => a + b.size, 0)

  console.log(`Total for part 1: ${total}`)
}

const part2 = () => {
  const fileSystem: Directory = {
    label: '/',
    contents: {},
    size: 0,
  }
  let presentWorkingPath = '/'
  let presentWorkingDirectory = fileSystem
  const lines = getLines()

  lines.forEach((line) => {
    if (line.startsWith('$')) {
      if (line.startsWith('$ cd')) {
        if (line === '$ cd /') {
          // Return to root
          presentWorkingPath = '/'
          presentWorkingDirectory = fileSystem
        } else if (line.endsWith('..')) {
          // Go up one directory
          const newPath = presentWorkingPath.split('/')
          newPath.pop()

          presentWorkingPath = newPath.join('/')
          presentWorkingDirectory = presentWorkingDirectory.parent!
        } else {
          // Enter subdirectory
          const dirToEnter = line.split(' ')[2]
          presentWorkingPath =
            presentWorkingPath === '/'
              ? dirToEnter
              : presentWorkingPath + `/${dirToEnter}`
          const newPath = presentWorkingPath.split('/')
          newPath.shift()

          if (!presentWorkingDirectory.contents[dirToEnter]) {
            presentWorkingDirectory.contents[dirToEnter] = {
              label: dirToEnter,
              contents: {},
              parent: presentWorkingDirectory,
              size: 0,
            }
          }

          presentWorkingDirectory = presentWorkingDirectory.contents[
            dirToEnter
          ] as Directory
        }
      } else {
        // ls command
      }
    } else {
      if (line.startsWith('dir')) {
        // listed directory
        const dirName = line.split(' ')[1]

        if (!presentWorkingDirectory.contents[dirName]) {
          presentWorkingDirectory.contents[dirName] = {
            parent: presentWorkingDirectory,
            label: dirName,
            contents: {},
            size: 0,
          }
        }
      } else {
        // listed file
        const size = parseInt(line.split(' ')[0])
        const fileName = line.split(' ')[1]
        // console.log('pwd', presentWorkingDirectory)

        presentWorkingDirectory.contents = {
          ...presentWorkingDirectory.contents,
          [fileName]: { label: fileName, size },
        }

        presentWorkingDirectory.size += size

        let presentTotallingDirectory = presentWorkingDirectory.parent
        while (!!presentTotallingDirectory) {
          presentTotallingDirectory.size += size
          presentTotallingDirectory = presentTotallingDirectory.parent
        }
      }
    }
  })

  const extractedDirectories = extractDirectories(fileSystem)

  const total = extractedDirectories
    .filter((dir) => dir.size <= 100000)
    .reduce((a, b) => a + b.size, 0)

  const usedStorage = extractedDirectories[0].parent?.size!
  const freeStorage = 70000000 - usedStorage
  const spaceToFree = 30000000 - freeStorage

  const foldersToConsider = extractedDirectories
    .filter((dir) => dir.size >= spaceToFree)
    .sort((a, b) => a.size - b.size)

  console.log(`Total for part 2: ${foldersToConsider[0].size}`)
}

part1()
part2()
