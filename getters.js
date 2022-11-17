const cheerio = require("cheerio");
const axios = require("axios");


function getWCMatches(url, condition, date){
    return axios.get(`${url}-${date}`).then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const matches = $(condition);

        const matchesList = [];

        matches.each(function () {
            const home = $(this).find('.home').text();
            const away = $(this).find('.away').text();
            const score = $(this).find('.score').text();
            const isPlaying = $(this).find('.score.play').text() ? true : false;
            let finished = false;

            if(isPlaying === false){
                finished = true;
                if(score === '-'){
                    finished = false;
                }
            }

            const response = {
                home,
                away,
                score,
                date,
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