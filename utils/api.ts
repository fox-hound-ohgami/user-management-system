import { supabase } from './supabaseClient';
import { User } from '../types/User';

// 「削除済みユーザーを取得しない処理の追加」は、 fetchUsers の中に記載
export const fetchUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase
    .from<'dev_users', User>('dev_users') // 対象テーブルと型を指定
    .select('*')                          // すべてのカラムを取得
    .eq('deleted', false);               // 1-2.削除済みユーザーを取得しない処理の追加

  if (error) {
    throw error;
  }
  return data as User[]; // ユーザー配列を返す
};

// IDを指定して特定のユーザーを取得する関数
export const fetchUserById = async (id: number): Promise<User | null> => {
  const { data, error } = await supabase
    .from<'dev_users', User>('dev_users') // 対象テーブルと型を指定
    .select('*')                          // すべてのカラムを取得
    .eq('id', id)                         // 指定IDのユーザーのみ
    .single();                            // 結果は1件に限定
  if (error) {
    throw error;
  }

  return data as User;
};

//  新しいユーザーを作成する関数
export const createUser = async (user: Omit<User, 'id' | 'deleted'>): Promise<User> => {
  const { data, error } = await supabase
    .from('dev_users')
    .insert(user)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data as User;
};

// ユーザー情報を更新する関数（任意の項目を更新可能）
export const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
  const { data, error } = await supabase
    .from('dev_users')
    .update(user)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data as User;
};

// 1-3.論理削除用の関数（deleted フラグを true に更新することで、「削除済み」として扱う)
export const logicallyDeleteUser = async (id: number): Promise<User> => {
  const { data, error } = await supabase
    .from('dev_users')
    .update({ deleted: true })  // 削除フラグをtrueに設定
    .eq('id', id)               // 対象ユーザーのID
    .select('*')                // 更新後のデータを取得
    .single();                  // 結果は1件に限定

  if (error) {
    throw error;
  }

  return data as User;
};
