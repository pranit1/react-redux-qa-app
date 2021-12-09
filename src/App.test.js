import React from 'react'
import { render, screen } from './setupTests'
import App from './App'
import userEvent from '@testing-library/user-event'
import {within} from '@testing-library/dom'

test('Should render the app', async () => {
  render(<App />)
  expect(screen.getByText(/Create a new Question/i)).toBeInTheDocument()
})

test('Should create a Q/A and test posted Q/A', async ()=> {
  render(<App />)
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
  let listItems = screen.queryAllByTestId('post-div')
  expect(listItems).toHaveLength(2)
  expect(screen.queryByText(/Can i add my own questions/i)).toBeInTheDocument()
  userEvent.click(screen.getByTestId('remove-questions-button'))
  listItems = screen.queryAllByTestId('post-div')
  expect(listItems).toHaveLength(0)
  expect(screen.queryByText(/Can i add my own questions/i)).not.toBeInTheDocument()
})

test('Should verify number of questions', async ()=> {
  render(<App />)
  let listItems = screen.getAllByTestId('post-div')
  expect(listItems).toHaveLength(2)
  expect(screen.getByText(/Create a new Question/i)).toBeInTheDocument()
  expect(screen.queryByText(/This is a new question/i)).not.toBeInTheDocument()
  userEvent.type(screen.getByTestId('input-question'),'This is a new question')
  userEvent.type(screen.getByTestId('input-answer'), 'This is a test answer')
  userEvent.click(screen.getByTestId('button-create-question'))
  listItems = screen.getAllByTestId('post-div')
  expect(listItems).toHaveLength(3)
})

test('Should sort questions', async ()=> {
  render(<App />)
  userEvent.type(screen.getByTestId('input-question'),'A test for sorting')
  userEvent.type(screen.getByTestId('input-answer'), 'This is a test answer')
  userEvent.click(screen.getByTestId('button-create-question'))
  let posts = screen.queryAllByTestId('post-article')
  expect(within(posts[0]).queryByText(/Can i add my own questions/i)).toBeInTheDocument()
  expect(within(posts[1]).queryByText(/How to add a question/i)).toBeInTheDocument()
  expect(within(posts[2]).queryByText(/A test for sorting/i)).toBeInTheDocument()
  userEvent.click(screen.getByTestId('sort-questions-button'))
  posts = screen.queryAllByTestId('post-article')
  expect(within(posts[0]).queryByText(/A test for sorting/i)).toBeInTheDocument()
  expect(within(posts[1]).queryByText(/Can i add my own questions/i)).toBeInTheDocument()
  expect(within(posts[2]).queryByText(/How to add a question/i)).toBeInTheDocument()
})

