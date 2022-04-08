import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function SchoolDisctrictSelect({
    districts,
    selectedDistrict,
    setDisctrictCallback
}) {
    return (
            <>
            Select school district:
            <Select
                value={selectedDistrict}
                onChange={e => setDisctrictCallback(e.target.value)}
                style={{minWidth: '180px',
                    marginLeft: '10px'
                }}
            displayEmpty>
                {districts.map(district => 
                    <MenuItem key={district}
                            value={district}>
                            {district}
                    </MenuItem>
                )}
            </Select>
      </>
    );
}

export default SchoolDisctrictSelect;