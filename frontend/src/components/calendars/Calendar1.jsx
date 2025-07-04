import { React, useEffect, useState } from 'react';
import MyCalendar1 from './MyCalendar1';
import AxiosInstance from '../Axios'
import MyMultipleSelectCalendarForm from '../forms/MultiSelectCalendarForm';
import { Box } from '@mui/material';
import DatePickerForm from '../forms/DatePickerForm';
import dayjs from 'dayjs';
import MyModal from '../utils/Modal';

const Calendar1 = () => {

    const [appointments, setAppointment] = useState([])
    const [statusOptions, setStatusOptions] = useState()
    const [selectedStatus, setSelectedStatus] = useState([])
    const [loading, setLoading] = useState(true)
    const [fromDate, setFromDate] = useState(null)
    const [open, setOpen] = useState(false);
    const [selecteDate, setSelecteDate] = useState([false]);

    const [formData, setFormData] = useState({
        title: '',
        classNames: '',
        start: '',
        end: ''

    })

    console.log("datos del form data", formData)

    const handelChange = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name] : value
        })
    }

    const handleOpen = (info) => {
        setOpen(true)
        setSelecteDate(info.dateStr)
        setFormData({
            title: '',
            classNames: '',
            start: dayjs(info.dateStr),
            end: dayjs(info.dateStr)
        })
    };
    const handleClose = () => {
        setOpen(false)
        setFormData({
            title: '',
            classNames: '',
            start: '',
            end: ''
        })
    };

    

    const fromDateChange = (newDate) => {
        setFromDate(newDate)
        console.log("Select from date", newDate.format('DD-MM-YYYY'))
    }

     const [toDate, setToDate] = useState(null)

    const toDateChange = (newDate) => {
        setToDate(newDate)
        console.log("Select to date", newDate.format('DD-MM-YYYY'))
    }

    const filterAppointments = appointments.filter((appointment) => 
        selectedStatus.includes(appointment.classNames) && 
        (!fromDate || dayjs(appointment.start).isAfter(fromDate, 'day')) &&
        (!toDate || dayjs(appointment.end).isBefore(toDate, 'day'))
    )


    const GetData = () => {
        AxiosInstance.get(`appointments/`).then((res) => {
            setAppointment(res.data)
            setStatusOptions([...new Set(res.data.map((appointment) => appointment.classNames))])
            setSelectedStatus([...new Set(res.data.map((appointment) => appointment.classNames))])
            setLoading(false)
        })
    }

    useEffect(() => {
        GetData();
    }, [])

    return ( 
        <div>
            { loading ? <p>Loading data...</p> :  
            <>
                <MyModal
                    open={open}
                    handleClose={handleClose}
                    myDate={selecteDate}
                    formData={formData}
                    handelChange={handelChange}

                />
                <Box sx={{boxShadow:3, padding:'20px', display:'flex', justifyContent: 'space-evenly', marginBottom:'20px'}}>
                    <Box sx={{width: '30%'}}>
                        <MyMultipleSelectCalendarForm
                            label={"Status"}
                            options={statusOptions}
                            setSelecteValue={setSelectedStatus}
                            selecteValue={selectedStatus}
                        />
                    </Box>
                    <Box sx={{width: '30%'}}>
                        <DatePickerForm
                            label={"From date"}
                            value={fromDate}
                            onChange={fromDateChange}
                        />
                    </Box>
                    <Box sx={{width: '30%'}}>
                        <DatePickerForm
                            label={"To date"}
                            value={toDate}
                            onChange={toDateChange}
                        />
                    </Box>
                </Box>
                <Box sx={{boxShadow:3, padding:'20px'}}>
                    <MyCalendar1
                        myAppointments={filterAppointments}
                        dayClikAction={handleOpen}
                    />
                </Box>
            </>
            }
        </div>
     );
}
 
export default Calendar1;