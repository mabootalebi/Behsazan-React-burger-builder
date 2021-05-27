import { useHistory } from 'react-router';
import axios from '../Tools/fetch';
import { useReduxDispatch } from './useReduxDispatch';


export function useAxios() {
    const history = useHistory();
    const dispatch = useReduxDispatch();
    
    const post = (url,data) => {
        dispatch.DisplayLoading();

        const result = new Promise((resolve, reject)=> {
            axios.post(url,data)
                .then(result => {
                    resolve(result.data)
                    dispatch.HideLoading();
                })
                .catch(err =>{
                    if (err.response){        
                        if (err.response.status === 403){                
                            history.push('/AccessDenied');
                        }
                    }
                    else{
                        reject(err);
                    }

                    dispatch.HideLoading();
                })
        })
        return result;
    }

    return {post};
}