import React, {useEffect,useState} from 'react';
import classes from './OrderList.module.css';
import axios from '../../Tools/fetch';
import Table from '../../Components/UI/Table/Table';

export default function OrderList(){
    const [orders,setOrders] = useState([]);

    useEffect(()=>{
        axios.post('/Order/GetAllOrders')
        .then(result =>{
            setOrders(result.data)
        })
        .catch(result =>{
            console.log(`Something goes wrong. Error Message: ${result}`);
        })
    },[]);

    const header= [
        {columnName: "order_number", columnTitle: "Order Number", sortable:true},
        {columnName: "create_date", columnTitle: "Create Date", sortable:true},
        {columnName: "total_price", columnTitle: "Total Price", sortable:true},
        {columnName: "status", columnTitle: "Status", sortable:true},
        {columnName: "comment", columnTitle: "Comment", sortable:true},
        {columnName: "rate", columnTitle: "Rate", sortable:true}
    ];

    return <Table header={header} body={orders}></Table>
}