export type movie = {
    id: number
    name: string
    image: string
    description: string
    release_date: string
    rating: number
    actors: actor[]
    genres: genre[]

    /** String number as minutes of screentime */
    duration: string

    /** Determines whether show in top banner. If 1 then true  */
    is_coming_soon: 1 | 0
}

export type actor = {
    id: number
    first_name: string
    last_name: string
    image: string
}

export type genre = {
    id: number
    name: string
}


