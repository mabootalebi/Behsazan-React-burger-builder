import React, {useReducer} from 'react';
import axios from '../../Tools/fetch';
import ServerSidePagingTable from '../../Components/UI/Table/ServerSidePagingTable';
import Loading from '../../Components/UI/Loading/Loading';

function reducer(currentState, action){
    switch (action.type){
        case 'Loading':
            return {
                ...currentState,
                isLoading: true
            };
        case 'Init':
            return{
                isLoading: false,
                totalCount: action.payload.totalCount,
                orders: action.payload.orders
            };
        case 'ErrOccurred':
            return{
                ...currentState,
                isLoading:false
            };
        default:
            return currentState;
    }
}

export default function OrderList(props){

    // const [orders, setOrders] = useState([]);
    // const [totalCount, setTotalCount] = useState();
    // const [isLoading, setIsLoading] = useState(false);

    const [state, dispatch] = useReducer(reducer, {
        orders: [],
        totalCount:0,
        isLoading:false
    });

    const fetchData = (data) => {
        //setIsLoading(true);
        
        dispatch({
            type: 'Loading'
        });

        axios.post('safeorder/GetAllOrders', {
            sort_field: data.sortField,
			sort_order: data.sortOrder,
			page_index: data.pageNumber,
			page_size: data.pageSize
        })
        .then(result =>{            
            // setTotalCount(result.data.total_count);
            // setOrders(result.data.list);
            // setIsLoading(false);

            dispatch({
                type: 'Init',
                payload: {
                    totalCount: result.data.total_count,
                    orders: result.data.list
                }
            })
        })
        .catch(err =>{
            console.log(`Something goes wrong. Error Message: ${err}`);             
            // setIsLoading(false);

            dispatch({
                type: 'ErrOccurred'
            })
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

    return <>    
     <ServerSidePagingTable keyField="order_number" header={header} body={state.orders} fetchData={fetchData} totalCount={state.totalCount} handleRowClick={handleRowClick}></ServerSidePagingTable>
     {state.isLoading && <Loading></Loading>}
     </>
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