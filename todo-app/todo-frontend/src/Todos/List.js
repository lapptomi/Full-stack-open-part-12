import React from 'react'
import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo)
  }

  const onClickComplete = (todo) => () => {
    completeTodo(todo)
  }
  
  return (
    <>
      {todos.map(todo => (
        <Todo
          className='todo'
          key={todo} 
          todo={todo}
          onClickDelete={onClickDelete}
          onClickComplete={onClickComplete}
        />
      ))}
    </>
  )
}

export default TodoList
