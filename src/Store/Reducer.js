import * as actionTypes from './ActionTypes';

const initMessageModal = {
    title: '',
    context: '',
    type: ''
}

const initBurgerBuilder = {
    meat: 0,
    cheese: 0,
    lettuce: 0
}

const initialStore = {
    // Loading
    loading: false,

    // Message Modal
    massageModal: initMessageModal,

    // Order List
    ordersList: [],
    ordersTotalCount:0,

    // burger builder
    burgerBuilder: initBurgerBuilder
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

        case actionTypes.ChangeOrder:
            return{
                ...store,
                burgerBuilder:{
                    ...store.burgerBuilder,
                    [action.payLoad.title]: store.burgerBuilder[action.payLoad.title] + (action.payLoad.mode === 'add'? 1: -1)                    
                }
            }
        
        case actionTypes.ResetOrder:
            return{
                ...store,
                burgerBuilder: initBurgerBuilder
            }

        default: return store;
    }
}