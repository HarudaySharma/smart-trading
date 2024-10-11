import stockExchange from "../models/symbols.model.js";
import connectToAtlas from "../services/mongo.service.js";
import addExchangeToDB from "./utils/addExchangeToDB.js";
import addSymbolsToExchange from "./utils/addSymbolsToExchange.js";

async function run() {
    const connected = await connectToAtlas()
    if (!connected) {
        process.abort();
    }

    const exchSymbol: EXCH_SEG = 'NSE'

    try {
        const exchange = await stockExchange.findOne({ exchange: exchSymbol });
        if (!exchange) {
            console.log(`EXCHANGE: "${exchSymbol}" NOT FOUND IN DB`);
            await addExchangeToDB({
                exchangeSymbol: exchSymbol,
                addSymbols: true
            });
        }
        else if (exchange.tradingSymbols.length === 0) {
            console.log(`EXCHANGE: "${exchSymbol}" FOUND IN DB`);
            console.log(`EXCHANGE: "${exchSymbol}" DOESN'T HAVE SYMBOLS`);
            await addSymbolsToExchange({
                exchangeSymbol: exchSymbol
            })
        }
    }
    catch (err) {
        console.log(err)
        console.log(`ERROR GETTING EXCHANGE: "${exchSymbol} FROM DB`);
    }
}

run();
