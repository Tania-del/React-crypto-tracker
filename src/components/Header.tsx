'use client'

import { AppBar, Toolbar, Container, Typography as MUITypography, Select, MenuItem, styled } from '@mui/material'

import React from 'react'


// const useStyles = makeStyles((theme) => ({
//     title: {
//         'flex': 1,
//         'font-weight': 800,
//         'cursor': 'pointer',
//         // fontFamily: 'var--(montserrat)',
//         'fontSize': '20px',
//  }
// }));



const Header = () => {
  
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
                    <Select defaultValue={'USD'} variant='outlined' sx={{ width: '100px', height: '40px', marginRight: '15px'}} >
                        <MenuItem value={'USD'}>USD</MenuItem>
                        <MenuItem value={'INR'}>INR</MenuItem>
                    </Select>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header;
