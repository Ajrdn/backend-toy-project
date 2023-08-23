const { API_KEY } = require('./API_KEY.js')
const NewsAPI = require('newsapi')
const newsapi = new NewsAPI(API_KEY)
const express = require('express')
const app = express()
const keyword = 'IT'
const newsData = []

let port = 8080

app.get('/', (req, res) => {
  res.send('Welcome to News Data API')
})

app.get('/getNewsData', (req, res) => {
  res.send(newsData)
})

app.get('/getNewsData/byId/:id', (req, res) => {
  res.send(newsData[req.params.id])
})

app.get('/getNewsData/byTitle/:title', (req, res) => {
  const title = req.params.title
  const newsList = []

  newsData.forEach(news => {
    if(news.title.includes(title)) {
      newsList.push(news)
    }
  })

  res.send(newsList)
})

app.listen(port, (req, res) => {
  console.log('http://localhost:8080')

  newsapi.v2.everything({
    q: keyword,
    language: 'ko'
  }).then(response => {
    response.articles.forEach((news, index) => {
      newsData.push({
        id: index,
        author: news.author,
        title: news.title,
        description: news.description,
        url: news.url,
        urlToImage: news.urlToImage,
        publishedAt: news.publishedAt,
      })
    })
  }).catch(error => {
    console.error(error)
  })
})