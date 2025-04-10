import React from 'react';
import { User } from '../types/User'; // User 型をインポート
import { Box, Typography } from '@mui/material'; // Material-UI を使用


// 3-1-2.UserDetailsProps インターフェースを定義
interface UserDetailsProps {
  user: User;
}

// 3-1-3.コンポーネントは UserDetailsProps で定義した内容を受け取ることができる
// → props の型として UserDetailsProps を指定している
const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
    return (
        <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', maxWidth: 400, mx: 'auto' }}>
          <Typography variant="h6">
          <strong>名前:</strong> {user.name}
          </Typography>
          <Typography variant="body1">
          <strong>ID:</strong> {user.id}
          </Typography>
          <Typography variant="body1">
            <strong>メールアドレス:</strong> {user.email}
          </Typography>
          <Typography variant="body1">
            <strong>役職:</strong> {user.role}
          </Typography>
        </Box>
  );
};

export default UserDetails;
