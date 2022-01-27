import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { mark, MassState, MarkState, selectMass } from './massSlice'

export type Props = {
  num: number | string
  col: number
  row: number
}

export default function Mass(props: Props) {
  const massProps: Props = props
  const markMass: MarkState = {
    col: massProps.col,
    row: massProps.row,
  }
  const dispatch = useAppDispatch()
  const marked: boolean = useAppSelector(selectMass).filter(
    (mass) => mass.col === markMass.col && mass.row === markMass.row
  )[0].isMark
  const colorState: string = marked ? 'bg-red-400' : 'bg-blue-400'
  const State = `${colorState} w-auto text-center py-8 border-2`
  return (
    <div className={State}>
      <button
        className="align-middle"
        type="button"
        onClick={() => dispatch(mark(markMass))}
        disabled={markMass.col === 2 && markMass.row === 2}
      >
        {massProps.num}
      </button>
    </div>
  )
}
