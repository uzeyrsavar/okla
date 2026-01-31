'use client'
import { supabase } from "@/app/lib/supabase";
import { useState } from "react";

const PAGE_SIZE = 20;

type SearchParams = {
  text?: string;
  il?: string;
  ilce?: string;
  tur?: string;
  page?: number;
};
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replaceAll("ı", "i")
    .replaceAll("İ", "i")
    .replaceAll("ş", "s")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}


export async function okulAra({
    
  text,
  il,
  ilce,
  tur,
  page = 1,
}: SearchParams) {
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("tümokullar")
    .select(
      `
       KURUM_ADI,
       IL_ADI,
       ILCE_ADI,
       KURUM_TUR_ADI,
       slug`,
      { count: "exact" }
    )
    .range(from, to);

    if(!text) return
  if (text) {
    query = query.ilike("slug", `%${slugify(text)}%`);
  }

  if (il) query = query.ilike("IL_ADI", il);
  if (ilce) query = query.ilike("ILCE_ADI", `%${ilce.trim()}%`);
  if (tur) query = query.eq("KURUM_TUR_ADI", tur);

  const { data, count, error } = await query;

  if (error) alert(error.message);

  return {
    data,
    total: count ?? 0,
    totalPages: Math.ceil((count ?? 0) / PAGE_SIZE),
  };
}



export async function FindSchoolOnSlug(UrlSlug:string){
 
        const {data , error} = await supabase
        .from('tümokullar')
        .select('*')
        .eq('slug',UrlSlug)
        .single()
        

        if(data){
            
            
            return data
            
        }else if (!data || data.length === 0){
        
            console.error(error?.message)
            return null
        }
    } 