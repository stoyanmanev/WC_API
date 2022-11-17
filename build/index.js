var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));

const port_1 = require("./globals");
const get_wc_matches_1 = require("./globals");
const get_next_dates_in_string = require("./globals");

const app = (0, express_1.default)();
app.use(0, cors_1.default)

app.get("/", async(_, response) => {
    const responseData = {
        success: true, 
        error: false,
        matches: []
    }
    
    for(let i = 0; i < 4; i++){        
        const stringDate = get_next_dates_in_string(i);
        
        const matches = await get_wc_matches_1("https://tipster.bg/machove/data", "#ngames a.game[href*='svetovno-parvenstvo']", stringDate);
        const haveResults = matches.length > 0 ? true : false;
        
        responseData.haveResults = haveResults;
        matches.forEach(match => {
            responseData.matches.push(match);
        })
    }

    response.json(responseData);
})

app.listen(port_1, () => console.log(`Server running an port ${port_1}`));