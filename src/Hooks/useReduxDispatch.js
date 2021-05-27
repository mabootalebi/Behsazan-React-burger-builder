import * as loadingActionTypes from '../Store/loading/loadingActionTypes';
import {useDispatch} from 'react-redux';

export function useReduxDispatch(){
    const dispatch = useDispatch();

    const DisplayLoading = () => {
        dispatch({
            type: loadingActionTypes.Loading
        })
    }

    const HideLoading = () => {
        dispatch({
            type: loadingActionTypes.UnLoading
        })
    }

    return {
        DisplayLoading, 
        HideLoading
    };
}