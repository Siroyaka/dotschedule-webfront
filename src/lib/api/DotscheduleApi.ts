import { RequestClient } from './Client'
import { APIConfig } from './Const'

export class DayScheduleRequest {
    client: RequestClient

    constructor() {
        this.client = new RequestClient(APIConfig.url_day_schedule)

        const header1 = APIConfig.header1.split(":")
        const header1Key = header1[0]
        const header1Value = header1[1]

        this.client.AddHeader(header1Key, header1Value)

        const header2 = APIConfig.header2.split(":")
        const header2Key = header2[0]
        const header2Value = header2[1]

        this.client.AddHeader(header2Key, header2Value)
    }

    async Get(year: number, month: number, day: number) {
        const date = `${('000' + year).slice(-4)}-${('0' + month).slice(-2)}-${('0' + day).slice(-2)}`;
        this.client.AddRequestValue("date", date)

        const res = await this.client.Get<DotscheduleAPIResponse<DaySchedule[]>>();

        this.client.FormatRequestValues();

        return res;
    }
}

export class DotscheduleAPIResponse<T> {
    error_message: string
    length: number
    status: string
    response_data: T
}

export class DaySchedule {
    VideoLink: string
    VideoStatus: number
    VideoTitle: string
    Thumbnail: string
    StreamerName: string
    StreamerID: string
    StartDate: string
    Duration: number
    StreamerIcon: string
    Participants: {Id: string, Name: string, Icon: string}[]
}

export class MonthDataRequest {
    client: RequestClient

    constructor() {
        this.client = new RequestClient(APIConfig.url_month)

        const header1 = APIConfig.header1.split(":")
        const header1Key = header1[0]
        const header1Value = header1[1]

        this.client.AddHeader(header1Key, header1Value)

        const header2 = APIConfig.header2.split(":")
        const header2Key = header2[0]
        const header2Value = header2[1]

        this.client.AddHeader(header2Key, header2Value)
    }

    async Get(year: number, month: number) {
        const queryValue = `${('000' + year).slice(-4)}-${('0' + month).slice(-2)}`;
        this.client.AddRequestValue("month", queryValue)

        const res = await this.client.Get<DotscheduleAPIResponse<DayStreamerData[]>>();

        this.client.FormatRequestValues();

        return res;
    }

}

export class DayStreamerData {
    Date: string
    MemberData: {Id: string, Name: string}[]
    Icons: string[]
}
