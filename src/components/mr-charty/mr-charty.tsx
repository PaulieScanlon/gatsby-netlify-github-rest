/** @jsx jsx */
import { FunctionComponent } from 'react'
import { jsx, Box, Text, Link } from 'theme-ui'
import { rotate } from '@theme-ui/color'

import { IStatistic } from '../../types'

const RADIUS = '15.91549430918954'
const VIEW_BOX = 42
const FIRST_OFFSET = 25

interface IMrChartyProps {
  /** Data array that drives the chart */
  data: IStatistic[]
}
export const MrCharty: FunctionComponent<IMrChartyProps> = ({ data }) => {
  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          top: '50%',
          left: '50%',
        }}
      >
        <Link href="https://github.com/PaulieScanlon" target="_blank" rel="noopener">
          <Text sx={{ textAlign: 'center', fontWeight: 'bold' }}>@PaulieScanlon</Text>
        </Link>
        <Text sx={{ textAlign: 'center', fontSize: 0, fontWeight: 'bold' }}>Language Data</Text>
      </Box>
      <svg id="donut-chart" width="100%" height="100%" viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`}>
        <title>Doughnut Chart of GitHub user languages</title>
        {data.map((statistic: IStatistic, index: number) => {
          const { language, percent, remainder, circumference } = statistic
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
    </Box>
  )
}
