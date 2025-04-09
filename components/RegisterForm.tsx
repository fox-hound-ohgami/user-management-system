'use client';

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
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      await createUser(data); // ユーザー登録処理（API 呼び出し）

      // 成功時：props で渡された onSuccess を呼ぶ、または /users に遷移
      if (onSuccess) {
        onSuccess();
      }

    } catch (error) {
      console.error("登録エラー:", error);
      onError?.(error); // エラー時：props 経由で通知
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
    
  
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
