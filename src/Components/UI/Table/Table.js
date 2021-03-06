import React, { useState } from 'react';
import Paging from './Paging/Paging';
import classes from './Table.module.css';

function Table({header,body,keyField}){

    const [sortField,setSortField] = useState(keyField);
    const [sortOrder,setSortOrder] = useState("asc");
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);


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
        let result = body.sort((a,b) => { return (sortOrder === 'asc'? a[sortField] > b[sortField]: a[sortField] < b[sortField])});
        result = result.filter((item,index) => {
            return index >= ((pageNumber - 1) * pageSize) && index < (pageNumber * pageSize)
        })
        return result;
    }

    const handleChangePageSize = (e) => {
        setPageSize(e.target.value);
    }
            
    const handleChangePageNumber = (e) => {
        setPageNumber(e.target.value);
    }

    return <>
        <Paging handleChangePageNumber={handleChangePageNumber} handleChangePageSize={handleChangePageSize} pageSize={pageSize} totalRecords={body.length}></Paging>    
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
                    {prepareData().map(row => <tr key={row[keyField]}>
                        {header.map(col => <td key={col.columnName}>
                            {row[col.columnName]}
                        </td>)}
                    </tr>)}
                </tbody>
            </table>
        </div>
    </>
}


export default Table;