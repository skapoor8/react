import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';

function StudentsModal({
    schoolName,
    studentsList,
    hideSchoolModalCallback
}) {
    return (        
        <Dialog open={schoolName ? true : false}
            onClose={hideSchoolModalCallback}>
            <DialogTitle>
                {schoolName} Students
            </DialogTitle>
            <DialogContent>
                {studentsList.map(student => 
                    <Typography key={student.id}>{student.firstName + ' ' + student.lastName}</Typography>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default StudentsModal;