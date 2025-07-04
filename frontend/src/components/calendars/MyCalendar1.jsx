import { React } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import mutiMonthPlugin from '@fullcalendar/multimonth';
import interactionPlugin from '@fullcalendar/interaction';
import '../../App.css'
import Tooltip from 'tooltip.js';
import { format } from 'date-fns';
import { useNavigate } from 'react-router';


const MyCalendar1 = ({myAppointments, dayClikAction}) => {
    //dayGridDay, dayGridWeek, dayGridMonth, dayGridYear
    //timeGridDay, timeGridWeek
    //listDay, listWeek, listMonth, listYear
    //multiMonthYear

    const navigate = useNavigate()
    const appoinClickAction = (data) => {
        navigate(`/appDetails/${data.event.id}`)
    }

    return ( 
        
            <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin, listPlugin, mutiMonthPlugin, interactionPlugin ]}
                initialView="dayGridMonth"
                events={myAppointments}
                editable={true} 
                selectable={true}
                droppable={true}
                // displayEventTime={false}
                dayMaxEvents={true}
                // timeZone={'UTC'}
                // eventBackgroundColor={'red'}
                // events={[
                //     { title: 'Event 1', start: '2025-05-12', extendedProps: { description: 'Description for Event 1' } },
                //     { title: 'Event 2', start: '2025-05-13', extendedProps: { description: 'Description for Event 2' } }
                // ]}
                eventClick={appoinClickAction}
                dateClick={dayClikAction}
                eventDidMount={ function(info) {
                    // el formato Pp me da la fecha y las horas y el formato cumon es obvio MM/dd/yyyy
                    var toolTipTitle = "<strong>"+info.event.title+"</strong>"+ "<hr>" +""+ "<i>"+"<strong>"+"Start:"+"</strong>"+" "+format(info.event.start, "Pp ")+"</i>"+" <br>"+ "<i>"+"<strong>"+"End:"+"</strong>"+" "+format(info.event.end, "Pp")+"</i>"+"<br>"+"<strong>"+"Status:"+"</strong>"+" "+ info.event.classNames;
                    // var toolTipTitle = "<strong>"+info.event.title+"</strong>"+ "<hr>" +""+ "<i>"+"<strong>"+"Start:"+"</strong>"+" "+format(info.event.start, "MM/dd/yyyy")+"</i>"+" <br>"+ "<i>"+"<strong>"+"End:"+"</strong>"+" "+format(info.event.end, "MM/dd/yyyy")+"</i>"+"<br>"+"<strong>"+"Status:"+"</strong>"+" "+ info.event.classNames;
                    var tooltip = new Tooltip(info.el, {
                        html: 'true',
                        title: toolTipTitle,
                        placement: 'top',
                        trigger: 'hover',
                        container: 'body',

                    });
                }}

                eventResize={ function(info) {
                    alert(info.event.title + " end is now " + info.event.end.toISOString());
                    if (!confirm("is this okay?")) {
                    info.revert();
                    }
                }}

                views = {{
                    multiMonth3: {
                        type: 'multiMonth',
                        duration: {month: 3},
                        titleFormat: {month: 'short', year: 'numeric'},
                        columnHeaderFormat: {weekday: 'short'},
                        buttonText: "3 Month",
                    }
                }}

                headerToolbar = {{
                    left: 'prev,next',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,listDay,multiMonth3,multiMonthYear',
                }}
            />
        
     );
}
 
export default MyCalendar1;