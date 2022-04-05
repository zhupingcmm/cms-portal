
export const createStore = (reducer, preloadState, enhancer) => {
    let currentReducer = reducer;
    let currentState = preloadState;
    let currentListeners = [];
    let nextListeners = currentListeners;
    let isDispatching = false;
    

    const getState = () => {
        return currentState;
    }

    const subScribe = (fn) => {
        nextListeners.push(fn);

        return function unSubScribe () {
            const index = nextListeners.indexOf(fn);
            nextListeners.splice(index, 1);
            currentListeners = null;
        }
    }


    const dispatch = (action) => {

        try {
            isDispatching = true;
            currentState = currentReducer(currentState, action);
            isDispatching = false;
        } finally {
            isDispatching = false;
        }

        const listeners = (currentListeners = nextListeners);
        for (let i =0; i< listeners.length; i++) {
            const listener = listeners[i];
            listener();
        }

        return action;
    }




};