import supabase from './supabaseClient';

const TABLE_NAME = 'cgpa_user_data';

/**
 * Save semesters data for the current user into the `cgpa_user_data` table.
 * Table schema expected:
 *  - user_id: text (primary key)
 *  - data: jsonb
 *  - updated_at: timestamptz
 */
export async function saveUserData(userId: string, data: any) {
  if (!userId) throw new Error('No user id');
  const payload = { user_id: userId, data, updated_at: new Date().toISOString() };
  const { error } = await supabase.from(TABLE_NAME).upsert(payload, { onConflict: 'user_id' });
  if (error) throw error;
  return true;
}

export async function loadUserData(userId: string) {
  if (!userId) throw new Error('No user id');
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('data, updated_at')
    .eq('user_id', userId)
    .single();
  if (error) {
    if ((error as any).code === 'PGRST116') return null; // no rows
    throw error;
  }
  return data ? { data: data.data, updated_at: data.updated_at } : null;
}
