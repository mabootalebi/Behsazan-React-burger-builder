import React, { useContext, useEffect, useState } from 'react';
import classes from './OrderDetail.module.css';
import Button from '../../Components/UI/Button/Button';
import DisplayInfo from '../../Components/UI/DisplayInfo/DisplayInfo';
import TextArea from '../../Components/UI/TextArea/TextArea';
import {useAxios} from '../../Hooks/useAxios';
import {ApplicationContext} from '../../Context/ApplicationContext'
import { useReduxDispatch } from '../../Hooks/useReduxDispatch';

export default function OrderDetail (props){

    const [orderDetail, setOrderDetail] = useState([]);
    const [comment, setComment] = useState('');

    const orderNumber = props.match.params.id;
    const axiosPost = useAxios();
    const appContext = useContext(ApplicationContext);
    const dispatch = useReduxDispatch();

    useEffect(() => {
        axiosPost.post('safeorder/getorder', {order_number: orderNumber})
        .then(result => {            
            setOrderDetail(result);
            if (result.comment)
                setComment(result.comment);
        })
        .catch(err => {
            console.log(err);
        })
    },[orderNumber])

    const handleBackClick = () => {
        props.history.push('/OrderList');
        return;
    }

    const handleChangeComment = (e) => {
        setComment(e.target.value);
    }

    const handleSaveCommentClick = () => {        
        axiosPost.post('safeorder/SaveComment', {
            order_number:orderNumber,
			comment:comment
        }).then(result => {
            if (result.status){
                dispatch.DisplayModalMessage('success', 'Success', 'Your comment successfully saved.');
            }
            else {
                dispatch.DisplayModalMessage('error', 'Error', 'Something goes wrong. server Message: ' + result.data.message);
            }            
        }).catch(err=> {
            dispatch.DisplayModalMessage('error', 'Error', err);
        })
    }

    return <>
        <div className={([classes.container,classes[appContext.themeMode]]).join(' ')}>
            <DisplayInfo Label="Order Number" Information={orderDetail.order_number}></DisplayInfo>
            <DisplayInfo Label="Create Date" Information={orderDetail.create_date}></DisplayInfo>
            <DisplayInfo Label="Status" Information={orderDetail.status}></DisplayInfo>
            <DisplayInfo Label="Meat" Information={orderDetail.meat}></DisplayInfo>
            <DisplayInfo Label="Cheese" Information={orderDetail.cheese}></DisplayInfo>
            <DisplayInfo Label="Lettuce" Information={orderDetail.salad}></DisplayInfo>
            <DisplayInfo Label="Total Price" Information={orderDetail.total_price}></DisplayInfo>
            <DisplayInfo Label="Rate" Information={orderDetail.rate}></DisplayInfo>
            <TextArea Label="Comment" value={comment} onChange={handleChangeComment}></TextArea>
        </div>
     
     <div className={classes.buttonsDiv}>
        <Button title="Back" classnames="rejectButton" onClick={handleBackClick}></Button>
        <Button title="Save Comment" classnames="confirmButton" onClick={handleSaveCommentClick}></Button>
     </div>     
    </>
}