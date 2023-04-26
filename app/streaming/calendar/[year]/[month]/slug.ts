export interface Slug {
    c_year: string
    c_month: string
    year?: string
    month?: string
    day?: string
}

export const SlugCheck = (year: string, month: string): {result: boolean, year: number, month: number} => {
    const errorResult = {
        result: false,
        year: 0,
        month: 0
    }
    if (year.length !== 4) {
        return errorResult
    }

    if (month.length > 2) {
        return errorResult
    }

    const yearNum = parseInt(year)
    const monthNum = parseInt(month)
    if (Number.isNaN(yearNum) || Number.isNaN(monthNum)) {
        return errorResult
    }

    if (yearNum < 2015) {
        return errorResult
    }

    if (monthNum === 0 || monthNum > 12) {
        return errorResult
    }

    return {
        result: true,
        year: yearNum,
        month: monthNum
    }
}
