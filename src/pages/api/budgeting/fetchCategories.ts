import React from 'react'
import { supabase } from '../supabaseClient'

async function fetchCategories(userId: string) {

    const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

    return { data, error };
}

export default fetchCategories