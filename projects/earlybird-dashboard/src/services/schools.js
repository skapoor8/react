import axios from 'axios';

const get_schools_API = 'https://eb-challenge.s3.us-east-2.amazonaws.com/schools.json';

function SchoolServices() {
        // private vars
        
        // public API
        function getSchools() {
                return axios.get(get_schools_API)
                        .then(response => response.data.schools)
                        .catch(() => {throw new Error('getSchools failed')});
        }

        function getDistricts(schoolsList) {
                let districtsList = schoolsList.reduce((list, school) => {
                        if (!list.includes(school.district)) {
                          list.push(school.district)
                        }
                        return list;
                }, []);
                return districtsList.sort();
        }

        function getSchoolsByDistrictName(schoolsList, districtName) {
                return schoolsList
                        .filter(school => school.district === districtName)
                        .sort((schoolA, schoolB) => schoolA.name < schoolB.name);
        }

        return {
                getSchools,
                getDistricts,
                getSchoolsByDistrictName
        }
}


export default SchoolServices();