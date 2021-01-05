const { octokit } = require('./client')

const USER_NAME = 'PaulieScanlon'
const CIRCUMFERENCE = 100

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
        }, [])
        .map((item, index, array) => {
          const { count } = item
          const countTotal = array.reduce((a, b) => a + b.count, 0)
          const p = (count / countTotal) * 100
          const r = CIRCUMFERENCE - p
          const o = CIRCUMFERENCE - p
          return {
            ...item,
            percent: p,
            remainder: r,
            circumference: CIRCUMFERENCE,
          }
        })
        .sort((a, b) => b.percent - a.percent),
    ),
}
