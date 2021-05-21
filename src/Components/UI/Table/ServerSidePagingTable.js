import React, { useEffect, useReducer } from 'react';
import Paging from './Paging/Paging';
import classes from './Table.module.css';


function reducer(currentState, action){
    switch (action.type){
        case 'ChangeSortOrder':
            return {
                ...currentState,
                sortOrder: action.payload.sortOrder
            };
        case 'ChangeSortField':
            return {
                ...currentState,
                sortField: action.payload.sortField,
                sortOrder: action.payload.sortOrder
            };
        case 'ChangePageSize':
            return {
                ...currentState,
                pageSize: action.payload.pageSize
            };
        case 'ChangePageNumber':
            return {
                ...currentState,
                pageNumber: action.payload.pageNumber
            };
        default:
            return currentState;
    }
}

function ServerSidePagingTable(props){

    const {header,keyField,body,totalCount} = props;
    

    const [state,dispatch] = useReducer(reducer, {
        sortField: keyField,
        sortOrder: "asc",
        pageNumber: 1,
        pageSize:10
    });

    useEffect(()=> {
        prepareData()
    }, [])

    useEffect(()=> {
        prepareData()
    }, [state.pageSize,state.pageNumber,state.sortField,state.sortOrder])

    const sortBasedHeaderField = (fieldName) => {
        if (fieldName === state.sortField)
        {
            dispatch({
                type: 'ChangeSortOrder',
                payload: {
                    sortOrder: state.sortOrder === "asc"? "desc": "asc"
                }
            });
        }
        else{
            dispatch({
                type: 'ChangeSortField',
                payload: {
                    sortOrder: "asc",
                    sortField: fieldName                    
                }
            });
        }
    }

    const prepareData = () => {        
        props.fetchData({
            sortField: state.sortField,
            sortOrder: state.sortOrder,
            pageNumber: state.pageNumber,
            pageSize: state.pageSize
        });        
    }

    const handleChangePageSize = (e) => {
        dispatch({
            type: 'ChangePageSize',
            payload: {
                pageSize: e.target.value,
            }
        });
    }
            
    const handleChangePageNumber = (e) => {
        dispatch({
            type: 'ChangePageNumber',
            payload: {
                pageNumber: e.target.value,
            }
        });
    }

    const handleRowClick = (id) => {
        if (props.handleRowClick)
            props.handleRowClick(id);
    }

    return <>
        <Paging handleChangePageNumber={handleChangePageNumber} 
                handleChangePageSize={handleChangePageSize} 
                pageSize={state.pageSize} 
                totalRecords={totalCount}>
        </Paging>    
        <div className={classes.container}>
            <table className={classes.table}>
                <thead>
                    <tr>
                        {header.map(header =>{
                            let sortable = {};
                            if (header.sortable){
                                sortable = {
                                    onClick:()=> sortBasedHeaderField(header.columnName),
                                    className: classes.sortableHeader
                                };
                            }
                            return <th key={header.columnName} {...sortable}> {header.columnTitle} </th>})}
                    </tr>
                </thead>
                <tbody>
                    {body.map(row => <tr key={row[keyField]} 
                                        onClick={()=>handleRowClick(row[keyField])}>
                        {header.map(col => <td key={col.columnName}>
                            {row[col.columnName]}
                        </td>)}
                    </tr>)}
                </tbody>
            </table>
        </div>
    </>
}

export default ServerSidePagingTable;