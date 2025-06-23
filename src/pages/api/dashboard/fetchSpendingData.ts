import React from 'react'
import { supabase } from '../supabaseClient'

async function fetchSpendingData(userId: string) {

    const { data, error } = await supabase
    .rpc('get_spending_data', { p_user_id: userId });

    return {data, error};
}

export default fetchSpendingData