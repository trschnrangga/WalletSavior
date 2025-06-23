
import { supabase } from '../supabaseClient'

async function deleteTransactions(transactionIds: number[]) {

    const {data, error} = await supabase.from('transactions')
     .delete()
    .in('id', transactionIds)
    .select()

    return {data, error}
}

export default deleteTransactions