import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getPatient, savePatient } from "../services/fakePatientService";
import { getProjects } from "../services/fakeProjectService";

class PatientForm extends Form {
  state = {
    data: {
      patientName: "",
      projectId: "",
      Age: "",
      phoneNumber: ""
    },
    projects: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    patientName: Joi.string()
      .required()
      .regex(/[A-Za-z]/)
      .min(3)
      .max(30)
      .label("Name"),
    projectId: Joi.string()
      .required()
      .label("Research Project"),
    Age: Joi.number()
      .required()
      .min(0)
      .max(110)
      .label("Age"),
    phoneNumber: Joi.number()
      .required()
      .min(111111111)
      .max(999999999)
      .label("Phone Number")
  };

  componentDidMount() {
    const projects = getProjects();
    this.setState({ projects });

    const patientId = this.props.match.params.id;
    if (patientId === "new") return;

    const patient = getPatient(patientId);
    if (!patient) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(patient) });
  }

  mapToViewModel(patient) {
    return {
      _id: patient._id,
      patientName: patient.patientName,
      projectId: patient.project._id,
      Age: patient.Age,
      phoneNumber: patient.phoneNumber
    };
  }

  doSubmit = () => {
    savePatient(this.state.data);

    this.props.history.push("/patients");
  };

  render() {
    return (
      <div>
        <h1>Patient Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("patientName", "Name")}
          {this.renderSelect("projectId", "Project", this.state.projects)}
          {this.renderInput("Age", "Age", "number")}
          {this.renderInput("phoneNumber", "Phone")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default PatientForm;
