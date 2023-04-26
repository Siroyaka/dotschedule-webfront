export interface StreamingScheduleSlug {
    year: string
    month: string
    day: string
}

export const SlugCheck = (year: string, month: string, day: string): {result: boolean, year: number, month: number, day: number} => {
    const errorResult = {
        result: false,
        year: 0,
        month: 0,
        day: 0
    }
    if (year.length !== 4) {
        return errorResult
    }

    if (month.length > 2) {
        return errorResult
    }

    if (day.length > 2) {
        return errorResult
    }
    
    const yearNum = parseInt(year)
    const monthNum = parseInt(month)
    const dayNum = parseInt(day)
    if (Number.isNaN(yearNum) || Number.isNaN(monthNum) || Number.isNaN(dayNum)) {
        return errorResult
    }

    if (yearNum < 2015) {
        return errorResult
    }

    if (monthNum === 0 || monthNum > 12) {
        return errorResult
    }

    if (dayNum === 0 || dayNum > 31) {
        return errorResult
    }

    return {
        result: true,
        year: yearNum,
        month: monthNum,
        day: dayNum
    }
}
