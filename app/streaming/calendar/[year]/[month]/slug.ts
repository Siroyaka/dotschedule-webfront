export interface Slug {
    year?: string
    month?: string
}

export const SlugCheck = (slug?: Slug): {result: boolean, year: number, month: number} => {
    const errorResult = {
        result: false,
        year: 0,
        month: 0
    }
    if (slug === undefined) {
        return errorResult;
    }
    const year = slug.year ?? "";
    const month = slug.month ?? "";
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
