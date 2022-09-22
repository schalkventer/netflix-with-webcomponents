class Component extends HTMLElement {
    static get observedAttributes() {
        return ["label", "image", "wishlisted"];
    }
  
    inner = this.attachShadow({ mode: 'closed' })

    elements = {
        resting: null,
        label: null,
    }

    label = this.getAttribute('label')
    image = this.getAttribute('image')
    wishlisted = this.getAttribute('wishlisted') !== null

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'label' && oldValue !== newValue) {
           if (this.elements.label) this.elements.label.innerText = newValue
        }

        if (name === 'image' && oldValue !== newValue) {
            if (this.elements.resting) this.elements.resting.style.background = `url("${newValue}")`
        }

        if (name === 'wishlisted' && oldValue !== newValue) {
            if (this.elements.wishlist) {
                this.elements.wishlist.innerText = newValue !== undefined ? 'Unlist' : 'Wishlist'
            }
        }
      }

    connectedCallback() {
        this.inner.innerHTML = /* html */ `
            <style>
                * { 
                    box-sizing: border-box
                }

                .resting {
                    border: 1px solid grey;
                    padding: 1rem;
                    background-color: grey;
                    background: url("${this.image}");
                    background-size: cover;
                    background-position: center;
                    cursor: pointer;
                    position: relative;
                    height: 200px;
                    width: 400px;
                }

                .preview {
                    display: none;
                    position: absolute;
                    top: -50%;
                    left: -20%;
                    width: 140%;
                    height: 200%;
                    background: black;
                    color: white;
                }

                .resting:hover {
                    z-index: 10;
                }

                :host([image]) .resting:hover > .preview {
                    display: block;
                }

                video {
                    width: 100%;
                }
            </style>

            <div class="resting">
                <div class="preview">
                    <video src="/assets/placeholder.mp4" loop ></video>
                    <span class="label">${this.label}</span>
                    <button class="wishlist">${this.wishlisted ? 'Unlist' : 'Wishlist'}</button>
                </div>
            </div>
        `

        this.elements = {
            resting: this.inner.querySelector('.resting'),
            label: this.inner.querySelector('.label'),
            wishlist: this.inner.querySelector('.wishlist'),
        }

        const video = this.inner.querySelector('video')

        const moveOverHandler = () => video.play()
        const mouseOutHandler = () => video.pause()

        this.inner.addEventListener('mouseover', moveOverHandler)
        this.inner.addEventListener('mouseout', mouseOutHandler)
    }
}

customElements.define('movie-preview', Component)