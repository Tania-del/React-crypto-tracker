/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { TrendingCoins } from "../../config/api";
import { CryptoContext } from "@/context/CryptoContext";
import AliceCarousel from "react-alice-carousel";
import Link from "next/link";
import { CoinType } from "@/type/CoinType";
import clsx from "clsx";
import { styled } from "@mui/material";

const CarouselWrapper = styled("div")(() => ({
  height: "50%",
  display: "flex",
  alignItems: "center",
}));

const CarouselItem = styled(Link)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
  textTransform: "uppercase",
  color: "white",
}));

const Carousel = () => {
  const { currency, symbol } = useContext(CryptoContext);
  const [trending, setTrending] = useState([]);

  const fetchTrendingCoins = useCallback(async () => {
    const { data } = await axios.get(TrendingCoins(currency));

    setTrending(data);
  }, [currency]) 

  useEffect(() => {
    fetchTrendingCoins();
  }, [fetchTrendingCoins]);

  const responsive = {
    0: {
      items: 2,
    },

    512: {
      items: 4,
    },
  };

  const items = trending.map((coin: CoinType) => {
    const profit = coin.price_change_percentage_24h;
    const isPlus = profit > 0;

    return (
      <CarouselItem href={`coins/${coin?.id}`} key={coin.id}>
        <img
          src={coin?.image}
          alt={coin?.name}
          className="h-[80px] mb-[10px]"
        />
        <span className="font-roboto">
          {coin.symbol}
          &nbsp;
          <span
            className={clsx(
              "font-medium",
              isPlus ? "text-green-500" : "text-rose-600"
            )}
          >
            {profit > 0 && "+"}
            {`${profit.toFixed(2)}%`}
          </span>
        </span>

        <span className="text-base font-roboto font-medium text-[22px]">
          {symbol}
          &nbsp;
          {coin.current_price.toLocaleString()}
        </span>
      </CarouselItem>
    );
  });

  return (
    <CarouselWrapper>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        items={items}
        disableButtonsControls
      />
    </CarouselWrapper>
  );
};

export default Carousel;
