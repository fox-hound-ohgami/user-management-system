'use client'; // クライアントコンポーネントとしてマーク

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { fetchUserById, updateUser } from '../utils/api';
import { User } from '../types/User';

// フォームの入力型
interface EditUserFormInputs {
  name: string;
  email: string;
  role: string;
}

// コンポーネントに渡す props の型（userId が必要）
interface EditUserFormProps {
  userId: number;
}

// ユーザー編集フォームコンポーネント
const EditUserForm: React.FC<EditUserFormProps> = ({ userId }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // フォーム操作に必要な関数と状態を useForm で取得
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditUserFormInputs>();

  // 初回レンダリング時に対象ユーザーのデータを取得
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user : User | null = await fetchUserById(userId);
        if (!user) {
          throw new Error('ユーザーが見つかりません');
        }
        reset({
          name: user.name,
          email: user.email,
          role: user.role,
        }); // フォームに初期値を設定
        setLoading(false); // ロード完了
      } catch (err: any) {
        setError(err.message || 'ユーザー情報の取得に失敗しました');
        setLoading(false);
      }
    };
    loadUser();
  }, [userId, reset]);

  // フォーム送信時の処理（ユーザー情報の更新）
  const onSubmit: SubmitHandler<EditUserFormInputs> = async (data) => {
    try {
      await updateUser(Number(userId), data); // API を使って更新
    } catch (err: any) {
      setError(err.message || 'ユーザー情報の更新に失敗しました');
    }
  };

  // ローディング中はインジケーターを表示
  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // フォーム表示部分
  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        ユーザー情報編集
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="名前"
          fullWidth
          margin="normal"
          {...register('name', { required: '名前は必須です' })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="メールアドレス"
          fullWidth
          margin="normal"
          {...register('email', { required: 'メールアドレスは必須です' })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="役割"
          fullWidth
          margin="normal"
          {...register('role', { required: '役割は必須です' })}
          error={!!errors.role}
          helperText={errors.role?.message}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isSubmitting}
          sx={{ mt: 2 }}
        >
          更新
        </Button>
      </form>
    </Box>
  );
};

export default EditUserForm;