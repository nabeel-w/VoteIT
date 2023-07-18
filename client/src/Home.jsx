import React from 'react';
import { Carousel } from 'react-bootstrap';
import Head from './Head';

function Home() {
    return (
        <div>
            <Head hideLogin={false} hideRegister={false}/>
            <div style={{ height: '250px', width: '65%',margin:'auto'}} className='my-2'>
            <h3 className='text-center mb-3'>Welcome to Vote It</h3>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://www.livelaw.in/h-upload/2021/08/10/1500x900_398309-election-commission-of-india-eci-and-sc.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3 className='text-primary fw-bold'>Secure Election</h3>
                        <p className='text-secondary'>Our Website would make conducting election cheaper and more secure</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://assets.telegraphindia.com/telegraph/2022/Jan/1641405686_election.jpg"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3 className='text-primary fw-bold'>Two Factor Authentication</h3>
                        <p className='text-secondary fw-bolder'>User would Login using their phone number and OTP</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://c.files.bbci.co.uk/D6B9/production/_107096945_india_elections_2019_index_976.jpg"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3 className='text-primary fw-bold'>Simple User Interface</h3>
                        <p className='text-secondary fw-bolder'>
                            After Logging in the user would get a 10 minute session to cast in their vote
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            </div>
        </div>
    );
};


export default Home;