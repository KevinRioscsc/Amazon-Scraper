const express = require('express')
const request = require('request-promise')

const app = express()
const PORT = process.env.PORT || 3000


const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.use(express.json()) //alow our app to parse JSON input

app.get('/', (req, res) => {
    res.send('Welcome to Amazon Scraper API')
})

//GET product Details

app.get('/products/:productId', async(req, res) => {
    const {productId} = req.params
    const {api_key} = req.query //everybody can enter their own api key on the query

    try{
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`)
        res.json(JSON.parse(response))
    }catch(error){
        res.json(error)
    }
})

//GET product Reviews

app.get('/products/:productId/reviews', async(req, res) => {
    const {productId} = req.params
    const {api_key} = req.query 

    try{
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`)
        res.json(JSON.parse(response))
    }catch(error){
        res.json(error)
    }
})

//GET product Offers

app.get('/products/:productId/offers', async(req, res) => {
    const {productId} = req.params
    const {api_key} = req.query 

    try{
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)
        res.json(JSON.parse(response))
    }catch(error){
        res.json(error)
    }
})

//GET search results

app.get('/search/:searchQuery', async(req, res) => {
    const {searchQuery} = req.params
    const {api_key} = req.query 

    try{
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`)
        res.json(JSON.parse(response))
    }catch(error){
        res.json(error)
    }
})
app.listen(PORT, () => {
    console.log('running')
})