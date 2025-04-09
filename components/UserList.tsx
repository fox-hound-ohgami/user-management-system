import React from 'react';
import UserCard from './UserCard'; // UserCard コンポーネントをインポート
import { User } from '../types/User';

// 2.UserListProps インターフェースを定義（users: User[] を使用）
interface UserListProps {
  users: User[]; // ユーザー情報の配列
}

// 1.UserList コンポーネントを定義
// 3.UserListProps で定義した内容（users）を props として受け取る
const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <>
      {/* 4.users のデータを使って UserCard コンポーネントを呼び出し */}
      {/* ※ fetch は使用しない */}
      {users.map((user) => (
        <UserCard key={user.id} user={user} /> // UserCard コンポーネントを呼び出し
      ))}
    </>
  );
};

export default UserList;