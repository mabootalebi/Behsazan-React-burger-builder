import React, { useEffect, useState } from 'react';
import classes from './OrderDetail.module.css';
import axios from '../../Tools/fetch';
import Button from '../../Components/UI/Button/Button';
import Loading from '../../Components/UI/Loading/Loading';
import MessageBox from '../../Components/UI/MessageBox/MessageBox';

export default function OrderDetail (props){

    const [orderDetail, setOrderDetail] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [comment, setComment] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const orderNumber = props.location.pathname.split(':')[1];

    const header= [
        {columnName: "order_number", columnTitle: "Order Number"},
        {columnName: "create_date", columnTitle: "Create Date"},
        {columnName: "status", columnTitle: "Status"},
        {columnName: "meat", columnTitle: "Meat"},
        {columnName: "cheese", columnTitle: "Cheese"},
        {columnName: "salad", columnTitle: "Lettuce"},
        {columnName: "total_price", columnTitle: "Total Price"},
        {columnName: "comment", columnTitle: "Comment", editable: true},
        {columnName: "rate", columnTitle: "Rate"}
    ];

    useEffect(() => {
        axios.post('safeorder/getorder', {order_number: orderNumber})
        .then(result => {            
            setOrderDetail([result.data]);
            if (result.data.comment)
                setComment(result.data.comment);
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
        setSubmitting(true);
        axios.post('safeorder/SaveComment', {
            order_number:orderNumber,
			comment:comment
        }).then(result => {
            if (result.data.status){
                setMessageType('success');
                setMessage('Your comment successfully saved.');
            }
            else {
                setMessageType('error');
                setMessage('Something goes wrong. server Message: ' + result.data.message);
            }
            setSubmitting(false);
        }).catch(err=> {
            setMessageType('error');
            setMessage(err);
            setSubmitting(false);
        })
    }

    return <>
         <div className={classes.container}>
            <table className={classes.table}>
                <thead>
                    <tr>
                        {header.map(header =><th key={header.columnName}> {header.columnTitle} </th>)}
                    </tr>
                </thead>
                <tbody>
                    {orderDetail.map(row => <tr key={row.order_number}>
                        {header.map(col => <td key={col.columnName}>                            
                            {col.editable && <textarea className={classes.input} onChange={handleChangeComment} value={comment}>{comment}</textarea>}
                            {!col.editable && row[col.columnName]}
                        </td>)}
                    </tr>)}
                </tbody>
            </table>
        </div>


     {submitting && <Loading></Loading>}
     <div className={classes.buttonsDiv}>
        <Button title="Back" disabled={submitting} classnames="rejectButton" onClick={handleBackClick}></Button>
        <Button title="Save Comment" disabled={submitting} classnames="confirmButton" onClick={handleSaveCommentClick}></Button>
     </div>
     
     <MessageBox message={message} messageType={messageType}></MessageBox>
     
    </>
}