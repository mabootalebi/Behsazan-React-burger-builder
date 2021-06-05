import * as actionTypes from './ActionTypes';

const initMessageModal = {
    title: '',
    context: '',
    type: ''
}

const initialStore = {
    // Loading
    loading: false,

    // Message Modal
    massageModal: initMessageModal,

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

        case actionTypes.DisplayModalMessage:
            return {
                ...store,
                massageModal: {
                    type: action.payLoad.messageType,
                    context: action.payLoad.messageContext,
                    title: action.payLoad.messageTitle
                }
            }

        case actionTypes.HideModalMessage:
            return {
                ...store,
                massageModal: initMessageModal
            }

        case actionTypes.DisplayOrdersList:
            return{
                ...store,
                ordersList: action.payLoad.ordersList,
                ordersTotalCount: action.payLoad.ordersTotalCount
            }

        default: return store;
    }
}