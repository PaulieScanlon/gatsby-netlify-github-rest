import React, { FunctionComponent, useEffect, useState } from 'react'
import fetch from 'isomorphic-fetch'
import { graphql, useStaticQuery } from 'gatsby'
import { Container, Grid, Flex, Box, Spinner, Heading, Text, Divider } from 'theme-ui'

import { format, parseISO } from 'date-fns'

import { MrCharty } from '../components/mr-charty'
import { MrLegend } from '../components/mr-legend/mr-legend'

const IndexPage: FunctionComponent = () => {
  const serverQuery = useStaticQuery(graphql`
    query DataQuery {
      date {
        value
      }
      allLanguages {
        edges {
          node {
            language
            count
            percent
            remainder
            circumference
          }
        }
      }
    }
  `)
  const serverData = serverQuery.allLanguages.edges.map((data) => {
    const { node } = data
    return {
      ...node,
    }
  })

  const [clientData, setClientData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    fetch(`${process.cwd()}${process.env.GATSBY_API_URL}/get-all-user-repos`, {
      mode: 'no-cors',
    })
      .then((response) => response.json())
      .then((response) => {
        setIsLoading(false)
        setClientData(response.allLanguages)
      })
      .catch((error) => {
        setIsLoading(false)
        setHasError(error.toString())
      })
  }, [])

  return (
    <Container>
      <Grid
        sx={{
          mt: 4,
          mb: 2,
        }}
      >
        <Heading as="h1">gatsby-netlify-github-rest</Heading>
        <Divider />
      </Grid>
      <Grid
        sx={{
          gridTemplateColumns: ['1fr', '1fr 1fr'],
        }}
      >
        <Box>
          <Grid>
            <Heading as="h2">Server Data</Heading>
            <Box sx={{ minHeight: 70 }}>
              <Text sx={{ mb: 2 }}>
                Data requested using GraphQL from sourceNodes created in gatsby-node at build time
              </Text>
              <Text sx={{ fontSize: 0, fontWeight: 'bold', color: 'secondary', p: 2, backgroundColor: 'text' }}>
                Last Updated: {`${format(parseISO(serverQuery.date.value), 'd MMM y')}`}
              </Text>
            </Box>
            <Box sx={{ maxWidth: 300, mx: 'auto' }}>
              <MrCharty data={serverData} />
              <MrLegend data={serverData} />
            </Box>
            <Box as="pre" variant="styles.pre" sx={{ mb: 4 }}>
              {JSON.stringify(serverData, null, 2)}
            </Box>
          </Grid>
        </Box>
        <Box>
          <Grid>
            <Heading as="h2">Client Data</Heading>
            <Box sx={{ minHeight: 70 }}>
              <Text sx={{ mb: 2 }}>Data requested using fetch from serverless function in useEffect at run time</Text>
              <Text sx={{ fontSize: 0, fontWeight: 'bold', color: 'secondary', p: 2, backgroundColor: 'text' }}>
                Last Updated: {`${format(new Date(), 'd MMM y')}`}
              </Text>
            </Box>
            {hasError ? <Text sx={{ textAlign: 'center', color: 'darkRed' }}>{hasError}</Text> : null}
            {isLoading ? (
              <Flex sx={{ justifyContent: 'center' }}>
                <Spinner />
              </Flex>
            ) : null}
            {!hasError && !isLoading && clientData ? (
              <>
                <Box sx={{ maxWidth: 300, mx: 'auto' }}>
                  <MrCharty data={clientData} />
                  <MrLegend data={clientData} />
                </Box>
                <Box as="pre" variant="styles.pre" sx={{ mb: 4 }}>
                  {JSON.stringify(clientData, null, 2)}
                </Box>
              </>
            ) : null}
          </Grid>
        </Box>
      </Grid>
    </Container>
  )
}

export default IndexPage
