import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

class WelcomePage extends ShallowComponent {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col lg={12}>
                        <Col componentClass="h1">Robe React Admin Panel Sample</Col>
                        <Col componentClass="p">Welcome to panel. Use menu for natigate another page.</Col>
                    </Col>
                </Row>
            </Grid>
        );
    };
}

module.exports = WelcomePage;