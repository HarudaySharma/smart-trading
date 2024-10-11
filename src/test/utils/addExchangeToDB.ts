import stockExchange from "../../models/symbols.model.js"
import fetchSymbols from "./fetchSymbols.js"

interface PARAMS {
    exchangeSymbol: EXCH_SEG
    addSymbols?: boolean
}

async function addExchangeToDB({ exchangeSymbol, addSymbols }: PARAMS) {

    try {
        let tradingSymbols: TradingSymbol[] = []
        if (addSymbols) {
            console.log(`FETCHING "${exchangeSymbol}" SYMBOLS...`)
            tradingSymbols = await fetchSymbols(exchangeSymbol)
        }

        const exch = new stockExchange({
            exchange: exchangeSymbol,
            tradingSymbols,
        })

        try {
            console.log(`SAVING EXCHANGE: "${exchangeSymbol}" TO DB`)
            await exch.save()
        }
        catch (err) {
            console.log(`****FAILED SAVING "${exchangeSymbol}"****`)
            return false;
        }

        console.log(`EXCHANGE: "${exchangeSymbol}" ADDED TO DB`)
        console.log(`Total "${exchangeSymbol}" Symbols Added To DB: ${tradingSymbols.length}`)
    }
    catch (err) {
        console.log(err)
        console.log(`****FAILED FETCHING "${exchangeSymbol}" SYMBOLS****`)
        return false
    }

    return true
}

export default addExchangeToDB
