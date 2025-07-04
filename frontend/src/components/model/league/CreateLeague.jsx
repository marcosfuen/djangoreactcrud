import {React, useState, useEffect} from 'react';
import AxiosInstance from '../../Axios';
import { Box, Typography } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextForm from '../../forms/TextForm';
import Button from '@mui/material/Button';
import {Input} from '@mui/material';
import {useFormik} from 'formik';
import * as yup from 'yup';
import MyMessage from '../../forms/Message';
import { useNavigate } from 'react-router';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


const CreateLeague = () =>{

    const[league, setLeague] = useState([])
    const[message, setMessage] = useState([])
    const [file, setFile] = useState(null);
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [severity, setSeverity] = useState([])

    const navigate = useNavigate()


    

    const GetData = () => {
        
        AxiosInstance.get('league/').then((res) => {
            setLeague(res.data)
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

    // function InnerForm() {
    //     return (
    //         <form onSubmit={handleSubmit}>
    //             <input type="file" onChange={handleFileChange} />
    //             <button type="submit">import</button>
    //         </form>
    //     );
    //   }

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
            AxiosInstance.post('league/', values).then(()=>{
                setAlertContent("You succesfully submitted data to the database!");
                setSeverity("success")
                setAlert(true);
                formik.resetForm()
                // setMessage(
                //     <MyMessage
                //     messageText = {"You succesfully submitted data to the database!"}
                //     messageColor = {"green"}
                // />
                // )
                // setTimeout(() => {
                //     // navigate('.', { replace: true })
                //     navigate(0)
                // }, 1500)
            }).catch(function (error) {
                // handle error
                console.log(error.response.data.name);
                setAlertContent(error.response.data.name);
                setSeverity("error")
                setAlert(true);
                // setMessage(
                //     <MyMessage
                //     messageText = {error.response.data.name}
                //     messageColor = {"red"}
                // />
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
                    <Typography sx={{marginLeft:'15px', fontWeight:'bold'}} variant='subtitle2'>Create a new League!</Typography>
                </Box>

                {message}
                {alert && <Alert severity={severity} ><AlertTitle>{severity}</AlertTitle> {alertContent}</Alert>}
                <Box className={'FormBox'}>
                    <Box className={'FormArea'}>
                        <Box sx={{marginTop:'30px'}}>
                            <TextForm
                                label={"League Name"}
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

                        {/* <form  onSubmit={handleSubmit}>
                            <input type="file" onChange={handleFileChange} />
                            <button type="submit">import</button>
                        </form>  */}
                                
                        
                        {/* <InnerForm />    */}
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
                                    Import league Name Csv
                                </Button>
                            </form>
        </div>
    )
}


export default CreateLeague