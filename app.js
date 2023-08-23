const { API_KEY } = require('./API_KEY.js')
const NewsAPI = require('newsapi')
const newsapi = new NewsAPI(API_KEY)
const express = require('express')
const app = express()
const keyword = 'IT'
const newsData = []

let port = 8080

app.get('/', (req, res) => {
  res.send('Welcome')
})

app.get('/getNewsData', (req, res) => {
  res.send(newsData)
})

app.listen(port, (req, res) => {
  console.log('http://localhost:8080')

  newsapi.v2.everything({
    q: keyword,
    language: 'ko'
  }).then(response => {
    newsData.push(response)
    console.log(response.totalResults)

    response.articles.forEach((news, index) => {
      
    })
    // for(let i = 0; i < response.articles; i++) {
    //   console.log(response.articles[i].author)
    //   newsData.push({
    //     id: i,
    //     author: response.articles[i].author,
    //     title: response.articles[i].title,
    //     description: response.articles[i].description,
    //     url: response.articles[i].url,
    //     urlToImage: response.articles[i].urlToImage,
    //     publishedAt: response.articles[i].publishedAt,
    //   })
    // }
  }).catch(error => {
    console.error(error)
  })
})