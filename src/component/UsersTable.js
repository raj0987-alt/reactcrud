import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Axios from "axios";
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const UsersTable = props => {

    const [tableData, setTableData] = useState([{}]);

    useEffect(() => {

        let isSubscribed = true;
        const fetchData = async () => {
            const result = await Axios(`http://192.168.0.5:8082/api/CrudOperation/ReadRecord`);
            if (isSubscribed) {
                setTableData(result.data.readRecordData);


            }
        }
        fetchData()
            .catch(console.error);
        return () => isSubscribed = false;
    }, []);
   
    const data = tableData;
    var i = 1;

    const myView = data.map(function (myList, index) {
        return (

            <div key={index} className='data-flex'>
                <div className='Id'>{i++}</div>
                <div className='UserName'>{myList.userName}</div>
                <div className='UserId'>{myList.userId}</div>
                <div className='Age'>{myList.age}</div>
                <div className='Email'>{myList.email}</div>
                <div className='Phone'>{myList.phone}</div>
                <div className='Update'>
                    <Button variant='outlined' color='primary' onClick={()=>props.handleEdit(myList)}>
                        <EditIcon/>

                    </Button>
                </div>
                <div className='Delete'>
                    <Button variant='outlined' color='error' onClick={()=>props.handleDelete(myList)}>
                        <DeleteOutlineIcon/>

                    </Button>
                </div>


            </div>
        )
    });

    return (
        <>
        <div className='data-flex' style={{'background':'#FF99FF'}}>
                <div className='Id'>Sl.</div>
                <div className='UserName'>Name</div>
                <div className='UserId'>ID</div>
                <div className='Age'>Age</div>
                <div className='Email'>Email</div>
                <div className='Phone'>Phone</div>
                <div className='Update'>Update
                    
                </div>
                <div className='Delete'>
                    Delete
                </div>


            </div>
            {data.length > 1 ? myView : <div>No Data Found</div>}




        </>
    );
};

UsersTable.propTypes = {

};

export default UsersTable;