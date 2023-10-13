export interface CoinInfoType {
  [x: string]: any;
  id: string;
  image: {
    large: string;
    small: string;
    thumb: string;
  };
  name: string;
  description: {
    en: string;
  };
  market_cap_rank: number;


  market_data: {
    current_price: {
      usd: number;
      inr: number;
    }
    market_cap: {
      usd: number;
      inr: number;
    }
  }
}
