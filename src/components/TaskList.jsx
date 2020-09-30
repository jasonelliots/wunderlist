import React, { useContext, useState } from "react";

import axiosWithAuth from "../utils/axiosWithAuth";

import { TaskContext } from "../contexts/TaskContext";
import Button from "../stylingComponents/Button";
import SearchBar from "../stylingComponents/SearchBar";

import Task from "./Task";

import "./component.css";

const TaskList = () => {

    const { taskList, setRefresh } = useContext(TaskContext);

    const [editing, setEditing] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState({}); // update this object with correct shape
    const [searchInput, setSearchInput] = useState("");

    const deleteTask = (task) => {
        axiosWithAuth()
            .delete(`/api/tasks/${task.id}`)
            .then((res) => {
                console.log(res);
                setRefresh(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const editTask = (task) => {
        setEditing(true);
        setTaskToEdit(task);
    };

    const saveUpdate = (e) => {
        e.preventDefault();
        axiosWithAuth()
            .put(`/api/tasks/${taskToEdit.id}`, taskToEdit)
            .then((res) => {
                console.log(res);
                setRefresh(true);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(setEditing(false));
    };

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
    };

    const filteredTasks = taskList.filter((task) => {
        return task.name.toLowerCase().includes(searchInput.toLowerCase());
    });

    return (
        <>
            <SearchBar className='search-bar form-horizontal'>
                <div className='col-sm-5'>
                    <input
                        className='form-control'
                        value={searchInput}
                        placeholder='search for a task'
                        onChange={handleSearchInput}
                    />
                </div>
            </SearchBar>
            {filteredTasks.map((task) => {
                return (
                    <Task
                        task={task}
                        deleteTask={deleteTask}
                        editTask={editTask}
                    />
                );
            })}
            {editing && (
                <form onSubmit={saveUpdate}>
                    {/* use task form as model for this form - make sure to match shape of object used above for taskToEdit */}

                    <label htmlFor='name'>
                        Task Name
                        <input
                            type='text'
                            name='name'
                            value={taskToEdit.name}
                            onChange={(e) => {
                                setTaskToEdit({
                                    ...taskToEdit,
                                    name: e.target.value,
                                });
                            }}
                        />
                    </label>

                    <label htmlFor='endOn'>
                        Due Date
                        <input
                            type='date'
                            name='endOn'
                            value={taskToEdit.endOn}
                            onChange={(e) => {
                                setTaskToEdit({
                                    ...taskToEdit,
                                    endOn: e.target.value,
                                });
                            }}
                        />
                    </label>
                    <Button onClick={saveUpdate}>Save Updates</Button>
                    <Button onClick={() => setEditing(false)}>Cancel</Button>
                </form>
            )}
        </>
    );
};

export default TaskList;
