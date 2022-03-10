import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { postAdded, addNewPostDelay, postIsAsync } from "../qaSlice";
import {
  TextField,
  TextareaAutosize,
  Checkbox,
  Typography,
  Grid,
  Button,
  Container,
} from "@mui/material";
import { Box } from "@mui/system";
import "../tooltip.css";

export const QaForm = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const isChecked = useSelector((state) => state.qa.isAsync);
  const dispatch = useDispatch();
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onQuestionChanged = (e) => setQuestion(e.target.value);
  const onAnswerChanged = (e) => setAnswer(e.target.value);
  const canSave =
    [question, answer].every(Boolean) && addRequestStatus === "idle";

  const onSaveAsyncPostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        await dispatch(
          addNewPostDelay({ id: nanoid(), question, answer })
        ).unwrap();
        setQuestion("");
        setAnswer("");
      } catch (err) {
        console.error("Failed to save the post: ", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const onSavePostClicked = () => {
    if (question && answer) {
      if (isChecked) {
        onSaveAsyncPostClicked();
      } else {
        dispatch(postAdded(question, answer));
        setQuestion("");
        setAnswer("");
      }
    }
  };

  return (
    <section>
      <Container maxWidth="md">
        <Box
          sx={{
            marginTop: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <form>
            <Typography
              data-testid="create-new-question"
              className="tooltip"
              variant="h5"
              component="div"
              gutterBottom
            >
              Create a new Question
              <span className="tooltiptext">
                Here you can create new questions and their answers
              </span>
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  className="question-header"
                  textAlign="left"
                  variant="subtitle1"
                  component="div"
                  gutterBottom
                >
                  Question
                </Typography>
                <TextField
                  fullWidth
                  type="text"
                  id="input-question"
                  name="input-question"
                  variant="outlined"
                  inputProps={{ "data-testid": "input-question" }}
                  value={question}
                  sx={{ bgcolor: "white" }}
                  onChange={onQuestionChanged}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  className="answer-header"
                  textAlign="left"
                  variant="subtitle1"
                  component="div"
                  gutterBottom
                >
                  Answer
                </Typography>
                <TextareaAutosize
                  style={{ width: "100%" }}
                  id="input-answer"
                  name="input-answer"
                  value={answer}
                  data-testid="input-answer"
                  minRows={6}
                  onChange={onAnswerChanged}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  className="button-create-question"
                  type="button"
                  onClick={onSavePostClicked}
                  variant="contained"
                  data-testid="button-create-question"
                >
                  Create Question
                </Button>
                <span>
                  <Checkbox
                    className="delay-checkbox"
                    onChange={(e) => dispatch(postIsAsync(e.target.checked))}
                    id="delay"
                    name="delay"
                    data-testid="delay-checkbox"
                    inputProps={{
                      "aria-label": "Checkbox delay",
                    }}
                  />
                  <label htmlFor="delay">delay</label>
                </span>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </section>
  );
};
