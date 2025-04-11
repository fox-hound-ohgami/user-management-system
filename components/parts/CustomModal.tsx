// components/parts/CustomModal.tsx

import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

// モーダルのプロパティ型定義
interface CustomModalProps {
  open: boolean; // モーダルの開閉状態
  title: string; // モーダルのタイトル
  content: string; // モーダルの内容
  onClose: () => void; // モーダルを閉じる関数
  onConfirm?: () => void; // 確認ボタンのクリック時に実行する関数（オプショナル）
}

// モーダルのスタイルを定義
const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

// CustomModalコンポーネントの実装
const CustomModal: React.FC<CustomModalProps> = ({ 
  open, 
  title, 
  content, 
  onClose, 
  onConfirm }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom>
          {title}
        </Typography>
        <Typography sx={{ mt: 2 }}>{content}</Typography>
        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onClose} sx={{ mr: 2 }}>
            キャンセル
          </Button>
          {onConfirm && (
            <Button variant="contained" color="primary" onClick={onConfirm}>
              確認
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
