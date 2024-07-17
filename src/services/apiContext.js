import axios from "axios";

const token = sessionStorage.getItem('usr_1a2b3c');


export const GetAlertTimeAPI = async () => {
    try {
        const token = sessionStorage.getItem('usr_1a2b3c');
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };
        const response = await axios.get('http://127.0.0.1:8000/api/users/get-or-update-alert-time/', { headers });
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
        const response = await axios.put('http://127.0.0.1:8000/api/users/get-or-update-alert-time/', data, { headers });
        return response;
    } catch (error) {
        console.error('Error updating alert time:', error);
        return [];
    }
};


export const TaskListAPI = async () => {
    try {
        const token = sessionStorage.getItem('usr_1a2b3c');
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };
        const response = await axios.get('http://127.0.0.1:8000/api/tasks/task-list-create/', { headers });
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
        const response = await axios.delete(`http://127.0.0.1:8000/api/tasks/task-delete/${id}/`, { headers });
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
        const response = await axios.get(`http://127.0.0.1:8000/api/users/${user_id}/`, { headers });
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
        const response = await axios.post('http://127.0.0.1:8000/api/tasks/task-list-create/', formData, {headers});
        return response;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error; 
    }
};
