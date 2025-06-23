
import { supabase } from '../supabaseClient'

async function editCategory(catId: number, name: string, budget: number) {

    const {data, error} = await supabase.from('categories')
    .update({
        name: name,
        budget: budget
    })
    .eq("id", catId)
    .select()



    return {data, error}
}

export default editCategory