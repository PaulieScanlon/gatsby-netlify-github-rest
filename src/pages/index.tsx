import React, { FunctionComponent, useEffect, useState } from 'react'
import fetch from 'isomorphic-fetch'
import { graphql, useStaticQuery } from 'gatsby'
import { Container, Grid, Flex, Box, Spinner, Heading, Text, Divider } from 'theme-ui'
import { MrCharty } from '../components/mr-charty'

const IndexPage: FunctionComponent = () => {
  const serverData = useStaticQuery(graphql`
    query MyQuery {
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
  `).allLanguages.edges.map((data) => {
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
            <Text>Data requested using GraphQL from sourceNodes created in gatsby-node at build time</Text>
            <Box as="pre" variant="styles.pre">
              {JSON.stringify(serverData, null, 2)}
            </Box>
            <Box sx={{ maxWidth: 300 }}>
              <MrCharty data={serverData} />
            </Box>
          </Grid>
        </Box>
        <Box>
          <Grid>
            <Heading as="h2">Client Data</Heading>
            <Text>Data requested using fetch from serverless function in useEffect at run time</Text>
            {hasError ? <Text sx={{ textAlign: 'center', color: 'darkRed' }}>{hasError}</Text> : null}
            {isLoading ? (
              <Flex sx={{ justifyContent: 'center' }}>
                <Spinner />
              </Flex>
            ) : null}
            {!hasError && !isLoading && clientData ? (
              <>
                <Box as="pre" variant="styles.pre">
                  {JSON.stringify(clientData, null, 2)}
                </Box>
                <Box sx={{ maxWidth: 300 }}>
                  <MrCharty data={clientData} />
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
