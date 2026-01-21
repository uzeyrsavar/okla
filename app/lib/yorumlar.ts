import { supabase } from "./supabase"

export async function GetSchoolComments(OkulSıra:number){
    const {data , error } = await supabase
    .from('yorumlar')
    .select('*')
    .eq('YORUM_KURUM_SIRA', OkulSıra)
    

    if(data){
        
        return data
   
    }else {
        console.error(error.message)
        return null
    }
    

}