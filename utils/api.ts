import { supabase } from './supabaseClient';
import { User } from '../types/User';

// 全ユーザーを取得する関数
export const fetchUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase
    .from<'dev_users', User>('dev_users') // テーブル名と型を2つ指定
    .select('*');

  if (error) {
    throw error;
  }
  return data as User[];// ユーザー配列を返す
};
// IDを指定して特定のユーザーを取得する関数
export const fetchUserById = async (id: number): Promise<User | null> => {
  const { data, error } = await supabase
    .from<'dev_users', User>('dev_users')// テーブル名と型を指定
    .select('*')// 全てのカラムを選択
    .eq('id', id)// IDが一致する行を取得
    .single();// 結果を1件に限定

  if (error) {
    if (error.code === 'PGRST116') { // No rows found
      return null;
    }
    throw error;
  }

  return data as User;
};
// 新しいユーザーを作成する関数
export const createUser = async (user: Omit<User, 'id' | 'deleted'>): Promise<User> => {
  const { data, error } = await supabase
    .from('dev_users')// テーブル名を指定
    .insert(user)// 新しいユーザーを挿入
    .select('*')// 挿入後のデータを取得
    .single();// 結果を1件に限定

  if (error) {
    throw error;
  }

  return data as User;
};
// ユーザー情報を更新する関数
export const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
  const { data, error } = await supabase
    .from('dev_users')// テーブル名を指定
    .update(user)// 更新するデータを指定
    .eq('id', id) // IDが一致する行を更新
    .select('*')// 更新後のデータを取得
    .single();// 結果を1件に限定

  if (error) {
    throw error;
  }

  return data as User; // 更新されたユーザーデータを返す
};
// ユーザーを削除する関数
export const deleteUser = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from('dev_users')// テーブル名を指定
    .delete()// データを削除
    .eq('id', id);// IDが一致する行を削除

  if (error) {
    throw error;
  }
};