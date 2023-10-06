import React from 'react'
import { Container, Typography as MUITypography, styled } from '@mui/material';
import Carousel from './Carousel'


const Banner = () => {
const Typography = styled(MUITypography)(
    ({ theme }) => `
    font-weight: 800;
    margin-bottom: 15;
    font-family: var(--montserrat);
    `
)
  
  return (
    <>
    <div>
          <div style={{background: 'url(./banner2.jpg)'}}>
          <Container sx={{ height: '400px', display: 'flex', flexDirection: 'column', paddingTop: '25px', justifyContent: 'space-around', textAlign: 'center' }}>
            <div>
        <Typography variant='h2' sx={{ marginBottom: '15px'}}> 
          Crypto Hunter
            </Typography>
            <Typography variant='subtitle2' sx={{ color: 'darkgrey', textTransform: 'capitalize', fontWeight: '300', marginBottom: '20px'}}>
              Get all the Info regarding your favorite Crypto Currency
            </Typography>
            </div>

            <Carousel  />
      </Container>
          </div>
      </div>
      </>
  )
}

export default Banner;
