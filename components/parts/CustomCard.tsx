// components/parts/CustomCard.tsx
import React from 'react';
import { Card, CardContent, Typography, CardActions } from '@mui/material';

// 2-1-3.CustomCardPropsを修正
// CustomCardPropsインターフェースは、カードに渡す必要があるpropsの型を定義しています。
interface CustomCardProps {
  title: string;         // カードのタイトル
  description: string; 
  extraInfo?: string; // ← 追加（オプション扱い）  // カードの説明
  actions?: React.ReactNode; // カードのアクション（ボタンなど）。省略可能
}

// 2-1-4.CardContentに[titel]と[description]を表⽰
// propsとして渡されたtitle、description、actionsを利用してカードを表示するコンポーネント
const CustomCard: React.FC<CustomCardProps> = ({ title, description, actions }) => {
  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>  {/* MUIのCardコンポーネント。スタイルで最小幅とマージンを設定 */}
      <CardContent>  {/* カードの内容部分 */}
        {/* 
          タイトルを表示します。 
          gutterBottomは、タイトル下の余白を追加するために使用します。
        */}
        <Typography variant="h5" component="div" gutterBottom>
          {title}  {/* titleが表示される部分 */}
        </Typography>
        {/* 
          説明文を表示します。 
          text.secondaryは文字色を暗くするために使っています。
        */}
        <Typography variant="body2">
          {description.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </Typography>
      </CardContent>

      {/* 
        actions（ボタンなどのアクション）が渡されている場合に表示する部分。
        actionsが存在する場合のみCardActionsを表示する。
      */}
      {actions && <CardActions>{actions}</CardActions>}
    </Card>
  );
};

// CustomCardコンポーネントをエクスポート
export default CustomCard;
