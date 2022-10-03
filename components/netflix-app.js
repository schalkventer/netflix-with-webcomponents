import {
    LitElement,
    html,
} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

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
    }

    static get properties () {
        return {
            phase: { type: String },
            movies: { type: Array },
            genres: { type: Object }
        }
    }
    

    movies = []

    render() {
        return html`
            <movies-list .movies=${this.genres.horror} label="Horror"></movies-list>
            <movies-list .movies=${this.genres.drama} label="Drama"></movies-list>
            <movies-list .movies=${this.genres.action} label="Action"></movies-list>

        `
    }

    connectedCallback() {
        super.connectedCallback();

        const init = async () => {
            const response = await fetch('/api/data.json')
            
            /** @type {{ data: import('../types').movie[] }} */
            const { data } = await response.json()

            this.movies = data

            this.genres = {
                drama: data.filter(item => isGenre(item, 'Drama')),
                horror: data.filter(item => isGenre(item, 'Horror')),
                action: data.filter(item => isGenre(item, 'Action')),
            }
        }
            
        init()
    }

}

customElements.define('netflix-app', Component)

