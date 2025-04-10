import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { User } from '../types/User';
import Link from 'next/link';
import DeleteUserButton from './DeleteUserButton';

interface UserCardProps {
  user: User;
  onDelete: (userId: number) => void; // 削除後に呼ばれるコールバック関数を受け取る
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {
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
        {/* 編集ボタン */}
        <Button size="small" component={Link} href={`/users/${user.id}/edit`}>
          編集
        </Button>
        {/* ✅ 追加：詳細ボタン */}
        <Button size="small" component={Link} href={`/users/${user.id}/details`}>
          詳細
        </Button>

        {/* 2-3-2削除ボタンを DeleteUserButton に差し替え。削除時は onDeleted を呼ぶ */}
        <DeleteUserButton userId={user.id} onDelete={onDelete} />
      </CardActions>
    </Card>
  );
};

export default UserCard;
