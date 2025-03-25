type EXCH_SEG = 'NSE' | 'BSE' | 'NSF';

interface TradingSymbol {
    name: string;
    token: string;
    exch_seg: EXCH_SEG;
    symbol: string;
    expiry?: string;
    strike?: string;
    lotsize?: string;
    instrumenttype?: string;
    tick_size?: string;
}

interface StockExchange {
    exchange: string;
    tradingSymbols: TradingSymbol[];
}


