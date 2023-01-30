import axios, { AxiosHeaders, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

export class RequestClient {

    url: string;
    headers: AxiosHeaders
    requestValues: Map<string, string>

    constructor(url: string) {
        this.headers = new AxiosHeaders();
        this.url = url;
        this.requestValues = new Map();
    }

    AddHeader(key: string, value: string) {
        if (this.headers.has(key)) {
            this.headers[key] = value;
            return;
        }

        this.headers.set(key, value);
    }

    FormatHeaders() {
        this.headers = new AxiosHeaders();
    }

    AddRequestValue(key: string, value: string) {
        if (this.requestValues.has(key)) {
            this.requestValues[key] = value;
            return;
        }

        this.requestValues.set(key, value);
    }

    FormatRequestValues() {
        this.requestValues = new Map();
    }

    async Get<T>() {

        const config: AxiosRequestConfig = {
            headers: this.headers
        }

        let url = this.url;

        if (this.requestValues.size > 0) {
            let values: string[] = []

            this.requestValues.forEach((value, key) => {
                values.push(`${key}=${value}`);
            })

            url += `?${values.join('&')}`;
        }

        return axios.get(url, config).then((response: AxiosResponse<T, any>) => {
            const { data, status, statusText } = response
            const res = new ResponseValue<T>(false);
            res.data = data
            res.status = status
            res.statusText = statusText
            return res
        }).catch((err: AxiosError<{error: string}>) => {
            const { message } = err
            const res = new ResponseValue<T>(true);
            res.errorMessage = message
            return res
        });
        
    }

}

class ResponseValue<T> {
    data: T
    status: number
    statusText: string
    isError: boolean
    errorMessage: string

    constructor(isError: boolean) {
        this.isError = isError
    }
}
