import stockExchange from "../models/symbols.model.js";
import connectToAtlas from "../services/mongo.service.js";
import { fetchHistoricalDataBulk, fetchSymbols } from "./utils/index.js";

async function run() {
    const connected = await connectToAtlas()
    if (!connected) {
        return;
    }

    const exchangeSeg: EXCH_SEG = 'NSE'

    // const dbExists = await checkDatabaseExists("root");
    // if (dbExists) { }

    const exchange = await stockExchange.findOne({ exchange: exchangeSeg });
    if (exchange && exchange.tradingSymbols.length > 0) {
        console.log(`EXCHANGE: "${exchangeSeg}" IS POPULATED`);
        return;
    }

    else { // add the nse exchange trading symbols to the database
        let exchangeSymbols: TradingSymbol[] = [];
        try {
            exchangeSymbols = await fetchSymbols(exchangeSeg);

            /* for (let i = 0; i < 20; i++) {
                console.log(nseSyms[i]);
            } */
            const exch = new stockExchange({
                exchange: "NSE",
                tradingSymbols: exchangeSymbols,
            })
            await exch.save();

            console.log(`Total ${exchangeSeg} symbols: ${exchangeSymbols.length} added to db`);
        }
        catch (err) {
            console.log(err);
        }
    }


    // get the trading symbols if not in the database.

    /* // HISTORICAL DATA

    try {
        //const companies = nseSyms.slice(0, 21).map(obj => ({ name: obj.name, token: obj.token }));
        const data = await fetchHistoricalDataBulk(sym, [{
            name: nseSyms.at(0)!.name,
            token: '20302',
        }]);

        console.log(data);
    }
    catch (err) {
        console.log(err);
    } */

}

run();


