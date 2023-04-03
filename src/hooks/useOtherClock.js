import { useEffect, useState } from "react";
import { getLocalStorage, getRandomColor, getTime, getTimeDiff } from "../utils/utils";
import { keyOtherResidence } from "../App";

export const useCreateClock = async (formState) => {
    const { city, label } = formState
    const response = await fetch(`${import.meta.env.VITE_API_URL}/timezone/${city.timezone}`)
    const data = await response.json()
    if (data) {
        const timestampDate = new Date(data.datetime);
        const time = getTime(timestampDate, true, data.datetime)
        const timeDiff = getTimeDiff(time)
        const newOtherResidence = {
            timezone: city.timezone,
            city: city.value,
            description: label.value,
            time,
            timeDiff,
            abbr: data.abbreviation,
            color: getRandomColor()
        }
        return newOtherResidence
    }
}

let interval
export const useGetClocks = () => {
    const [otherResidences, setOtherResidences] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        let mounted = false
        setIsLoading(true)

        if (!mounted) {

            const setInitOtherResidence = async () => {

                const initOtherResidence = getLocalStorage(keyOtherResidence)
                if (!initOtherResidence) {
                    setIsLoading(false)
                    return
                }
                const otherResidences = JSON.parse(initOtherResidence)
                try {
                    const result = await Promise.all(otherResidences.map(async (item) => {
                        const response = await fetch(`http://worldtimeapi.org/api/timezone/${item.timezone}`)
                        const data = await response.json()

                        const timestampDate = new Date(data.datetime);
                        const time = getTime(timestampDate, true, data.datetime)
                        const timeDiff = getTimeDiff(time)
                        const newOtherResidence = {
                            timezone: item.timezone,
                            city: item.city,
                            description: item.description,
                            time,
                            timeDiff,
                            abbr: data.abbreviation,
                            color: item.color
                        }
                        return newOtherResidence
                    }));
                    setOtherResidences(result)
                    setIsLoading(false)
                } catch (error) {
                    console.log('error', error)
                    setIsLoading(false)
                }
            }

            interval = setInterval(() => {
                setInitOtherResidence()
            }, 1000);

        }

        return () => {
            clearInterval(interval)
            mounted = true
        }
    }, [])

    return {
        otherResidences,
        setOtherResidences,
        isLoading,
    }
}