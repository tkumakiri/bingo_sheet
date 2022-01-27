import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export type MassState = {
  col: number
  row: number
  num: number | string
  isMark: boolean
}

export type MarkState = {
  col: number
  row: number
}

export function getMassObj() {
  const bingo = ['b', 'i', 'n', 'g', 'o']
  const objArr: MassState[] = []
  bingo.forEach((mode, colIndex) =>
    getRandomArr(mode).forEach((data, rowIndex) => {
      if (data === 'free') {
        objArr.push({
          col: colIndex,
          row: rowIndex,
          num: 'free',
          isMark: true,
        })
      } else {
        objArr.push({
          col: colIndex,
          row: rowIndex,
          num: data,
          isMark: false,
        })
      }
    })
  )

  return objArr
}

function getRandomArr(mode: string) {
  let min = 0
  let max = 0
  if (mode === 'b') {
    min = 1
    max = 15
  } else if (mode === 'i') {
    min = 16
    max = 30
  } else if (mode === 'n') {
    min = 31
    max = 45
  } else if (mode === 'g') {
    min = 46
    max = 60
  } else if (mode === 'o') {
    min = 61
    max = 75
  }

  const arr: (number | string)[] = []
  for (let i = min; i <= max; i += 1) {
    arr.push(i)
  }
  const result = shuffle(arr).slice(0, 5)
  if (mode === 'n') {
    result[2] = 'free'
  }

  return result
}

function shuffle(arr: (number | string)[]) {
  const array = arr
  for (let i = array.length - 1; i >= 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const initialState: Array<MassState> = getMassObj()

export const massSlice = createSlice({
  name: 'mass',
  initialState,
  reducers: {
    mark: (state, action: PayloadAction<MarkState>) => {
      const massIndex = state.findIndex((mass) => action.payload.row === mass.row && action.payload.col === mass.col)
      state[massIndex].isMark = !state[massIndex].isMark
    },
    pushInitMass(state, action: PayloadAction<MassState[]>) {
      return action.payload
    },
  },
})

export const { pushInitMass, mark } = massSlice.actions
export const selectMass = (state: RootState) => state.mass
export default massSlice.reducer
