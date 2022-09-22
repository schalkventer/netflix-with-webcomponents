import { store } from '../store.js'

class Component extends HTMLElement {
    inner = this.attachShadow({ mode: 'closed' })
    label = this.getAttribute('label')
    pagination = parseInt(this.getAttribute('pagination')) || 0
    movies = []

    elements = {
        button: null,
        list: null,
    }

    render() {
        const totalPages = Math.ceil(this.movies.length / 7) - 1
        const width = 400 * 7

        this.inner.innerHTML = /* html */ `
            <style>
                * { 
                    box-sizing: border-box 
                }

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
                    transform: translateX(-${this.pagination * width}px);
                }
            </style>

            <div>
                <h2>${this.label}</h2>

                <ul>
                    ${this.movies.map(({ name, image }) => {
                        return /* html */ `
                            <li>
                                <movie-preview 
                                    label="${name}" 
                                    image="${image}"
                                ><movie-preview>
                            </li>`
                    }).join('')}
                </ul>

                <button>></button>
            </div>
        `
    
        this.elements = {
            list: this.inner.querySelector('ul'),
            button: this.inner.querySelector('button'),
        }
    
        this.elements.button.addEventListener('click', () => {
            const newPagination = this.pagination + 1
            this.pagination = newPagination >= totalPages ? 0 : newPagination
            this.elements.list.style.transform = `translateX(-${newPagination * width}px)`
        })
    }

    connectedCallback() {
        this.innerHTML = '<div>Loading</div>'

        store.startListen(this.label, (prev, next) => {
            if (prev.phase !== next.phase && next.phase === 'resting') {
                this.movies = next.movies.slice(0, 28)
                this.render()
            }
        })
    }

    disconnectedCallback() {
        store.stopListen(this.label)
    }
}

customElements.define('movies-list', Component)