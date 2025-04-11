// components/parts/CustomButton.tsx

import React from 'react';
import { Button, ButtonProps } from '@mui/material';

// CustomButtonコンポーネントのpropsの型定義
interface CustomButtonProps extends ButtonProps {
  variantType?: 'primary' | 'secondary' | 'danger';
}

// CustomButtonコンポーネントの実装
const CustomButton: React.FC<CustomButtonProps> = ({ variantType = 'primary', ...props }) => {
  let backgroundColor = '';

  // variantTypeに応じて背景色と文字色を設定
  switch (variantType) {
    case 'primary':
      backgroundColor = '#1976d2'; // MUIのprimary色
      break;
    case 'secondary':
      backgroundColor = '#9c27b0'; // MUIのsecondary色
      break;
    case 'danger':
      backgroundColor = '#d32f2f'; // MUIのerror色
      break;
    default:
      backgroundColor = '#1976d2';
  }

  return (
    <Button
      {...props}
      variant="contained"
      style={{
        backgroundColor,
        ...props.style, // 他のスタイルが渡された場合にマージ
      }}
    >
      {props.children}
    </Button>
  );
};

export default CustomButton;