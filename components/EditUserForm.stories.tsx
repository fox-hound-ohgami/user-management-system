import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import EditUserForm from "./EditUserForm";

// メタデータの定義
const meta: Meta<typeof EditUserForm> = {
  title: "Components/EditUserForm", // コンポーネント名
  component: EditUserForm,          // 対象コンポーネント
  tags: ["autodocs"],               // 自動生成されたドキュメント用のタグ
  argTypes: {
    userId: { control: "number" },  // userId を Storybook で制御可能に
  },
};

export default meta;

// ストーリーの定義
type Story = StoryObj<typeof EditUserForm>;

// デフォルトストーリー
export const Default: Story = {
  args: {
    userId: 1, // 例となるユーザーID
  },
};