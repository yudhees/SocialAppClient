import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LoginBtn from '../LoginBtn';
import { Outlet } from 'react-router';
import { Container } from '@mui/material';

export default function Main() {
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Social App
          </Typography>
          <LoginBtn />
        </Toolbar>
      </AppBar>
    </Box>
    <Container sx={{ marginTop:'40px',padding:'20px' }}>
        <Outlet/>
     </Container>
    </>
  );
}