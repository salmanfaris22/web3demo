import { useDispatch } from 'react-redux';
import { showToast } from '../store/toastSlice';


const useToast = () => {
  const dispatch = useDispatch();

  const triggerToast = (message: string, type: 'success' | 'error' | 'info', timeout = 5000) => {
    dispatch(
      showToast({
        message,
        type,
        timeout,
      })
    );
  };

  return {
    triggerToast,
  };
};

export default useToast;
