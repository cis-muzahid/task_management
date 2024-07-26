import { toast } from 'react-toastify';

const showWarningToast = (message) => {
  toast.alert(message, {
    position: 'top-right',
    autoClose: false, 
    hideProgressBar: false, 
    closeOnClick: true, 
    pauseOnHover: true,
    draggable: true, 
  });
};

export default showWarningToast;
