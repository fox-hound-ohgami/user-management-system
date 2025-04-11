// components/parts/CustomModal.stories.tsx

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import CustomModal from "./CustomModal";
import CustomButton from "./CustomButton";
import { Box } from "@mui/material";

// モーダルのストーリーに必要なメタデータを設定
const meta: Meta<typeof CustomModal> = {
  title: "Components/CustomModal", // Storybook上の表示名
  component: CustomModal,          // 対象コンポーネント
};

export default meta;
// ストーリーの型を定義
type Story = StoryObj<typeof CustomModal>;

// デフォルトストーリーの定義
export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false); // モーダルの開閉状態を管理

    return (
      <Box>
        {/* // クリックでモーダル開閉させる */}
        <CustomButton variantType="primary" onClick={() => setOpen(true)}>
          モーダルを開く
        </CustomButton>

        {/* 必要なプロパティを渡す */}
        <CustomModal
          open={open}
          title="確認"
          content="この操作を実行してもよろしいですか？"
          onClose={() => setOpen(false)} // 閉じる処理
          onConfirm={() => {
            alert("確認ボタンがクリックされました");
            setOpen(false); // モーダルを閉じる
          }}
        />
      </Box>
    );
  },
};
