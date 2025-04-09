// components/RegisterForm.tsx

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import { createUser } from "../utils/api";

// props の型定義
interface RegisterFormProps {
  onSuccess?: () => void;         // 登録成功時に呼ばれる（画面遷移など）
  onError?: (error: any) => void; // 登録失敗時に呼ばれる（エラー表示など）
  disabled?: boolean;             // 登録ボタンの無効化制御
}

// フォームに入力されるデータの型
interface RegisterFormInputs {
  name: string;
  email: string;
  role: string;
}
// コンポーネント本体
const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onError, disabled }) => {
  const {
    register, // 入力フィールドをフォームに登録する関数
    handleSubmit, // フォーム送信時の処理をラップする関数
    formState: { errors },// 入力エラー情報
  } = useForm<RegisterFormInputs>();
// フォーム送信時に呼ばれる関数
  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      await createUser(data);      // ユーザー登録  処理新規登録処理の実装（api.ts/createUserを使用）
      onSuccess?.();               // 成功時コールバック呼び出し
    } catch (error) {
      console.error("登録エラー:", error);
      onError?.(error);            // 失敗時コールバック呼び出し
    }
  };
  // 名前、メール、ロールが登録されるフォーム
  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        新規登録
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="名前"
          {...register("name", { required: "名前は必須です" })}
          fullWidth
          margin="normal"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="メールアドレス"
          {...register("email", { required: "メールアドレスは必須です" })}
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="役割"
          {...register("role", { required: "役割は必須です" })}
          fullWidth
          margin="normal"
          error={!!errors.role}
          helperText={errors.role?.message}
        />
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
