import {React, useState, useEffect} from 'react';
import AxiosInstance from '../Axios';
import { Box, Typography } from '@mui/material';
import {useFormik} from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import TextForm from './TextForm';
import { styled } from '@mui/material/styles';
import MyMessage from './Message';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const UploadCsv = () =>{

    const validFileExtensions = { name: ['csv',] };
    const[message, setMessage] = useState([]);
    const [file, setFile] = useState(null);
    const navigate = useNavigate()


    function isValidFileType(fileName, fileType) {
        return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
    }

    const validationSchema = yup.object({
            name: yup.mixed().required('File is required').test("is-valid-type", "Not a valid csv type",
                value => isValidFileType(value, "name"))
    })

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        AxiosInstance.post('/league/uploadData/', formData, {
          headers: {
            "Accept": "application/json",
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          console.log('Success:', response);
          setMessage(
            <MyMessage
                messageText = {response.data}
                messageColor = {"green"}
            />
        )
        })
        .catch(error => {
          console.error('Error:', error);
        });
      };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });

    const formik = useFormik({
        initialValues:{
            name:"",
        },
        validationSchema: validationSchema,

        onSubmit: (values) => {
            AxiosInstance.post('/league/uploadData/', values.target.file).then(()=>{
                setMessage(
                    <MyMessage
                    messageText = {"You succesfully submitted data to the database!"}
                    messageColor = {"green"}
                />
                )
                setTimeout(() => {
                    navigate('/')
                }, 1500)
            })
        },

    })

    return(
        <div>
            {/* <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">import</button>
            </form> */}
            <form onSubmit={handleSubmit}>
            {message}
            <Box className={'FormBox'}>
                    <Box className={'FormArea'}>
                        <Box sx={{marginTop:'30px'}}>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            
                            >
                            Upload files
                            <VisuallyHiddenInput
                                id='file'
                                type="file"
                                onChange={handleFileChange}
                                // onChange={(event) => 
                                //     AxiosInstance.post('/league/uploadData/', event.target.files[0], 
                                //         {headers: {
                                //             Accept: "application/json",
                                //         // "Content-Type": "application/x-www-form-urlencoded",
                                //         // 'content-type': 'multipart/form-data', 
                                //     }}).then(()=>{
                                //         setMessage(
                                //             <MyMessage
                                //             messageText = {"You succesfully submitted data to the database!"}
                                //             messageColor = {"green"}
                                //         />
                                //         )
                                //         setTimeout(() => {
                                //             navigate('/')
                                //         }, 1500)
                                //     })
                                // }
                                // multiple
                                
                            />
                        </Button>
                        </Box>
                        <Box sx={{marginTop:'30px'}}>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}

                                startIcon={<FileUploadIcon />}
                                >
                                <VisuallyHiddenInput
                                    id='file'
                                    type="file"
                                    onChange={handleFileChange}
                                />
                                Import Csv
                            </Button>
                        </Box>
                        <Box sx={{marginTop:'30px'}}>
                            
                        </Box>
                        <Box sx={{marginTop:'30px'}}>
                            <Button type="submit" variant="contained" fullWidth>Submit the Data</Button>
                        </Box>
                        
                    </Box>

                    <Box className={'FormArea'}>
                        <Box sx={{marginTop:'30px'}}>
                           
                        </Box>
                        <Box sx={{marginTop:'30px'}}>
                            
                        </Box>
                        <Box sx={{marginTop:'30px'}}>
                            
                        </Box>
                        
                        
                    </Box>

                    <Box className={'FormArea'}>
                        <Box sx={{marginTop:'30px'}}>
                            
                        </Box>
                    </Box>


                </Box>

            </form>
        </div>
    )

}

export default UploadCsv