const DateGenerator = (initialDate = null) => {
    let date = typeof initialDate === Date ? initialDate : new Date();
    let intervalSize = Math.ceil(Math.random() * 48) + 24;

    const getNextDate = () => {
        date = new Date(date.getTime() + (3600000 * intervalSize));

        return date
    }

    return {
        getNextDate
    }
}

export default DateGenerator;