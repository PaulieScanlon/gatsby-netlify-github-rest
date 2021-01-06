import React, { FunctionComponent, useEffect, useState } from 'react'
import fetch from 'isomorphic-fetch'
import { graphql, useStaticQuery } from 'gatsby'
import { Container, Grid, Flex, Box, Spinner, Heading, Text, Divider, Link } from 'theme-ui'

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
        setTimeout(() => {
          setIsLoading(false)
        }, 2000)
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
        <Heading as="h1">
          <Link
            sx={{ color: 'secondary' }}
            href="https://github.com/PaulieScanlon/gatsby-netlify-github-rest"
            target="_blank"
            rel="noopener"
          >
            gatsby-netlify-github-rest
          </Link>
        </Heading>
        <Text>
          <Link
            sx={{ color: 'secondary' }}
            href="https://paulie.dev/posts/2021/01/gatsby-netliyf-github-rest/"
            target="_blank"
            rel="noopener"
          >
            Use Netlify Functions and the GitHub REST API to add Data Visualization to your Gatsby blog
          </Link>
        </Text>
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
            <Text sx={{ fontSize: 0, fontWeight: 'bold', color: 'tertiary', p: 2, backgroundColor: 'text' }}>
              Last Updated: {`${format(parseISO(serverQuery.date.value), 'PP - @p')}`}
            </Text>
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
            <Text>Data requested using fetch from a Netlify Serverless Function in React.useEffect at run time</Text>
            <Text sx={{ fontSize: 0, fontWeight: 'bold', color: 'tertiary', p: 2, backgroundColor: 'text' }}>
              Last Updated: {`${format(new Date(), 'PP - @p')}`}
            </Text>

            {hasError ? <Text sx={{ textAlign: 'center', color: 'darkRed' }}>{hasError}</Text> : null}
            {isLoading ? (
              <Flex sx={{ alignItems: 'center', justifyContent: 'center', height: 300 }}>
                <Spinner variant="styles.spinner" />
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
