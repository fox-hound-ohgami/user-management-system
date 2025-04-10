import React, { useState, useEffect } from 'react';
import UserCard from './UserCard'; // UserCard コンポーネントをインポート
import { User } from '../types/User';

// 2. UserListProps インターフェースを定義（users: User[] を使用）
interface UserListProps {
  users: User[]; // ユーザー情報の配列
}

// 1. UserList コンポーネントを定義
// 3. UserListProps で定義した内容（users）を props として受け取る
const UserList: React.FC<UserListProps> = ({ users }) => {
  // propsで受け取ったusersをstateにコピーしてローカルで管理（削除時に更新可能に）
  const [displayedUsers, setDisplayedUsers] = useState<User[]>(users);

  // props.users が変わったときに state も更新
  useEffect(() => {
    setDisplayedUsers(users);
  }, [users]);

  // 2-3-3.ユーザーが削除されたときに呼び出される関数
  const handleDelete = (userId: number) => {
    // filter を使って対象ユーザーを除外し、再レンダリング
    setDisplayedUsers((prev) => prev.filter((user) => user.id !== Number(userId)));
  };

  return (
    <>
      {/* 4. users のデータを使って UserCard コンポーネントを呼び出し */}
      {displayedUsers.map((user) => (
        <UserCard key={user.id} user={user} onDelete={handleDelete} />
      ))}
    </>
  );
};

export default UserList;
