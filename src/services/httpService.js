




export class HTTPService {

    _api = ''

    constructor() {
    }

    setAPI(api) {
        this._api = api;
        return this
    }


    GET(jsonParam) {
        let params = jsonParam ? convertJsonToPrameter(jsonParam) : ''
        this._api = this._api + params

        console.log('GET:', this._api);

        return fetch(this._api, {
            method: 'GET',
        }).then(res => res.json()).catch((e) => {
            console.log("GET err ", e);
        })

    }
}

const convertJsonToPrameter = (jsonData) => {
    return '?' + new URLSearchParams(jsonData).toString();
}

