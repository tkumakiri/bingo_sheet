import React, { useEffect } from 'react'
import Mass from '../mass/Mass'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { selectMass, MassState, pushInitMass } from '../mass/massSlice'

export type ColProps = {
  mode: number
}

export default function Col(props: ColProps) {
  const col = props
  // const massSelector = useAppSelector(selectMass)
  const massSelector = useAppSelector(selectMass).filter((mass) => mass.col === col.mode)
  return (
    <div>
      <div className="text-center">
        {massSelector.map((data, index) => (
          <div key={data.num}>
            <Mass col={data.col} row={data.row} num={data.num} />
          </div>
        ))}
      </div>
    </div>
  )
}
