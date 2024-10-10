
export async function fetchSymbols(exchange: EXCH_SEG) {
    const api_url = "https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json"
    try {
        const res = await fetch(api_url)
        console.log('fetching all the symbols...')
        const data = await res.json() as TradingSymbol[]

        return data.filter(obj => obj.exch_seg === exchange && obj.symbol.toLowerCase().endsWith("eq"))

    }
    catch (err) {
        console.error(err)
    }
    return []
}


/* Interval Constants
Interval	Description
ONE_MINUTE	1 Minute
THREE_MINUTE	3 Minute
FIVE_MINUTE	5 Minute
TEN_MINUTE	10 Minute
FIFTEEN_MINUTE	15 Minute
THIRTY_MINUTE	30 Minute
ONE_HOUR	1 Hour
ONE_DAY	1 Day
*/
export async function fetchHistoricalData(exchange: EXCH_SEG, company: Pick<TradingSymbol, "token" | "name">) {
    const api_url = "https://apiconnect.angelone.in/rest/secure/angelbroking/historical/v1/getCandleData"
    console.log({ company })
    const API_KEY = "lVoYyi7R"
    const SECRET_KEY = "a0f0ed5c-8f57-44cb-8f91-5e4b4971eb3b"
    try {
        const res = await fetch(api_url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-UserType': 'USER',
                'X-SourceID': 'WEB',
                'X-PrivateKey': SECRET_KEY,
            },
            body: JSON.stringify({
                "exchange": exchange,
                "symboltoken": company.token,
                "interval": "ONE_DAY",
                "fromdate": "2023-01-01 9:00",//yyyy-MM-dd hh:mm
                "todate": "2024-01-01 4:00"
            })

        })
        const d = await res.json()
        console.log(d);
        return {
            name: company.name,
            data: d
        }
    }
    catch (err) {
        console.error(err)
    }
}

export async function fetchHistoricalDataBulk(exchange: EXCH_SEG, companies: Pick<TradingSymbol, "token" | "name">[]) {
    const data: any[] = []
    try {
        companies.forEach(async (company) => {
            data.push(await fetchHistoricalData(exchange, company))
        })
        return data
    }
    catch (err) {
        console.log(err)
    }
    return []
}
