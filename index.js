const express = require('express')
const nunjucks = require('nunjucks')

const app = express()
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: false }))

const ageMiddleware = (req, res, next) => {
  if (!req.query.age || req.query.age <= 0 || isNaN(req.query.age)) {
    return res.redirect('/')
  }
  return next()
}

app.get('/', (req, res) => {
  return res.render('home')
})

app.post('/check', (req, res) => {
  const age = parseInt(req.body.age)
  if (age >= 18) {
    return res.redirect(`/major/?age=${age}`)
  } else {
    return res.redirect(`/minor/?age=${age}`)
  }
})
app.get('/major', ageMiddleware, (req, res) => {
  const { age } = req.query
  return res.render('major', { age: age })
})
app.get('/minor', ageMiddleware, (req, res) => {
  const { age } = req.query
  return res.render('minor', { age: age })
})

app.listen(3000)
