import {
    LitElement,
    html,
    css,
} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

class Component extends LitElement {
    static get properties() {
        return {
            label: { type: String },
            pagination: { type: Number },
            movies: { state: true, type: Array }
        }
    }

    static styles = css`
        div {
            padding: 1rem;
        }

        h2 {
            font-family: sans-serif;
            font-size: 48px;
        }

        ul {
            transition: transform 600ms;
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            transform: translateX(0px);
        }
    `

    next() {
        const totalPages = Math.ceil(this.movies.length / 7) - 1
        const width = 400 * 7

        const newPagination = this.pagination + 1
        this.pagination = newPagination >= totalPages ? 0 : newPagination

        const list = this.querySelector('ul')
        list.style.transform = `translateX(-${newPagination * width}px)`
    }

    render() {    
        return html`
            <h2>${this.label}</h2>

            <ul>
                ${this.movies.map(({ name, image }) => {
                    return html`
                        <li>
                            <div>${name} ${image}</div>
                        </li>`
                })}
            </ul>

            <button @click="${this.next}">NEXT</button>
        `
    }
}

customElements.define('movies-list', Component)