import React from 'react';
import {useState} from "react";
import {CCard, CCardTitle, CCardBody, CCardImage, CCardText, CButton, CSpinner} from "@coreui/react";
import {CChart,CChartPolarArea} from "@coreui/react-chartjs";

const Content = () => {

    const [name, setName] = useState(-1);
    const test = () =>  {
        const myArray = [1,2,3];
        setName(myArray[Math.floor(Math.random() * 3)]);
    }
    const handleClick = () =>{
        console.log('clicked');
        test();
    }
    return (
        <main>

            <CButton disabled>
                <CSpinner component="span" size="sm" aria-hidden="true"/>
            </CButton>
            <CButton disabled>
                <CSpinner component="span" size="sm" aria-hidden="true"/>
                Loading...
            </CButton>
            <div className={'container d-flex justify-content-center'}>
                <CCard style={{ width: '18rem' }} >
                    <CCardImage orientation="top" src="/images/react.jpg" />
                    <CCardBody>
                        <CCardTitle>Card title</CCardTitle>
                        <CCardText>
                            Some quick example text to build on the card title and make up the bulk of the card's content.
                        </CCardText>
                        <CButton href="#">Go somewhere</CButton>
                    </CCardBody>
                </CCard>
            </div>

            <CButton color="primary" disabled>Primary</CButton>
            <CButton color="secondary">Secondary</CButton>
            <CButton color="success">Success</CButton>
            <CButton color="danger">Danger</CButton>
            <CButton color="warning">Warning</CButton>
            <CButton color="info">Info</CButton>
            <CButton color="light">Light</CButton>
            <CButton color="dark">Dark</CButton>
            <CButton color="link">Link</CButton>
            <p> test: {name}</p>
            <button className={'btn-primary'} onClick={handleClick}> Click me! </button>
            <div className={'card'}>
                <div className={'card-top'}>aass

                </div>
            </div>

            <CChart
                type="polarArea"
                data={{
                    labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
                    datasets: [
                        {
                            data: [11, 16, 7, 3, 14],
                            backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB'],
                        },
                    ],
                }}
            />
        </main>
    );
};

export default Content;
