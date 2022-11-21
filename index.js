// set our port var to 8000 for localhost
const PORT = process.env.PORT || 8000

// Set up packages as variables so they will function
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

// set the express function call to a var
const app = express()

contentArray = []

app.get('/eshot', (req,res) => {

    let pageUrl = 'https://www.imagineholidays.co.uk/cambodia-vietnam-discovery-all-inclusive-mekong-river-cruise-beach-stay'
    let paragraphPath = '.sppb-addon-wrapper div:first'

    
    axios.get(pageUrl)
    .then((response) => {
        const html = response.data
        const $ = cheerio.load(html)

        const newPageUrl = pageUrl + '?fsource=esicuk'

        contentArray.push({
            newPageUrl
        })


        $('.header__main-number a', html).each(function() {
            const number = $(this).text()
            const numberLink = $(this).attr('href')
            const newNumberLink = numberLink.replace(/\s/g, '');
            contentArray.push({
                number,
                newNumberLink
            })
        })


        $('.sppb-section h1.sppb-addon-title:first', html).each(function() {
            const title = $(this).text()
            contentArray.push({
                title
            })
        })

        // Fix This!
        $(paragraphPath, html).each(function() {
            const paragraphs = $(this).children('p').text()
         

            contentArray.push({
                paragraphs
            })
            
        })

        
        res.json(contentArray)
    })
})



// Tester listen to see nodemon is working
app.listen(PORT, () => console.log('server running on PORT ' + PORT))