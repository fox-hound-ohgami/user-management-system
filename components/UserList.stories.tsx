import type { Meta, StoryObj } from '@storybook/react';
import UserList from './UserList';
import { User } from '../types/User';

// 2. Meta を使用してストーリーメタデータを定義
const meta: Meta<typeof UserList> = {
  title: 'Components/UserList',
  component: UserList,
};

export default meta;

// 3. StoryObj を使用してストーリーを定義
type Story = StoryObj<typeof UserList>;

// 4. デフォルトストーリーに例となるユーザーデータを設定（2名分）
const dummyUsers: User[] = [
  {
    id: 1,
    name: 'テスト 太郎',
    email: 'taro@example.com',
    role: 'admin',
    deleted: false,
  },
  {
    id: 2,
    name: 'テスト 花子',
    email: 'hanako@example.com',
    role: 'user',
    deleted: false,
  },
];

// Default ストーリーを定義し、props にダミーユーザーを渡す
export const Default: Story = {
  args: {
    users: dummyUsers,
  },
};