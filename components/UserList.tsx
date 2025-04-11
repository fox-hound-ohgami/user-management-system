import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User } from '../types/User';
import CustomCard from './parts/CustomCard';
import { logicallyDeleteUser } from '../utils/api';
import CustomButton from './parts/CustomButton';

// propsで渡されたユーザーの型定義
interface UserListProps {
  users: User[];
}

// ユーザー一覧を表示するコンポーネント
const UserList: React.FC<UserListProps> = ({ users }) => {
   // 表示するユーザーを state で管理（削除後に再描画するため）
  const [displayedUsers, setDisplayedUsers] = useState<User[]>(users);

   // propsの users が更新されたら displayedUsers も更新
  useEffect(() => {
    setDisplayedUsers(users);
  }, [users]);

    // 削除処理（確認ダイアログを表示 → API 呼び出し → UI 更新）
  const handleDelete = async (userId: number) => {
    if (confirm('本当にこのユーザーを削除しますか？')) {
      try {
        await logicallyDeleteUser(userId);
        setDisplayedUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== userId)
        );
      } catch (error) {
        console.error('削除に失敗しました:', error);
        alert('削除に失敗しました。');
      }
    }
  };

  return (
    <>
      {displayedUsers.map((user) => (
        <CustomCard
          key={user.id}
          title={user.name}
          description={`メール: ${user.email} /\n 役割: ${user.role}`}
          actions={
            <>
              <Link href={`/users/${user.id}/edit`} passHref legacyBehavior>
                <a style={{ textDecoration: 'none' }}>
                  <CustomButton
                    variantType="primary"
                    size="small"
                    variant="outlined"
                  >
                    編集
                  </CustomButton>
                </a>
              </Link>

              <Link href={`/users/${user.id}/details`} passHref legacyBehavior>
                <a style={{ textDecoration: 'none' }}>
                  <CustomButton
                    variantType="secondary"
                    size="small"
                    variant="outlined"
                  >
                    詳細
                  </CustomButton>
                </a>
              </Link>
{/* 余分な余白なおす */}
              <CustomButton
                variantType="danger"
                size="small"
                variant="outlined"
                onClick={() => handleDelete(user.id)}
              >
                削除
              </CustomButton>
            </>
          }
        />
      ))}
    </>
  );
};

export default UserList;
