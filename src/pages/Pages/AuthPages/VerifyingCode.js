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
} from "reactstrap";
import {Link} from "react-router-dom";
import {AvForm, AvField} from "availity-reactstrap-validation";

//Import Icons
import FeatherIcon from "feather-icons-react";
import {connect} from "react-redux";
import {checkCode} from "../../../server/config/authentication";
import {toast} from "react-toastify";

class VerifyingCode extends Component {

    state = {
        username: null,
        isPassword: false
    }

    handleValidSubmit = (event, values) => {

        if (this.state.isPassword) {

            checkCode(this.state.username, values.code).then(res => {
                console.log(res.data)
                this.props.history.push({
                        pathname: "/reset-password",
                        state: {
                            username: this.state.username
                        }
                    }
                )
            }).catch(err => toast.error(this.props.lang.lang.errorCode))

        } else {

            checkCode(this.state.username, values.code).then(res => {
                console.log(res.data)
                this.props.history.push("/login")
            }).catch(err => toast.error(this.props.lang.lang.errorCode))

        }
    };

    componentDidMount() {
        if (!this.props.location.state) {
            this.props.history.push("/register")
        } else {
            this.setState({
                username: this.props.location.state.username,
                isPassword: this.props.location.state.isPassword != null ? this.props.location.state.isPassword : false
            })
        }
    }


    render() {
        const {
            verifyingAccount,
            verifyingDesc,
            code,
            yourPhone,
            recoveryDesc,
            login,
            rememberPassword,
            send,
            errorConfirmCode
        } = this.props.lang.lang;

        return (
            <React.Fragment>
                <div className="back-to-home rounded d-none d-sm-block">
                    <Link to="index" className="btn btn-icon btn-soft-primary">
                        <i>
                            <FeatherIcon icon="home" className="icons"/>
                        </i>
                    </Link>
                </div>

                <section className="bg-home bg-circle-gradiant d-flex align-items-center">
                    <div className="bg-overlay bg-overlay-white"></div>
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={5} md={8}>
                                <Card className="login_page shadow rounded border-0">
                                    <CardBody>
                                        <h4 className="card-title text-center">{verifyingAccount}</h4>

                                        <AvForm className="login-form mt-4" onValidSubmit={this.handleValidSubmit}>
                                            <Row>
                                                <Col lg={12}>
                                                    <p className="text-muted">
                                                        {verifyingDesc}
                                                    </p>
                                                    <FormGroup className="position-relative">
                                                        <Label>
                                                            {code}
                                                            <span className="text-danger">*</span>
                                                        </Label>
                                                        <div className="position-relative">
                                                            <i>
                                                                <FeatherIcon
                                                                    icon="mail"
                                                                    className="fea icon-sm icons"
                                                                />
                                                            </i>
                                                        </div>
                                                        <AvField
                                                            name="code"
                                                            validate={{
                                                                required: {value: true, errorMessage: errorConfirmCode},
                                                                minLength: {value: 6, errorMessage: errorConfirmCode},
                                                                maxLength: {value: 6, errorMessage: errorConfirmCode}
                                                            }}
                                                            type="number"
                                                            className="form-control pl-5"
                                                            placeholder={code}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg={12}>
                                                    <Button color="primary" block>
                                                        {send}
                                                    </Button>
                                                </Col>

                                            </Row>
                                        </AvForm>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        );
    }
}

const mstp = state => state

export default connect(mstp, null)(VerifyingCode);

