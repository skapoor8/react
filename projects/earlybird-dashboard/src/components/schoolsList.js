import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// styles
const useStyles = makeStyles((theme) => ({
    schoolGridContainer: {
        flexGrow: 1,
        marginTop: '1rem'
    },
    schoolGridItem: {
        width: '100%'
    },
    schoolPaper: {
        padding: theme.spacing(1),
        margin: 'auto',
    },
    viewSchoolButton: {
        marginTop: '1rem'
    }
}));
     
export default function SchoolsList({
    filteredSchools,
    showSchoolModalCallback
}) {
    const classes = useStyles();

    // view
    return (
        <>
            <Grid container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                spacing={2}
                className={classes.schoolGridContainer}
            > 
                {filteredSchools.map(school =>
                    <Grid item key={school.id} 
                        className={classes.schoolGridItem} 
                        xs={12} sm={8} md={6} lg={4} xl={2} >
                        <Paper className={classes.schoolPaper} elevation={3}> 
                            <Typography>
                                <strong>{school.name}</strong>
                            </Typography>
                            <Typography>{school.address}</Typography>
                            <Typography>Student count: {school.studentCount}</Typography>
                            <Button variant="contained" color="primary"
                                className={classes.viewSchoolButton}
                                onClick={e => showSchoolModalCallback(school.id)}>
                                View Students
                            </Button>
                        </Paper>
                    </Grid> 
                )}
            </Grid>
        </>
    );
}