type EXCH_SEG = 'NSE' | 'BSE' | 'NSF';

interface TradingSymbol {
    token: string
    symbol: string
    name: string
    expiry: string
    strike: string
    lotsize: string
    instrumenttype: string
    exch_seg: EXCH_SEG
    tick_size: string
}


