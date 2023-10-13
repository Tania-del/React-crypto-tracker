'use client'
import { Dispatch, FC, SetStateAction, createContext, useEffect, useState } from 'react'


interface ICryptoProvider {
    children: React.ReactNode
}

interface ICryptoContext {
    setCurrency: Dispatch<SetStateAction<string>>
    currency: string;
    symbol: string;
}

export const CryptoContext= createContext<ICryptoContext>({ 'setCurrency': () => {}, 'currency': 'USD', 'symbol': '$'})

const CryptoProvider: FC<ICryptoProvider> = ({ children }) => {
    const [currency, setCurrency] = useState<string>('USD')
    const [symbol, setSymbol] = useState('$')
    
    useEffect(() => {
        if (currency === 'INR') {
            setSymbol('₹')
        } else if (currency === 'USD') {
            setSymbol('$')
        }
    }, [currency])
    
  return (
      <CryptoContext.Provider value={{ setCurrency, currency, symbol }}>{children}</CryptoContext.Provider>
  )
}

export default CryptoProvider
