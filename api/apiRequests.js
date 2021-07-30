
export function todosGet() {
  return fetch('https://agile-sea-23045.herokuapp.com/api/todos/', {
    method: "GET"
  })
}

export function createTodo(todo){
  return fetch('https://agile-sea-23045.herokuapp.com/api/todos/create-todo/', {
    method: "POST",
    headers: {
    'Content-Type': 'application/json'
  },
    body: JSON.stringify(todo)
  })
}

export function deleteTodo(id){
  fetch(`https://agile-sea-23045.herokuapp.com/api/todos/delete-todo/${id}/`, {
    method: "DELETE"
  })
}

export function highestIdLookup(){
  return fetch(`https://agile-sea-23045.herokuapp.com/api/todos/id-lookup/`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    },
  })
}