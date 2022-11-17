const express = require("express");
const cors = require('cors');

const {PORT} = require('./globals');
const {getWCMatches} = require('./getters');
const {getNextDatesInString} = require('./helpers');

const app = express();

app.use(cors())

app.get("/", async(_, response) => {
    const responseData = {
        success: true, 
        error: false,
        matches: []
    }
    
    for(let i = 0; i < 4; i++){        
        const stringDate = getNextDatesInString(i);
        
        const matches = await getWCMatches("https://tipster.bg/machove/data", "#ngames a.game[href*='svetovno-parvenstvo']", stringDate);
        const haveResults = matches.length > 0 ? true : false;
        
        responseData.haveResults = haveResults;
        matches.forEach(match => {
            responseData.matches.push(match);
        })
    }

    response.json(responseData);
})

app.listen(PORT, () => console.log(`Server running an port ${PORT}`));