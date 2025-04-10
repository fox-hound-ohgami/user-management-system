import type { Meta, StoryObj } from '@storybook/react';
import DeleteUserButton from './DeleteUserButton';

// 2. Metaを使用してメタデータを定義
const meta: Meta<typeof DeleteUserButton> = {
  title: 'Components/DeleteUserButton',
  component: DeleteUserButton,
  tags: ['autodocs'],
};

export default meta;

// 3. StoryObjを使用してストーリーを定義
type Story = StoryObj<typeof DeleteUserButton>;

// デフォルトストーリー（例となるユーザーIDを設定）
export const Default: Story = {
  args: {
    userId: 1, // 任意の例となるユーザーID
  },
};
