import React, { useEffect } from 'react'

import { selectMass, MassState, pushInitMass, getMassObj } from '../mass/massSlice'
import Col from '../col/Col'
import { useAppSelector, useAppDispatch } from '../../app/hooks'

// OMTG:One More to Go
function checkOMTG(markedMass: MassState[]) {
  const len = 5
  const checkCol = Array(len).fill(0)
  const checkRow = Array(len).fill(0)
  const checkCross = Array(2).fill(0)
  for (let i = 0; i < len; i += 1) {
    checkCol[i] = markedMass.filter((data) => data.col === i).length
    checkRow[i] = markedMass.filter((data) => data.row === i).length
  }
  checkCross[0] = markedMass.filter((data) => data.col === data.row).length
  checkCross[1] = markedMass.filter((data) => data.col === 4 - data.row).length
  if (checkCol.includes(4) || checkRow.includes(4) || checkCross.includes(4)) {
    return 'OMTG'
  }
  return ''
}
function checkBingo(markedMass: MassState[]) {
  const len = 5
  const checkCol = Array(len).fill(0)
  const checkRow = Array(len).fill(0)
  const checkCross = Array(2).fill(0)
  for (let i = 0; i < len; i += 1) {
    checkCol[i] = markedMass.filter((data) => data.col === i).length
    checkRow[i] = markedMass.filter((data) => data.row === i).length
  }
  checkCross[0] = markedMass.filter((data) => data.col === data.row).length
  checkCross[1] = markedMass.filter((data) => data.col === 4 - data.row).length
  if (checkCol.includes(5) || checkRow.includes(5) || checkCross.includes(5)) {
    return 'Bingo'
  }
  return ''
}

export default function Sheet() {
  const name = ['b', 'i', 'n', 'g', 'o']
  const markedMass = useAppSelector(selectMass).filter((data) => data.isMark === true)
  const dispatch = useAppDispatch()

  return (
    <div className="text-center my-auto mx-10">
      <div className="flex rounded shadow-xl">
        {name.map((mode, index) => (
          <div className="flex-1 text-center" key={mode}>
            <div className="text-2xl">
              <div className=" bg-green-500">{mode}</div>
            </div>
            <Col mode={index} />
          </div>
        ))}
      </div>
      <div className="text-lime-600 text-3xl mt-6 mb-3">{checkOMTG(markedMass)}</div>
      <div className="text-red-600 text-3xl">{checkBingo(markedMass)}</div>

      <button
        className="bg-yellow-400 px-3 py-2 mt-10"
        type="button"
        onClick={() => dispatch(pushInitMass(getMassObj()))}
      >
        restart Game!
      </button>
    </div>
  )
}
