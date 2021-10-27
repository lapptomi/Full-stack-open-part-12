import Todo from "./Todo"
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

test('renders content', () => {
  
  const todo = {
    text: 'Random-todo-component',
    done: true
  }

  const component = render(
    <Todo
      className='todo'
      key={todo} 
      todo={todo}
      onClickDelete={() => console.log('Delete clicked')}
      onClickComplete={() => console.log('Complete clicked')}
    />
  )

  expect(component.container).toHaveTextContent(todo.text)
})