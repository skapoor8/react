import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';

function StudentsModal({
    schoolName,
    studentsList,
    hideSchoolModalCallback
}) {
    // state 
    var [filteredStudents, setFilteredStudents] = React.useState(studentsList);

    // helpers
    function filterStudents(query) {
        let filteredList = studentsList.filter((student) => {
            return student.firstName.includes(query) || student.lastName.includes(query)
        });
        setFilteredStudents(filteredList);
    }

    return (        
        <Dialog open={schoolName ? true : false}
            onClose={hideSchoolModalCallback}>
            <DialogTitle>
                {schoolName} Students
            </DialogTitle>
            <DialogContent>
                <input type="text" onChange={(e) => filterStudents(e.target.value)}/>
                {filteredStudents.map(student => 
                    <Typography key={student.id}>
                        {student.firstName + ' ' + student.lastName}
                    </Typography>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default StudentsModal;