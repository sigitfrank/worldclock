export const getRandomColor = () =>
    "rgb(" + Math.floor(Math.random() * 99).toString() + "," + Math.floor(Math.random() * 99).toString() + "," + Math.floor(Math.random() * 99).toString() + ")";

export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, value)
}

export const getLocalStorage = (key) => {
    return localStorage.getItem(key)
}

export const getTime = (datetime, withOffset = false, date) => {
    const timestampDate = new Date(datetime);
    if (withOffset) {
        const isMoreThanADay = timestampDate.getUTCHours() + getOffsetTime(date) > 23
        let hours = timestampDate.getUTCHours() + getOffsetTime(date);
        if (isMoreThanADay) hours = getOffsetTime(date) - (24 - timestampDate.getUTCHours())
        const minutes = timestampDate.getUTCMinutes();
        const seconds = timestampDate.getUTCSeconds();
        const time = getHoursMinute(Math.abs(hours), minutes, seconds)
        return time
    }
    const hours = timestampDate.getHours();
    const minutes = timestampDate.getMinutes();
    const seconds = timestampDate.getSeconds();
    const time = getHoursMinute(hours, minutes, seconds)
    return time
}

export const formattedResidence = ({ time, timeDiff, abbr, description, city, color = '#000', timezone }) => {
    const myResidenceFormatted = {
        timezone,
        city,
        description,
        time,
        timeDiff,
        abbr,
        color,
    }
    return myResidenceFormatted
}

export const getOffsetTime = (timestamp) => {
    const offsetSign = timestamp.includes('+') ? 1 : -1;
    const offsetString = timestamp.split(/[-+]/).pop().slice(0, 2);
    const offsetValue = parseInt(offsetString) * offsetSign;
    return offsetValue
}

export const getHoursMinute = (hours, minutes, seconds) => {
    let hms = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
    if (seconds) hms = `${hms}:${seconds.toString().padStart(2, "0")}`
    return hms
};

export const getTimeDiff = (time2) => {
    const currentTime = new Date();
    const localHours = currentTime.getHours()
    const localMinutes = currentTime.getMinutes();
    const localTime = getHoursMinute(localHours, localMinutes)

    const [hours1, minutes1] = localTime.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);

    const date1 = new Date();
    date1.setHours(hours1, minutes1, 0);

    const date2 = new Date();
    date2.setHours(hours2, minutes2, 0);

    const timeDiff = (date2 - date1) / (1000 * 60 * 60);
    const diffHours = Math.abs(timeDiff);

    const resultText = Math.round(timeDiff) < 0 ? "behind" : "ahead";

    return `${Math.round(diffHours)} hours ${resultText}`
}