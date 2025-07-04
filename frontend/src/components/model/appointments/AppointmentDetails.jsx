import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import AxiosInstance from '../../Axios';
import { Box } from '@mui/material';

const AppointmentsDetails = () => {

    const myParam = useParams()
    const myId = myParam.id
    const [loading, setLoading] = useState(true)
    const [appointment, setAppointment] = useState([])


    const GetData = () => {
        AxiosInstance.get(`appointments/${myId}`).then((res) => {
            setAppointment(res.data)
            setLoading(false)
        })
    }

    useEffect(() => {
        GetData();
    }, [])



    return(
        <div>

            { loading ? <p>Loading data...</p> : 
                <>
                    <Box sx={{boxShadow:3, padding:'20px', display: 'flex', flexDirection: 'row', marginBottom:'20px'}}>
                        <Box sx={{fontWeight:'bold'}}>Name:</Box>
                        <Box sx={{marginLeft:'10px'}}>{appointment.title}</Box>
                    </Box>

                    <Box sx={{boxShadow:3, padding:'20px', display: 'flex', flexDirection: 'row', marginBottom:'20px'}}>
                        <Box sx={{fontWeight:'bold'}}>Status:</Box>
                        <Box sx={{marginLeft:'10px'}}>{appointment.classNames}</Box>
                    </Box>

                    <Box sx={{boxShadow:3, padding:'20px', display: 'flex', flexDirection: 'row', marginBottom:'20px'}}>
                        <Box sx={{fontWeight:'bold'}}>Start day:</Box>
                        <Box sx={{marginLeft:'10px'}}>{appointment.start}</Box>
                    </Box>

                    <Box sx={{boxShadow:3, padding:'20px', display: 'flex', flexDirection: 'row', marginBottom:'20px'}}>
                        <Box sx={{fontWeight:'bold'}}>End day/hours:</Box>
                        <Box sx={{marginLeft:'10px'}}>{appointment.end}</Box>
                    </Box>
                </>
                 
            }
           
        </div>
    )
}



export default AppointmentsDetails