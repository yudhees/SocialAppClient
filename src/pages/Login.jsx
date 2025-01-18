import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import AuthLayout from "../components/layouts/AuthLayout";
import axios from "axios";
import Authstore, { setToken, setUser } from '../stores/authStore'
function Login() {
  return (
    <AuthLayout type={'Sign In'}>
      <LoginForm/>
    </AuthLayout>
  );
}
function LoginForm() {
  const [form,setform]=useState({
    email:'',password:'',
  });
  const navigate = useNavigate();
  const submit=async(e)=>{
    e.preventDefault()
    try {
       const res=await axios.post('/login',form)
       const data=res.data
       Authstore.dispatch(setToken(data.token))
       Authstore.dispatch(setUser(data.userData))
       console.log(Authstore.getState().user)
       navigate('/')
    } catch (error) {
      const message=error?.response?.data?.message
      console.error(error)
      if(message)alert(message)
    }
  }
  const updateForm=(e)=>{
    const {name,value}=e.target
    setform({
      ...form,
      [name]:value
    })
  }
  return (
    <Box component={'form'} onSubmit={submit}>
      <Box component={'div'} >
        <TextField variant="standard" label="Email" color={'primary'} required type="email" sx={{ 'width': '100%', marginTop: '15px' }}
         onChangeCapture={updateForm} name="email"/>
      </Box>
      <Box component={'div'} >
        <TextField variant="standard" label="Password" required color={'primary'} type="password" 
        sx={{ 'width': '100%', marginTop: '15px' }} onChange={updateForm} name="password"/>
      </Box>
      <Box component={'div'} sx={{ marginTop:"15px", }} display='flex' justifyContent={'space-between'} alignItems={'center'}>
         <Typography variant="p" fontWeight={'400'}>Don't have an account? <NavLink to='/register' style={{ fontWeight:'400' }}>Sign up</NavLink> </Typography>
         <Button variant="contained" color="primary" type="submit">Sign In</Button>
      </Box>
    </Box>
  )
}
export default Login;
