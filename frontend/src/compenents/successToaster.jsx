import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showSuccessToast = (message) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: true,                
    hideProgressBar: false,           
    closeOnClick: true,          
    pauseOnHover: true,              
    draggable: true,                  
    closeButton: true,                  
    theme: 'colored', 
  });
};

export default showSuccessToast;
