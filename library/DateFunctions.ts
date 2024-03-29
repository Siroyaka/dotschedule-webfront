export interface IDate {
    year: number,
    month: number,
    day: number,
    weekDay?: number
    otherMonth?: boolean
}

export type FCalDate = Readonly<Required<IDate>>;

export type MonthCalendar = ReturnType<typeof getMonthCalendar>;

class MonthData {
    readonly firstDayIndex: number;
    readonly firstDayWeekDay: number;
    readonly monthDates: IDate[];
    readonly lastDay: number;

    constructor(year: number, month: number) {
        this.lastDay = new Date(year, month, 0).getDate();
        const beforeMonthLastDay = new Date(year, month - 1, 0).getDate();
        this.firstDayWeekDay = new Date(year, month - 1, 1).getDay();
        this.firstDayIndex = beforeMonthLastDay;
        const a = beforeMonthLastDay + this.lastDay - 3;
        this.monthDates = Array(a);
        const lastMonth = month - 1 > 0 ? month - 1 : 12;
        const nextMonth = month + 1 < 13 ? month + 1 : 1;

        let i = 0;
        for (i; i < beforeMonthLastDay; i++) {
            this.monthDates[i] = { year: lastMonth === 12 ? year - 1 : year, month: lastMonth, day:i + 1, otherMonth: true };
        }
        for (let u = 0; u < this.lastDay; u++) {
            this.monthDates[beforeMonthLastDay + u] = { year: year, month: month, day: u + 1, otherMonth: false };
        }
        for (let u = 0; u < 6; u++) {
            this.monthDates[beforeMonthLastDay + this.lastDay + u] = { year: nextMonth === 1 ? year + 1 : year, month: nextMonth, day: u + 1, otherMonth: true };
        }
    }

    firstDay() {
        return this.monthDates[this.firstDayIndex];
    }

    makeCalendar() {
        const d = 35 - (this.firstDayWeekDay + this.lastDay);
        const weekNumber = d > 6 ? 4 : d > -1 ? 5 : 6;
        let calendar: FCalDate[][] = Array(weekNumber);
        const startindex = (this.firstDayIndex - this.firstDayWeekDay);
        for (let i = 0; i < calendar.length; i++) {
            let week: FCalDate[] = Array(7);
            for (let k = 0; k < week.length; k++) {
                const index = i * 7 + k + startindex;
                week[k] = {...this.monthDates[index], weekDay:k, otherMonth: this.monthDates[index].otherMonth ?? true};
            }
            calendar[i] = week;
        }
        return calendar;
    }

}

export const dateToIDate = (d: Date): IDate => {
    return {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate(),
        weekDay: d.getDay()
    }
}

export const iDateToString = (d: IDate, sepalater?: string, zeroPadding: boolean = false) => {
    if (sepalater === undefined) {
        sepalater = '/';
    }
    if (zeroPadding) {
        const yStr = ("0000" + d.year).slice(-4);
        const mStr = ("00" + d.month).slice(-2);
        const dStr = ("00" + d.day).slice(-2);
        return `${yStr}${sepalater}${mStr}${sepalater}${dStr}`;
    }
    return `${d.year}${sepalater}${d.month}${sepalater}${d.day}`;
}

export const iDateToDate = (d: IDate): Date => {
    return new Date(d.year, d.month - 1, d.day);
}

export const getMonthCalendar = (year: number, month: number): FCalDate[][] => {
    const monthData = new MonthData(year, month);
    return monthData.makeCalendar();
}

export const toDateStringYMD = (d: Date) => {
    const yStr = "0000" + d.getFullYear()
    const mStr = "00" + d.getMonth() + 1
    const dStr = "00" + d.getDate()
    return `${yStr.slice(-4)}-${mStr.slice(-2)}-${dStr.slice(-2)}`
}

export const addDate = (d: Date, year: number = 0, month: number = 0, day: number = 0, hour: number = 0, minute: number = 0, second: number = 0) => {
    const newD = new Date(d);
    newD.setFullYear(newD.getFullYear() + year);
    newD.setMonth(newD.getMonth() + month);
    newD.setDate(newD.getDate() + day);
    newD.setHours(newD.getHours() + hour);
    newD.setMinutes(newD.getMinutes() + minute);
    newD.setSeconds(newD.getSeconds() + second);
    return newD;
}

export const getUtcNow = () => {
    const n = new Date((new Date()).toUTCString());

    return n;
}

export const getJTCNow = (): Date => {
    const n = new Date();
    return new Date(n.getTime() + (n.getTimezoneOffset() + (9 * 60)) * 60 * 1000);
}

export const getJstTime = (date: Date) => {

    // utc日時を取得
    const utc = getUtc(date);

    // utc日時をJstに変換
    const jst = new Date(utc);
    jst.setHours(jst.getHours() + 9);

    return {
        year: jst.getFullYear(),
        month: jst.getMonth() + 1,
        day: jst.getDate(),
        hour: jst.getHours(),
        min: jst.getMinutes(),
        sec: jst.getSeconds()
    }
}

export const getUtc = (date: Date) => {
    // new dateで取得される日時がタイムゾーンはローカルなのに時間だけUTCになっているため、offsetを0にする。
    // 正しいタイムゾーンと時間が設定されるようになったら上のoffsetを使用すること
    //const offset = date.getTimezoneOffset();
    const offset = 0;

    const utc = new Date(date);
    utc.setMinutes(date.getMinutes() + offset);

    return utc;
}