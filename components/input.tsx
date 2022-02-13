import React from 'react';
import { IconType } from 'react-icons';

interface InputProps {
  type: string;
  placeholder: string;
  value: string | null;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  icon: JSX.Element;
  width: string;
}

function Input({
  type,
  placeholder,
  value,
  onChange,
  icon,
  width,
}: InputProps) {
  return (
    <div className={`relative`}>
      <span className="absolute top-1/2 -translate-y-1/2 left-3">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        className={`input input-ghost input-bordered pl-11 ${width}`}
        value={value ?? ''}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
