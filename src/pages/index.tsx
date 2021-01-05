import { graphql, useStaticQuery } from 'gatsby'
import React, { FunctionComponent } from 'react'
import { Container, Box } from 'theme-ui'

const IndexPage: FunctionComponent = () => {
  const data = useStaticQuery(graphql`
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

  return (
    <Container>
      <Box>index page</Box>
      <pre>{JSON.stringify(data, null, 1)}</pre>
    </Container>
  )
}

export default IndexPage
