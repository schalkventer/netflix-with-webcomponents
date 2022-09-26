import {
    LitElement,
    html,
} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';


class Component extends LitElement {
    static get properties () {
        return {
            phase: { type: String },
            movies: { type: Array }
        }
    }
    

    movies = []

    render() {
        return html`
            <movies-list .movies=${this.movies} label="Horror"></movies-list>
        `
    }

    connectedCallback() {
        super.connectedCallback();

        const init = async () => {
            const response = await fetch('https://project-apis.codespace.co.za/api/movies')
            
            /** @type {{ data: import('./types').movie[] }} */
            const { data } = await response.json()

            this.movies = data.slice(0, 30)
            this.phase = 'resting'
        }
            
        init()
    }

}

customElements.define('netflix-app', Component)