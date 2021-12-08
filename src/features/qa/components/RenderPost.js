import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Divider, Paper, Typography, Grid } from '@mui/material';
import { postDeleted } from '../qaSlice';
import FormDialog from './Dialog';


export const RenderPost = ({ post }) => {
    const [isActive, setActive] = useState(false)
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const dispatch = useDispatch()
    
    return  (
        <>
        <Grid item xs={12} >
           <Paper elevation={3} sx={{bgcolor:'white'}}>
                <Grid container spacing={1} >
                    <Grid item xs={8}>
                        <div 
                            className="post-div" 
                            data-testid="post-div" 
                            onClick={() => setActive(!isActive)}
                            onKeyPress={(e) => {if(e.key==='Enter') {setActive(!isActive)}}}
                            tabindex="0" 
                            role="button" 
                            aria-pressed="false">
                            <article className="post-article">
                                <Typography 
                                    data-testid={`post-question-${post.id}`} 
                                    textAlign="center" variant="subtitle1" 
                                    gutterBottom component="div"
                                    className={`post-question`} 
                                    >{post.question}
                                </Typography>
                                {isActive?(
                                <div>
                                    <Divider/>
                                    <Typography 
                                        data-testid={`post-answer-${post.id}`} 
                                        textAlign="center" 
                                        variant="body2" 
                                        gutterBottom 
                                        component="div" 
                                        className="post-answer"
                                        >{post.answer}
                                    </Typography>
                                </div>)
                                :null}
                            </article>
                        </div>
                    </Grid>
                    <Grid  item  xs={4}>
                        <Button
                            className="edit-button" 
                            data-testid="edit-button" 
                            sx={{marginLeft:'5px', marginBottom:'10px'}} 
                            type="button" 
                            size="small" 
                            variant="contained" 
                            onClick={handleClickOpen}
                            >Edit
                        </Button> 
                        <Button 
                            data-testid="delete-button" 
                            type="button" sx={{marginLeft:'5px', marginBottom:'10px'}} 
                            size="small" onClick={() => dispatch(postDeleted(post.id))} 
                            variant="contained"
                            className="delete-button"
                            >Delete
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <FormDialog className="edit-modal" open={open} handleClose={handleClose} post={post}/>
        </Grid>
        </>
      )
}