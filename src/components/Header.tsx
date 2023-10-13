'use client'

import React, { useContext } from 'react'
import { AppBar, Toolbar, Container, Typography as MUITypography, Select, MenuItem, styled } from '@mui/material'
import { CryptoContext } from '@/context/CryptoContext'

const Header = () => {
    const { setCurrency, currency } = useContext(CryptoContext)
  
const Typography = styled(MUITypography)(
    ({ theme }) => `
     flex: 1;
        font-weight: 800;
        cursor: pointer;
        font-family: var(--montserrat);
        font-size: 1.25rem;
       
    `
)

    
    return (
        <AppBar sx={{ backgroundImage: 'none', backgroundColor: 'transparent' }} position='static' >
            <Container>
                <Toolbar>
                    <Typography variant='h1' color={'gold'} >
                        Crypto Hunter
                    </Typography>
                    <Select
                        value={currency}
                        variant='outlined'
                        sx={{ width: '100px', height: '40px', marginRight: '15px' }}
                        onChange={(e) => { console.log('hello', e.target.value); setCurrency(e.target.value) }}
                    >
                        <MenuItem value={'USD'}>USD</MenuItem>
                        <MenuItem value={'INR'}>INR</MenuItem>
                    </Select>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header;
