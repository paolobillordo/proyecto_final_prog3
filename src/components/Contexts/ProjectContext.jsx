import React, { createContext, useState } from 'react';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [project, setProject] = useState(null);
    const [task, setTask] = useState(null);
    const [userId, setUserId] = useState(null);

    const selTask = (sel_task) => {
        setTask(sel_task)
    }

    const selProject = (sel_project) => {
        setProject(sel_project)
    }

    const addProject = (newProjects) => {
        setProjects(prevProjects => [...prevProjects, ...newProjects]);
    };

    const addTask = (newTask) => {
        setTasks(prevTasks => [...prevTasks, ...newTask]);
    };

    const setNewProjects = (newProjects) => {
        setProjects(newProjects);
    };

    const setNewTasks = (newTasks) => {
        setTasks(newTasks);
    };

    const setId = (userId) => {
        setUserId(userId)
    };

    const removeProject = () => {
        setProjects([]);
    };

    const removeTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    return (
        <ProjectContext.Provider
            value={{ projects, tasks, userId, project, task, selTask, selProject, setId, setNewProjects, setNewTasks, removeProject, removeTask, addProject, addTask }}>
            {children}
        </ProjectContext.Provider>
    );
};