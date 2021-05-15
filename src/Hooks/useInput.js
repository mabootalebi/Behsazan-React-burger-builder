import { useCallback, useEffect, useState } from "react";

function useInput(initialValue,required){
    const [value,setValue] = useState(initialValue);
    const [errormessage,setErrorMessage] = useState('');
    const [touched, setTouched] = useState(false);

    const validate = useCallback(() =>{
        if (required && (!value || value.length === 0))
        {
            setErrorMessage('This field is required');
            return false;
        }
        setErrorMessage('');
        return true;
    },[value, required]);


    useEffect(()=>{
        if (touched)
            validate();
    }, [validate, touched]);

    
    const onChange = (e) => {
        setValue(e.target.value);        
        setTouched(true);
        validate();
    }

    return {value, onChange, errormessage, validate}
}

export default useInput;