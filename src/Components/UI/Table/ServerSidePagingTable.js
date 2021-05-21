import React, { useEffect, useState } from 'react';
import Paging from './Paging/Paging';
import classes from './Table.module.css';

function ServerSidePagingTable(props){

    const {header,keyField,body,totalCount} = props;
    
    const [sortField,setSortField] = useState(keyField);
    const [sortOrder,setSortOrder] = useState("asc");
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);


    useEffect(()=> {
        prepareData()
    }, [])

    useEffect(()=> {
        prepareData()
    }, [pageSize,pageNumber,sortField,sortOrder])

    const sortBasedHeaderField = (fieldName) => {
        if (fieldName === sortField)
        {
            setSortOrder(sortOrder === "asc"? "desc":"asc");
        }
        else{
            setSortField(fieldName);
            setSortOrder("asc");
        }
    }

    const prepareData = () => {        
        props.fetchData({
            sortField: sortField,
            sortOrder: sortOrder,
            pageNumber: pageNumber,
            pageSize: pageSize
        });        
    }

    const handleChangePageSize = (e) => {
        setPageSize(e.target.value);
    }
            
    const handleChangePageNumber = (e) => {
        setPageNumber(e.target.value);
    }

    const handleRowClick = (id) => {
        if (props.hanleRowClick)
            props.hanleRowClick(id);
    }

    return <>
        <Paging handleChangePageNumber={handleChangePageNumber} handleChangePageSize={handleChangePageSize} pageSize={pageSize} totalRecords={totalCount}></Paging>    
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