'use client'

import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material';
import React, { ReactNode } from 'react'

// export const theme = createTheme({
//   palette: {
     
//     primary: {
//       light: '#fff',
//       main: '#ffd700',
//       dark: '#14161a',
//       // contrastText: '#fff',
//     },
     
//     mode: 'dark',
    
//     // secondary: {
//     //   light: '#ff7961',
//     //   main: 'blue',
//     //   dark: '#ba000d',
//     //   contrastText: '#000',
//     // },
    
//   },
  
// });

export const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
   
    },
    mode: 'dark',
  }
})

const ThemeProvider = ({children }: {children: ReactNode}) => {
  return (
      <MUIThemeProvider theme={theme}>
          {children}
      </MUIThemeProvider>

  )
}

export default ThemeProvider
