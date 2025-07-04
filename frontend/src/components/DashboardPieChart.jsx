import { React, useState, useEffect } from 'react';
import AxiosInstance from './Axios';
import MyPieChart from './charts/PieChart';
import MyChartBox from './charts/ChartBox';
import MyChartBox2 from './charts/ChartBox2';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import MyDonutChart from './charts/DonutChart';
import MyBarChart from './charts/BarChart';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import MyBasicLineChart from './charts/LineChart';
import MyBasicLineChart2 from './charts/LineChart2';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';

const DashboardPieChart = () => {

    const[myfootballClubData, setMyfootballClubData] = useState([])
    const[myAttendanceFCData, setMyAttendanceFCData] = useState([])
    const[myBarFCData, setMyBarFCData] = useState([])

    const GetData = () => {
        AxiosInstance.get(`footballClubChart/`).then((res) => {
            setMyfootballClubData(res.data)
        })
        AxiosInstance.get(`attendanceFootballClubChart/`).then((res) => {
            setMyAttendanceFCData(res.data)
        })
        AxiosInstance.get(`barFootballClubChart/`).then((res) => {
            setMyBarFCData(res.data)
        })
    }

    useEffect(() => {
        GetData()
    },[])


    const mySeries =  
       [
            { dataKey: 'attendance1', label: 'attendance1', stack:"A" },
            { dataKey: 'attendance2', label: 'attendance2', stack:"A" },
            { dataKey: 'attendance3', label: 'attendance3', stack:"A" }
        ]

    return(
        <div>
            <MyChartBox
                icon1 = {<StoreOutlinedIcon/>}
                title1 = {"Countrys by football club"}
                chart1 = {<MyPieChart
                            myData={myfootballClubData}
                        />}
                icon2 = {<Groups2OutlinedIcon/>}
                title2 = {"Attendance by football club"}
                chart2 = {<MyDonutChart
                            data={myAttendanceFCData}
                            centerLabel={myAttendanceFCData.reduce((sum, data) => sum + data.value,0)}
                        />}
                icon3 = {<CategoryOutlinedIcon/>}
                title3 = {"Attendance by football club"}
                chart3 = {<MyBarChart
                            dataset={myBarFCData}
                            xlabelName={'characteristic__name'}
                            series={mySeries}
                        />}
            />

            <MyChartBox2
                icon1 = {<PublicOutlinedIcon/>}
                title1 = {"Countrys by football club"}
                chart1 = {<MyBasicLineChart/>}

                icon2 = {<PublicOutlinedIcon/>}
                title2 = {"Countrys by football club"}
                chart2 = {<MyBasicLineChart2/>}
            />
            
            
        </div>
    )



}

export default DashboardPieChart