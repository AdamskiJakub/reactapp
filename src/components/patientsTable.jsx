import React, { Component } from 'react';
import Like from './common/like';
import Table from './common/table';
import { Link } from 'react-router-dom';

class PatientsTable extends Component {
    columns = [
        { path: 'patientName', label: 'Name', content: patient =><Link to={`/patients/${patient._id}`}>{patient.patientName}</Link>},
        { path: 'project.name', label: 'Project'},
        { path: 'Age', label: 'Age'},
        { path: 'phoneNumber', label: 'Phone'},
        { key: 'like', content: patient => (
        <Like liked={patient.liked} onClick={() => this.props.onLike(patient)}/>
        )},
        { key: 'delete', content: patient => (
        <button onClick={() => this.props.onDelete(patient)} className="btn btn-danger btn-sm">Delete</button>
        )}
    ];
    render() { 
        const { patients, onSort, sortColumn } = this.props;

    return ( 
        <Table 
        columns={this.columns} 
        data={patients} 
        sortColumn={sortColumn} 
        onSort={onSort}/>
    );  
  };
};
 
export default PatientsTable;