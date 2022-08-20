import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Axios from "axios";
import CrudServices from '../services/CrudServices';
import UsersTable from './UsersTable';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { SiDotnet } from "react-icons/si";
import { SiReact } from "react-icons/si";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const services = new CrudServices();
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });



  
function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }
  
  ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };

const initialValues = {
    userName: "",
    userId: "",
    age: "",
    email: "",
    phone: "",
    id: 5,
    UpdateFlag: false,

};

const HomePageComponent = props => {
    const [values, setValues] = useState(initialValues);
    const [open, setOpen] = React.useState(false);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };


    const handleClick = () => {
        if (values.userName === "" || values.age === "" || values.email === "" || values.userId === "" || values.phone === "") {
            console.log("Input Field Is Empty");
            return
        }

        console.log("Data : ", values);

        const data = {
            "userName": values.userName,
            "userId": values.userId,
            "age": Number(values.age),
            "email": values.email,
            "phone": values.phone,
        }

        services.CreateRecord(data).then((data) => {
            console.log(data);
        }).catch((error) => {
            console.log(error);
        });
    }

    const postData = (e) => {
        e.preventDefault();
        if (values.UpdateFlag === false) {
            Axios.post(`http://192.168.0.5:8082/api/CrudOperation/CreateRecord`, {
                userName: values.userName,
                userId: values.userId,
                age: values.age,
                email: values.email,
                phone: values.phone,

            })
                .then(function (response) {
                    if (response.status === 200) {
                        if (response.data.isSuccess === true) {
                            setOpen(true);
                            setValues({
                                ...values,
                                userName: "",
                                userId: "",
                                age: "",
                                email: "",
                                phone: "",
                                id: "",
                                UpdateFlag: false,
                            })
                            // toastr.success('Company Created Successfully');
                        } else {
                            // toastr.error('Company Created Failed');
                        }
                    } else {

                        // toastr.error('Something Went Wrong');
                    }
                })
                .catch(function (error) {
                    // toastr.error('Something Went Wrong');
                });
        } else {
            Axios.put(`http://192.168.0.17:8082/api/CrudOperation/UpdateRecord`, {
                id: values.id,
                userName: values.userName,
                userId: values.userId,
                age: values.age,
                email: values.email,
                phone: values.phone,

            })
                .then(function (response) {
                    if (response.status === 200) {
                        if (response.data.isSuccess === true) {
                            setOpen(true);
                            setValues({
                                ...values,
                                userName: "",
                                userId: "",
                                age: "",
                                email: "",
                                phone: "",
                                Id: "",
                                UpdateFlag: false,
                            })
                            // toastr.success('Company Created Successfully');
                        } else {
                            // toastr.error('Company Created Failed');
                        }
                    } else {

                        // toastr.error('Something Went Wrong');
                    }
                })
                .catch(function (error) {
                    // toastr.error('Something Went Wrong');
                });
        }


    }

    const handleEdit = (data) => {
        setValues({
            ...values,
            userName: data.userName,
            userId: data.userId,
            age: data.age,
            email: data.email,
            phone: data.phone,
            id: data.id,
            UpdateFlag: true,
        })
    }


    const handleDelete = (e) => {
        // const datas = {
        //     id: Number(e.id),
        // }
        
        // e.preventDefault();
        // setValues({
        //     ...values,
           
        //     id: e.id,
            
        // },() =>{console.log(values.id)

            Axios.delete(`http://192.168.0.17:8082/api/CrudOperation/DeleteRecord`, {
                data: {id: Number(e.id)}})
                .then(function (response) {
                    if (response.status === 200) {
                        if (response.data.isSuccess === true) {
                            setOpen(true);
                           
                            // toastr.success('Company Created Successfully');
                        } else {
                            // toastr.error('Company Created Failed');
                        }
                    } else {

                        // toastr.error('Something Went Wrong');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    // toastr.error('Something Went Wrong');
                });
        }
        // ) 
      
            
    
    


  
    return (
        <div className='MainContainer'>
            <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div">
            <SiDotnet/> ASP.NET Core 6.0 && React JS <SiReact/> CRUD Application
            </Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
            
            <div className='SubContainer'>
                <div className='Box1'>
                    <div className='Input-Container'>
                        <div className='flex-Container'>
                            <TextField
                                fullWidth
                                required
                                name='userName'
                                size='small'
                                variant='outlined'
                                label="User Name"
                                value={values.userName}
                                onChange={handleInputChange}


                            />
                        </div>

                        <div className='flex-Container'>
                            <TextField
                                fullWidth
                                required
                                name='userId'
                                size='small'
                                label="User Id"
                                variant='outlined'
                                value={values.userId}
                                onChange={handleInputChange}

                            />
                        </div>

                        <div className='flex-Container'>
                            <TextField
                                fullWidth
                                required
                                name='age'
                                size='small'
                                variant='outlined'
                                label="Age"
                                value={values.age}
                                onChange={handleInputChange}

                            />
                        </div>

                        <div className='flex-Container'>
                            <TextField
                                fullWidth
                                required
                                name='email'
                                size='small'
                                variant='outlined'
                                label="Email"
                                value={values.email}
                                onChange={handleInputChange}

                            />
                        </div>

                        <div className='flex-Container'>
                            <TextField
                                fullWidth
                                required
                                name='phone'
                                size='small'
                                variant='outlined'
                                label="Phone"
                                value={values.phone}
                                onChange={handleInputChange}

                            />
                        </div>
                        <div className='flex-button'>
                            <Button variant="contained" color="secondary"
                                onClick={postData}
                            >
                                Submit
                            </Button>

                        </div>



                    </div>

                </div>
                <div className='Box2'>
                    <UsersTable
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />

                </div>

            </div>
            <Snackbar open={open} autoHideDuration={2400} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Operation Successfully Done !
        </Alert>
      </Snackbar>
        </div>
    );
};

HomePageComponent.propTypes = {

};

export default HomePageComponent;