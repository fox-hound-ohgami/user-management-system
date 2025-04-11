// components/parts/CustomButton.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import CustomButton from "./CustomButton";

// メタデータの設定
const meta: Meta<typeof CustomButton> = {
  title: "Components/Parts/CustomButton", // ストーリーのタイトル
  component: CustomButton, // コンポーネントの指定
  tags: ["autodocs"], // ドキュメンテーション生成
};

export default meta;

// ストーリーの定義
export const Primary: StoryObj<typeof CustomButton> = {
  args: {
    variantType: "primary", // ボタンタイプ：primary
    children: "Primary Button", // ボタンのテキスト
  },
};

export const Secondary: StoryObj<typeof CustomButton> = {
  args: {
    variantType: "secondary", // ボタンタイプ：secondary
    children: "Secondary Button", // ボタンのテキスト
  },
};

export const Danger: StoryObj<typeof CustomButton> = {
  args: {
    variantType: "danger", // ボタンタイプ：danger
    children: "Danger Button", // ボタンのテキスト
  },
};
