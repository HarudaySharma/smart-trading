async function fetchSymbols(exchange: EXCH_SEG) {
    const api_url = "https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json"
    try {
        const res = await fetch(api_url)
        //console.log('fetching all the symbols...')
        const data = await res.json() as TradingSymbol[]

        return data.filter(obj => obj.exch_seg === exchange && obj.symbol.toLowerCase().endsWith("eq"))
    }
    catch (err) {
        throw err;
    }
}

export default fetchSymbols
