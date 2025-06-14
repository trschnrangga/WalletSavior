import React from 'react'
import { supabase } from '../supabaseClient'

async function fetchCategories(userId: string) {

    const { data, error } = await supabase
    .rpc('get_categories_with_remaining', { p_user_id: userId });

    return { data, error };
}

export default fetchCategories