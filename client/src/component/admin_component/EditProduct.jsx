import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from '@emotion/styled';
import { editProductAction } from '../../redux/actions/productActions';
import { toast } from "react-toastify";

const Edit = styled.button`
    border : none;
    outline : none;
    padding : 3px 5px;
    color : white;
    border-radius : 3px;
    cursor : pointer;
    background-color : #4b70e2;
 `;




const CreateForm = styled.form`
display: flex;
flex-direction: column;
max-width: 300px;
margin-top: 2rem;
select,
input {
  padding: 7px;
  min-height: 30px;
  outline: none;
  border-radius: 5px;
  border: 1px solid rgb(182, 182, 182);
  margin: 0.3rem 0;
  &:focus {
    border: 2px solid rgb(0, 208, 255);
  }
}
select {
  color: rgb(95, 95, 95);
}

button{
 background-color : #002147;
 color : white;
 padding : 9px;
 cursor : pointer;
 font-size : 13px;
 border : none;
 border-radius : 3px;
 &:hover{
    background-color : #171412;
 }
}
`;
const SizeContainer = styled.div`
 display : flex;
 margin : .4rem;
p,label {
  font: .9rem 'Fira Sans', sans-serif;
}

input {
  margin: .4rem;
  vertical-align:middle;
}
`;

const ImagePreview = styled.div`
margin: 2rem 0 2rem 2rem;
padding: 2rem;
border: 1px solid rgb(183, 183, 183);
max-width: 300px;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
padding: 2rem;
color: rgb(78, 78, 78);

`;
const CreateContainer = styled.div`
 display : flex;
 justify-content : space-between;
`;



const EditProduct = ({ prodId }) => {
  const [open, setOpen] = useState(false);
  const { products } = useSelector(state => state.getProducts);
  const { editStatus } = useSelector(state => state.editProduct);


  const [currentProd, setCurrentProd] = useState({});
  const [previewImg, setPreviewImg] = useState("");

  const [img, setProductImg] = useState([]);
  const [cat, setCategory] = useState("");
  const [title, setName] = useState("");
  const [price, setPrice] = useState("");
  const [des, setDesc] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState([]);


  const handleClickOpen = () => {
    setOpen(true);

    let selectedProd = products.filter((prod) => prod._id === prodId);
    selectedProd = selectedProd[0];

    // console.log(selectedProd);
    setCurrentProd(selectedProd);
    setPreviewImg(selectedProd.img[0].url);
    setProductImg([...selectedProd.img]);
    setCategory(selectedProd.cat);
    setName(selectedProd.title);
    setDesc(selectedProd.des);
    setPrice(selectedProd.price);
    // setSize(selectedProd.size);
    setColor(selectedProd.color);


  };

  const handleClose = () => {
    setOpen(false);
  };




  //handle checkbox
  const controlCheckBox = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setColor([...color, value]);
    }
    else {
      setColor(color.filter((c) => c !== value));
    }
  };

  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputval = {
      title,
      des,
      img,
      cat,
      size,
      color,
      price,
    }
    dispatch(editProductAction({ ...inputval }, prodId));
    handleClose();
  }

  // useEffect(() => {
  //   if (editStatus === "success") {
  //     handleClose();
  //     toast.success(`Product updated!  `, {
  //       position: "top-center",
  //     });
  //   }
  // }, [editStatus]);

  const controlCheckBoxSize = (e) => {

    const { checked, value } = e.target;
    if (checked) {
      setSize([...size, value]);
    }
    else {
      setSize(size.filter((s) => s !== value));
    }
    // console.log(size);

  };

  return (
    <div>
      <Edit onClick={handleClickOpen}>Edit</Edit>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"md"}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <CreateContainer>
            <CreateForm onSubmit={handleSubmit}>
              <h3>Edit Product</h3>
              <select onChange={(e) => setCategory(e.target.value)} value={cat} required>
                <option value="">Select Category</option>
                <option value="women">Women</option>
                <option value="men">Man</option>
                <option value="children">Children</option>
                <option value="other">Other</option>
              </select>
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={title}
                required
              />
              <input
                type="number"
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
              />
              <input
                type="text"
                placeholder="Short Description"
                onChange={(e) => setDesc(e.target.value)}
                value={des}
                required
              />
              <p> Product's Size:</p>
              <SizeContainer>
                <label htmlFor="small">
                  <input type="checkbox" id="small" name="size" value="S"
                    onChange={(e) => controlCheckBoxSize(e)} />
                  S
                </label>
                <label htmlFor="exsmall"><input type="checkbox" id="xsmall" name="size" value="XS"
                  onChange={(e) => controlCheckBoxSize(e)} />XS</label>
                <label htmlFor="medium"><input type="checkbox" id="medium" name="size" value="M"
                  onChange={(e) => controlCheckBoxSize(e)} />M</label>
                <label htmlFor="large"><input type="checkbox" id="large" name="size" value="L"
                  onChange={(e) => controlCheckBoxSize(e)} />L</label>
                <label htmlFor="exlarge"><input type="checkbox" id="exlarge" name="size" value="XL"
                  onChange={(e) => controlCheckBoxSize(e)} />XL</label>
                <label htmlFor="exexlarge"><input type="checkbox" id="exexlarge" name="size" value="XXL"
                  onChange={(e) => controlCheckBoxSize(e)} />XXL</label>
              </SizeContainer>

              <p>Choose your product's color:</p>
              <SizeContainer>
                <label htmlFor="colorblack">
                  <input type="checkbox" id="colorblack" name="color" value="black"
                    onChange={(e) => controlCheckBox(e)} />
                  Black
                </label>
                <label htmlFor="colorred"><input type="checkbox" id="colorred" name="color" value="red"
                  onChange={(e) => controlCheckBox(e)} />Red</label>
                <label htmlFor="colorblue"><input type="checkbox" id="colorblue" name="color" value="blue"
                  onChange={(e) => controlCheckBox(e)} />Blue</label>
                <label htmlFor="coloryellow"><input type="checkbox" id="coloryellow" name="color" value="yellow"
                  onChange={(e) => controlCheckBox(e)} />Yellow</label>
                <label htmlFor="colorgreen"><input type="checkbox" id="colorgreen" name="color" value="green"
                  onChange={(e) => controlCheckBox(e)} />Green</label>
                <label htmlFor="colorwhite"><input type="checkbox" id="colorwhite" name="color" value="white"
                  onChange={(e) => controlCheckBox(e)} />white</label>
              </SizeContainer>



              <Button type="submit">
                Update Product
              </Button>
            </CreateForm>
            <ImagePreview>
              {previewImg ? (
                <><img src={previewImg} alt="view" width="100%" height="100%" /></>
              ) : (<p>Image preview wll appear here</p>)}
            </ImagePreview>
          </CreateContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditProduct;
