import * as projectsAPI from "./fakeProjectService";


const patients = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    patientName: "Jarosław Nowak",
    project: { _id: "5b21ca3eeb7f6fbccd471818", name: "Covid" },
    Age: 24,
    phoneNumber: 321321321
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    patientName: "Andrzej Kwiatkowski",
    project: { _id: "5b21ca3eeb7f6fbccd471818", name: "Covid" },
    Age: 21,
    phoneNumber: 519163848
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    patientName: "Marian Jakowczuk",
    project: { _id: "5b21ca3eeb7f6fbccd471814", name: "Anemia" },
    Age: 45,
    phoneNumber: 636363637
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    patientName: "Kamil Zajkowski",
    project: { _id: "5b21ca3eeb7f6fbccd471814", name: "Anemia" },
    Age: 53,
    phoneNumber: 987654321
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    patientName: "Monika Adamska",
    project: { _id: "5b21ca3eeb7f6fbccd471820", name: "Jaundice" },
    Age: 32,
    phoneNumber: 848938838
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    patientName: "Agata Kwiatkowska",
    project: { _id: "5b21ca3eeb7f6fbccd471820", name: "Jaundice" },
    Age: 41,
    phoneNumber: 654789321
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    patientName: "Tomasz Zonk",
    project: { _id: "5b21ca3eeb7f6fbccd471818", name: "Covid" },
    Age: 12,
    phoneNumber: 456765321
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    patientName: "Marcin Drywulski",
    project: { _id: "5b21ca3eeb7f6fbccd471814", name: "Anemia" },
    Age: 35,
    phoneNumber: 431678981
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    patientName: "Jakub Nowicki",
    project: { _id: "5b21ca3eeb7f6fbccd471820", name: "Jaundice" },
    Age: 57,
    phoneNumber: 578321456
  }
];

export function getPatients() {
  return patients;
}

export function getPatient(id) {
  return patients.find(m => m._id === id);
}

export function savePatient(patient) {
  let patientInDb = patients.find(m => m._id === patient._id) || {};
  patientInDb.patientName = patient.patientName;
  patientInDb.project = projectsAPI.projects.find(g => g._id === patient.projectId);
  patientInDb.Age = patient.Age;
  patientInDb.phoneNumber = patient.phoneNumber;

  if (!patientInDb._id) {
    patientInDb._id = Date.now().toString();
    patients.push(patientInDb);
  }

  return patientInDb;
}

export function deletePatient(id) {
  let patientInDb = patients.find(m => m._id === id);
  patients.splice(patients.indexOf(patientInDb), 1);
  return patientInDb;
}
