class Store {
        listeners = []

        state = {
            phase: 'loading',
            movies: null,
        }

        update = (change) => {
            const oldState = { ...this.state }
            const newState = { ...oldState, ...change }

            this.listeners.forEach(({ callback }) => {
                callback(oldState, newState)
            })

            this.state = newState
        }

        startListen(id, callback) {
            this.listeners.push({ id, callback })
        }

        stopListen(id) {
            this.listeners.filter(item => item.id !== id)
            console.log(this.listeners)
        }

        constructor() {
            this.startListen = this.startListen.bind(this)
            this.stopListen = this.stopListen.bind(this)
            this.update = this.update.bind(this)
        }
    }


export const store = new Store()

const init = async () => {
    const response = await fetch('https://project-apis.codespace.co.za/api/movies')

    /** @type {{ data: import('./types').movie[] }} */
    const { data } = await response.json()
    store.update({ phase: 'resting', movies: data })
}

init()

export default store