import {createStore} from 'redux'
import rootReducer from '../reducers'

const configureStore = (initialState)=>{
    const store = createStore(rootReducer,initialState,
        window.devToolsExtension ? window.devToolsExtension() : undefined
    )
    return store
}

export default configureStore