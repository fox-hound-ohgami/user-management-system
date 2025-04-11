// components/parts/CustomButton.tsx

import React, { useState, MouseEvent } from 'react';
import { Button, ButtonProps } from '@mui/material';
import CustomModal from './CustomModal';// カスタムモーダルコンポーネント

// ボタンのprops（外部から渡されるパラメータ）の型を定義
interface CustomButtonProps extends ButtonProps {
  variantType?: 'primary' | 'secondary' | 'danger';// ボタンの種類（色などを制御）
  isConfirm?: boolean;// trueの場合、確認モーダルを表示する
  confirmTitle?: string;// モーダルのタイトル
  confirmContent?: string;// モーダルの本文
  onConfirm?: () => void;// モーダル内「確認」ボタンが押されたときの処理
}

// カスタムボタンのコンポーネント
const CustomButton: React.FC<CustomButtonProps> = ({
  variantType = 'primary',
  isConfirm = false,
  confirmTitle = '確認',
  confirmContent = 'この操作を実行してもよろしいですか？',
  onClick,// 通常のボタンクリック時のイベント
  onConfirm,// モーダル内の「確認」ボタンで実行するイベント
  ...props// 残りのMUI Button用のprops（size, style, childrenなど）
}) => {
  
    // モーダルを表示するかどうかの状態（trueで表示）
  const [modalOpen, setModalOpen] = useState(false);

  // ボタンの色を設定
  const backgroundColors = {
    primary: '#1976d2',
    secondary: '#9c27b0',
    danger: '#d32f2f',
  };

  const backgroundColor = backgroundColors[variantType] || '#1976d2';

  // ボタンクリック時の処理
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (isConfirm) {
       // isConfirmがtrueなら、まず確認モーダルを表示
      setModalOpen(true);
    } else {
      // isConfirmがfalseなら、直接onClickを実行
      onClick?.(e); // イベントを渡す
    }
  };

  // モーダルでの「確認」ボタン
  const handleConfirm = () => {
    onConfirm?.();
    setModalOpen(false);
  };

  return (
    <>
      <Button
        {...props}
        variant="contained"
        onClick={handleClick}
        style={{
          backgroundColor,
          ...props.style,
        }}
      >
        {props.children}
      </Button>

      {isConfirm && (
        <CustomModal
          open={modalOpen}
          title={confirmTitle}
          content={confirmContent}
          onClose={() => setModalOpen(false)}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
};

export default CustomButton;
