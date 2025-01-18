import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { isEmpty } from 'lodash';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

function UploadPosts() {
    const [form,setForm]=useState({heading:'',content:""});
    const user=useSelector(state=>state.user)
    const submit=async(e)=>{
        e.preventDefault()
        if(isEmpty(user)){
            alert('Please Login to submit post')
            return
        }
        try {
            const res=await axios.post('/uploadPosts',form)
            const data=res.data
            alert(data.message)
            window.location.reload()
        } catch (error) {
            console.error(error)
            alert('Some Thing Went Wrong please Try Again')
        }
    }
    const updateForm=(e)=>{
        const {name,value}=e.target
        setForm({
          ...form,
          [name]:value
        })
      }
    return (
        <>
            <Typography typography='h4'>
                Upload New Post
            </Typography>

            <Typography component='div' sx={{ paddingTop: '50px', paddingLeft: '50px' }}>
                <form onSubmit={submit}>
                    <TextField type='text' variant='standard' label="Heading" sx={{ width: '100%', marginBottom: '20px' }} required name="heading" onChange={updateForm} value={form.heading}/>
                    <label style={{ marginBottom: "10px" }}>Post Content *</label>
                    <textarea rows={9} style={{ width: '100%', resize: 'none',outline:'none',}} required name="content" onChange={updateForm} value={form.content}></textarea>
                    <Box component={'div'} sx={{ marginTop: "15px", }} display='flex' justifyContent={'flex-end'} alignItems={'center'}>
                        <Button variant="contained" color="primary" type="submit">Submit</Button>
                    </Box>
                </form>
            </Typography>

        </>
    )
}

export default UploadPosts