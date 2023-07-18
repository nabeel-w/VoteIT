import React, { useState } from 'react';
import { Form, Button, Container,InputGroup, Alert } from 'react-bootstrap';
import Head from './Head';
import axios from 'axios';
import { Navigate} from 'react-router-dom';

function LoginPage() {
    const [show,setShow]=useState(false);
    const [hide,setHide]=useState(true);
    const [redirect,setRedirect]=useState(false);

    function handleLogin(e){
        e.preventDefault();
        setShow(true);
        const phone=`+91${e.target[0].value}`;
        const data=new URLSearchParams({
            'phoneNumber':phone
        });
        axios.post("http://localhost:5000/login",data)
        .then(res=>{
            console.log(res.data);
            const jwtToken=res.data.token;
            localStorage.setItem('jwt', jwtToken);
            localStorage.setItem('phoneNumber', `+91 ${e.target[0].value}`);
            console.log("jwt stored");
            setRedirect(true);
            setShow(false);
        }).catch(err=>{
            console.log(err);
            setHide(false);
        })
    }

    return (
        <div>
            {redirect && <Navigate to="/otp" replace={true} />}
            <Alert key='warning' variant='warning' onClose={() => setHide(true)} dismissible hidden={hide}>
            Number not registered{' '}
            <Alert.Link href="/register">Register Here</Alert.Link>.
            </Alert>
            <Head hideLogin={true} hideRegister={false}/>
            <Container className='py-5'>
            <h1 className='display-2 text-center my-3'>Welcome to Vote It</h1>
            <div style={{ backgroundColor: '#DCDCDC', height:'250px', margin:'auto'}} className='p-5 rounded-4 col-lg-8'>
            <Form className='row' onSubmit={handleLogin}>
                <Form.Group className="mb-3 mx-auto col-lg-8 col-sm-10" controlId="formBasicEmail">
                    <Form.Label>Phone Number</Form.Label>
                    <InputGroup>
                        <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                        <Form.Control type="phone" placeholder="10-digit Phone Number" maxLength='10' minLength='10' required />
                    </InputGroup>
                    <Form.Text className="text-muted">Your Phone Numbers are secure with us</Form.Text>
                </Form.Group>
                <div className='row'>
                    <Button variant="primary" className='col-lg-2 col-sm-6 p-2 mx-auto rounded-3' type="submit" disabled={show}>Login</Button>
                </div>
            </Form>
            </div>
        </Container>
        </div>
    );
}

export default LoginPage;