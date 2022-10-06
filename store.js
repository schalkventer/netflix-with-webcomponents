// @ts-check

export const createStore = () => {
    /**
     * @type {import('./types').state[]}
     */
    const states = [{
        phase: 'loading',
        movies: [],
        genres: { 
            drama: [],
            horror: [],
            action: [],
         },
        wishlisted: [],
    }]

    /**
     * @type {import('./types').subscription[]}
     */
    let subscriptions = []

    /**
     * @param {import('./types').subscription} subscription
     */
    const subscribe = (subscription) => subscriptions.push(subscription)

    /**
     * @param {string} id
     */
     const unsubscribe = (id) => {
        const newSubscriptions = subscriptions.filter(item => item.id !== id)
        subscriptions = newSubscriptions
     }


    /**
     * @param {import('./types').changes} changes 
     */
    const update = (changes) => {
        const prev = { ...states[0] }
        const next = changes(prev)
        states.unshift(next)
        subscriptions.forEach(({ callback }) => callback(prev, next))
    }

    const undo = () => {
        if (states.length < 2) return console.warn('Cannot undo if only one state')
        update(() => states[1])
    }

    return {
        subscribe,
        unsubscribe,
        update,
        undo,
    }
}

export const store = createStore()
export default store