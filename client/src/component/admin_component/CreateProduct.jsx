import React from "react";
import styled from "@emotion/styled";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createProductAction } from "../../redux/actions/productActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateContainer = styled.div`
 display : flex;
 justify-content : space-between;
`;

const CreateForm = styled.form`
display: flex;
flex-direction: column;
 max-width: 400px;
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
const Button = styled.button`
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
const CreateProduct = () => {
  const [productImg, setProductImg] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  
  const nevigate = useNavigate();

  const TransformFileData = (file) => {
    const reader = new FileReader();
    const Image = [...productImg];
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        Image.push(reader.result);
        setProductImg(Image);
        // console.log(productImg);
      };
    }
  };

  const handleProductImageUpload = (e) => {
    const choosenfiles = Array.prototype.slice.call(e.target.files);
    //  setProductImg(choosenfiles);
    // console.log(choosenfiles);
    choosenfiles.forEach(file => {
      TransformFileData(file);
    })
    // handleUpload(choosenfiles);
  }

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

  const controlCheckBoxSize = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setSize([...size, value]);
    }
    else {
      setSize(size.filter((s) => s !== value));
    }
    // console.log(size);
  }

  const dispatch = useDispatch();
  const { careateProductStatus } = useSelector(state => state.createProductsA);

  const isSuccess = careateProductStatus === "success";
  useEffect(() => {
    if (isSuccess) {
      resetForm();
    }
  }, [isSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputval = {
      name,
      price,
      color,
      size,
      desc,
      category,
      productImg
    }

    dispatch(createProductAction(inputval));


  }

  // Clear Form
  const resetForm = () => {

    setCategory("");
    setName("");
    setPrice("");
    setDesc("");
    setSize([]);
    setColor([]);

    document.getElementById('resume-form').reset();
    nevigate("/admin/products");
  }


  return (
    <CreateContainer>
      <CreateForm onSubmit={handleSubmit} id="resume-form">
        <h3>Create a Product</h3>
        <input
          id="imgUpload"
          accept="image/*"
          type="file"
          multiple

          onChange={handleProductImageUpload}
        />
        <select onChange={(e) => setCategory(e.target.value)} value={category} required>
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
          required
        />
        <input
          type="number"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Short Description"
          onChange={(e) => setDesc(e.target.value)}
          required
        />



        <p>Choose your product's Size:</p>
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
            onChange={(e) => controlCheckBoxSize(e)} />Large</label>
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
          "Submit"
        </Button>
      </CreateForm>
      <ImagePreview>
        {productImg.length > 0 ? (
          <><img src={productImg[0]} alt="view" width="70%" height="80%" /></>
        ) : (<p>Image preview wll appear here</p>)}
      </ImagePreview>
    </CreateContainer>
  )
}

export default CreateProduct;