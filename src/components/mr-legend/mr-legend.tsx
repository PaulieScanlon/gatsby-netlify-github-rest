import React, { FunctionComponent } from 'react'
import { Grid, Box, Text } from 'theme-ui'
import { rotate } from '@theme-ui/color'

import { IStatistic } from '../../types'

interface IMrLegendProps {
  /** Data array that drives the legend */
  data: IStatistic[]
}

export const MrLegend: FunctionComponent<IMrLegendProps> = ({ data }) => {
  return (
    <Grid
      sx={{
        rowGap: 2,
      }}
    >
      {data.map((statistic: IStatistic, index: number) => {
        const { language, percent } = statistic

        return (
          <Grid
            key={index}
            sx={{
              alignItems: 'center',
              gridTemplateColumns: '1fr auto',
            }}
          >
            <Grid
              sx={{
                alignItems: 'center',
                gap: 2,
                gridTemplateColumns: '12px auto',
              }}
            >
              <Box
                sx={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: rotate('primary', (90 / data.length) * index),
                  borderRadius: '100%',
                }}
              />
              <Text>{language}</Text>
            </Grid>
            <Text sx={{ fontWeight: 'bold' }}>{percent}</Text>
          </Grid>
        )
      })}
    </Grid>
  )
}
