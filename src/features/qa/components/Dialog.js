import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { postUpdated } from '../qaSlice'
import { useDispatch } from 'react-redux'
import { TextField } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import { Typography } from '@mui/material';

const FormDialog = ({ open, handleClose, post}) => {

    const [question , setQuestion] = useState(post.question)
    const [answer, setAnswer] = useState(post.answer)
  
    const dispatch = useDispatch()
    const onTitleChanged = e => setQuestion(e.target.value)
    const onContentChanged = e => setAnswer(e.target.value)
  
    const onSavePostClicked = () => {
      if (question && answer) {
        dispatch(postUpdated({ id: post.id, question, answer }))
        handleClose()
      }
    }

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={open} onClose={handleClose}
      >
        <DialogTitle>Q/A Update</DialogTitle>
        <DialogContent>
          <Typography textAlign="left" variant="subtitle1" component="div" gutterBottom>
            Question
          </Typography>
          <TextField 
            fullWidth
            type="text"
            id="question"
            name="question"
            className="edit-question"
            variant="outlined"
            inputProps={{ "data-testid": "edit-question" }}
            value={question}
            sx={{bgcolor:'white'}}
            onChange={onTitleChanged}
          />
          <Typography textAlign="left" variant="subtitle1" component="div" gutterBottom>
            Answer
          </Typography>
          <TextareaAutosize
            style={{width:'100%'}}
            id="answer"
            name="answer"
            value={answer}
            data-testid="edit-answer"
            className="edit-answer"
            minRows={6}
            onChange={onContentChanged}
          />
        </DialogContent>
        <DialogActions>
          <Button 
            data-testid="cancel-button" 
            onClick={handleClose}
            className="cancel-button"
            >Cancel
          </Button>
          <Button 
            data-testid="save-button"
            className="save-button"
            onClick={onSavePostClicked}
            >Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog