import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User } from '../types/User';
import CustomCard from './parts/CustomCard';
import { logicallyDeleteUser } from '../utils/api'; // 論理削除API
import CustomButton from './parts/CustomButton';
import CustomModal from './parts/CustomModal'; // モーダルコンポーネント

// propsの型定義：Userオブジェクトの配列を受け取る
interface UserListProps {
  users: User[];
}

// ユーザー一覧表示コンポーネント
const UserList: React.FC<UserListProps> = ({ users }) => {
  // 表示中のユーザー一覧（削除後にも使うためにstateで管理）
  const [displayedUsers, setDisplayedUsers] = useState<User[]>(users);

  // モーダルの表示状態を管理
  const [modalOpen, setModalOpen] = useState(false);

  // 削除対象のユーザーIDを保存する
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // propsのusersが更新されたとき、表示内容も更新
  useEffect(() => {
    setDisplayedUsers(users);
  }, [users]);

  // 削除ボタンが押されたときの処理
  const handleDeleteClick = (userId: number) => {
    setSelectedUserId(userId); // 対象のユーザーIDをセット
    setModalOpen(true); // 確認モーダルを表示
  };

  // モーダル内で「削除を確認」したときの処理
  const handleConfirmDelete = async () => {
    if (selectedUserId !== null) {
      try {
        await logicallyDeleteUser(selectedUserId); // サーバー側で論理削除を実行

        // 削除対象ユーザーを一覧から除外（再レンダリングされる）
        setDisplayedUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== selectedUserId)
        );
      } catch (error) {
        console.error('削除に失敗しました:', error);
        alert('削除に失敗しました。');
      } finally {
        setModalOpen(false); // モーダルを閉じる
        setSelectedUserId(null); // 対象をリセット
      }
    }
  };

  return (
    <>
      {/* 各ユーザーをカード形式で表示 */}
      {displayedUsers.map((user) => (
        <CustomCard
          key={user.id}
          title={user.name} // カードタイトル（ユーザー名）
          description={`メール: ${user.email} / 役割: ${user.role}`} // 説明欄
          actions={
            <>
              {/* 編集ボタン */}
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

              {/* 詳細ボタン */}
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

              {/* 削除ボタン */}
              <CustomButton
                variantType="danger"
                size="small"
                variant="outlined"
                onClick={() => handleDeleteClick(user.id)} // 削除対象をセット＆モーダル表示
              >
                削除
              </CustomButton>
            </>
          }
        />
      ))}

      {/* 確認モーダル */}
      <CustomModal
        open={modalOpen} // モーダル表示状態
        title="削除の確認"
        content="本当にこのユーザーを削除しますか？"
        onClose={() => setModalOpen(false)} // キャンセル時
        onConfirm={handleConfirmDelete} // 削除確定時
      />
    </>
  );
};

export default UserList;
