import { Box, Button, Divider, Paper, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

export default function Post() {
  const {postId}=useParams()
  const navigate=useNavigate()
  const [post,setPost]=useState({})
  useEffect(()=>{
      getPost()
  },[])
  const getPost=async()=>{
     try {
        const res=await axios.get(`/getPost/${postId}`)
        const data=res.data.data
        setPost(data.post)
        console.log(data)
     } catch (error) {
        console.error(error);
        // navigate('/')
     }
  }
  return (
    <>
      <Box component={'div'}>
          <Typography component={'h4'}>{post.heading}</Typography>
          <Box component={'div'} sx={{ marginTop:'10px' }}>
               {post.content}
          </Box>
          <CommentBox postId={postId}/>
      </Box>
    </>
  )
}
const CommentBox=({postId})=>{
    const [comments,setComments]=useState([])
    const [newComment,setNewComment]=useState('')
    useEffect(()=>{
      getComments()
    },[])
    const user=useSelector((state)=>state.user)
    const getComments=async()=>{
       try {
         const res=await axios.get(`/getComments/${postId}`)
         const data=res.data
         setComments(data.data)
       } catch (error) {
          console.error(error);
       }
    }
    const addNewComment=async()=>{
        try {
          if(isEmpty(user)){
              alert('Please Login to Post Comment')
              return
          }
          await axios.post(`/addNewComment/${postId}`,{comment:newComment})
          setNewComment('')
          getComments()
        } catch (error) {
           console.error(error);
           alert('SomeThing Went Wrong Please Try again')
        }
    }
    return(
      <>
        <Box sx={{ marginTop:'10px' }}>
           <TextField variant='outlined' label="Add Comment" sx={{ width:'100%' }} 
           value={newComment} onChange={(e)=>setNewComment(e.target.value)}/>
        </Box>
        <Box sx={{ justifyContent:'flex-end',display:'flex',marginTop:'10px' }}>
        <Button variant='contained' color='primary' disabled={!newComment.length} onClick={addNewComment}>Add</Button>
        </Box>
        <Box sx={{ marginTop:'10px' }}>
          {comments.map(comment=>(
              <Comment comment={comment} key={comment.id} />
          ))}
        </Box>
      </>
    )
}
const Comment=({comment})=>{
     return (
      <>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Box display={'flex'} sx={{ alignItems:'center',justifyContent:'space-between' }}>
          <Typography variant="h6" component="div" color="primary" sx={{ alignItems:'center',display:'flex' }}>
            <AccountCircleIcon sx={{ marginRight:'6px' }}/>
            {comment.userName}
          </Typography>
          <Typography component={'h6'}>
            {comment.created_at}
          </Typography>
         </Box>
          <Typography variant="body1" sx={{ marginBottom: 1,marginTop:'10px',paddingLeft:'10px' }}>
           {comment.comment}
          </Typography>
          <Divider/>
        </Paper>
      </>
     )
}