export interface CoinInfoType {
    id: string,
    image: {
        large: string,
        small: string,
        thumb: string,
    },
    name: string,
    description: {
        en: string,
    }
    market_cap_rank: number,
    market_data: {
        current_price: number,
    }
}