'use client'; // クライアントコンポーネントとしてマーク

import React from 'react';
import RegisterForm from '../../components/RegisterForm';
import { Typography, Box, Container } from '@mui/material'; // Container をインポート
import { useRouter } from 'next/navigation'; // useRouter をインポート

const RegisterPage: React.FC = () => {
  const router = useRouter(); // ルーターの初期化

  const handleSuccess = () => {
    // 登録成功時にユーザー一覧ページに遷移
    router.push('/users');
  };

  const handleError = (error: any) => {
    console.error('登録エラー:', error);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          新規登録
        </Typography>
        <RegisterForm onSuccess={handleSuccess} onError={handleError} />
      </Box>
    </Container>
  );
};

export default RegisterPage;