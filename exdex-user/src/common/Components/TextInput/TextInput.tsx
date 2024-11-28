import React, { InputHTMLAttributes } from 'react';
import styles from './TextInput.module.scss';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const TextInput: React.FC<TextInputProps> = ({ ...textProps }) => {
  return (
    <div className={styles.container}>
      <input {...textProps} />
    </div>
  );
};

export default TextInput;