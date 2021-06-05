import classes from './MessageModal.module.css';
import React from 'react';
import Button from '../Button/Button';
import { useReduxDispatch } from '../../../Hooks/useReduxDispatch';

export default function MessageModal(props){

    const dispatch = useReduxDispatch();

    const handleCancelButtonclicked = () => {
        dispatch.HideModalMessage();
    }

    return <div className={classes.container}>
        <div className={classes.modalBody}>
            <div className={([classes.title, classes[props.Type]]).join(' ')}> {props.Title} </div>
            <div className={classes.context}> {props.Context} </div>
            <div className={classes.button}>
                <Button classnames="rejectButton" onClick={handleCancelButtonclicked} title="Close"></Button>
            </div>
        </div>
    </div>
}