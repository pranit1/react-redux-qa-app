import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { postDeletedAll, postSorted } from '../qaSlice'
import { Divider, Typography, Grid, Button, Box, Container } from '@mui/material';
import { RenderPost } from './RenderPost';
import '../tooltip.css'

export const QaPosts = () => {
  const posts = useSelector(state => state.qa.posts)
  const dispatch = useDispatch()
  
  return (
    <Container maxWidth="md" sx={{marginTop:'40px', marginBottom:'30px'}}>
      <Box
        sx={{
          marginTop: 0,
          marginBottom:2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Grid container spacing={2} >
          <Grid item xs={12} >
            <Divider/>
            <Typography 
            className="number-of-posts"
            variant="subtitle2" 
            component="div"
            data-testid="number-of-questions"
            gutterBottom>
              Here you can find {posts.length} questions. Feel Free to create your own
              </Typography>
            <Divider/>
          </Grid>
          <Grid item xs={12} >
            <Button 
              className="remove-questions-button" 
              data-testid="remove-questions-button" 
              onClick={() => dispatch(postDeletedAll())}>
                Remove Questions
            </Button>
            <Button 
              className="sort-questions-button" 
              data-testid="sort-questions-button" 
              onClick={() => dispatch(postSorted())}>
                Sort Questions
            </Button>
          </Grid>
          <Grid item xs={12} >
            <Typography 
              data-testid="created-questions" 
              className="tooltip" 
              variant="h5" 
              component="div" 
              gutterBottom>
                Created Questions
                <span className="tooltiptext">Here you can find the created questions and their answers</span>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      
      <Grid container direction="column" rowSpacing={2}>
        {posts.length > 0 ?
          posts.map(post => <RenderPost data-testid="render-posts" key={post.id} post={post}/>):
          (<Typography 
            sx={{color:'#dd5c5c'}}
            className="no-questions-output"
            variant="h6" 
            component="div" 
            gutterBottom>No questions yet :(</Typography>)}
      </Grid>  
    </Container>
    
  )
}