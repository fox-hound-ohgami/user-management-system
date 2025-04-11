// components/parts/CustomButton.tsx
import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  variantType?: 'primary' | 'secondary' | 'danger';
}

const CustomButton: React.FC<CustomButtonProps> = ({ variantType = 'primary', ...props }) => {
  let backgroundColor = '';

  // variantTypeに応じて背景色を設定
  switch (variantType) {
    case 'primary':
      backgroundColor = '#1976d2'; // 青
      break;
    case 'secondary':
      backgroundColor = '#9c27b0'; // 紫
      break;
    case 'danger':
      backgroundColor = '#d32f2f'; // 赤
      break;
    default:
      backgroundColor = '#1976d2'; // デフォルトは青
  }

  return (
    <Button
      {...props}
      variant="contained"
      sx={{
        backgroundColor,
        '&:hover': {
          backgroundColor: `${backgroundColor}cc`, // hover時に色を薄く
        }
      }}
    >
      {props.children}
    </Button>
  );
};

export default CustomButton;
