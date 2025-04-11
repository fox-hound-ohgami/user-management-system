import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { User } from '../types/User';
import Link from 'next/link';
import CustomButton from './parts/CustomButton'; // ← 差し替え対象
import { logicallyDeleteUser } from '../utils/api'; // ← 忘れずにインポート！

interface UserCardProps {
  user: User;
  onDelete: (userId: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {
  const handleDelete = async () => {
    if (confirm('本当にこのユーザーを削除しますか？')) {
      try {
        await logicallyDeleteUser(user.id); // ← userId じゃなくて user.id に修正
        onDelete(user.id);
      } catch (error) {
        console.error('削除に失敗しました:', error);
        alert('削除に失敗しました。');
      }
    }
  };

  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {user.name}
        </Typography>
        <Typography color="text.secondary">
          {user.email}
        </Typography>
        <Typography variant="body2">
          役割: {user.role}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} href={`/users/${user.id}/edit`}>
          編集
        </Button>
        <Button size="small" component={Link} href={`/users/${user.id}/details`}>
          詳細
        </Button>

        {/* ✅ 削除ボタンを CustomButton に差し替え */}
        <CustomButton
          color="error"
          size="small"
          variant="outlined"
          onClick={handleDelete}>
          削除
          </CustomButton>
      </CardActions>
    </Card>
  );
};

export default UserCard;
