import { React, useEffect, useMemo, useState, useRef} from 'react';
import { Box, Chip, Typography, IconButton, Button} from '@mui/material';
import { Link } from 'react-router';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import { MaterialReactTable } from 'material-react-table';
import AxiosInstance from '../../Axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { jsPDF } from 'jspdf'; //or use your library of choice here
import autoTable from 'jspdf-autotable';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useNavigate } from 'react-router';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import MyHelpModal from '../../HelpModal';


const AllLeague = () =>{

    const [league, setLeague] = useState([])
    const inputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [severity, setSeverity] = useState([])
    
    const navigate = useNavigate()

    const handleClick = () => {
        // 👇️ Open the file input box on click of another element
        inputRef.current.click();
    };

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
        
        const formData = new FormData();
        const file = document.getElementById('file').files;
		formData.append('file', file[0]);
        
		AxiosInstance.post('/league/uploadData/', formData, {
            headers: {
              "Accept": "application/json",
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(response => {
            console.log('Success:', response);
            setAlertContent("You succesfully submitted data to the database!");
            setSeverity("success")
            setAlert(true);
            setTimeout(() => {
                navigate(0)
            }, 2000)
          })
          .catch(error => {
            console.error('Error:', error);
            setAlertContent(error.response.data[0].name);
            setSeverity("error")
            setAlert(true);
          });
	};


    const GetData = () => {
        AxiosInstance.get('league/').then((res) => {
            setLeague(res.data)
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
                accessorKey:'created',
                header:'Created',
            },
            {
                accessorKey:'modified',
                header:'Modified',
            },


        ]
    )

    const handleExportRows = () => {
        const doc = new jsPDF();
        const tableHeaders = columns.map((c) => c.header);
        const tableData = league.map((c) => [c.name, c.created, c.modified]);

        autoTable(doc, {
          head: [tableHeaders],
          body: tableData,
        });
        doc.save('all-league.pdf');
    }


    return(
        <div>
            <Box className={'TopBar'}>
                    <CalendarViewMonthIcon/>
                    <Typography sx={{marginLeft:'15px', fontWeight:'bold'}} variant='subtitle2'>View all League!</Typography>
            </Box>
            {alert && <Alert severity={severity} ><AlertTitle>{severity}</AlertTitle> {alertContent}</Alert>}
            <MaterialReactTable
                columns={columns}
                data={league}
                paginationDisplayMode={'pages'}
                initialState={ {
                    density: 'compact',
                    // sorting: [
                    //     { 
                    //         id: 'name', 
                    //         desc: true, 
                    //     },
                    // ]    
                } }
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
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '16px',
                            padding: '8px',
                            flexWrap: 'wrap',
                        }}
                    >
                    <Button
                        onClick={() =>
                                handleExportRows()
                        }
                        startIcon={<FileDownloadIcon />}
                        >
                        Export All Rows
                    </Button>
                    <input
                        id='file'
                        style={{display: 'none'}}
                        ref={inputRef}
                        type="file"
                        name='file'
                        accept=".csv"
                        onChange={onFileChange}
                    />
                    
                    <Button
                        onClick={handleClick}
                        // onClick={() => inputRef.current.click()}
                        startIcon={<FileUploadIcon />}
                        >
                        Import league csv
                    </Button>
                    <MyHelpModal/>
                    </Box>
                )}
            />

        </div>
    )
}


export default AllLeague