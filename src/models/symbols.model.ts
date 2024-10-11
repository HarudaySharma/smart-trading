import { model, Schema } from "mongoose";

const StockExchangeSchema = new Schema({
    exchange: {
        type: String,
        enum: ['NSE', 'BSE', 'NSF'],
        required: true,
    },
    tradingSymbols: [{
        token: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        exch_seg: {
            type: String,
            enum: ['NSE', 'BSE', 'NSF'],
            required: true,
        },
        symbol: {
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
        tick_size: {
            type: String,
        },
    }]
})

const stockExchange = model('Stock-Exchange', StockExchangeSchema)

export default stockExchange;
