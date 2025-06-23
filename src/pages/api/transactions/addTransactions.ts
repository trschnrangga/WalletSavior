
import { supabase } from '../supabaseClient'

async function addTransactions(
    catId: number, 
    userId: string,
    name: string,
    description: string,
    date: Date,
    amount: string) {

    const {data, error} = await supabase.from('transactions').insert({
      cat_id: catId,
      user_id: userId,
      name: name,
      description: description,
      date: date,
      amount: parseInt(amount)
    })
    .select("*, categories(name)")
    .single()

    return {data, error}
}

export default addTransactions