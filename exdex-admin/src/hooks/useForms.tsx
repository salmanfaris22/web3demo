import { useState, useEffect } from "react";

interface ValidatorRule {
  required?: string;
  custom?: ValidatorFunction<any>;
}

type ValidatorFunction<T> = (value: T) => string | undefined;

interface UseCustomFormProps<T> {
  initialValues: T;
  validators?: { [K in keyof T]?: ValidatorRule | ValidatorFunction<T[K]> };
  onSubmit?: (values: T, error: { [K in keyof T]?: string } | null) => void;
}
interface UseCustomFormReturn<T> {
  values: T;
  errors: { [K in keyof T]?: string };
  handleChange: (key: keyof T, value: T[keyof T]) => void;
  setValue: (key: keyof T, value: T[keyof T]) => void;
  handleSubmit: (event: React.FormEvent) => void;
  resetForm: () => void;
  isValid: boolean;
  hasTouched : boolean
}

const useCustomForm = <T,>({
  initialValues,
  validators = {},
  onSubmit,
}: UseCustomFormProps<T>): UseCustomFormReturn<T> => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<{ [K in keyof T]?: string }>({});
  const [hasTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const validate = () => {
    let valid = true;
    const newErrors: { [K in keyof T]?: string } = {};

    for (const key in validators) {
      const validator = validators[key];
      if (typeof validator === "function") {
        const hasError = validator(values[key]);
        if (hasError) {
          valid = false;
          newErrors[key] = hasError;
        }
      }

      if (typeof validator === "object" && validator) {
        if (validator.required && !values[key]) {
          valid = false;
          newErrors[key] = validator.required;
        }
      }
    }
    setIsValid(valid);
    setErrors(newErrors);
    return valid;
  };

  const handleChange = (key: keyof T, value: T[keyof T]) => {
    if (!hasTouched) {
      setIsTouched(true);
    }
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validate()) {
      if (onSubmit) {
        onSubmit(values, null);
      }
    } else {
      if (onSubmit) {
        onSubmit(values, errors);
      }
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  const setValue = (key: keyof T, value: T[keyof T])=>{
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  useEffect(() => {
    validate();
  }, [values]);

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
    isValid,
    setValue,
    hasTouched
  };
};

export default useCustomForm;
