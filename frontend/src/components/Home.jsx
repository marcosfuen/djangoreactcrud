import { React, useEffect, useMemo, useState} from 'react';
import { Box, Chip, Typography, IconButton, Button} from '@mui/material';
import { Link } from 'react-router';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import { MaterialReactTable } from 'material-react-table';
import AxiosInstance from './Axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { jsPDF } from 'jspdf'; //or use your library of choice here
import autoTable from 'jspdf-autotable';

const Home = () =>{

    const [footballClub, setFootballClub] = useState([])

    const GetData = () => {
        AxiosInstance.get('footballClub/').then((res) => {
            setFootballClub(res.data)
        } )
    }

    useEffect(() => {
        GetData()
    }, [])

    const columns = useMemo(
        () => [
            {
                accessorKey:'name',
                header:'Name',
            },
            {
                accessorKey:'countryDetails.name',
                header:'Contry',
            },
            {
                accessorKey:'leagueDetails.name',
                header:'League',
            },
            {
                accessorKey:'city',
                header:'City',
            },
            {
                accessorKey:'attendance',
                header:'Attendance'
            },
            {
                accessorKey:'characteristicsNames',
                header:'Characteristic',
                Cell:({cell}) =>(
                    <div style={{display:'flex', gap:'8px', flexWrap:'wrap'}}>
                        {
                            cell.getValue()?.map((char, index) => (
                                <Chip key={index} label={char}/>
                            ))
                        }
                    </div>
                )
            }


        ]
    )

    const handleExportRows = () => {
        const doc = new jsPDF();
        const tableHeaders = columns.map((c) => c.header);
        const tableData = footballClub.map((c) => [c.name, c.countryDetails.name, c.leagueDetails.name, c.city, c.attendance, c.characteristicsNames]);

        autoTable(doc, {
          head: [tableHeaders],
          body: tableData,
        });
        doc.save('football-club-all.pdf');
    }


    return(
        <div>
            <Box className={'TopBar'}>
                    <CalendarViewMonthIcon/>
                    <Typography sx={{marginLeft:'15px', fontWeight:'bold'}} variant='subtitle2'>View all Club!</Typography>
            </Box>
            <MaterialReactTable
                columns={columns}
                data={footballClub}
                paginationDisplayMode={'pages'}
                initialState={ {density: 'compact'} }
                positionToolbarAlertBanner={'bottom'}
                enableRowActions
                renderRowActions={({row}) => (
                    <Box sx={{display:'flex', flexWrap:'nowrap', gap:'8px'}}>
                        <IconButton color='primary' component={Link} to={`edit/${row.original.id}`}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton color='error' component={Link} to={`delete/${row.original.id}`}>
                            <DeleteIcon/>
                        </IconButton>
                    </Box>
                )}
                renderTopToolbarCustomActions={() => (
                    <Button
                        onClick={() =>
                                handleExportRows()
                        }
                        startIcon={<FileDownloadIcon />}
                        >
                        Export All Rows
                    </Button>
                )}
            />

        </div>
    )
}


export default Home