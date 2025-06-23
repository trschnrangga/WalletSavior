
import { supabase } from '../supabaseClient'

async function fetchSpentBudgetData(userId: string) {

    const { data, error } = await supabase
    .rpc('get_category_spent_data', { p_user_id: userId });

    return {data, error };
}

export default fetchSpentBudgetData