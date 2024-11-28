import { useState, useCallback } from 'react';
import axios, { AxiosResponse } from 'axios';

interface ApiState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  completed: boolean;
}

interface UseApiOptions<T> {
  onComplete?: (result: T , key?:string) => void;
  onError?: (error: string , key?:string) => void;
  keepBeforeRefresh?:boolean
}

const useApi = <T, Params = void>(
  apiFunction: (params: Params) => Promise<AxiosResponse<T>>, // Remove the optional here
  options?: UseApiOptions<T>
) => {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    error: null,
    loading: false,
    completed: false,
  });

  const executeApi = useCallback((params: Params , key?:string) => { // Remove optional here
    setState({ data: options?.keepBeforeRefresh ? state.data : null , error: null, loading: true, completed: false });

    apiFunction(params)
      .then((response) => {
        const result = response.data;
        setState({ data: result, error: null, loading: false, completed: true });
        if (options?.onComplete) {
          options.onComplete(result , key);
        }
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message;
        setState({ data: null, error: errorMessage, loading: false, completed: true });
        if (options?.onError) {
          options.onError(errorMessage , key);
        }
      });
  }, [apiFunction, options]);

  return { ...state, executeApi };
};


export default useApi;
