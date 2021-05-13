import React from 'react';
import classes from './Paging.module.css'

export default function Paging(props){
    const generatePageNumbers = (pageSize, totalRecords) => {
        const Pages = [];
        if (totalRecords){
            const pageNumbers = Math.ceil(totalRecords/pageSize);        
            for (let i=1;i<= pageNumbers; i++){
                Pages.push(<option key={i}>{i}</option>)
            }
        }
        return Pages;
    }

    return <div className={classes.pagingSection}>
                Page Number: <select className={classes.selection} onChange={props.handleChangePageNumber}>
                    {generatePageNumbers(props.pageSize,props.totalRecords)}
                </select>
                Page Size: <select className={classes.selection} onChange={props.handleChangePageSize}>
                <option>10</option>
                    <option>20</option>
                    <option>50</option>
                    <option>100</option>
                    <option>200</option>
                </select>
            </div> 
}