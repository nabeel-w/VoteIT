import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import Head from './Head';
import axios from 'axios';
import { Navigate } from 'react-router-dom';


function OtpPage(){
    const [show,setShow]=useState(false);
    const [warning , setWarning]=useState(true)
    const [timer, setTimer] = useState(300);
    const [invalid, setInvalid]=useState(false);
    const [redirect,setRedirect]=useState(false);
    const [success,setSuccess]=useState(false)

    function secToMin(time){
            let min=Math.floor(time/60);
            let sec=time%60
            return `${min}:${sec}`;
    }

    useEffect(() => {
        const countdown = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
    
        return () => clearInterval(countdown);
      }, []);

    useEffect(() => {
        if (timer <=0) {
            setInvalid(true);
            setShow(true);
            clearInterval(timer); // Stop the timer
        }
      }, [timer]);
    
    const number=localStorage.getItem('phoneNumber');
    const token=localStorage.getItem('jwt');
    useEffect(()=>{
        const axiosInstance = axios.create({
            baseURL: 'http://localhost:5000',
            headers: {
              'Authorization': `${token}`,
            }
          });
        axiosInstance.post("verifyToken")
        .then()
        .catch(err=>{
            if(err){
                setRedirect(true);
            }
        })
    }, [token])
    function validateOTP(e){
        e.preventDefault();
        setShow(true);
        const OTP=e.target[0].value;
        const axiosInstance = axios.create({
            baseURL: 'http://localhost:5000',
            headers: {
              'Authorization': `${token}`,
            }
          });
        const data=new URLSearchParams({
            'otp': OTP
        });
        axiosInstance.post("/verify",data)
        .then(res=>{
            console.log(res);
            setSuccess(true);
            localStorage.removeItem("jwt");
        }).catch(err=>{
            console.log(err);
            setShow(false);
            setWarning(false)
        })
    }
    return(
        <div>
            {redirect && <Navigate to="/login" replace={true} />}
            <Alert key='danger' variant='danger' hidden={!invalid}>
            Token Expired{' '}
            <Alert.Link href="/login">Try again</Alert.Link>.
            </Alert>
            <Alert key='success' variant='success' hidden={!success}>
             OTP verified 
            </Alert>
            <Head hideLogin={true} hideRegister={true}/>
            <Container className='py-5'>
            <h1 className='display-2 text-center my-3'>Validate your OTP</h1>
            <div style={{ backgroundColor: '#DCDCDC', height:'250px', margin:'auto'}} className='p-5 rounded-4 col-lg-8'>
            <Form className='row' onSubmit={validateOTP}>
                <Form.Group className="mb-3 mx-auto col-lg-4 col-sm-10" controlId="formBasicEmail">
                    <Form.Label className='text-center'>OTP sent at {number}</Form.Label>
                    <Form.Control type="phone" placeholder="6-Digit OTP" maxLength='6' minLength='6' required autoComplete='off'/>
                    <Form.Text className="text-danger" hidden={warning}>Wrong OTP entered</Form.Text><br/>
                    <Form.Text className="text-muted" hidden={invalid}>Time Left: {secToMin(timer)}</Form.Text>
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

export default OtpPage;