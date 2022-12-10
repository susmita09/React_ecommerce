import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';

import { getAllOrders, ordersEdit } from '../../../redux/actions/orderAction';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

// const columns = [
//      
//     {
//         field: 'fullName',
//         headerName: 'Full name',
//         description: 'This column has a value getter and is not sortable.',
//         sortable: false,
//         width: 160,
//         valueGetter: (params) =>
//             `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//     },
// ];

const Actions = styled.div`
 width : 100%;
 display : flex;
 justify-content : space-between;
 button{
    border : none;
    outline : none;
    padding : 3px 5px;
    color : white;
    border-radius : 3px;
    cursor : pointer;
 }
`;
const Dispatchbtn = styled.button`
background-color : rgb(39,198,249);
`;

const Delivary = styled.button`
 background-color : rgb(102,108,255);
`;
const View = styled.button`
background-color : rgb(114,225,40);
`;

const Pending = styled.div`
 color : yellow;
  
 padding : 3px 5px;
 border-radius : 5px;
 font-size : 14px;
`;
const Dispatched = styled.div`
color : rgb(39,198,249);
`;
const Delivered = styled.div`
 color : rgb(102,108,255);
`;


const OrdersList = () => {

    const { orders } = useSelector(state => state.ordersState);

    const nevigate = useNavigate();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch,orders]);



    const rows = orders && orders.map(order => {
        return {
            id: order._id,
            cName: order.shipping.name,
            amount: (order.total / 100).toLocaleString(),
            dstatus: order.status,
            date: order.createdAt.toLocaleString()

        }
    });

    const columns = [
        { field: 'id', headerName: 'ID', width: 250 },
        { field: 'cName', headerName: 'Coustomar Name', width: 130 },
        { field: 'amount', headerName: 'Amount (Rs)', width: 150 },
        {
            field: 'status', headerName: 'Delivary Status',
            width: 120,
            renderCell: (params) => {
                return <div>
                    {params.row.dstatus === "pending" ? <Pending>pending</Pending>
                        : params.row.dstatus === "dispatched" ? <Dispatched>dispatched</Dispatched>
                            : params.row.dstatus === "delivered" ? <Delivered>delivered</Delivered> : "erroer"}
                </div>
            }
        },

        {
            field: 'date',
            headerName: 'Order Date',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 170,
            // valueGetter: (params) =>
            //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        {
            field: 'actions', headerName: 'Actions', width: 255,
            renderCell: (params) => {
                return (
                    <Actions>
                        <Dispatchbtn onClick={() => handleOrderDispatch(params.row.id)}>Dispatch</Dispatchbtn>
                        <Delivary onClick={() => handleOrderDeliver(params.row.id)}>Delivar</Delivary>
                        <View onClick={()=>nevigate(`/order/${params.row.id}`)}>View</View>
                    </Actions>
                );
            }
        },

    ];

    const handleOrderDispatch = (id) => {
        dispatch(ordersEdit({
            id,
            delivary_status: "dispatched"
        }))
    }

    const handleOrderDeliver = (id) => {
        dispatch(ordersEdit({
            id,
            delivary_status: "delivered"
        }))
    }

    return (
        <div style={{ height: 450, width: '100%', margin: "1rem" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
}


export default OrdersList;