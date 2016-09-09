import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Navbar from "react-bootstrap/lib/Navbar";
import Button from "react-bootstrap/lib/Button";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import ButtonGroup from "react-bootstrap/lib/ButtonGroup";
import Col from "react-bootstrap/lib/Col";
import FaIcon from "robe-react-ui/lib/faicon/FaIcon";
import Link from "react-router/lib/Link";
import cookie from "react-cookie";

export default class Header extends ShallowComponent {
    constructor(props: Object) {
        super(props);
        this.state = {
            data: []
        };
    }

    render(): Object {
        return (
            <Navbar fluid fixedTop inverse className="container-fluid">
                <Button onClick={this.props.open} className="navbar-toggle pull-left">
                    <Col componentClass="span" className="sr-only">Toggle navigation</Col>
                    <Col componentClass="span" className="icon-bar" />
                    <Col componentClass="span" className="icon-bar" />
                    <Col componentClass="span" className="icon-bar" />
                </Button>
                <Link className="content" to={window.applicationRootPath}>
                    <Navbar.Brand>
                        <Col className="hidden-xs">Robe Sample Application</Col>
                    </Navbar.Brand>
                </Link>
                <Link className="content" to={window.applicationRootPath}>
                    <Navbar.Brand>
                        <Col className="visible-xs">Robe</Col>
                    </Navbar.Brand>
                </Link>
                <ButtonToolbar className="pull-right buttongroups-header" style={{ marginTop: "7px", marginRight: "-20px" }}>
                    <ButtonGroup>
                        <Button bsStyle="primary" className="btn-header-button btn-header" onClick={this.__onExit}>
                            <FaIcon code="fa-sign-out" size="fa-lg" />
                            <Col componentClass="span" className="hidden-xs"> Logout</Col>
                        </Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </Navbar>
        );
    }
    __onExit() {
        cookie.remove("domain", { path: "/" });
        cookie.remove("username", { path: "/" });
        cookie.remove("password", { path: "/" });
        location.reload();
    }
}
