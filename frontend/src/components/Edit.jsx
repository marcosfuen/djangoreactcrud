import {React, useState, useEffect} from 'react';
import AxiosInstance from './Axios';
import { Box, Typography } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextForm from './forms/TextForm';
import SelectForm from './forms/SelectForm';
import MultiSelectForm from './forms/MultiSelectForm';
import DescriptionForm from './forms/DescrptionForm';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import * as yup from 'yup';
import MyMessage from './forms/Message';
import { useNavigate, useParams } from 'react-router';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const Edit = () =>{

    const MyParameter = useParams()
    const MyId = MyParameter.id


    const[country, setCountry] = useState([])
    const[league, setLeague] = useState([])
    const[characteristic, setCharacteristic] = useState([])
    const[message, setMessage] = useState([])
    const [footballClub, setFootballClub] = useState({
                name:"",
                description:"",
                attendance:0,
                city:"",
                country:"",
                league:"",
                characteristic:[],
    })
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [severity, setSeverity] = useState([])
    const navigate = useNavigate()

    console.log('My data', footballClub)

    const GetData = () => {
        AxiosInstance.get('country/').then((res) => {
            setCountry(res.data)
        } )


        AxiosInstance.get('league/').then((res) => {
            setLeague(res.data)
        } )


        AxiosInstance.get('characteristic/').then((res) => {
            setCharacteristic(res.data)
        } )

        AxiosInstance.get(`footballClub/${MyId}/`).then((res) => {
            setFootballClub(res.data)
        } )
    }

    useEffect(() => {
        GetData()
    }, [])

    const validationSchema = yup.object({
        name: yup.string("The name must be text").min(2, 'Too Short!').max(150, 'Too Long!').required("Name is required").matches(
                /^([a-zA-Z ]{2,150})$/g, "The name must be text"
                ),
        description: yup.string("The Description must be text").required("Description is required").max(1000, 'Too Long!'),
        city: yup.string("The city must be text").min(2, 'Too Short!').max(150, 'Too Long!').required("City is required").matches(
            /^([a-zA-Z ]{2,150})$/g, "The city must be text"
            ),
        country: yup.string("The country must be text").required("Country is required"),
        league: yup.string("The league must be text").required("League is required"),
        attendance: yup.number("The attendance must be number").required("Attendance is required"),
        characteristic: yup.array().min(1,"Select at least one option"),
    })

    const formik = useFormik({
        initialValues:{
            name: footballClub.name,
            description: footballClub.description,
            attendance: footballClub.attendance,
            city: footballClub.city,
            country: footballClub.country,
            league: footballClub.league,
            characteristic: footballClub.characteristic,
        },
        enableReinitialize: true,
        validationSchema: validationSchema,

        onSubmit: (values) => {
            AxiosInstance.put(`footballClub/${MyId}/`, values).then(()=>{
                setAlertContent("has been updated satisfactorily the data to the database!");
                setSeverity("success")
                setAlert(true);
                // setMessage(
                //     <MyMessage
                //     messageText = {"You succesfully update data to the database!"}
                //     messageColor = {"green"}
                // />
                // )
                setTimeout(() => {
                    navigate('/')
                }, 1500)
            })
        }
    })

    console.log("Form Values", formik.values)

    return(
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Box className={'TopBar'}>
                    <AddBoxIcon/>
                    <Typography sx={{marginLeft:'15px', fontWeight:'bold'}} variant='subtitle2'>Edit a fooball Club!</Typography>
                </Box>

                {/* <MyMessage
                    messageText = {"You succesfully submitted data to the database!"}
                    messageColor = {"green"}
                /> */}

                {message}
                {alert && <Alert severity={severity} ><AlertTitle>{severity}</AlertTitle> {alertContent}</Alert>}
                <Box className={'FormBox'}>
                    <Box className={'FormArea'}>
                        <Box sx={{marginTop:'30px'}}>
                            <TextForm 
                                label={"Club name"}
                                name='name'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </Box>
                        <Box sx={{marginTop:'30px'}}>
                            <TextForm 
                                label={"City"}
                                name='city'
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.city && Boolean(formik.errors.city)}
                                helperText={formik.touched.city && formik.errors.city}
                            />
                        </Box>
                        <Box sx={{marginTop:'30px'}}>
                            <SelectForm
                                label={"League"}
                                options={league}
                                name='league'
                                value={formik.values.league}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.league && Boolean(formik.errors.league)}
                                helperText={formik.touched.league && formik.errors.league}
                            />
                        </Box>
                        <Box sx={{marginTop:'30px'}}>
                            <Button type="submit" variant="contained" fullWidth>Submit the Data</Button>
                        </Box>
                        
                    </Box>

                    <Box className={'FormArea'}>
                        <Box sx={{marginTop:'30px'}}>
                            <SelectForm
                                label={"Country"}
                                options={country}
                                name='country'
                                value={formik.values.country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.country && Boolean(formik.errors.country)}
                                helperText={formik.touched.country && formik.errors.country}
                                
                            />
                        </Box>
                        <Box sx={{marginTop:'30px'}}>
                            <TextForm 
                                label={"Attendance"}
                                name='attendance'
                                value={formik.values.attendance}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.attendance && Boolean(formik.errors.attendance)}
                                helperText={formik.touched.attendance && formik.errors.attendance}
                                
                            />
                        </Box>
                        <Box sx={{marginTop:'30px'}}>
                            <MultiSelectForm 
                                label={"Characteristic"}
                                options={characteristic}
                                name='characteristic'
                                value={formik.values.characteristic}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.characteristic && Boolean(formik.errors.characteristic)}
                                helperText={formik.touched.characteristic && formik.errors.characteristic}
                                
                            />
                        </Box>
                        
                        
                    </Box>

                    <Box className={'FormArea'}>
                        <Box sx={{marginTop:'30px'}}>
                            <DescriptionForm 
                                label={"Description"}
                                rows={9}
                                name='description'
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description ? formik.errors.description : 'Maximum of characters: 1000'}
                                // helperText={formik.touched.description && formik.errors.description}
                            />
                        </Box>
                    </Box>


                </Box>
            </form>
        </div>
    )
}


export default Edit