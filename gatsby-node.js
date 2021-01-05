const { getAllUserRepos } = require('./utils')

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions

  await getAllUserRepos.then((response) => {
    // https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#sourceNodes
    response.map((item) => {
      createNode(
        Object.assign({}, item, {
          id: createNodeId(`${item.language}`),
          internal: {
            type: `languages`,
            mediaType: `text/html`,
            content: JSON.stringify(item),
            contentDigest: createContentDigest(item),
          },
        }),
      )
    })
  })

  createNode({
    id: 'date',
    value: new Date().toJSON(),
    internal: {
      type: 'date',
      mediaType: `text/htnl`,
      contentDigest: createContentDigest(''),
    },
  })
}
