let todos = [];

const form = document.querySelector('form');
const input = document.querySelector('#inputTodo');
const priority = document.querySelector('#priority');
const list = document.querySelector('#todoList');

form.addEventListener('submit', addTodo);

function addTodo (e) {
  e.preventDefault();
  
  const todo = {
    id: Date.now(),
    name: input.value,
    priority: priority.value,
    done: false
  };
  
  todos.push(todo);
  input.value = '';
  priority.selectedIndex = 0;
  
  render();
}

function render() {
  list.innerHTML = '';
  
  todos.forEach(function(todo) {
    const item = document.createElement('li');
    item.classList.add('list-group-item');
    
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('data-id', todo.id);
    checkbox.checked = todo.done;
    checkbox.addEventListener('click', toggleTodo);
    
    const name = document.createElement('span');
    name.innerText = todo.name;
    
    const priority = document.createElement('span');
    priority.classList.add('badge');
    
    if (todo.priority === 'high') {
      priority.classList.add('bg-danger');
      priority.innerText = 'High';
    } else if (todo.priority === 'medium') {
      priority.classList.add('bg-warning');
      priority.innerText = 'Medium';
    } else if (todo.priority === 'low') {
      priority.classList.add('bg-info');
      priority.innerText = 'Low';
    }
    
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'float-right');
    deleteButton.setAttribute('data-id', todo.id);
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', deleteTodo);
    
    item.appendChild(checkbox);
    item.appendChild(name);
    item.appendChild(priority);
    item.appendChild(deleteButton);
    
    list.appendChild(item);
  });
}

function toggleTodo (e) {
  const id = parseInt(e.target.getAttribute('data-id'));
  
  todos.forEach(function(todo) {
    if (todo.id === id) {
      todo.done = !todo.done;
    }
  });
  
  render();
}

function deleteTodo (e) {
  const id = parseInt(e.target.getAttribute('data-id'));
  
  todos = todos.filter(function(todo) {
    return todo.id !== id;
  });
  
  render();
}