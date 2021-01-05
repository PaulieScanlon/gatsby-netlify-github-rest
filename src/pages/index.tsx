import React, { FunctionComponent, useEffect, useState } from 'react'
import fetch from 'isomorphic-fetch'
import { graphql, useStaticQuery } from 'gatsby'
import { Container, Grid, Flex, Box, Spinner, Heading, Text, Divider } from 'theme-ui'

const IndexPage: FunctionComponent = () => {
  const serverData = useStaticQuery(graphql`
    query MyQuery {
      allLanguages {
        edges {
          node {
            language
            count
            percent
          }
        }
      }
    }
  `)

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
        setClientData(response)
      })
      .catch((error) => {
        setIsLoading(false)
        setHasError(error.toString())
      })
  }, [])

  return (
    <Container>
      <Heading as="h1">gatsby-netlify-github-rest</Heading>
      <Divider />
      <Grid
        sx={{
          gridTemplateColumns: ['1fr', '1fr 1fr'],
        }}
      >
        <Box>
          <Heading as="h2">Server Data</Heading>
          <Text>Data requested using GraphQL from sourceNodes in gatsby-node at build time</Text>
          <pre>{JSON.stringify(serverData, null, 2)}</pre>
        </Box>
        <Box>
          <Heading as="h2">Client Data</Heading>
          <Text>Data requested using fetch from serverless function in useEffect at run time</Text>
          {hasError ? <Text sx={{ textAlign: 'center', color: 'darkRed' }}>{hasError}</Text> : null}
          {isLoading ? (
            <Flex sx={{ justifyContent: 'center' }}>
              <Spinner />
            </Flex>
          ) : null}
          {!hasError && !isLoading && clientData ? <pre>{JSON.stringify(clientData, null, 2)}</pre> : null}
        </Box>
      </Grid>
    </Container>
  )
}

export default IndexPage
