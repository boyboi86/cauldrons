import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

 /* Dun Judge me, I am a human also */
 
const PageHead = props => {
    return (
    <div>
        <Container className="container">
        <h2>{props.subject}</h2>
          <Row>
            <Col xs={12} md={8}>
            <p>
                {props.contents.map((content, index) => <p key={index}>{content}</p>)}
            </p>
            </Col>
          </Row>
        </Container>
    </div>
    );
}

export default PageHead;