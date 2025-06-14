import React from 'react'
import { supabase } from '../supabaseClient'

async function fetchTransactions(userId: string) {

    const { data, error } = await supabase
    .rpc('get_transactions_with_category', { p_user_id: userId });


    return { data, error };
}

export default fetchTransactions