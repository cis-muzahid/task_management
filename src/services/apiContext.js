export const TaskList = () => {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}