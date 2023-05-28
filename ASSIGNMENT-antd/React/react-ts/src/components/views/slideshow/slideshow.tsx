import React from 'react';
import { Col, Divider, Row } from 'antd';
import { Carousel } from 'antd';

const slideshow = () => {
    const contentStyle: React.CSSProperties = {
        height: '430px',
        color: '#808080',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#',
    };
    return (

        <div>
            <Row>
                <Col flex="1 1 200px" span={16} >
                    <Carousel autoplay>
                        <div>
                            <h3 style={contentStyle}> <img src="https://cdn2.viettelstore.vn/images/Advertises/BANNER-MAIN_PC_33825382231032023.jpg" className="d-block w-100" alt="..." /></h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>  <img src="https://cdn2.viettelstore.vn/images/Advertises/BANNER-MAIN_PC_71344401003042023.jpg" className="d-block w-100" alt="..." /></h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}> <img src="https://cdn2.viettelstore.vn/images/Advertises/1155x510_56248361704042023.jpg" className="d-block w-100" alt="..." /></h3>
                        </div>

                    </Carousel>
                </Col>
                <Col flex="0 1 300px" span={8}>
                    <Carousel autoplay>
                        <div>
                            <h3 style={contentStyle}> <img src="https://cdn2.viettelstore.vn/images/Advertises/Apple-Watch-ph%E1%BA%A3i-_1647591005042023.png" className="d-block w-100" alt="..." /></h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>  <img src="https://cdn2.viettelstore.vn/images/Advertises/Apple-Watch-ph%E1%BA%A3i-_1647591005042023.png" className="d-block w-100" alt="..." /></h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}> <img src="https://cdn2.viettelstore.vn/images/Advertises/Goc-phai_76719550701042023.jpg" className="d-block w-100" alt="..." /></h3>
                        </div>

                    </Carousel>
                </Col>
            </Row>


        </div>
    )
}

export default slideshow