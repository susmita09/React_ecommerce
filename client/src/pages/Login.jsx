import React from "react";
import styled from "@emotion/styled";
import { mobile } from '../responsive';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../redux/actions/authActions";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

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
 border : 1px solid #6a5acd;
 border-radius : 6px;
 outline : none;
`;

const Button = styled.button`
  font-size : 15px; 
  width: 40%;
 margin-top : 15px;
 width: 40%;
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
const Anchor = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.p`
 color : red;
 padding : 10px;
 size :20px;
`

const Login = () => {
  const [user, setUser] = useState({

    email: "",
    password: "",

  });
  // console.log(user)
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  // console.log(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.id) {
      navigate("/");
      toast.success(`LogIn Success! welcome ${auth.name}`, {
        position: "top-center"
      });


    }
  }, [auth.id, navigate])

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(signIn(user));
  }
  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <Form>

          <Label>Email</Label>
          <Input placeholder="email" type="email" required onChange={(e) => setUser({ ...user, email: e.target.value })} />

          <Label>Password</Label>
          <Input placeholder="password" type="password" required onChange={(e) => setUser({ ...user, password: e.target.value })} />


          <Button onClick={handleClick}>Sign In</Button>
          <Anchor>DO NOT YOU REMEMBER THE PASSWORD?</Anchor>
        </Form>
        {(auth.loginStatus === "rejected") ? <Error>{auth.loginError.response.data}</Error> : null}
        <Text>Don't have an Account? <Link to="/register">SignUp</Link></Text>
      </Wrapper>
    </Container>
  )
}

export default Login;