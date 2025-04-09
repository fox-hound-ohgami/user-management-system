'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation'; // useRouter をインポート
import { Box, Typography } from '@mui/material';
import EditUserForm from '@/components/EditUserForm';

const EditUserPage: React.FC = () => {
  const { id } = useParams(); // URL パラメータからユーザー ID を取得
  const router = useRouter(); // ページ遷移用のルーター
  const userId = id as string;
  
  // 【ユーザー一覧画面へ遷移】
  const handleSuccess = () => {
    // 編集成功時にユーザー一覧画面に遷移
    router.push('/users');
  };

  return (
    <Box sx={{ mt: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        ユーザー編集
      </Typography>
      <EditUserForm 
      // 【ユーザー編集画面を表示（EditUserForm を使用)】
      userId={Number(userId)} // 型変換して渡す
      onSuccess={handleSuccess} // 編集成功時コールバック
       /> 
    </Box>
  );
};

export default EditUserPage;
