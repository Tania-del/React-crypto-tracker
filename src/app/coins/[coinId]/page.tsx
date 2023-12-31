/* eslint-disable @next/next/no-img-element */
'use client'
import Header from '@/components/Header'
import { SingleCoin } from '@/config/api'
import { LinearProgress,  Typography as MUITypography,  styled } from '@mui/material';
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { CoinInfoType } from '@/type/CoinInfoType';
import { CryptoContext } from '@/context/CryptoContext';
import CoinInfo from '@/components/CoinInfo';


const Div = styled('div')(({ theme }) => ({
   display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
}))
const Sidebar = styled('div')(({ theme }) => ({
   width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
}))

const Typography = styled(MUITypography)(() => ({
   fontWeight: "800",
      marginBottom: 20,
  fontFamily: 'var(--montserrat)',
      
}))

const Description = styled(Typography)(() => ({
     width: "100%",
      fontFamily: 'var(--montserrat)',
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
  textAlign: "justify",
      fontWeight: 500,
}))

const MarketData = styled('div')(({ theme }) => ({
 alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
        flexDirection: 'column',
        alignItems: 'center',
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "start",
      },
     [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
}))

const CoinPage = () => {
  const { coinId } = useParams();
  const [coin, setCoin] = useState<CoinInfoType>();
  const { currency, symbol } = useContext(CryptoContext)
  
  
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(coinId));

    setCoin(data)
  }

  useEffect(() => {
    fetchCoin()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const currentPrice = coin?.market_data.current_price[currency.toLowerCase() as keyof typeof coin.market_data.current_price]
  const marketCap = coin?.market_data.market_cap[currency.toLowerCase() as keyof typeof coin.market_data.market_cap]
 
  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  return (
    <>
      <div style={{ backgroundColor: '#14161a'}}>
      <Header />
      <Div>
        <Sidebar>
          <img
            src={coin.image.large}
            width={200}
            height={200}
            alt={coin.name}
            style={{ marginBottom: '20px'}}
          />

          <Typography variant='h3'> 
            {coin?.name}
          </Typography>
          <Description variant='subtitle1'>
            {coin?.description.en.split(". ")[0]}.
          </Description>
          <MarketData>
            <span style={{ display: 'flex'}}>
              <Typography variant='h5'>
                Rank:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant='h5' sx={{ fontFamily: 'var(--montserrat)'}}>
                {coin?.market_cap_rank}
              </Typography>
            </span>

            <span style={{ display: 'flex' }}>
              <Typography variant='h5'>
                Current Price:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant='h5' sx={{ fontFamily: 'var(--montserrat)'}}>
                {symbol}{' '}
                {currentPrice?.toLocaleString()}
              </Typography>
            </span>
            
            <span style={{ display: 'flex' }}>
              <Typography variant='h5'>
                Market Cap:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant='h5' sx={{ fontFamily: 'var(--montserrat)'}}>
                {symbol}{' '}
                {marketCap?.toLocaleString().slice(0, -6)}
              </Typography>
            </span>
          </MarketData>
        </Sidebar>
        <CoinInfo coin={coin} />
      </Div>
      </div>
    </>
  )
}

export default CoinPage;
