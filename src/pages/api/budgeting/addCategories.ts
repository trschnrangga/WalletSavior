import { supabase } from '../supabaseClient'  

async function addCategories(userId: string, name: string, budget: string) {

    const {data, error} = await supabase.from('categories').insert({
      user_id: userId,
      name,
      budget: parseInt(budget),
      remaining: parseInt(budget),
    })
    .select()
    .single()

    return {data, error}
}

export default addCategories