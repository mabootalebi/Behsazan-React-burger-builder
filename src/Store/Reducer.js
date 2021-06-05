import * as actionTypes from './ActionTypes';

const initialStore = {
    // Loading
    loading: false,

    // Order List
    ordersList: [],
    ordersTotalCount:0,

    
};

export function Reducer(store = initialStore, action){
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

        case actionTypes.DisplayOrdersList:
            return{
                ...store,
                ordersList: action.payLoad.ordersList,
                ordersTotalCount: action.payLoad.ordersTotalCount
            }
        default: return store;
    }
}