import React from 'react';
import { useAxios } from '../../Hooks/useAxios';
import { useReduxDispatch } from '../../Hooks/useReduxDispatch';
import ServerSidePagingTable from '../../Components/UI/Table/ServerSidePagingTable';
import {useSelector} from 'react-redux';

export default function OrderList(props){
    const postAxios = useAxios();
    const {DisplayOrdersList} = useReduxDispatch();

    const fetchData = (data) => {
        postAxios.post('safeorder/GetAllOrders', {
            sort_field: data.sortField,
			sort_order: data.sortOrder,
			page_index: data.pageNumber,
			page_size: data.pageSize
        })
        .then(result =>{
            DisplayOrdersList(result.list, result.total_count);
        })
        .catch(err =>{
            console.log(`Something goes wrong. Error Message: ${err}`);
        })
    }

    const header= [
        {columnName: "order_number", columnTitle: "Order Number", sortable:true},
        {columnName: "create_date", columnTitle: "Create Date", sortable:true},
        {columnName: "total_price", columnTitle: "Total Price", sortable:true},
        {columnName: "comment", columnTitle: "Comment", sortable:true},
        {columnName: "rate", columnTitle: "Rate", sortable:true}
    ];


    const handleRowClick = (id) => {
        props.history.push('/OrderDetail/'+ id);
    }

    const ordersList = useSelector(store => store.ordersList);
    const ordersTotalCount = useSelector(store => store.ordersTotalCount);

    return <ServerSidePagingTable 
                keyField="order_number" 
                header={header} 
                body={ordersList} 
                fetchData={fetchData} 
                totalCount={ordersTotalCount} 
                handleRowClick={handleRowClick} />
}


// with Client Side Paging 

// import React, {useEffect,useState} from 'react';
// import axios from '../../Tools/fetch';
// import Table from '../../Components/UI/Table/Table';

// export default function OrderList(){
//     const [orders,setOrders] = useState([]);

//     useEffect(()=>{
//         axios.post('/Order/GetAllOrders')
//         .then(result =>{
//             setOrders(result.data)
//         })
//         .catch(result =>{
//             console.log(`Something goes wrong. Error Message: ${result}`);
//         })
//     },[]);

//     const header= [
//         {columnName: "order_number", columnTitle: "Order Number", sortable:true},
//         {columnName: "create_date", columnTitle: "Create Date", sortable:true},
//         {columnName: "total_price", columnTitle: "Total Price", sortable:true},
//         {columnName: "comment", columnTitle: "Comment", sortable:true},
//         {columnName: "rate", columnTitle: "Rate", sortable:true}
//     ];

//     return <Table keyField="order_number" header={header} body={orders}></Table>
// }