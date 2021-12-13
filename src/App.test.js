import React from 'react'
import { render, screen } from './setupTests'
import App from './App'
import userEvent from '@testing-library/user-event'
import {within} from '@testing-library/dom'
import { act } from 'react-dom/test-utils'

test('Should render the app', async () => {
  render(<App />)
  expect(screen.getByText(/Create a new Question/i)).toBeInTheDocument()
})

test('Should create a Q/A and test posted Q/A', ()=> {
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

test('Should remove questions',  ()=> {
  render(<App />)
  let listItems = screen.queryAllByTestId('post-div')
  expect(listItems).toHaveLength(2)
  expect(screen.queryByText(/Can i add my own questions/i)).toBeInTheDocument()
  userEvent.click(screen.getByTestId('remove-questions-button'))
  listItems = screen.queryAllByTestId('post-div')
  expect(listItems).toHaveLength(0)
  expect(screen.queryByText(/Can i add my own questions/i)).not.toBeInTheDocument()
})

test('Should verify number of questions',  ()=> {
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

test('Should sort questions',  ()=> {
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

test('Should edit a question', async ()=> {
  render(<App />)
  const posts = screen.queryAllByTestId('edit-button')
  userEvent.click(posts[0])
  expect(screen.queryByText(/Update/i)).toBeInTheDocument()
  userEvent.type(screen.queryByTestId('edit-question'), 'Can I edit my own question')
  userEvent.type(screen.queryByTestId('edit-answer'), 'Yes you can edit your own question')
  userEvent.click(screen.queryByTestId('save-button'))
  const question = screen.queryByText(/Can I edit my own question/i)
  expect(question).toBeInTheDocument()
  userEvent.click(question)
  await new Promise(res => setTimeout(res, 5000));
  expect(screen.queryByText(/Yes you can edit your own question/i))

})

test('Should delete a question', async ()=> {
  render(<App />)
  expect(screen.getByText(/Can i add my own questions/i)).toBeInTheDocument()
  const posts = screen.queryAllByTestId('delete-button')
  userEvent.click(posts[0])
  await new Promise(res => setTimeout(res, 3000));
  expect(screen.queryByText(/Can i add my own questions/i)).not.toBeInTheDocument()
})
