// components/parts/CustomCard.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import CustomCard from "./CustomCard";
import CustomButton from "./CustomButton";

// メタデータの設定
const meta: Meta<typeof CustomCard> = {
  title: "Components/Parts/CustomCard",  // Storybookで表示されるタイトル
  component: CustomCard,                // 使用するコンポーネント
  tags: ["autodocs"],                   // 自動ドキュメント生成用のタグ
};

export default meta; // メタデータのエクスポート

// ストーリーの定義
export const Default: StoryObj<typeof CustomCard> = {
  args: {
    title: "カードタイトル",
    description: "これはカスタムカードの説明です。",
    actions: (
      <>
        <CustomButton variantType="secondary">アクション1</CustomButton>
        <CustomButton variantType="danger">アクション2</CustomButton>
      </>
    ),
  },
};

// アクションなしのカードストーリー
export const WithoutActions: StoryObj<typeof CustomCard> = {
  args: {// propsとして渡す内容を定義
    title: "アクションなしのカード",
    description: "アクションが含まれていないカードの説明。",
  },
};
