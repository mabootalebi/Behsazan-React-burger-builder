import React, {useState} from 'react';
import axios from '../../Tools/fetch';
import ServerSizePagingTable from '../../Components/UI/Table/ServerSidePagingTable';


export default function OrderList(){
    const [orders, setOrders] = useState([]);
    const [totalCount, setTotalCount] = useState();

    const fetchData = (data) => {
        axios.post('/Order/GetAllOrders', {
            sort_field: data.sortField,
			sort_order: data.sortOrder,
			page_index: data.pageNumber,
			page_size: data.pageSize
        })
        .then(result =>{            
            setTotalCount(result.data.total_count);
            setOrders(result.data.list);
        })
        .catch(result =>{
            console.log(`Something goes wrong. Error Message: ${result}`);            
        })
    }

    const header= [
        {columnName: "order_number", columnTitle: "Order Number", sortable:true},
        {columnName: "create_date", columnTitle: "Create Date", sortable:true},
        {columnName: "total_price", columnTitle: "Total Price", sortable:true},
        {columnName: "comment", columnTitle: "Comment", sortable:true},
        {columnName: "rate", columnTitle: "Rate", sortable:true}
    ];

    return <ServerSizePagingTable keyField="order_number" header={header} body={orders} fetchData={fetchData} totalCount={totalCount}></ServerSizePagingTable>
}


// whith Client Side Paging 

// import React, {useEffect,useState} from 'react';
// import axios from '../../Tools/fetch';
// import Table from '../../Components/UI/Table/Table';
// import ServerSizePagingTable from '../../Components/UI/Table/ServerSidePagingTable';

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