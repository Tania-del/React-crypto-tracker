'use client'
import Banner from "@/components/Banner/Banner";
import CoinsList from "@/components/CoinsList";
import Header from "@/components/Header";
import { makeStyles } from "@mui/styles";



const useStyles = makeStyles(() => ({
  Home: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

export default function Home() {
  const classes = useStyles()
  return (
    <div className={classes.Home}>
      <Header />
        <Banner />
        <CoinsList />
      </div>
   
  )
}
