import React, { useState } from 'react'
import AuthLayout from '../components/layouts/AuthLayout'
import { Box, Button, TextField,Typography } from '@mui/material';
import { NavLink, useNavigate } from 'react-router';
import axios from 'axios';
import Authstore, { setToken, setUser } from '../stores/authStore';

export default function Register() {
    return (
        <AuthLayout type='Sign Up'>
             <RegisterForm/>
        </AuthLayout>
    )
}
function RegisterForm() {
    const [form,setform]=useState({
        email:'',password:'',name:''
    });
    const navigate=useNavigate()
    const submit=async(e)=>{
      e.preventDefault()
      console.log(form);
      try {
          const res=await axios.post('/register',form)
          const data=res.data
          Authstore.dispatch(setToken(data.token))
          Authstore.dispatch(setUser(data.userData))
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
                <TextField variant="standard" label="Name" color={'primary'} required type="text" sx={{ 'width': '100%', marginTop: '15px' }} onChangeCapture={updateForm} name="name" />
            </Box>
            <Box component={'div'} >
                <TextField variant="standard" label="Email" color={'primary'} required type="email" sx={{ 'width': '100%', marginTop: '15px' }} onChangeCapture={updateForm} name="email" />
            </Box>
            <Box component={'div'} >
                <TextField variant="standard" label="Password" required color={'primary'} type="password"
                    sx={{ 'width': '100%', marginTop: '15px' }} onChange={updateForm} name="password" />
            </Box>
            <Box component={'div'} sx={{ marginTop: "15px", }} display='flex' justifyContent={'space-between'} alignItems={'center'}>
                <Typography variant="p" fontWeight={'400'}>Already have an account? <NavLink to='/login' style={{ fontWeight: '400' }}>Sign in</NavLink> </Typography>
                <Button variant="contained" color="primary" type="submit">Sign Up</Button>
            </Box>
        </Box>
    )
}