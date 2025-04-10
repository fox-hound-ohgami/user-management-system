import React from 'react';
import { logicallyDeleteUser } from '../utils/api';
import { Button } from '@mui/material';

// 2-2.インターフェースの定義（DeleteUserButtonPropsを使用）
    // 削除ボタンに渡す props の型（インターフェース）を定義
interface DeleteUserButtonProps {
  userId: number;// 対象のユーザー ID を受け取る
  onDelete: (userId: number) => void; // 論理削除後,再レンダリング用コールバック
}

// 2-3.DeleteUserButtonProps で定義した内容を受け取る(コンポーネント作成：DeleteUserButton）
const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({ userId, onDelete }) => {

// 2-4.削除機能の実装
  const handleDelete = async () => {
     // 削除処理（論理削除）
     if (confirm('本当にこのユーザーを削除しますか？')) {
      try {
        // 1-3.論理削除用に新規関数追加する
              await logicallyDeleteUser(userId); // 論理削除実行
        
        // 2-4.更新成功後は onDelete を実⾏し再レンダリング
              onDelete(userId); // 再レンダリングなどの処理を呼び出す
            } catch (error) {
              console.error('削除に失敗しました:', error);
              alert('削除に失敗しました。');
            }
    }
  };

  return (
// 2-4: 削除ボタン（onClick で handleDelete を呼び出し）    
<Button
variant="outlined"
color="error"
size="small"
onClick={handleDelete}
>
削除
</Button>
  );
};

export default DeleteUserButton;