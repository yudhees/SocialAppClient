import { Box, Card, CardContent, Grid2, Typography } from '@mui/material'
import axios from 'axios'
import React, { memo, useCallback, useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router';

export default function Posts() {
    const [posts,setPosts]=useState([])
    const user=useSelector(state=>state.user)
    useEffect(()=>{
       getPosts()
    },[])
    const getPosts=async()=>{
       try {
          const res=await axios.get('/getPosts')
          setPosts(res.data.data)
       } catch (err) {
          console.log(err)
       }
    }
    const updatelike=useCallback(async(post)=>{
        try {
            if(isEmpty(user)){
                alert('Please Login to submit post')
                return
            }
            await axios.post('/updateLike/'+post.id)
            setPosts(state=>{
                return state.map(statePost=>{
                    if(post.id==statePost.id){
                        const isLiked=Number(!statePost.isLiked) 
                        const totalLikes=isLiked?statePost.totalLikes+1:statePost.totalLikes-1
                        return {
                            ...statePost,
                            isLiked, 
                            totalLikes
                        }
                    }
                    return statePost
                })
            })
        } catch (err) {
            console.log(err)
        }
    },[setPosts,user])
    return (
        <>
            <Typography typography='h4'>
                Posts
            </Typography>
            <Grid2 size={6} sx={{ gridTemplateColumns: '33.33% 33.33% 33.33%', display: 'grid' }} >
                {posts.map(post=>(
                   <PostCard key={'post'+post.id} post={post} updatelike={updatelike} />
                ))}
            </Grid2>
        </>
    )
}

const PostCard =memo(({post,updatelike})=>{
    const navigate = useNavigate();
    return (
        <>
            <Card sx={{ maxWidth: 400, margin: "10px", padding: "0.5rem",cursor:'pointer',position:'relative'}}>
                <Box component="div" sx={{ position:'absolute',right:'10px' }} display={'flex'} alignItems={'center'}>
                       <span>
                       {post.totalLikes}
                       </span>
                    <FavoriteIcon  htmlColor={post.isLiked?'#ff0808':''}  sx={{marginLeft:'10px'}}
                             onClick={()=>updatelike(post)}>
                    </FavoriteIcon>
                </Box>
                <CardContent onClick={()=>navigate(`/post/${post.id}`)}>
                    <Typography variant="h5" component="div" gutterBottom>
                        {post.heading}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        Posted by: {post.postedBy}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom
                     sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 5, 
                        maxHeight: "94px",
                        marginTop:'10px'
                      }}
                    >
                       {post.content}
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
},({post:prePost},{post:currentPost})=>{
    return currentPost.isLiked == prePost.isLiked || prePost.totalLikes == currentPost.totalLikes;
})
