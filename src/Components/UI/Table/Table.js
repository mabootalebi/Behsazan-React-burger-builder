import React from 'react';
import classes from './Table.module.css';

export default class Table extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            body: this.props.body
        }
    }

    componentDidUpdate(){
        if (this.state.body.length === 0 && this.props.body.length > 0){
            this.setState({
                body: this.props.body
            });
        }
    }

    sortingASC = (e) =>{
        const {body} = this.state;
        const columnName = e.target.getAttribute('id');        
        this.setState({
            body: body.sort((a,b) => a[columnName] > b[columnName])
        });
    }

    sortingDESC = (e) =>{
        const {body} = this.state;
        const columnName = e.target.getAttribute('id');        
        this.setState({
            body: body.sort((a,b) => a[columnName] < b[columnName])
        });
    }

    render() {
        const {header} = this.props;        
        const {body} = this.state.body.length > 0? this.state: this.props;
        
        return <div className={classes.container}>
            <table className={classes.table}>
                <thead>
                    <tr>
                        {header.map(header =>
                            <th key={header.columnName}>
                                {header.sortable &&  
                                    <button className={classes.sortingButton} id={header.columnName} onDoubleClick={this.sortingDESC} onClick={this.sortingASC}>sort</button>}
                                {header.columnTitle}
                            </th>)}
                    </tr>
                </thead>
                <tbody>
                    {body.map(row => <tr key={row.order_number}>
                        {header.map(col => <td key={col.columnName}>
                            {row[col.columnName]}
                        </td>)}
                    </tr>)}
                </tbody>
            </table>
        </div>
    }
}