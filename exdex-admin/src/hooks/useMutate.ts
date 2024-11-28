import { useState, useCallback } from "react";
import axios, { AxiosResponse } from "axios";

interface ApiState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  completed: boolean;
}

interface UseApiOptions<T> {
  onComplete?: (result: T) => void;
  onError?: (error: string) => void;
}

const useMutate = <T, Params = void>(
  apiFunction: (params: Params) => Promise<AxiosResponse<T>>,
  options?: UseApiOptions<T>
) => {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    error: null,
    loading: false,
    completed: false,
  });

  const executeApi = (params: Params) => {
    setState({ data: null, error: null, loading: true, completed: false });

    apiFunction(params)
      .then((response) => {
        const result = response.data; // Extract data from Axios response
        setState({
          data: result,
          error: null,
          loading: false,
          completed: true,
        });
        if (options?.onComplete) {
          options.onComplete(result); // Trigger onComplete callback if provided
        }
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message;
        setState({
          data: null,
          error: errorMessage,
          loading: false,
          completed: true,
        });
        if (options?.onError) {
          options.onError(errorMessage); // Trigger onError callback if provided
        }
      });
  };

  return { ...state, executeApi };
};

export default useMutate;
