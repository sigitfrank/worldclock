import { useEffect, useState } from 'react'
import { getTime } from '../utils/utils';
const { VITE_API_URL, VITE_CURRENT_CITY, VITE_CURRENT_RESIDENCE_TIMEZONE } = import.meta.env

let interval

export const useCurrentClock = () => {
    const [myResidence, setMyResidence] = useState(null);

    useEffect(() => {

        let mounted = false

        const getCurrentClock = async () => {
            try {
                const response = await fetch(`${VITE_API_URL}/timezone/${VITE_CURRENT_RESIDENCE_TIMEZONE}`)
                const data = await response.json()
                if (data) {
                    const time = getTime(data.datetime)
                    const myResidenceFormatted = {
                        timezone: VITE_CURRENT_RESIDENCE_TIMEZONE,
                        city: VITE_CURRENT_CITY,
                        description: '',
                        time,
                        timeDiff: '',
                        abbr: data.abbreviation,
                        color: '#000'
                    }
                    setMyResidence(myResidenceFormatted)
                }
            } catch (error) {
                console.log('error', error)
            }
        }

        if (!mounted) {
            interval = setInterval(() => {
                getCurrentClock()
            }, 1000);
        }
        return () => {
            mounted = true
            clearInterval(interval)
        }
    }, [])

    return {
        myResidence
    }
}
