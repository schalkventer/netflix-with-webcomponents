import {
    LitElement,
    html,
} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

import { store } from '../store.js'

const LOCAL_STORAGE_WISHLIST_KEY = '35977968-bf4e-4322-bbf3-229f93f35e29'

/** 
 * @param {import('../types').movie} movie
 * @param {string} genre
 * @returns {boolean}
 */
 const isGenre = (movie, genre) => {
    if (!movie.genres) return false
    const genresAsArray = movie.genres.map(item => item.name)
    return genresAsArray.includes(genre)
}

class Component extends LitElement {
    constructor() {
        super()
        this.movies = []
        this.wishlisted = []
        
        this.genres = {
            /** @type {any} */
            horror: [],

            /** @type {any} */
            drama: [],

            /** @type {any} */
            action: [],
        }
    }

    static get properties () {
        return {
            movies: { type: Array },
            genres: { type: Object },
            wishlisted: { type: Array, state: true }
        }
    }

    undo() {
        store.undo()
    }
    
    render() {
        return html`
            <ul>
                ${this.wishlisted.map((id) => {
                    const movie = this.movies.find(item => item.id === parseInt(id))
                    return html`<li>${movie.name}</li>`
                })}
            </ul>

            <button @click="${this.undo}">UNDO</button>

            <movies-list .movies=${this.genres.horror} label="Horror"></movies-list>
            <movies-list .movies=${this.genres.drama} label="Drama"></movies-list>
            <movies-list .movies=${this.genres.action} label="Action"></movies-list>
        `
    }

    connectedCallback() {
        super.connectedCallback();

        const init = async () => {
            const response = await fetch('https://netflix-cs-api.netlify.app/')
            
            /** @type {{ data: import('../types').movie[] }} */
            const { data } = await response.json()

            this.movies = data

            this.genres = {
                drama: data.filter(item => isGenre(item, 'Drama')),
                horror: data.filter(item => isGenre(item, 'Horror')),
                action: data.filter(item => isGenre(item, 'Action')),
            }
        }
            
        store.subscribe({ id: 'wishlisted-change', callback: (current, next) => {
            if (current.wishlisted.length === next.wishlisted.length) return
            this.wishlisted = next.wishlisted
        } })

        const stringWishlist = window.localStorage.getItem(LOCAL_STORAGE_WISHLIST_KEY)

        /** @type {string[]} */
        const wishlisted = stringWishlist ? JSON.parse(stringWishlist) : []

        store.update(state => ({
            ...state,
            wishlisted,
        }))

        store.subscribe({ id: 'local-storage-save', callback: (prev, next) => {
            if (prev.wishlisted.length === next.wishlisted.length) return
            window.localStorage.setItem(LOCAL_STORAGE_WISHLIST_KEY, JSON.stringify(next.wishlisted))
        }})

        init()
    }

}

customElements.define('netflix-app', Component)

