import { axiosInstanceWithInterceptors } from "./axiosInstance";



const token = localStorage.getItem('usr_1a2b3c');
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };


export const GetAlertTimeAPI = async () => {
    try {

        const response = await axiosInstanceWithInterceptors.get('api/users/get-or-update-alert-time/', { headers });
        return response;
    } catch (error) {
        console.error('Error fetching alert time:', error);
        return [];
    }
};

export const UpdateAlertTimeAPI = async (data) => {
    try {
        const response = await axiosInstanceWithInterceptors.put('api/users/get-or-update-alert-time/', data, { headers });
        return response;
    } catch (error) {
        console.error('Error updating alert time:', error);
        return [];
    }
};


export const TaskListAPI = async (queryString) => {
    try {
        const response = await axiosInstanceWithInterceptors.get(`api/tasks/task-list-create/?${queryString}`, { headers });
        return response;
    } catch (error) {
        console.error('Error fetching task list:', error);
        return [];
    }
};

export const TaskDeleteAPI = async (id) => {
    try {
        const response = await axiosInstanceWithInterceptors.delete(`api/tasks/task-delete/${id}/`, { headers });
        return response;
    } catch (error) {
        console.error('Error fetching task list:', error);
        return [];
    }
};

export const UpdateTaskAPI = async (updatedTask) => {
    try {
        const response = await axiosInstanceWithInterceptors.patch(`api/tasks/tasks-update/${updatedTask.id}/`, updatedTask,{ headers });
        return response;
    } catch (error) {
        console.error('Error fetching task list:', error);
        return [];
    }
};

export const UserDetailAPI = async () => {
    try {
        const response = await axiosInstanceWithInterceptors.get(`api/users/update-or-get-user/`, { headers });
        return response;
    } catch (error) {
        console.error('Error fetching task list:', error);
        return [];
    }
};



export const TaskCreateAPI = async (formData) => {
    try {
        const response = await axiosInstanceWithInterceptors.post('api/tasks/task-list-create/', formData, {headers});
        return response;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error; 
    }
};


export const GetTaskTitleListAPI = async () => {
    try {
        const response = await axiosInstanceWithInterceptors.get('api/tasks/task-titles-list/', {headers});
        return response;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error; 
    }
};
//  new created
export const GetTaskTitleList = async (queryString) => {
    try {
        const response = await axiosInstanceWithInterceptors.get(`api/tasks/task-titles-list/?${queryString}`, {headers});
        return response;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error; 
    }
};


export const ChangePasswordAPI = async (data) => {
    try {
        const response = await axiosInstanceWithInterceptors.post('api/users/change-password/',data, {headers});
        return response;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error; 
    }
};

export const TodoCreateAPI = async (data) => {
    try {
        const response = await axiosInstanceWithInterceptors.post('api/tasks/todo-list-create/',data, {headers});
        return response;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error; 
    }
};

export const TodoListAPI = async () => {
    try {
        const response = await axiosInstanceWithInterceptors.get('api/tasks/todo-list-create/', {headers});
        return response;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error; 
    }
};

export const TodoDeleteAPI = async (id) => {
    try {
        const response = await axiosInstanceWithInterceptors.delete(`http://127.0.0.1:8000/api/tasks/todo-retrieve-delete-update/${id}/`, {headers});
        return response;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error; 
    }
};

export const TodoUpdateAPI = async (todo) => {
    try {
        const response = await axiosInstanceWithInterceptors.patch(`http://127.0.0.1:8000/api/tasks/todo-retrieve-delete-update/${todo.id}/`,todo, {headers});
        return response;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error; 
    }
};


export const GetTaskTitleAPI = async () => {
    try {
        const response = await axiosInstanceWithInterceptors.get('api/tasks/task-titles/', {headers},);

        return response;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error; 
    }
};

export const CreateTaskTitleAPI = async (data) => {
    try {
        const response = await axiosInstanceWithInterceptors.post('api/tasks/task-title-create/',data, {headers});
        return response;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error; 
    }
};


export const TitleDeleteAPI = async (id) => {
    try {
        const response = await axiosInstanceWithInterceptors.delete(`api/tasks/task-title-delete/${id}/`, {headers});
        return response;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error; 
    }
};

export const TitleUpdateAPI = async (title) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        const response = await axiosInstanceWithInterceptors.patch(`api/tasks/task-title-update/${title.id}/`, title,{headers});
        return response;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error; 
    }
};

export const SetDefaultTitleAPI = async (id) => {
    try {
        const response = await axiosInstanceWithInterceptors.post(`api/tasks/set-default-title/${id}/`, {headers});
        return response;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error; 
    }
};