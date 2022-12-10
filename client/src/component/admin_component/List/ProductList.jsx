import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import EditProduct from '../EditProduct';
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import { deleteProduct, getProducts } from '../../../redux/actions/productActions';

// const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'firstName', headerName: 'First name', width: 130 },
//     { field: 'lastName', headerName: 'Last name', width: 130 },
//     {
//         field: 'age',
//         headerName: 'Age',
//         type: 'number',
//         width: 90,
//     },
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
const Delete = styled.button`
background-color : red;
`;
const View = styled.button`
background-color : green;
`;
const ImageContainer = styled.div`
 img{
    height : 60px;
 }
`


const ProductTable = () => {
    const { products } = useSelector(state => state.getProducts);

    const dispatch = useDispatch();

     useEffect(()=>{
       dispatch(getProducts());
     },[products]);

     const handleDelete = (id)=>{
        dispatch(deleteProduct(id));
     }

    const rows = products && products.map(product => {
        return {
            id: product._id,
            imgUrl: product.img[0].url,
            pName: product.title,
            des: product.des,
            price: product.price,
            category: product.cat,

        }
    });

    const columns = [
        { field: 'id', headerName: 'ID', width: 220 },
        {
            field: 'imgUrl', headerName: 'Image', width: 90,
            renderCell: (params) => {
                return (
                    <ImageContainer>
                        <img src={params.row.imgUrl} alt='pimg' />
                    </ImageContainer>

                )
            }
        },
        { field: 'pName', headerName: 'Name', width: 130 },
        { field: 'des', headerName: 'Details', width: 190 },

        {
            field: 'price',
            headerName: 'Price',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 140,
            // valueGetter: (params) =>
            //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        {
            field: 'actions', headerName: 'Actions', width: 240,
            renderCell: (params) => {
                return (
                    <Actions>
                        <Delete onClick={() => handleDelete(params.row.id)}>Delete</Delete>
                        <EditProduct prodId={params.row.id} />
                        <View>View</View>
                    </Actions>
                );
            }
        },

    ];


    return (
        <div style={{ height: 450, width: '100%', margin: "1rem" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
}

export default ProductTable;
