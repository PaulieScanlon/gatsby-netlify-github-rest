import React, { FunctionComponent } from 'react'
import { Container, Grid, Box, Heading, Text, Divider } from 'theme-ui'

import { MrCharty } from '../components/mr-charty'

const TestPage: FunctionComponent = () => {
  const chartData = [
    {
      language: 'TypeScript',
      count: 0,
      percent: 30,
      remainder: 70,
      circumference: 100,
    },
    {
      language: 'JavaScript',
      count: 0,
      percent: 20,
      remainder: 80,
      circumference: 100,
    },
    {
      language: 'HTML',
      count: 0,
      percent: 40,
      remainder: 60,
      circumference: 100,
    },
    { language: 'CSS', count: 0, percent: 10, remainder: 90, circumference: 100 },
  ]

  return (
    <Container>
      <Heading as="h1">gatsby-netlify-github-rest</Heading>
      <Divider />
      <Grid
        sx={{
          gridTemplateColumns: ['1fr', '1fr 1fr'],
        }}
      >
        <Grid>
          <Heading as="h2">Test Data</Heading>
          <Text>Test MrCharty with static data, "count" is not really required FYI</Text>
          <Box as="pre" variant="styles.pre">
            {JSON.stringify(chartData, null, 2)}
          </Box>
          <Box sx={{ maxWidth: 300 }}>
            <MrCharty data={chartData} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default TestPage
