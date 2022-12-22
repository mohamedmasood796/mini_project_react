
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Layout from '../../components/Layout'
import { hideLoading, showLoading } from '../../redux/alrtSlice'
import axios from 'axios'
import { Table } from 'antd'
import toast from "react-hot-toast";


const UserList = () => {
    const [users, setUsers] = useState([])
    const dispatch = useDispatch()
    const getAllUsers = async () => {
        try {

            dispatch(showLoading())
            const response = await axios.get("/api/admin/get-all-users",
                {
                    headers: {
                        // Authorization: `Bearer ${localStorage.getItem("token")}`,
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                })
            dispatch(hideLoading())
            console.log(response.data.data);
            if (response.data.success) {
                setUsers(response.data.data)
            }
        } catch (error) {
            console.log('kkkk');
            dispatch(hideLoading())
            console.log(error);
        }
    }


    const changeUsserStatus = async (record, sta) => {
        try {
            console.log(record, 'llllllll');
            const passId = record._id
            console.log(passId);
            dispatch(showLoading())
            const response = await axios.post("/api/admin/change-user-status", { userIdd: passId },
                {
                    headers: {
                        // Authorization: `Bearer ${localStorage.getItem("token")}`,
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                })
            dispatch(hideLoading())
            // console.log(response.data.data);
            if (response.data.success) {
                setUsers(response.data.data)
                toast.success(response.data.message);
            }
        } catch (error) {
            console.log('kkkk');
            dispatch(hideLoading())
            console.log(error);
        }
    }

    useEffect(() => {
        getAllUsers()
    }, [])

    const columns = [
        {
            title: "Name",
            dataIndex: "name"
        },
        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "Created At",
            dataIndex: "createdAt"
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className='d-flex '>

                    {record.isActive && <h1 className='anchor' onClick={() => changeUsserStatus(record, 'hh')}>Bolck</h1>}
                    {!record.isActive && <h1 className='anchor' onClick={() => changeUsserStatus(record, 'll')}>UnBolck</h1>}

                </div>
            )
        }
    ]


    return (
        <Layout>
            <h1>Userslist</h1>
            <Table columns={columns} dataSource={users} />
        </Layout>
    )
}

export default UserList