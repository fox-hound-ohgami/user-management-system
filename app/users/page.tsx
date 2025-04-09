'use client'; // クライアントコンポーネントであることを明示

import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../utils/api'; // ユーザーデータ取得のユーティリティ関数
import { User } from '../../types/User'; // User 型のインポート
import UserList from '../../components/UserList'; // UserList コンポーネントのインポート
import { Typography, CircularProgress, Alert, Box } from '@mui/material';

const UsersPage: React.FC = () => {
  // ユーザー一覧のステート
  const [users, setUsers] = useState<User[]>([]);
  // 読み込み状態のステート
  const [loading, setLoading] = useState<boolean>(true);
  // エラーメッセージのステート
  const [error, setError] = useState<string | null>(null);

  // コンポーネントのマウント時にユーザー情報を取得
  // 2. 一覧ページにアクセスした際にユーザー一覧を表示するための処理を実装
  useEffect(() => {
    const getUsers = async () => {
      try {
        // ユーザー一覧をAPIから取得
        const data = await fetchUsers();
        setUsers(data); // 取得したユーザー情報をステートにセット
      } catch (err) {
        // エラーが発生した場合の処理
        setError('ユーザーの取得に失敗しました。' + err);
      } finally {
        setLoading(false); // ローディング終了
      }
    };

    getUsers(); // 関数の実行
  }, []);

  // 読み込み中の表示
  if (loading) {
    return <CircularProgress />;
  }

  // エラー発生時の表示
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      {/* ページタイトル */}
      <Typography variant="h4" gutterBottom>
        ユーザー一覧
      </Typography>

      {/* 3.UserList コンポーネントを使用し、propsでユーザー配列を渡す */}
      <UserList users={users} />
    </Box>
  );
}

export default UsersPage;
