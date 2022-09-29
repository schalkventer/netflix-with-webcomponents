import {
    LitElement,
    html,
    css,
    styleMap,
    ref,
    createRef,
} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

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
            label: { type: String },
            image: { type: String },
            wishlisted: { type: Boolean },
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
    `

    render() {
        const backgroundStyle = {
            backgroundImage: `url('${this.image}')`,
        }

        return html`
            <div class="resting" style="${styleMap(backgroundStyle)}">
                <div class="preview">
                    <video src="/assets/placeholder.mp4" loop></video>
                    <span class="label">${this.label}</span>
                </div>
            </div>
        `
    }
}

customElements.define('movie-preview', MoviePreview)

