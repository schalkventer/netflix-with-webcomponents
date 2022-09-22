import './components/movies-list.js'
import './components/movie-preview.js'
import { store } from './store.js'

store.startListen('abc', (prevState, newState) => {
    const moviesHasUpdated = prevState.movies !== newState.movies 
    if (!moviesHasUpdated) return

    console.log(newState)
})

