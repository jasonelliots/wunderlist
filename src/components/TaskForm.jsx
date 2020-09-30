import React, { useState, useContext } from "react";
import Modal from "react-modal";
import axiosWithAuth from "../utils/axiosWithAuth";
import { TaskContext } from "../contexts/TaskContext";
import TaskFormStyling from "../stylingComponents/TaskFormStyling";
import Button from "../stylingComponents/Button";

Modal.setAppElement("#root");

function TaskForm() {
    const { setRefresh } = useContext(TaskContext);

    const [formState, setFormState] = useState({
        name: "",
        endOn: null,
        isRepeated: false,
        days: null,
    });

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [post, setPost] = useState([]);

    const inputChange = (e) => {
        e.persist();
        const newFormData = {
            ...formState,
            [e.target.name]:
                e.target.type === "checkbox"
                    ? e.target.checked
                    : e.target.value,
        };

        setFormState(newFormData);
    };

    const formSubmit = (e) => {
        e.preventDefault();
        console.log(formState);
        axiosWithAuth()
            .post("/api/tasks", formState)
            .then((res) => {
                setPost(res.data); // get just the form data from the REST api
                console.log("success", post);
                // reset form if successful
                setFormState({
                    name: "",
                    endOn: "",
                    isRepeated: false,
                    days: null,
                });
                setModalIsOpen(false);
                setRefresh(true);
            })
            .catch((err) => {
                console.log(err.response);
                console.log(formState);
            });
    };

    return (
        <div className='TaskForm'>
            <Button onClick={() => setModalIsOpen(true)}>Create Task</Button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                shouldCloseOnOverlayClick={false}
            >
                <TaskFormStyling
                    className='form-horizontal'
                    onSubmit={formSubmit}
                >
                    <div className='form-group'>
                        <label
                            className='control-label col-sm-2'
                            htmlFor='name'
                        >
                            Task Name:
                        </label>
                        <div className='col-sm-8'>
                            <input
                                id='name'
                                className='form-control'
                                type='text'
                                name='name'
                                value={formState.name}
                                onChange={inputChange}
                            />
                        </div>
                    </div>
                    <div className='form-group'>
                        <label
                            className='control-label col-sm-2'
                            htmlFor='days'
                        >
                            Day of Week:
                        </label>
                        <div className='col-sm-5'>
                            <select
                                className='form-control'
                                name='days'
                                id='days'
                                onChange={inputChange}
                            >
                                <option value='null'>Choose an option</option>
                                <option value='0'>Sundays</option>
                                <option value='1'>Mondays</option>
                                <option value='2'>Tuesdays</option>
                                <option value='3'>Wednesdays</option>
                                <option value='4'>Thursdays</option>
                                <option value='5'>Fridays</option>
                                <option value='6'>Saturdays</option>
                            </select>
                        </div>
                    </div>
                    <div className='form-group'>
                        <label
                            className='control-label col-sm-2'
                            htmlFor='endOn'
                        >
                            Due Date:
                        </label>
                        <div className='col-sm-10'>
                            <input
                                id='endOn'
                                type='date'
                                name='endOn'
                                value={formState.endOn || ""}
                                onChange={inputChange}
                            />
                        </div>
                    </div>
                    <div class='form-group'>
                        <div class='col-sm-offset-2 col-sm-5'>
                            <div class='checkbox'>
                                <label>
                                    <input
                                        type='checkbox'
                                        name='isRepeated'
                                        value={formState.isRepeated}
                                        onChange={inputChange}
                                    />
                                    Repeat
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class='form-group'>
                        <div class='col-sm-offset-2 col-sm-5'>
                            <Button>Create Task</Button>
                        </div>
                    </div>
                </TaskFormStyling>
            </Modal>
        </div>
    );
}

export default TaskForm;
