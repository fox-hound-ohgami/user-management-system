import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

// ナビゲーションバー（上部メニュー）のコンポーネント定義
const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          ユーザー管理システム
        </Typography>
        <Button color="inherit" component={Link} href="/">
          ホーム
        </Button>
        <Button color="inherit" component={Link} href="/users">
          ユーザー一覧
        </Button>
        {/* 新規登録ページへのリンクボタン */}
        <Button color="inherit" component={Link} href="/register">
          新規登録
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;