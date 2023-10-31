export class RequestClient {

    url: string;
    headers: Map<string, string>
    requestValues: Map<string, string>
    revalidate: number | false

    constructor(url: string) {
        this.headers = new Map()
        this.url = url;
        this.requestValues = new Map();
        this.revalidate = false;
    }

    AddHeader(key: string, value: string) {
        if (this.headers.has(key)) {
            this.headers[key] = value;
            return;
        }

        this.headers.set(key, value);
    }

    SetRevalidate(revalidate: number | false) {
        this.revalidate = revalidate;
    }

    FormatHeaders() {
        this.headers = new Map()
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

    async Get<T>(): Promise<ResponseValue<T>> {
        let url = this.url;

        if (this.requestValues.size > 0) {
            let values: string[] = []

            this.requestValues.forEach((value, key) => {
                values.push(`${key}=${value}`);
            })

            url += `?${values.join('&')}`;
        }

        let header: {
            [K: string]: string;
        } = {};
        for (const [k, v] of this.headers) {
            header[k] = v;
        }

        return fetch(url, {
            headers: header,
            next: {
                revalidate: this.revalidate
            }
        }).then((response) => {
            return response.json()
        }).then((json) => {
            const res = new ResponseValue<T>(false);
            res.data = json
            return res
        }).catch((reason) => {
            const res = new ResponseValue<T>(true);
            console.log(reason);
            res.errorMessage = "catch error";
            return res;
        })

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
