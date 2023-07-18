import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container,InputGroup } from 'react-bootstrap';
import Head from './Head';

function RegisterPage() {
    const [show,setShow]=useState(false);
    function addUser(e){
        e.preventDefault();
        setShow(true)
        const alertBanner=document.getElementById("alert-banner");
        const uname=e.target[0].value;
        const phone=`+91${e.target[1].value}`;
        const data=new URLSearchParams({
            'name': uname,
            'phoneNumber':phone
        })
        //console.log(phone);
        axios.post("http://localhost:5000/register",data)
        .then(res=>{
            if(res.status===200){
               console.log("User Created");
               console.log(res.data);
               const message=res.data.message
               alertBanner.innerHTML=`<div class="alert alert-success alert-dismissible fade show" role="alert">${message} <a href="/login" class="alert-link">Login Here<a/>
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>`
            }
        }).catch(err=>{
            console.log(err);
            const Error=err.response.data.message
            alertBanner.innerHTML=`<div class="alert alert-warning alert-dismissible fade show" role="alert">${Error}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>`
        })
    }

    return (
        <div>
            <div id='alert-banner'></div>
            <Head hideLogin={false} hideRegister={true}/>
            <Container className='py-3'>
            <h1 className='display-2 text-center mb-5'>Register</h1>
            <div style={{ backgroundColor: '#DCDCDC', height:'310px', margin:'auto'}} className='p-4 rounded-4 col-lg-8'>
            <Form className='row' onSubmit={addUser}>
                <Form.Group className="mx-auto mb-3 col-lg-8 col-sm-10" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Full Name" required/>
                </Form.Group>
                <Form.Group className="mb-3 mx-auto col-lg-8 col-sm-10" controlId="formNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <InputGroup>
                        <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                        <Form.Control type="text" placeholder="10-digit Phone Number" required maxLength='10' minLength='10' />
                    </InputGroup>
                    <Form.Text className="text-muted">Your Phone Numbers are secure with us</Form.Text>
                </Form.Group>
                <div className='row'>
                    <Button variant="primary" className='col-lg-2 col-sm-6 p-2 mx-auto rounded-3' type="submit" disabled={show}>Register</Button>
                </div>
            </Form>
            </div>
        </Container>
        </div>
    );
}

export default RegisterPage;