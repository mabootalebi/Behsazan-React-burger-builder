import * as actionTypes from './loadingActionTypes';

const initialLoadingStore = {
    loading: false
};

export function loadingReducer(store = initialLoadingStore, action){
    switch (action.type){
        case actionTypes.Loading:
            return {
                ...store,
                loading: true
            };
        case actionTypes.UnLoading:
            return {
                ...store,
                loading: false
            };
        default: return store;
    }
}