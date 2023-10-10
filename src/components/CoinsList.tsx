/* eslint-disable @next/next/no-img-element */
'use client'
import { CoinList } from '@/config/api'
import { CryptoContext } from '@/context/CryptoContext'
import useCustomSearchParams from '@/hooks/useCustomSearchParams'
// import { useCustomSearchParams } from '@/hooks/useCustomSearchParams'
import { CoinType } from '@/type/CoinType'
import { TextField, Typography, Container, TableContainer, Table, TableHead, LinearProgress, TableRow, TableCell, TableBody, Pagination } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import clsx from 'clsx'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'


 const useStyles = makeStyles({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold",
      },
    },
 });
  

const CoinsList = () => {
  const { currency } = useContext(CryptoContext)
  const [coins, setCoins] = useState<CoinType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const { symbol } = useContext(CryptoContext)
  const router = useRouter()
  // const searchParams = useSearchParams()
  const classes = useStyles()
   const params = useCustomSearchParams();
    console.log('paramsCustom: ', params.toString());
     
  
  const fetchCoins = async () => {
      setLoading(true)
    const { data } = await axios.get(CoinList(currency))
    
    setCoins(data)
    setLoading(false)
    }

  useEffect(() => {
    fetchCoins()     
    }, [currency])
  
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)

    if (!value) {
      params.delete('text')      
    } else {
      params.set('text', value)
    }

    const queryString = params.toString()
    
    router.push(queryString ? `?${queryString}` : '/')
  }
  
  const handleSearch = () => {
    return coins.filter((coin) => coin.name.toLowerCase().includes(search) ||
      coin.symbol.toLowerCase().includes(search))
  }



  useEffect(() => {    
    const value = params.get('text') 

    setSearch(value || '')
    
  }, [])

  return (
      <Container sx={{ textAlign: 'center'}}>
      <Typography variant='h4' sx={{ fontFamily: 'var(--montserrat)', margin: '15px'}}>
          Cryptocurrency Prices by Market Cap
        </Typography>  
        
      <TextField
          name=''
          value={search}
          label='Search For a Crypto Currency..'
          variant='outlined'
          sx={{ marginBottom: '20px', width: '100%' }}
          onChange={handleInputChange}
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
                  align={head === "Coin" ? undefined : "right"}
                  >
                    {head}
                  </TableCell>
               ))}
              </TableRow>
            </TableHead>
            
            <TableBody>
              {handleSearch().map((row) => { 
                const profit = row.price_change_percentage_24h;
                const isPlus = profit > 0;

                return (
                  <TableRow
                    onClick={() => router.push(`coins/${row.id}`)}
                    key={row.name}
                    className={classes.row}

                    >
                    <TableCell
                      component="th"
                      scope='row'
                      sx={{ display: 'flex', gap: '15px'}}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column'}}>
                      <img src={row.image} alt={row.name} className='mb-[10px] max-h-[50px]' />
                      
                        <span style={{ textTransform: 'uppercase', fontSize: '22px'}}>{row.symbol}</span>
                        <span style={{ color: "darkgrey"}}>{row.name}</span>

                      </div>
                    </TableCell>
                    
                    <TableCell sx={{ textAlign: 'right'}}>
                      {symbol}{' '}
                      {row.current_price.toLocaleString()}
                    </TableCell>

                    <TableCell sx={{ textAlign: 'right' }}
                 className={clsx('font-medium', (isPlus) ? 'text-green-500' : 'text-rose-600')} 
                   >
                                {isPlus && "+"}{`${profit.toFixed(2)}%`}
                    </TableCell>

                    <TableCell sx={{ textAlign: 'right'}}>
                      {symbol}{' '}
                      {row.market_cap.toLocaleString().slice(0, -6)}M
                    </TableCell>
                      </TableRow>
                    )
                  })}
            </TableBody>
        </Table>)}
      </TableContainer>

      <Pagination
        sx={{ padding: '20px', width: '100%', display: 'flex', justifyContent: 'center' }}
        count={(handleSearch()?.length / 10).toFixed(0)}
      />
    </Container>
  )
}

export default CoinsList;
