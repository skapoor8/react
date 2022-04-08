import React from 'react';

// services
import SchoolServices from './services/schools.js';
import StudentServices from './services/students.js';

// components
import SchoolDisctrictSelect from './components/schoolDisctrictSelect.js';
import SchoolsList from './components/schoolsList.js';
import StudentsModal from './components/studentsModal.js';

// styles
import './App.css';

function App() {
    // state
    var [schoolsList, setSchoolsList] = React.useState([]);
    var [studentList, setStudentsList] = React.useState([]);
    var [district, setDisctrict] = React.useState('');
    var [school, setSchool] = React.useState({});
    var [schoolsError, setSchoolsError] = React.useState(false);
    var [studentsError, setStudentsError] = React.useState(false);

    // derived state
    var districtList = SchoolServices.getDistricts(schoolsList);
    var filteredSchoolsList = SchoolServices.getSchoolsByDistrictName(schoolsList, district);
    var filteredStudentsList = StudentServices.getStudentsBySchoolId(studentList, school.id);

    // hooks
    React.useEffect(() => {
        SchoolServices.getSchools()
            .then(schoolsList => setSchoolsList(schoolsList))
            .catch(() => setSchoolsError(true));

        StudentServices.getStudents()
            .then(studentsList => setStudentsList(studentsList))
            .catch(() => setStudentsError(true));
    }, []);

    React.useEffect(() => {
        if (schoolsError) {
            setTimeout(() => {
                SchoolServices.getSchools()
                .then(schoolsList => {
                    setSchoolsList(schoolsList);
                    setSchoolsError(false);
                })
                .catch(() => setSchoolsError(true));
            }, 5000);
        }
    }, [schoolsError]);

    React.useEffect(() => {
        setTimeout(() => {
            if (studentsError) {
                StudentServices.getStudents()
                    .then(studentsList => {
                        setStudentsList(studentsList);
                        setStudentsError(false);
                    })
                    .catch(() => setStudentsError(true));
            }
        }, 5000);
    }, [studentsError])

    // App Component API
    function selectDistrict(districtName) {
        setDisctrict(districtName);
    };

    function showSchoolModal(schoolId) {
        let school = schoolsList.find(s => s.id === schoolId);
        setSchool(school);
    };

    function hideSchoolModal() {
        setSchool({});
    };

    // view
    return (
        <>
            <SchoolDisctrictSelect 
                selectedDistrict={district} 
                districts={districtList} 
                setDisctrictCallback={selectDistrict}>
            </SchoolDisctrictSelect>
            <SchoolsList
                filteredSchools={filteredSchoolsList} 
                showSchoolModalCallback={showSchoolModal}>
            </SchoolsList>
            <StudentsModal
                schoolName={school ? school.name : ''}
                studentsList={filteredStudentsList}
                hideSchoolModalCallback={hideSchoolModal}
            ></StudentsModal>
        </>
    );
}

export default App;
