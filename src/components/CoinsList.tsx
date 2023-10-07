import { CoinList } from '@/config/api'
import { CryptoContext } from '@/context/CryptoContext'
import { CoinType } from '@/type/CoinType'
import { TextField, Typography, Container, TableContainer, Table, TableHead, LinearProgress, TableRow, TableCell, TableBody } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'

const CoinsList = () => {
  const { currency } = useContext(CryptoContext)
  const [coins, setCoins] = useState<CoinType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')

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
  
  
  // console.log('coins:', coins);
  

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

                return (
                  <TableRow key={row.id}>
                   {row}
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
