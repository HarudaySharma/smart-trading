import stockExchange from "../../models/symbols.model.js";
import fetchSymbols from "./fetchSymbols.js";

interface PARAMS {
    exchangeSymbol: EXCH_SEG;
}

async function addSymbolsToExchange({ exchangeSymbol }: PARAMS) {
    try {
        let tradingSymbols: TradingSymbol[] = []
        console.log(`FETCHING "${exchangeSymbol}" SYMBOLS...`)
        tradingSymbols = await fetchSymbols(exchangeSymbol)

        const exc = await stockExchange.findOne({ exchange: exchangeSymbol })

        if (!exc) {
            throw new Error(`EXCHANGE: "${exchangeSymbol}" NOT FOUND IN DB`)
        }

        console.log(`SAVING SYMBOLS OF EXCHANGE: "${exchangeSymbol}"`)

        exc.tradingSymbols.splice(0, exc.tradingSymbols.length);

        tradingSymbols.forEach(symbol => {
            exc.tradingSymbols.push(exc.tradingSymbols.create({
                token: symbol.token,
                name: symbol.name,
                exch_seg: symbol.exch_seg,
                symbol: symbol.symbol,
                expiry: symbol.expiry,
                strike: symbol.strike,
                lotsize: symbol.lotsize,
                instrumenttype: symbol.instrumenttype,
                tick_size: symbol.tick_size,
            }));
        });

        await exc.save();

        console.log(`SYMBOLS OF "${exchangeSymbol}" ADDED SUCCESSFULLY`)
        console.log(`Total "${exchangeSymbol}" Symbols Added To DB: ${tradingSymbols.length}`)
    }
    catch (err) {
        console.log(err)
        console.log(`****FAILED FETCHING "${exchangeSymbol}" SYMBOLS****`)
        return false
    }

    return true
}

export default addSymbolsToExchange;
