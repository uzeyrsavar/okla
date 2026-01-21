export interface yorumlarTypes{
    YORUM_ID:string,
    KULLANICI_UID:string,
    YORUM_METNİ:string,
    YORUM_TARİH:string,
    YORUM_REPORT:boolean,
    YORUM_REPORT_SAYISI:number,
    YORUM_KURUM_SIRA:number,
    YORUM_BEGENI_SAYISI:number,
    USER_METADATA:{
        sub: string

        name: string

        email?: string

        picture?: string
        avatar_url?: string

        full_name?: string

        provider_id?: string

        email_verified?: boolean
        phone_verified?: boolean

        iss?: string
    }

}