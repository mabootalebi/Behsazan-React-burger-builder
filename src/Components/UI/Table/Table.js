import React from 'react';
import classes from './Table.module.css';

export default function Table(props){
    return <div className={classes.container}>
        <table className={classes.table}>
            <thead>
                <tr>
                    {props.header.map(header =>
                        <th key={header.columnName}>{header.columnTitle}</th>)}
                </tr>
            </thead>
            <tbody>
                {props.body.map(row => <tr key={row.order_number}>
                    {props.header.map(col => <td key={col.columnName}>
                        {row[col.columnName]}
                    </td>)}
                </tr>)}
            </tbody>
        </table>
    </div>
}