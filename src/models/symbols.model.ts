import { model, Schema } from "mongoose";

const StockExchangeSchema = new Schema({
    exchange: {
        type: String,
        required: true,
    },
    tradingSymbols: [{
        token: {
            type: String,
            required: true,
        },
        symbol: {
            type: String
        },
        name: {
            type: String,
            required: true,
        },
        expiry: {
            type: String,
        },
        strike: {
            type: String,
        },
        lotsize: {
            type: String,
        },
        instrumenttype: {
            type: String,
        },
        exch_seg: {
            type: String,
            required: true,
        },
        tick_size: {
            type: String,
        },
    }]
})

const stockExchange = model('Stock-Exchange', StockExchangeSchema)

export default stockExchange;
