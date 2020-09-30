import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import TaskList from "./TaskList";
import { TaskContext } from "../contexts/TaskContext";
import TaskForm from "../components/TaskForm";
import H2 from "../stylingComponents/H2";

const Dashboard = () => {
    const [taskList, setTaskList] = useState([]);
    const [refresh, setRefresh] = useState(true);
    useEffect(() => {
        axiosWithAuth()
            .get("/api/tasks")
            .then((res) => {
                console.log(res);
                setTaskList(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(setRefresh(false));
    }, [refresh]);
    return (
        <>
            <H2>Your Tasks</H2>
            {/* passing state via the context to wrapped component */}
            <TaskContext.Provider value={{ taskList, setRefresh }}>
                <TaskList />
            </TaskContext.Provider>
            <TaskContext.Provider value={{ setRefresh }}>
                <TaskForm />
            </TaskContext.Provider>
        </>
    );
};

export default Dashboard;
