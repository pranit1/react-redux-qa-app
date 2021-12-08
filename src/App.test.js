import React from 'react'
import { render, screen } from './setupTests'
import App from './App'
import userEvent from '@testing-library/user-event'

test('Should render the app', async () => {
  render(<App />)
  expect(screen.getByText(/Create a new Question/i)).toBeInTheDocument()
})

test('Should create a Q/A and test posted Q/A', async ()=> {
  render(<App />)
  expect(screen.getByText(/Create a new Question/i)).toBeInTheDocument()
  expect(screen.queryByText(/This is a new question/i)).not.toBeInTheDocument()
  userEvent.type(screen.getByTestId('input-question'),'This is a new question')
  userEvent.type(screen.getByTestId('input-answer'), 'This is a test answer')
  userEvent.click(screen.getByTestId('button-create-question'))
  const question = screen.queryByText(/This is a new question/i);
  expect(screen.queryByText(/This is a new question/i)).toBeInTheDocument()
  expect(screen.queryByText(/This is a test answer/i)).not.toBeInTheDocument()
  userEvent.click(question)
  expect(screen.queryByText(/This is a test answer/i)).toBeInTheDocument()
})

test('Should remove questions', async ()=> {
  render(<App />)
  expect(screen.queryByText(/Can i add my own questions/i)).toBeInTheDocument()
  userEvent.click(screen.getByTestId('remove-questions-button'))
  expect(screen.queryByText(/Can i add my own questions/i)).not.toBeInTheDocument()
})

// Tests are incomplete, I'll keep updating them as much as I can