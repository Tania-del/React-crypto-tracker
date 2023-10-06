/* eslint-disable @next/next/no-img-element */
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { TrendingCoins } from '../../config/api'
import { CryptoContext } from '@/context/CryptoContext'
import AliceCarousel from 'react-alice-carousel'
import Link from 'next/link'
import { CoinType } from '@/type/CoinType'
import clsx from 'clsx'
import { makeStyles } from '@mui/styles'



     const useStyles = makeStyles((theme) => ({
    carousel: {
      height: "50%",
      display: "flex",
         alignItems: "center",
        
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",
    },
  }));


const Carousel = () => {
     const classes = useStyles()
  const { currency, symbol } = useContext(CryptoContext)
  const [trending, setTrending] = useState([])


  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
  
    setTrending(data)
  }

  useEffect(() => {
    fetchTrendingCoins()
  }, [currency])

  const responsive = {
          0: {
            items: 2,
          },
          
        512: {
        items: 4,
          }
  }

  const items = trending.map((coin: CoinType) => {
    console.log('coin: ', coin);

    const profit = coin.price_change_percentage_24h;
    const isPlus = profit > 0;
   
    return (
      <Link href={`/${coin?.id}`} key={coin.id}  className={classes.carouselItem}>
        <img
          src={coin?.image}
          alt={coin?.name}
          className='h-[80px] mb-[10px]'
        />
        <span className='font-roboto'>
          {coin.symbol}
          &nbsp;
          <span className={clsx('font-medium', isPlus ? 'text-green-500' : 'text-rose-600')} >
            {profit > 0 && "+"}{`${profit.toFixed(2)}%`}
          </span>
        </span>

        <span className='text-base font-roboto font-medium text-[22px]'>
          {symbol}
          &nbsp;
          {coin.current_price.toLocaleString()}
        </span>
      </Link>
      )
  })

  
  return (
    <div className={classes.carousel}>
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
    </div>
  )
}

export default Carousel;
