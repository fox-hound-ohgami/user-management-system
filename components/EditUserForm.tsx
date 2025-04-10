'use client'; // Next.js のクライアントコンポーネントであることを指定

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form'; // フォーム管理ライブラリ
import {
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material'; // MUI の UI コンポーネント
import { fetchUserById, updateUser } from '../utils/api'; // API 通信関数
import { User } from '../types/User'; // ユーザー型のインポート

// フォームの入力項目の型定義
interface EditUserFormInputs {
  name: string;
  email: string;
  role: string;
}

// コンポーネントの props 型定義（ユーザーIDとコールバック）
interface EditUserFormProps {
  userId: number; // 編集対象のユーザーID
  onSuccess?: () => void; // 成功時の処理（任意）
  onError?: (error: any) => void; // エラー時の処理（任意）
}

// ユーザー編集フォームの定義
const EditUserForm: React.FC<EditUserFormProps> = ({ userId, onSuccess, onError }) => {
  const [loading, setLoading] = useState(true); // ローディング状態
  const [error, setError] = useState<string | null>(null); // エラー状態

  // react-hook-form のフックを使用してフォーム制御
  const {
    register, // フィールド登録
    handleSubmit, // サブミット時の処理
    reset, // フォーム初期化
    formState: { errors, isSubmitting }, // エラーと送信中の状態
  } = useForm<EditUserFormInputs>();

  // ユーザー情報を API から取得してフォームに反映
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user: User | null = await fetchUserById(userId); // APIからユーザー取得
        if (!user) throw new Error('ユーザーが見つかりません');
        // フォームに初期値をセット
        reset({
          name: user.name,
          email: user.email,
          role: user.role,
        });
        setLoading(false); // ローディング解除
      } catch (err: any) {
        setError(err.message || 'ユーザー情報の取得に失敗しました'); // エラー表示
        setLoading(false);
      }
    };
    loadUser();
  }, [userId, reset]);

  // フォーム送信時の処理（更新APIを呼び出す）
  const onSubmit: SubmitHandler<EditUserFormInputs> = async (data) => {
    try {
      await updateUser(userId, data); // APIへ更新リクエスト
      onSuccess?.(); // 成功時にコールバック実行（存在する場合）
    } catch (err: any) {
      setError(err.message || 'ユーザー情報の更新に失敗しました'); // エラーセット
      onError?.(err); // エラー時コールバック実行（存在する場合）
    }
  };

  // ローディング中はスピナーを表示
  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      {/* エラーメッセージ表示 */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {/* フォーム本体 */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 名前フィールド */}
        <TextField
          label="名前"
          fullWidth
          margin="normal"
          {...register('name', {
            required: '名前は必須です',
            validate: value =>
              value.trim() !== '' || '空白のみの入力は許可されていません',
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        {/* メールアドレスフィールド */}
        <TextField
          label="メールアドレス"
          fullWidth
          margin="normal"
          {...register('email', {
            required: 'メールアドレスは必須です',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '正しいメール形式で入力してください',
            },
            validate: value =>
              value.trim() !== '' || '空白のみの入力は許可されていません',
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        {/* 役割フィールド */}
        <TextField
          label="役割"
          fullWidth
          margin="normal"
          {...register('role', {
            required: '役割は必須です',
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: '英字（ローマ字）のみで入力してください',
            },
            validate: value =>
              value.trim() !== '' || '空白のみの入力は許可されていません',
          })}
          error={!!errors.role}
          helperText={errors.role?.message}
        />

        {/* 送信ボタン */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isSubmitting} // 送信中は無効化
          sx={{ mt: 2 }}
        >
          更新
        </Button>
      </form>
    </Box>
  );
};

export default EditUserForm;
