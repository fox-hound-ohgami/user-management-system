// app/users/[id]/details/page.tsx

import React from 'react';
import UserDetails from '@/components/UserDetails'; // UserDetails コンポーネントをインポート

// ✅ ユーザー型（外部型がない前提で定義）
type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  deleted: boolean;
};

// ✅ ユーザー情報取得関数（本番は API に置き換え）
const fetchUser = async (id: number): Promise<User | null> => {
  // モックデータ：実際は API などで取得
  if (isNaN(id)) return null;
  return {
    id,
    name: '山田 太郎',
    email: 'taro.yamada@example.com',
    role: '管理者',
    deleted: false,
  };
};

// ✅ UserDetailsPage コンポーネントを作成
const UserDetailsPage = async ({ params }: { params: { id: string } }) => {
  const userId = parseInt(params.id, 10);
  const user = await fetchUser(userId);

  if (!user) {
    return (
      <main style={{ padding: '2rem' }}>
        <p>ユーザーが見つかりません。</p>
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1 className="text-2xl font-bold mb-4">ユーザー詳細</h1>
      <UserDetails user={user} />
    </main>
  );
};

export default UserDetailsPage;
