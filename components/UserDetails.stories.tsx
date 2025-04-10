import type { Meta, StoryObj } from '@storybook/react'; // Meta型、StoryObj型をインポート
import UserDetails from './UserDetails';                 // UserDetails コンポーネントをインポート

// 2. Meta を使用してストーリーメタデータを定義
const meta: Meta<typeof UserDetails> = {
  title: 'Components/UserDetails', // ストーリーのタイトル（Storybook 上での表示名）
  component: UserDetails,          // 対象となるコンポーネントを指定
};

export default meta;

// 3. StoryObj を使用してストーリーを定義
type Story = StoryObj<typeof UserDetails>;

// 4. デフォルトストーリーに例となるユーザーデータを設定（ID を指定する）
export const Default: Story = {
  args: {
    user: {
      id: 1,                                // ← ここで ID を明示的に指定
      name: 'テスト 花子',
      email: 'hanako.hanako@example.com',
      role: '一般ユーザー',
      deleted: false,
    }
  },
};
