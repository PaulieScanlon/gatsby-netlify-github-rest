/** @jsx jsx */
import { FunctionComponent } from 'react'
import { jsx } from 'theme-ui'
import { rotate } from '@theme-ui/color'

const RADIUS = '15.91549430918954'
const VIEW_BOX = 42
const FIRST_OFFSET = 25

type IStatistic = {
  /** The "programming" language */
  language: string
  /** The occourances of the language */
  count: number
  /** Calculated percentage of occourances for the language */
  percent: number
  /** The remainder (100 - percent) */
  remainder: number
  /** The circumference of the circle  */
  circumference: number
}

interface IMrChartyProps {
  /** Data array that drives the chart */
  data: IStatistic[]
}
export const MrCharty: FunctionComponent<IMrChartyProps> = ({ data }) => {
  return (
    <svg id="donut-chart" width="100%" height="100%" viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`}>
      <title>Doughnut Chart of GitHub repository languages</title>
      {data.map((segment: IStatistic, index: number) => {
        const { language, percent, remainder, circumference } = segment
        return (
          <circle
            key={index}
            id={language}
            role="presentation"
            sx={{
              stroke: rotate('primary', (90 / data.length) * index),
              fill: 'transparent',
            }}
            cx={`${VIEW_BOX / 2}`}
            cy={`${VIEW_BOX / 2}`}
            r={RADIUS}
            strokeWidth="6"
            strokeDasharray={`${percent} ${remainder}`}
            strokeDashoffset={`${
              circumference - data.slice(0, index).reduce((a, b) => a + b.percent, 0) + FIRST_OFFSET
            }`}
          />
        )
      })}
    </svg>
  )
}
