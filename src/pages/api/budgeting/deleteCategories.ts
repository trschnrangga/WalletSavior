import React from 'react'
import { supabase } from '../supabaseClient'

async function deleteCategories(catId: number) {

    const {data, error} = await supabase.from('categories')
    .delete()
    .eq("id", catId)
    .select()

    return {data, error}
}

export default deleteCategories