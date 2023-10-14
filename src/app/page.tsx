'use client'
import Banner from "@/components/Banner/Banner";
import CoinsList from "@/components/CoinsList";
import Header from "@/components/Header";
import { Box, styled } from "@mui/material";




export default function Home() {
  return (
    <Box sx={{
       backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
    }} >
      <Header />
        <Banner />
        <CoinsList />
      </Box>
   
  )
}
