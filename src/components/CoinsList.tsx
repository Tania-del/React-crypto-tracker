/* eslint-disable @next/next/no-img-element */
'use client'
import { CoinList } from '@/config/api'
import { CryptoContext } from '@/context/CryptoContext'
import { CoinType } from '@/type/CoinType'
import { TextField, Typography, Container, TableContainer, Table, TableHead, LinearProgress, TableRow, TableCell, TableBody, colors } from '@mui/material'
import axios from 'axios'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'


const CoinsList = () => {
  const { currency } = useContext(CryptoContext)
  const [coins, setCoins] = useState<CoinType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const router = useRouter()
  const { symbol } = useContext(CryptoContext)

  const fetchCoins = async () => {
      setLoading(true)
    const { data } = await axios.get(CoinList(currency))
    
    setCoins(data)
    setLoading(false)
    }

  useEffect(() => {
    fetchCoins() 
    console.log(coins);
    
    }, [currency])
  
  const handleSearch = () => {
    return coins.filter((coin) => coin.name.toLowerCase().includes(search) ||
      coin.symbol.toLowerCase().includes(search))
  }

  

  return (
      <Container sx={{ textAlign: 'center'}}>
      <Typography variant='h4' sx={{ fontFamily: 'var(--montserrat)', margin: '15px'}}>
          Cryptocurrency Prices by Market Cap
        </Typography>  
        
        <TextField
          label='Search For a Crypto Currency..'
          variant='outlined'
          sx={{ marginBottom: '20px', width: '100%' }}
          onChange={(e) => setSearch(e.target.value)}
        />

      <TableContainer>
        {loading ?
          (<LinearProgress sx={{ backgroundColor: 'gold'}} />)
          :
          (<Table>
            <TableHead sx={{ backgroundColor: 'rgb(238, 188, 29)'}}>
              <TableRow>
                {['Coin', 'Price', '24h Change', 'Market Cup'].map((head) => (
                  <TableCell sx={{ color: 'black', fontWeight: '700', fontFamily: 'var(--montserrat)'}}

                    key={head}
                  >
                    {head}
                  </TableCell>
               ))}
              </TableRow>
            </TableHead>
            
            <TableBody>
              {handleSearch().map((row) => {
                console.log(row);
                
                return (
                  <TableRow
                    onClick={() => router.push(`/coins/${row.id}`)}
                    key={row.name}
                  >
                    <TableCell
                      component="th"
                      scope='row'
                      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                    >
                      <img src={row.image} alt={row.name} className='mb-[10px] max-h-[50px]' />
                      
                      <div style={{ display: 'flex', flexDirection: 'column'}}>
                        <span style={{ textTransform: 'uppercase', fontSize: '22px'}}>{row.symbol}</span>
                        <span style={{ color: "darkgrey"}}>{row.name}</span>

                      </div>
                    </TableCell>
                    
                    <TableCell sx={{ textAlign: 'right'}}>
                      {symbol}{' '}
                      {row.current_price.toLocaleString()}
                    </TableCell>

                    <TableCell sx={{ textAlign: 'right' }}
                 className={clsx('font-medium', (row.price_change_percentage_24h > 0) ? 'text-green-500' : 'text-rose-600')} 
                   >
                                {row.price_change_percentage_24h > 0 && "+"}{`${row.price_change_percentage_24h.toFixed(2)}%`}
                    </TableCell>

                    <TableCell sx={{ textAlign: 'right'}}>
                      {symbol}{' '}
                      {row.market_cap.toLocaleString()}
                    </TableCell>
                      </TableRow>
                    )
                  })}
            </TableBody>
        </Table>)}
      </TableContainer>
    </Container>
  )
}

export default CoinsList;
