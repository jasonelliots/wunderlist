import React, {useState} from "react";


const Task = (props) => {
    const [completed, setCompleted] = useState(false); 


  return (
    <div key={props.task.id}>
      <h1 className={completed ? "completed" : ""}>{props.task.name}</h1>

      <button
        onClick={(e) => {
          e.preventDefault();
          props.deleteTask(props.task);
        }}
      >
        {" "}
        Delete
      </button>

      <button
        onClick={() => {
          props.editTask(props.task);
        }}
      >
        {" "}
        Update
      </button>

      <button
        onClick={() => {
          setCompleted(!completed);
        }}
      >
        Mark as complete
      </button>

      {/* build mark as complete  */}
    </div>
  );
};


export default Task 