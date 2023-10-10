'use client'
import Header from '@/components/Header'
import { SingleCoin } from '@/config/api';
import { CoinType } from '@/type/CoinType';
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const CoinPage = () => {
  const { coinId } = useParams();
  const [coin, setCoin] = useState<CoinType>();
  
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(coinId));

    setCoin(data)
  }

  useEffect(() => {
    fetchCoin()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  
  return (
    <Header  />
  )
}

export default CoinPage
