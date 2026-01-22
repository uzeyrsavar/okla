import { supabase } from "./supabase"


export async function login(email: string, password: string) {
    
        const {data,error} = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            if(error){
                console.log(error.message + 'auth')
                return error || null
            }
        return data.user
    }

export async function register(email: string, password: string) {
    
    const {data,error} = await supabase.auth.signUp({
        email,
        password
    })
    if(error){
                alert(error.message)
    }

        return data.user
}

export async function loginOnGoogle() {
    
    const {data,error} = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        },

    })
     if (error) {
        alert(error.message)
  }

  return data
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser()
  return data.user
}
