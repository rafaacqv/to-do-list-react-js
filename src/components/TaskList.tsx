import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    const title = newTaskTitle;
    
    if(title && title.replace(/ /g,'') !== '') {
      const task = {
        id: Math.random(),
        title,
        isComplete: false,
      }
      const taskList = [...tasks, task];
      setTasks(taskList);
      setNewTaskTitle('');
    }
  }

  function handleToggleTaskCompletion(id: number) {
    const taskId = id;
    
    const taskList = tasks.map(elem => {
      if(taskId === elem.id) {
        return { ...elem, isComplete: !elem.isComplete }
      }
      return elem
    });

    setTasks(taskList);
  }

  function handleRemoveTask(id: number) {
    const taskId = id;
    const taskList = tasks.filter(elem =>  taskId !== elem.id);

    setTasks(taskList);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}