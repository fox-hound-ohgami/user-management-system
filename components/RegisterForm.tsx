'use client';

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";
import { createUser } from "../utils/api";

// props の型定義（親コンポーネントから渡されるオプションのコールバック）
interface RegisterFormProps {
  onSuccess?: () => void;       // 登録成功時に呼び出されるコールバック
  onError?: (error: any) => void; // 登録失敗時に呼び出されるコールバック
  disabled?: boolean;           // フォームの送信ボタンを無効にするかどうか
}

// フォームで扱うデータの型（name, email, role の3つ）
interface RegisterFormInputs {
  name: string;
  email: string;
  role: string;
}

// ユーザー登録フォームコンポーネント
const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onError, disabled }) => {
  // React Hook Form を使用してフォームの状態を管理
  const {
    register,         // 入力欄を React Hook Form に登録
    handleSubmit,     // フォーム送信ハンドラー
    formState: { errors }, // バリデーションエラーの状態
  } = useForm<RegisterFormInputs>();

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      // API を使ってユーザーを新規作成
      await createUser(data);
      // 成功時のコールバックがあれば実行
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("登録エラー:", error);
      // 失敗時のコールバックがあれば実行
      onError?.(error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      {/* フォーム本体 */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 名前の入力欄：必須、最大50文字 */}
        <TextField
          label="名前"
          {...register("name", {
            required: "名前は必須です",
            maxLength: {
              value: 50,
              message: "名前は50文字以内で入力してください",
            },
          })}
          fullWidth
          margin="normal"
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        {/* メールアドレスの入力欄：必須、形式チェック  valueの中の羅列＝正規表現 */}
        <TextField
          label="メールアドレス"
          {...register("email", {
            required: "メールアドレスは必須です",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "正しいメールアドレス形式で入力してください",
            },
          })}
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        {/* 役割の入力欄：必須、英字のみ valueの中の羅列＝正規表現*/}
        <TextField
          label="役割"
          {...register("role", {
            required: "役割は必須です",
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: "英字（ローマ字）のみで入力してください",
            },
          })}
          fullWidth
          margin="normal"
          error={!!errors.role}
          helperText={errors.role?.message}
        />

        {/* 送信ボタン */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={disabled}
        >
          登録
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;
