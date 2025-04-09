import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import RegisterForm from "./RegisterForm";

// メタデータの定義
const meta: Meta<typeof RegisterForm> = {
  title: "Components/RegisterForm", // ← コンポーネント名の設定
  component: RegisterForm,          // ← 対象コンポーネント
  tags: ["autodocs"],               // 自動生成されたドキュメント用のタグ
  argTypes: {
    onSuccess: { action: "onSuccess" }, // 成功時のコールバックをアクションとして表示
    onError: { action: "onError" },     // エラー時のコールバックをアクションとして表示
    disabled: { control: "boolean" },   // disabled プロパティを制御可能に
  },
};

export default meta;

// StoryObj を使用してストーリーの定義
type Story = StoryObj<typeof RegisterForm>;

// デフォルトストーリーを設定
export const Default: Story = {
  args: {
    disabled: false, // デフォルトでボタンを有効化
  },
};