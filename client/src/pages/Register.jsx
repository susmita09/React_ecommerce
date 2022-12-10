import React from "react";
import styled from "@emotion/styled";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from "../redux/actions/authActions";
import NavBar from "../component/navbar/Navbar";

const Container = styled.div`
 height : 100vh;
 width : 100vw;
 background : linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),
  url("https://i.pinimg.com/564x/91/a4/2b/91a42ba068d039d93afb53e3f61e339c.jpg");
 background-size : cover;
 display : flex;
 align-items : center;
 justify-content : center;
`;
const Wrapper = styled.div`
 width : 30%;
 padding : 20px;
 background-color : white;
 ${mobile({ width: "75%" })}
`;
const Title = styled.h1`
 text-align : center;
 font-size : 30px;
 font-weight : 200;
`;
const Form = styled.form`
display : flex;
flex-direction : column;
`;

const Label = styled.label`
  margin-top : 20px;
  font-size : 18px;
`;

const Input = styled.input`
 width : 95%;
 padding : 5px;
 margin : 3px 0px;
 border : none;
 border : 1px solid gray;
 border-radius : 6px;
 outline : none;
 &:focus{
    border : 1px solid #6a5acd;
 }
`;
const Aggrement = styled.span`
 
margin : 20px 0px;
font-size : 15px;
font-weight : 200;
`;
const Button = styled.button`
  font-size : 15px; 
 width : 95%;
 margin-top : 15px;
  
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
   
`;

const Text = styled.p`
 text-align : center;
 padding-top : 20px;
 font-size : 15px;
font-weight : 200;
`;

const Error = styled.p`
 color : red;
 padding : 10px;
 size :20px;
`

const Register = () => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    // console.log(user)
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    console.log(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.id) {
            navigate("/cart");
        }
    }, [auth.id, navigate])

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(signUp(user));
    }

    return (
        <>
            <NavBar />

            <Container>

                <Wrapper>
                    <Title>Create an Account</Title>
                    <Form >
                        <Label>Name</Label>
                        <Input placeholder="name" type="text" required onChange={(e) => setUser({ ...user, name: e.target.value })} />
                        <Label>Email</Label>
                        <Input placeholder="email" type="email" required onChange={(e) => setUser({ ...user, email: e.target.value })} />
                        {/* <Label>Number</Label>
                    <Input placeholder="number" type="number" /> */}
                        <Label>Password</Label>
                        <Input placeholder="password" type="password" required onChange={(e) => setUser({ ...user, password: e.target.value })} />
                        <Label>Confirm Password</Label>
                        <Input placeholder="confirm Password" type="password" onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} />

                        <Button onClick={handleClick}>CREATE</Button>
                    </Form>
                    {(auth.registerStatus === "rejected") ? <Error>{auth.registerError.response.data}</Error> : null}
                    <Aggrement>
                        By creating an account, I consent to the processing of my personal
                        data in accordance with the <a href="#">PRIVACY POLICY</a>
                    </Aggrement>
                    <Text>Already have an Account? <Link to="/login">Login</Link></Text>
                </Wrapper>
            </Container>
        </>
    )
}

export default Register