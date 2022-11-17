function getNextDatesInString(i){
    const date = new Date();
    date.setDate(date.getDate() + i)
    
    const stringDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    return stringDate;
}

module.exports = {
    getNextDatesInString
}