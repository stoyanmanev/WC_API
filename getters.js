const cheerio = require("cheerio");
const axios = require("axios");


function getWCMatches(url, condition, date){

    return axios.get(`${url}-${date}`).then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const matches = $(condition);

        const matchesList = [];

        matches.each(function () {
            const match = {
                home: $(this).find('.home').text(),
                away: $(this).find('.away').text()
            }
            const home = $(this).find('.home').text();
            const away = $(this).find('.away').text();
            const score = $(this).find('.score').text();
            const isPlaying = $(this).find('.score.play').text() ? true : false;
            const minutes = isPlaying === true ? $(this).find('.status.play').text().trim() : null;
            const startHour = $(this).find('.time').text();
            let finished = false;

            if(isPlaying === false){
                finished = true;
                if(score === '-'){
                    finished = false;
                }
            }

            // If a match contains panalties, API returns two star symbols before the winner.
            if(home.includes('*')){
                match.home = match.home.replaceAll('*', '')
            }else if(away.includes('*')){
                match.away = match.away.replaceAll('*', '')
            }

            const response = {
                home: match.home,
                away: match.away,
                score,
                date,
                startHour,
                minutes,
                isPlaying,
                finished
            };

            matchesList.push(response);
        });

        return matchesList;

    }).catch(err => {
        const error = {
            error: true,
            success: false,
            message: err.message || 'Fetch failed.'
        }
        return error;
    })
}

module.exports = {
    getWCMatches
}