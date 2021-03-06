import * as actionTypes from '../Store/ActionTypes';
import {useDispatch} from 'react-redux';

export function useReduxDispatch(){
    const dispatch = useDispatch();

    const DisplayLoading = () => {
        dispatch({
            type: actionTypes.Loading
        })
    }

    const HideLoading = () => {
        dispatch({
            type: actionTypes.UnLoading
        })
    }

    const DisplayModalMessage = (messageType, messageTitle, messageContext) => {
        dispatch({
            type: actionTypes.DisplayModalMessage,
            payLoad: {
                messageType: messageType,
                messageContext: messageContext,
                messageTitle: messageTitle
            }
        })
    }

    const HideModalMessage = () => {
        dispatch({
            type: actionTypes.HideModalMessage
        })
    }

    const DisplayOrdersList = (ordersList, ordersTotalCount) => {
        dispatch({
            type: actionTypes.DisplayOrdersList,
            payLoad: {
                ordersList: ordersList,
                ordersTotalCount: ordersTotalCount
            }
        })
    }

    const ChangeOrderDetail = (title,mode) => {
        dispatch({
            type: actionTypes.ChangeOrder,
            payLoad: {
                title,
                mode
            }
        })
    }

    const ResetOrder = () => {
        dispatch({
            type: actionTypes.ResetOrder
        })
    }

    return {
        DisplayLoading, 
        HideLoading,
        DisplayModalMessage,
        HideModalMessage,
        DisplayOrdersList,
        ChangeOrderDetail,
        ResetOrder
    };
}