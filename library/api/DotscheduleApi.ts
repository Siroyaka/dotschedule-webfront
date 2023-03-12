import { RequestClient } from './FetchClient'
import { APIConfig } from './Const'
import { IDate, iDateToString } from 'library/DateFunctions'

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

    async Get(year: number, month: number, day: number, revalidate: number | false) {
        const date = `${('000' + year).slice(-4)}-${('0' + month).slice(-2)}-${('0' + day).slice(-2)}`;
        this.client.AddRequestValue("date", date);
        this.client.SetRevalidate(revalidate);

        const res = await this.client.Get<DotscheduleAPIResponse<DaySchedule[]>>();

        this.client.FormatRequestValues();

        return res;
    }
}

export class StreamingSearchRequest {
    client: RequestClient

    constructor() {
        this.client = new RequestClient(APIConfig.url_streaming_search)

        const header1 = APIConfig.header1.split(":")
        const header1Key = header1[0]
        const header1Value = header1[1]

        this.client.AddHeader(header1Key, header1Value)

        const header2 = APIConfig.header2.split(":")
        const header2Key = header2[0]
        const header2Value = header2[1]

        this.client.AddHeader(header2Key, header2Value)
    }

    async Get({members, from, to, page}: StreamingSearchRequestParams, revalidate: number | false = false) {
        if (members !== undefined && members.length > 0) {
            this.client.AddRequestValue("member", members?.join(','));
        }
        if (from !== undefined) {
            this.client.AddRequestValue("from", iDateToString(from, '-', true));
        }
        if (to !== undefined) {
            this.client.AddRequestValue("to", iDateToString(to, '-', true));
        }
        this.client.AddRequestValue("page", page?.toString() ?? '1');

        this.client.SetRevalidate(revalidate);

        const res = await this.client.Get<DotscheduleAPIResponse<DaySchedule[]>>();

        this.client.FormatRequestValues();

        return res;
    }
}

export interface StreamingSearchRequestParams {
    members?: string[],
    from?: IDate,
    to?: IDate,
    page: number,
}

export class DotscheduleAPIResponse<T> {
    error_message: string
    length: number
    status: string
    response_data: T
}

export class StreamerData {
    Name: string
    ID: string
    Icon: string
    Link: string
    Platform: string
}

export class StreamingData {
    ID: string
    URL: string
    Platform: string
    Status: number
    StartDate: string
    Duration: number
    Thumbnail: string
    Title: string
    Description: string
}

export class DaySchedule {
    StreamingData: StreamingData
    StreamerData: StreamerData
    Participants: StreamerData[]
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
    Participants: StreamerData[]
}
