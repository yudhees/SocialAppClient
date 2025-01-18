import { Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router";
import { setToken, setUser } from "../stores/authStore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import isEmpty from 'lodash/isEmpty'
function LoginBtn() {
  useEffect(()=>{
     healthCheck()
  },[])
  const dispatch=useDispatch()
  const healthCheck=async()=>{
    const token=localStorage.getItem('authToken')
    dispatch(setToken(token))
    if(token){
      try {
        const res=await axios.post('/getUser')
        dispatch(setUser(res.data.user))
      } catch (err) {
        logout()
        console.log(err)
      }
    }
  }
  const logout=()=>{
     dispatch(setUser({}))
     dispatch(setToken(''))
  }
  const user=useSelector((state)=>state.user)
  return (
    <>
    {!isEmpty(user)?<UserMenu user={user} logout={logout}/>:
    <NavLink to="/login">
      <Button color="warning" variant="contained">
        Login
      </Button>
      </NavLink>
    }
    </>
  );
}
function UserMenu({user,logout}){
  const [anchorEl,setAnchor]=useState(null)
  const open=Boolean(anchorEl)
  const handleClick=(e)=>{
      setAnchor(e.target)
  }
  const handleClose=()=>{
      setAnchor(null)  
  }
  return (
     <>
       <Button variant="contained" color="warning" startIcon={<AccountCircleIcon/>} onClick={handleClick}>
          {user.name}
       </Button>
       <Menu anchorEl={anchorEl} open={open} onClose={handleClose}
        anchorOrigin={{
          horizontal: 'right',
          vertical:'bottom'
        }}
       >
          <MenuItem onClick={logout}>Logout</MenuItem>         
       </Menu>
     </>
  )
}
export default LoginBtn;
