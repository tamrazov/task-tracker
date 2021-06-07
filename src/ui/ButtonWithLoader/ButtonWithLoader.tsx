import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';

export interface ButtonWithLoaderProps {
  text: React.ReactText;
  isLoading: boolean;
  handleClick: (fn: any) => void;
  variant?: string;
}
 
const ButtonWithLoader: React.SFC<ButtonWithLoaderProps> = (
  {text, isLoading, variant = 'primary', handleClick}
) => {
  return (
    <Button
      variant={variant}
      disabled={isLoading}
      onClick={handleClick}
    >
      {isLoading ? 'Загрузка' : text}
    </Button>
  );
};

export default ButtonWithLoader;