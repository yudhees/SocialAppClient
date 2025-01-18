import { Card, CardContent, Grid2, Paper, Typography } from '@mui/material'
import React from 'react'

function AuthLayout({children,type}) {
  return (
    <Grid2
      container
      justifyContent={"center"}
      alignItems="center"
      display="flex"
      height="100vh"
    >
      <Grid2 size={4} >
        <Paper elevation={6} >
          <Card sx={{ width: "100%"}}>
            <CardContent >
              <Typography variant="div" display='flex' justifyContent={'center'} flexDirection={'column'} >
                <Typography variant="h6" fontWeight={'500'} sx={{ textAlign: 'center', marginBottom: '10px' }}>{type}</Typography>
                <Typography variant="p" fontWeight={'300'} sx={{ textAlign: 'center' }}>Welcome, Please {type} To Continue</Typography>
              </Typography>
              {children}
            </CardContent>
          </Card>
        </Paper>
      </Grid2>
    </Grid2>
  )
}

export default AuthLayout