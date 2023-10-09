'use client'
import Banner from "@/components/Banner/Banner";
import CoinsList from "@/components/CoinsList";
import Header from "@/components/Header";
import CryptoContext from "@/context/CryptoContext";



export default function Home() {
  return (
    <div>
      <CryptoContext>
      <Header />
        <Banner />
        <CoinsList />
      </CryptoContext>
      </div>
   
  )
}
