'use client'
import { HistoricalChart } from '@/config/api';
import { CryptoContext } from '@/context/CryptoContext';
import { CoinInfoType } from '@/type/CoinInfoType'
import { CircularProgress, styled } from '@mui/material';
import axios from 'axios';
import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import SelectButton from './SelectButton';
import { chartDays } from '../config/data'

interface ICoinInfo {
  coin: CoinInfoType;
}

const Container = styled('div')(({ theme }) => ({
   width: '75%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      paddinTop: 0,
      padding: 20,
      marginTop: 0,
    }
}))

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinInfo: FC<ICoinInfo> = ({ coin }) => {
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState<number>(1)
  const { currency } = useContext(CryptoContext);
  
  const fetchHistoricData = useCallback(async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency))

    setHistoricData(data.prices);
  }, [coin.id, days, currency]) 

  useEffect(() => {
    fetchHistoricData()
  },[fetchHistoricData])
      
  
  return (
    <Container>
      {historicData.length === 0 ? (
        <CircularProgress
          sx={{ color: 'gold' }}
          size={250}
          thickness={1}
        />
      ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {   
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}

              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            
              <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
                lineHeight: '20px',
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
    </Container>
  )
}

export default CoinInfo
