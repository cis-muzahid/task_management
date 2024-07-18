import axios from "axios";
import { axiosInstanceWithInterceptors } from "./axiosInstance";




const token = sessionStorage.getItem('usr_1a2b3c');


export const GetAlertTimeAPI = async () => {
    try {
        const token = sessionStorage.getItem('usr_1a2b3c');
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };
        const response = await axiosInstanceWithInterceptors.get('api/users/get-or-update-alert-time/', { headers });
        return response;
    } catch (error) {
        console.error('Error fetching alert time:', error);
        return [];
    }
};

export const UpdateAlertTimeAPI = async (data) => {
    try {
        const token = sessionStorage.getItem('usr_1a2b3c');
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };
        const response = await axiosInstanceWithInterceptors.put('api/users/get-or-update-alert-time/', data, { headers });
        return response;
    } catch (error) {
        console.error('Error updating alert time:', error);
        return [];
    }
};


export const TaskListAPI = async (queryString) => {
    try {
        const token = sessionStorage.getItem('usr_1a2b3c');
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };
        const response = await axiosInstanceWithInterceptors.get(`api/tasks/task-list-create/?${queryString}`, { headers });
        return response;
    } catch (error) {
        console.error('Error fetching task list:', error);
        return [];
    }
};

export const TaskDeleteAPI = async (id) => {
    try {
        const token = sessionStorage.getItem('usr_1a2b3c');
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };
        const response = await axiosInstanceWithInterceptors.delete(`api/tasks/task-delete/${id}/`, { headers });
        return response;
    } catch (error) {
        console.error('Error fetching task list:', error);
        return [];
    }
};

export const UpdateTaskAPI = async (updatedTask) => {
    console.log(updatedTask)
    try {
        const token = sessionStorage.getItem('usr_1a2b3c');
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };
        const response = await axiosInstanceWithInterceptors.patch(`api/tasks/tasks-update/${updatedTask.id}/`, updatedTask,{ headers });
        return response;
    } catch (error) {
        console.error('Error fetching task list:', error);
        return [];
    }
};

export const UserDetailAPI = async () => {
    try {
        const token = sessionStorage.getItem('usr_1a2b3c');
        const user_id = sessionStorage.getItem('user_id');
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };
        console.log(user_id)
        const response = await axiosInstanceWithInterceptors.get(`api/users/update-or-get-user/`, { headers });
        return response;
    } catch (error) {
        console.error('Error fetching task list:', error);
        return [];
    }
};



export const TaskCreateAPI = async (formData) => {
    try {
        const token = sessionStorage.getItem('usr_1a2b3c');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        const response = await axiosInstanceWithInterceptors.post('api/tasks/task-list-create/', formData, {headers});
        return response;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error; 
    }
};
