import { Dispatch } from 'redux';
import { showToast } from '../store/toastSlice';

interface CopyToClipboardOptions {
    successMessage?: string;
    errorMessage?: string;
    toastDuration?: number;
    onSuccess?: () => void;
    onError?: () => void;
}

export const copyToClipboard = (
    text: string,
    dispatch: Dispatch,
    options: CopyToClipboardOptions = {}
) => {
    const {
        successMessage = 'Text copied to clipboard',
        errorMessage = 'Error copying text to clipboard',
        toastDuration = 5000,
        onSuccess,
        onError
    } = options;

    navigator.clipboard
        .writeText(text)
        .then(() => {
            dispatch(
                showToast({
                    message: successMessage,
                    type: 'success',
                    timeout: toastDuration,
                })
            );
            if (onSuccess) onSuccess();
        })
        .catch((err) => {
            console.error('Clipboard write failed:', err);
            dispatch(
                showToast({
                    message: errorMessage,
                    type: 'error',
                    timeout: toastDuration,
                })
            );
            if (onError) onError();
        });
};