import {
    LitElement,
    html,
    css,
    ref,
    createRef,
} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

class MoviesList extends LitElement {
    static get properties() {
        return {
            label: { type: String },
            movies: { state: true, type: Array },
            video: { state: true }
        }
    }

    static styles = css`
        div {
            position: relative;
        }

        img {
            height: 24px;
            width: 24px;
        }

        button {
            position: absolute;
            top: 50%;
            background: black;
            fill: white;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            cursor: pointer;
        }

        button:hover {
            opacity: 0.7;
        }

        .next {
            right: 0;
        }

        .prev {
            left: 0;
            transform: rotate(180deg)
        }

        h2 {
            font-family: sans-serif;
            font-size: 48px;
        }

        ul {
            transition: transform 600ms;
            list-style: none;
            margin: 0;
            padding: 2rem;
            display: flex;
            transform: translateX(0px);
            overflow-x: scroll;
            scroll-behavior: smooth;
            -ms-overflow-style: none;
            scrollbar-width: none; 
        }

        ul::-webkit-scrollbar { 
            display: none;
        }
    `



    next() {
        const ulWidth = this.listRef.value.clientWidth
        const currentScroll = this.listRef.value.scrollLeft
        const newScroll = currentScroll + ulWidth
        this.listRef.value.scrollLeft = newScroll
    }

    prev() {
        const ulWidth = this.listRef.value.clientWidth
        const currentScroll = this.listRef.value.scrollLeft
        const newScroll = currentScroll - ulWidth
        this.listRef.value.scrollLeft = newScroll
    }


    render() {    
        return html`

            <h2>${this.label}</h2>

            <div>
                <ul ${ref(this.listRef)}>
                    ${this.movies.map(({ name, image }) => {
                        return html`
                            <movie-preview image="${image}" label="${name}"></movie-preview>`
                    })}
                </ul>

                <button class="prev" @click="${this.prev}" aria-label="Go to previous"><img src="/assets/icon.svg"></button>
                <button class="next" @click="${this.next}" aria-label="Go to next"><img src="/assets/icon.svg"></button>
            </div>
        `
    }

    constructor() {
        super()
        this.listRef = createRef()
        this.pagination = 0
    }
}

customElements.define('movies-list', MoviesList)