import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showWarningToast = (message) => {
  toast.warn(message, {
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

export default showWarningToast;
