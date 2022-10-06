import {
    LitElement,
    html,
    css,
    styleMap,
    ref,
    createRef,
} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

import { store } from '../store.js'

/**
 * @element movie-preview - Show a single movie as a preview card
 * @prop {string | null} image - The preview image to show for the movie
 * @attr image
 * 
 * @prop {string | null} label - The name of the movie to preview
 * @attr label
 * 
 * @prop {boolean} wishlisted - Whether a user has added the movie to their wishlist
 * @attr wishlisted
 */
class MoviePreview extends LitElement {
    static get properties() {
        return {
            key: { type: String },
            label: { type: String },
            image: { type: String },
            wishlisted: { type: Boolean },
            muted: { state: true, type: Boolean },
            modal: { state: true, type: Boolean }
        }
    }

    static styles = css`
        .resting {
            border: 1px solid grey;
            padding: 1rem;
            background-color: grey;
            background-size: cover;
            background-position: center;
            cursor: pointer;
            position: relative;
            height: 200px;
            width: 400px;
        }

        .preview {
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: black;
            color: white;
            transform: scale(1);
            transition: transform 0.3s;
        }

        .resting:hover {
            z-index: 10;
        }

        .resting:hover > .preview {
            opacity: 1;
            transform: scale(1.3)
        }

        video {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }

        dialog::backdrop {
            background: rgba(0, 0, 0, 0.75);
        }
    `

    play() {
        this.videoRef.value.play()
    }

    pause() {
        this.videoRef.value.pause()
    }

    toggleMute() {
        this.muted = !this.muted
    }

    toggleWishlist() {
        const newWishlist = !this.wishlisted
        this.wishlisted = newWishlist

        if (newWishlist) {
            store.update(state => ({
                ...state,
                wishlisted: [...state.wishlisted, this.key]
            }))
        } else {
            store.update(state => ({
                ...state,
                wishlisted: state.wishlisted.filter(item => item !== this.key)
            })) 
        }
    }

    toggleModal() {
        const newModal = !this.modal
        this.modal = newModal

        if (newModal) return this.modalRef.value.showModal()
        this.modalRef.value.close()
    }

    render() {
        const backgroundStyle = {
            backgroundImage: `url('${this.image}')`,
        }

        const inlineStyle = styleMap(backgroundStyle)

        return html`
            <dialog ${ref(this.modalRef)}>
                <span class="label">${this.label}</span>
                <button @click="${this.toggleModal}">Close</button>
            </dialog>

            <div class="resting"
                style="${inlineStyle}"
                @mouseover="${this.play}"
                @mouseout="${this.pause}"
            >
                <div class="preview">
                    <video 
                        ${ref(this.videoRef)}
                        .muted=${this.muted}
                        @click="${this.toggleModal}"
                         src="/assets/placeholder.mp4"
                         loop
                    ></video>
                    <button @click="${this.toggleMute}">${this.muted ? 'Unmute' : 'Mute'}</button>
                    <button @click="${this.toggleWishlist}">${this.wishlisted ? 'Unwishlist' : 'Wishlist'}</button>
                    <span class="label">${this.label}</span>
                </div>
            </div>
        `
    }

    
    constructor() {
        super()
        this.muted = true
        this.videoRef = createRef()
        this.modalRef = createRef()
    }
}

customElements.define('movie-preview', MoviePreview)

