import {React, useState, useEffect} from 'react';
import AxiosInstance from '../../Axios';
import { Box, Typography } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextForm from '../../forms/TextForm';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import * as yup from 'yup';
import MyMessage from '../../forms/Message';
import { useNavigate } from 'react-router';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {Input} from '@mui/material';

const CreateCountry = () =>{

    const[country, setCountry] = useState([])
    const[message, setMessage] = useState([])
    const [alert, setAlert] = useState(false);
    const [file, setFile] = useState(null);
    const [alertContent, setAlertContent] = useState('');
    const [severity, setSeverity] = useState([])
    
    
    const navigate = useNavigate()

    

    const GetData = () => {
        
        AxiosInstance.get('country/').then((res) => {
            setCountry(res.data)
        } )

    }

    useEffect(() => {
        GetData()
    }, [])

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        AxiosInstance.post('/country/uploadData/', formData, {
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
        //   setMessage(
        //     <MyMessage
        //         messageText = {response.data}
        //         messageColor = {"green"}
        //     />
        //   )
        })
        .catch(error => {
          console.error('Error:', error);
          setAlertContent(error.response.data[0].name);
          setSeverity("error")
          setAlert(true);
        //   setMessage(
        //     <MyMessage
        //         messageText = {error.response.data[0].name}
        //         messageColor = {"red"}
        //     />
        //   )
        });
      };

    const validationSchema = yup.object({
        name: yup.string("The name must be text").min(2, 'Too Short!').max(150, 'Too Long!').required("Name is required").matches(
                /^([a-zA-Z ]{2,150})$/g, "The name must be text"
                ),
    })

    const formik = useFormik({
        initialValues:{
            name:"",
        },
        validationSchema: validationSchema,

        onSubmit: (values) => {
            AxiosInstance.post('country/', values).then(()=>{
                setAlertContent("You succesfully submitted data to the database!");
                setSeverity("success")
                setAlert(true);
                // setMessage(
                //     <MyMessage
                //     messageText = {"You succesfully submitted data to the database!"}
                //     messageColor = {"green"}
                // />
                // )
                // setTimeout(() => {
                //     navigate(0)
                // }, 1500)
            }).catch(function (error) {
                            // handle error
                    setAlertContent(error.response.data.name);
                    setSeverity("error")
                    setAlert(true);
                    // console.log(error.response.data.name);
                    // setMessage(
                    //     <MyMessage
                    //         messageText = {error.response.data.name}
                    //         messageColor = {"red"}
                    //     />
                    // )
                    // setTimeout(() => {
                    //     navigate(0)
                    // }, 1500)
            })
        }
    })


    return(
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Box className={'TopBar'}>
                    <AddBoxIcon/>
                    <Typography sx={{marginLeft:'15px', fontWeight:'bold'}} variant='subtitle2'>Create a new Country!</Typography>
                </Box>

                {message}
                {alert && <Alert severity={severity} ><AlertTitle>{severity}</AlertTitle> {alertContent}</Alert>}
                <Box className={'FormBox'}>
                    <Box className={'FormArea'}>
                        <Box sx={{marginTop:'30px'}}>
                            <TextForm
                                label={"Country Name"}
                                name='name'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </Box>
                        <Box sx={{marginTop:'30px'}}>
                            <Button type="submit" variant="contained" fullWidth>Submit the Data and continu add</Button>
                        </Box>                     
                    </Box>
                    <Box className={'FormArea'}>
                        <Box sx={{marginTop:'30px'}}>
                            
                        </Box>
                    </Box>
                    <Box className={'FormArea'}>
                        <Box sx={{marginTop:'30px'}}>
                            
                        </Box>
                    </Box>
                </Box>
                
            </form>
            <form  onSubmit={handleSubmit}>
                <Input
                    id='file'
                    type="file"
                    onChange={handleFileChange}
                />
                <Button
                    title='Import csv'
                    startIcon={<FileUploadIcon />}
                    type='submit'
                >
                Import country Name Csv
                </Button>
            </form>
        </div>
    )
}


export default CreateCountry