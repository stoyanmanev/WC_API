function getNextDatesInString(i){
    const date = new Date();
    date.setDate(date.getDate() + i)
    
    const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
    const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
    
    const stringDate = `${day}-${month}-${date.getFullYear()}`;

    return stringDate;
}

module.exports = {
    getNextDatesInString
}