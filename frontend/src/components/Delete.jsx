import {React, useState, useEffect} from 'react';
import AxiosInstance from './Axios';
import { Box, Typography, Button } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useNavigate, useParams } from 'react-router';
import MyMessage from './forms/Message';

const Delete = () =>{

    const MyParameter = useParams()
    const MyId = MyParameter.id

    const[message, setMessage] = useState([])
    const navigate = useNavigate()

    const [footballClub, setFootballClub] = useState({
                    name:"",
                    description:"",
                    attendance:0,
                    city:"",
                    country:"",
                    league:"",
                    characteristic:[],
    })
    const GetData = () => {

        AxiosInstance.get(`footballClub/${MyId}/`).then((res) => {
            setFootballClub(res.data)
        } )
    }

    useEffect(() => {
        GetData()
    }, [])

    const DeleteRecord = (event) => {
        event.preventDefault()
        AxiosInstance.delete(`footballClub/${MyId}/`).then(() => {
            setMessage(
                <MyMessage
                        messageText = {"You succesfully deleted data to the database!"}
                        messageColor = {"green"}
                />
            )
            setTimeout(() => {
                navigate('/')
            }, 1500)
        } )
    }

    return(
        <div>
            <form onSubmit={DeleteRecord}>
            {message}
            <Box className={'TopBar'}>
                <AddBoxIcon/>
                <Typography sx={{marginLeft:'15px', fontWeight:'bold'}} variant='subtitle2'>Are you sure tha  you want to delete this record?</Typography>
            </Box>

            <Box className={'TextBox'}>
                <Typography>
                    You will be deleting the club <strong>{footballClub.name}</strong> from <strong>{footballClub.city}</strong>.
                </Typography>
            </Box>

            <Box sx={{marginTop:'30px'}}>
                <Button type="submit" variant="contained" fullWidth color='error'>Delete</Button>
            </Box>
            </form>
        </div>
    )
}


export default Delete