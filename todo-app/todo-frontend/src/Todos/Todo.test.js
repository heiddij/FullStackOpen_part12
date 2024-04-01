/* eslint-disable no-undef */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('renders one todo', () => {
    const todo = {
      text: 'Helllloooo',
      done: false,
    }

    const doneInfo = <span>This todo is done</span>

    const notDoneInfo = <span>This todo is not done</span>
  
    render(<Todo todo={todo} doneInfo={doneInfo} notDoneInfo={notDoneInfo} />)
  
    screen.debug()
  
    const element = screen.getByText('Helllloooo')
    expect(element).toBeDefined()
  
    const element2 = screen.getByText('This todo is not done')
    expect(element2).toBeDefined()
  })