import axios from 'axios';

const get_students_API = 'https://eb-challenge.s3.us-east-2.amazonaws.com/students.json';

function StudentServices() {
        // private vars

        // public API
        function getStudents() {
                return axios.get(get_students_API)
                        .then(response => response.data.students)
                        .catch(() => {throw new Error('getStudents failed')});
        }

        function getStudentsBySchoolId(studentsList, schoolId) {
                let filteredStudentsList = studentsList.filter(student => student.schoolId === schoolId);
                return filteredStudentsList.sort(studentSortFunction);
        }

        return {
                getStudents,
                getStudentsBySchoolId
        }
}

// utilities
function studentSortFunction(studentA, studentB) {
        if (studentA.firstName < studentB.firstName) {
                return -1;
        } else if (studentA.firstName > studentB.firstName) {
                return 1;
        } else {
                if (studentA.lastName < studentB.lastName) {
                        return -1;
                } else {
                        return 1;
                }
        }
}

export default StudentServices();