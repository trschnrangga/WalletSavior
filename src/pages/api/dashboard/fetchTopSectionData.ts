
import { supabase } from '../supabaseClient'

async function fetchTopSectionData(userId: string) {

    const { data, error } = await supabase
    .rpc('get_transactions_amount_total', { p_user_id: userId });


    return { data: data[0], error };
}

export default fetchTopSectionData