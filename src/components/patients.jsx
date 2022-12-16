import React, { Component } from "react";
import { Link } from "react-router-dom";
import PatientsTable from "./patientsTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getPatients, deletePatient } from "../services/fakePatientService";
import { getProjects } from "../services/fakeProjectService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";

class Patients extends Component {
  state = {
    patients: [],
    projects: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "patientName", order: "asc" }
  };

  componentDidMount() {
    const projects = [{ _id: "", name: "All Projects" }, ...getProjects()];

    this.setState({ patients: getPatients(), projects });
  }

  handleDelete = patient => {
    const patients = this.state.patients.filter(m => m._id !== patient._id);
    this.setState({ patients });

    deletePatient(patient._id);
  };

  handleLike = patient => {
    const patients = [...this.state.patients];
    const index = patients.indexOf(patient);
    patients[index] = { ...patients[index] };
    patients[index].liked = !patients[index].liked;
    this.setState({ patients });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = project => {
    this.setState({ selectedGenre: project, searchQuery: "", currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      patients: allPatients
    } = this.state;

    let filtered = allPatients;
    if (searchQuery)
      filtered = allPatients.filter(m =>
        m.patientName.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allPatients.filter(m => m.project._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const patients = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: patients };
  };

  render() {
    const { length: count } = this.state.patients;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>There are no patients in the database.</p>;

    const { totalCount, data: patients } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.projects}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <Link
            to="/patients/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Patient
          </Link>
          <p>Showing {totalCount} Patients in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <PatientsTable
            patients={patients}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Patients;
