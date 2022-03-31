import { useState } from 'react';
import { useEffect } from 'react';

const TodoComp = (props) => {

  const [taskCompleted , setTaskCompleted] = useState([])

  const markBtn = () => {
    setTaskCompleted((check) => {
      return !check
    })
  }


  useEffect(() => {
    setTaskCompleted(props.todos.completed)
  }, [])


  return <div className="taskItem">
      <span className="todo">Title : {props.todos.title}</span> <br/>
      <span className="todo">Completed : <span style={taskCompleted ? {color : "green"} : {color : "red"}}>{taskCompleted.toString()}</span></span>
      {
        !taskCompleted &&
        <input className="markBtn" type="button" value="Mark Completed" onClick={markBtn}/>
      }
  </div>
};

export default TodoComp;
