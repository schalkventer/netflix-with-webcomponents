import {
    LitElement,
    html,
    css,
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
class Component extends LitElement {
    static get properties() {
        return {
            label: { type: String },
            image: { type: String },
            wishlisted: { type: Boolean },
        }
    }

    play() {
        // this.querySelector('video').play()
    }

    pause() {
        // this.querySelector('video').pause()
    }

    render() {
        return html`
            <div class="resting" @mouseover="${this.play}" @mouseover="${this.pause}">
                <div class="preview">
                    <video src="/assets/placeholder.mp4" loop></video>
                    <span class="label">${this.label}</span>
                    <button class="wishlist">${this.wishlisted ? 'Unlist' : 'Wishlist'}</button>
                </div>
            </div>
        `
    }
}

customElements.define('movie-preview', Component)


    // static styles = css`
    //     .resting {
    //         border: 1px solid grey;
    //         padding: 1rem;
    //         background-color: grey;
    //         background: url("${this.image}");
    //         background-size: cover;
    //         background-position: center;
    //         cursor: pointer;
    //         position: relative;
    //         height: 200px;
    //         width: 400px;
    //     }

    //     .preview {
    //         display: none;
    //         position: absolute;
    //         top: -50%;
    //         left: -20%;
    //         width: 140%;
    //         height: 200%;
    //         background: black;
    //         color: white;
    //     }

    //     .resting:hover {
    //         z-index: 10;
    //     }

    //     .resting:hover > .preview {
    //         display: block;
    //     }

    //     video {
    //         width: 100%;
    //     }
    // `