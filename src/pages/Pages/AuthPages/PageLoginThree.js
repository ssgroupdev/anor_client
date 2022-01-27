import React, {Component} from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    FormGroup,
    Label,
    Button,
    Input,
} from "reactstrap";
import {ToastContainer, toast} from 'react-toast'

import {Link} from "react-router-dom";
import {AvForm, AvField} from "availity-reactstrap-validation";

//Import Icons
import FeatherIcon from "feather-icons-react";
import {connect} from "react-redux";
import {loginUser} from "../../../server/config/authentication";
import {getCookie, setCookie} from "../../../utils/useCookies";
import {userAccessTokenName} from "../../../constants/application.js";

class PageLoginThree extends Component {

    state = {
        username: "",
        password: ""
    }

    componentDidMount() {

    }

    errorLogin = () => toast.error(this.props?.lang?.lang?.errorLogin + ' ❌');


    onSubmit = (e) => {
    }
    handleValidSubmit = (event, values) => {
        loginUser(values).then(res => {

                setCookie(userAccessTokenName, res.data.token);
                console.log(getCookie(userAccessTokenName));
                this.props.history.push("/shop-myaccount")
                window.location.reload();
            // } else {
            //     localStorage.setItem(TOKEN, null);
            //     this.errorLogin();
            // }
        }).catch(err => {

            setCookie(userAccessTokenName, null)
        })

    };

    render() {
        const {username, passwordUser} = this.state;
        const {login, register, yourPhone, password, forgotPassword, haveNotAccount} = this.props.lang.lang;
        return (
            <React.Fragment>
                <div className="back-to-home rounded d-none d-sm-block">
                    <Link to="index" className="btn btn-icon btn-soft-primary">
                        <i>
                            <FeatherIcon icon="home" className="icons"/>
                        </i>
                    </Link>
                </div>

                <section className="bg-home bg-circle-gradiant d-flex align-items-center ">
                    <div className="bg-overlay bg-overlay-white"></div>
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={5} md={8}>
                                <Card className="login-page bg-white shadow rounded border-0">
                                    <CardBody>
                                        <h4 className="card-title text-center">{login}</h4>
                                        <AvForm className="login-form mt-4" onValidSubmit={this.handleValidSubmit}
                                        >
                                            <FormGroup className="position-relative">
                                                <Row>

                                                    <Col lg={12}>
                                                        <Label>
                                                            {yourPhone} <span className="text-danger">*</span>
                                                        </Label>
                                                        <div className="position-relative">
                                                            <i>
                                                                <FeatherIcon
                                                                    icon="user"
                                                                    className="fea icon-sm icons"
                                                                />
                                                            </i>
                                                            {/*+998*/}
                                                        </div>
                                                        <AvField
                                                            type="number"
                                                            className="form-control pl-5"
                                                            errorMessage="Invalid PhoneNumber"
                                                            validate={{
                                                                required: {value: true}
                                                            }}
                                                            placeholder={yourPhone}
                                                            name="username"
                                                            onChange={(e) => this.setState({phone: e.target.value})}
                                                        />

                                                    </Col>

                                                    <Col lg={12}>
                                                        <Label>
                                                            {password} <span className="text-danger">*</span>
                                                        </Label>
                                                        <div className="position-relative">
                                                            <i>
                                                                <FeatherIcon
                                                                    icon="lock"
                                                                    className="fea icon-sm icons"
                                                                />
                                                            </i>
                                                        </div>
                                                        <AvField
                                                            type="password"
                                                            className="form-control pl-5"
                                                            name="password"
                                                            errorMessage="Enter password"
                                                            validate={{required: {value: true}}}
                                                            placeholder={password}
                                                            onChange={(e) => this.setState({password: e.target.value})}
                                                        />
                                                    </Col>

                                                    <Col lg={12}>
                                                        <div className="d-flex justify-content-between">

                                                            <p className="forgot-pass mb-2">
                                                                <Link
                                                                    to="auth-re-password-three"
                                                                    className="text-dark font-weight-bold"
                                                                >
                                                                    {forgotPassword}
                                                                </Link>
                                                            </p>
                                                        </div>
                                                    </Col>
                                                    <Button color="primary" block>
                                                        {login}
                                                    </Button>

                                                    <Col lg={12} className="mb-0">
                                                    </Col>
                                                    <Col xs={12} className="text-center">
                                                        <p className="mb-0 mt-3">
                                                            <small className="text-dark mr-2">
                                                                {haveNotAccount}
                                                            </small>{" "}
                                                            <Link
                                                                to="/register"
                                                                className="text-dark font-weight-bold"
                                                            >
                                                                {register}
                                                            </Link>
                                                        </p>
                                                    </Col>
                                                </Row>
                                            </FormGroup>
                                        </AvForm>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <ToastContainer/>
            </React.Fragment>
        );
    }
}

const mstp = state => state

export default connect(mstp, null)(PageLoginThree);
