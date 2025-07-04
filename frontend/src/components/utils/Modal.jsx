import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MyDatePickerForm from '../forms/createCalendarForms/MyDatePickerForm';
import MySelectForm from '../forms/createCalendarForms/MySelectForm';
import MyTextForm from '../forms/createCalendarForms/MyTextForm';
import MyButtonCalendarForm from '../forms/createCalendarForms/MyButtonCalendarForm';
import AxiosInstance from '../Axios';
import dayjs from 'dayjs';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function MyModal({open, handleClose, myDate, formData, handelChange}) {
  
  const submission = (event) => {
    event.preventDefault()
    const startDate = dayjs(formData.start["$d"]).format("YYYY-MM-DD")
    const endDate = dayjs(formData.end["$d"]).format("YYYY-MM-DD")

    AxiosInstance.post(`appointments/`, {
      title: formData.title,
      classNames: formData.classNames,
      start: startDate,
      end: endDate
    })
    .then((res) => {
      console.log(res)
      window.location.reload()
    })
  }
  

  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            I have selected {myDate}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={submission}>
              <Box sx={{marginBottom:'20px'}}>
                <MyTextForm
                  label={"Title"}
                  name={"title"}
                  value={formData.title}
                  onChange={handelChange}
                />
              </Box>
              <Box sx={{marginBottom:'20px'}}>
                <MySelectForm
                  label={"Status"}
                  name={"classNames"}
                  value={formData.classNames}
                  onChange={handelChange}
                />
              </Box><Box sx={{marginBottom:'20px'}}>
                <MyDatePickerForm
                  label={"Start Date"}
                  name={"start"}
                  value={formData.start}
                  onChange={handelChange}
                />
              </Box>
              <Box sx={{marginBottom:'20px'}}>
                <MyDatePickerForm
                  label={"End Date"}
                  name={"end"}
                  value={formData.end}
                  onChange={handelChange}
                />
              </Box>
              <Box sx={{marginBottom:'20px'}}>
                <MyButtonCalendarForm
                  label={"Submit"}
                  type={"submit"}
                />
              </Box>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
