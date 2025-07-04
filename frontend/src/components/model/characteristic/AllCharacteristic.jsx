import { React, useEffect, useMemo, useState, useRef } from 'react';
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


const AllCharacteristic = () =>{

    const [characteristic, setCharacteristic] = useState([])
    const inputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [severity, setSeverity] = useState([])

	const [isFilePicked, setIsFilePicked] = useState(false);
    const [selectedFile, setSelectedFile] = useState([]);

    const navigate = useNavigate()

    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

    const handleSubmission = () => {
        const formData = new FormData();
        formData.append('file', file);
        AxiosInstance.post('/characteristic/uploadData/', formData, {
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
        })
        .catch(error => {
          console.error('Error:', error);
          setAlertContent(error.response.data[0].name);
          setSeverity("error")
          setAlert(true);
        });
    };


    const handleClick = () => {
        // 👇️ Open the file input box on click of another element
        inputRef.current.click();
    };

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
        
        const formData = new FormData();
        const file = document.getElementById('file').files;
		formData.append('file', file[0]);

		AxiosInstance.post('/characteristic/uploadData/', formData, {
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

    const onFileUpload = () => {
		const formData = new FormData();
		formData.append("myFile", selectedFile);
		console.log(selectedFile);
		AxiosInstance.post('/characteristic/uploadData/', formData, {
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
          })
          .catch(error => {
            console.error('Error:', error);
            setAlertContent(error.response.data[0].name);
            setSeverity("error")
            setAlert(true);
          });
	};
    const handleFileChange = event => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
          return;
        }
        // 👇️ Reset file input
        event.target.value = null;
    };

    const GetData = () => {
        AxiosInstance.get('characteristic/').then((res) => {
            setCharacteristic(res.data)
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
        const tableData = characteristic.map((c) => [c.name, c.created, c.modified]);

        autoTable(doc, {
          head: [tableHeaders],
          body: tableData,
        });
        doc.save('all-characteristic.pdf');
    }


    return(
        <div>
            <Box className={'TopBar'}>
                    <CalendarViewMonthIcon/>
                    <Typography sx={{marginLeft:'15px', fontWeight:'bold'}} variant='subtitle2'>View all Characteristic!</Typography>
            </Box>
            {alert && <Alert severity={severity} ><AlertTitle>{severity}</AlertTitle> {alertContent}</Alert>}
            <MaterialReactTable
                columns={columns}
                data={characteristic}
                paginationDisplayMode={'pages'}
                initialState={ {
                    density: 'compact',
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
                        Import characteristic csv
                    </Button>
                    <MyHelpModal/>
                    </Box>
                )}
            />

        </div>
    )
}


export default AllCharacteristic