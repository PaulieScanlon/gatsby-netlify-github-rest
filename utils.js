const { octokit } = require('./client')

const USER_NAME = 'PaulieScanlon'

module.exports = {
  getAllUserRepos: octokit
    .request('GET /users/{username}/repos', {
      username: USER_NAME,
      type: 'owner',
      per_page: 100,
    })
    .then((response) =>
      response.data
        .filter((repos) => !repos.fork)
        .filter((repos) => repos.language !== null)
        .reduce((items, item) => {
          const isUnique = items.find((index) => index.language === item.language)

          if (isUnique) {
            isUnique.count += 1
          } else {
            items.push({
              language: item.language,
              count: 1,
            })
          }
          return items
        }, []),
    ),
}
