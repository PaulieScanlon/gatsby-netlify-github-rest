const { getAllUserRepos } = require('../../utils')

exports.handler = async (event, context, callback) => {
  await getAllUserRepos.then((response) => {
    callback(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      statusCode: 200,
      body: JSON.stringify({
        allLanguages: response,
      }),
    })
  })
}
