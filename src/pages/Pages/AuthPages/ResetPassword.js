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
import {checkCode, newPassword} from "../../../server/config/authentication";
import {toast} from "react-toastify";
import {resetPassword} from "../../../server/config/web-site/user";

class ResetPassword extends Component {

    state = {
        username: null
    }

    handleValidSubmit = (event, values) => {


        newPassword(this.state.username, values.password).then(res => {
            toast.success(this.props.lang.lang.finish)
            this.props.history.push("/login")
        }).catch(err => toast.error(this.props.lang.lang.error))

    };

    componentDidMount() {
        if (!this.props.location.state) {
            this.props.history.push("/login")
        } else {
            this.setState({username: this.props.location.state.username})
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
            newPassword,
            rememberPassword,
            rePassword, confirmPassword,

            send
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
                                        <AvForm className="login-form mt-4" onValidSubmit={this.handleValidSubmit}>
                                            <Row>
                                                <Col lg={12}>
                                                    <FormGroup className="position-relative">
                                                        <Label>
                                                            {newPassword}
                                                            <span className="text-danger">*</span>
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
                                                            name="password"
                                                            errorMessage="Invalid Code"
                                                            validate={{
                                                                required: {value: true},
                                                                minLength: {value: 6},
                                                                maxLength: {value: 6}
                                                            }}
                                                            type="number"
                                                            className="form-control pl-5"
                                                            placeholder={code}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg={12}>
                                                    <FormGroup className="position-relative">
                                                        <Label>
                                                            {rePassword}
                                                            <span className="text-danger">*</span>
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
                                                            name="rePassword"
                                                            errorMessage="Invalid Code"
                                                            validate={{
                                                                required: {value: true},
                                                                minLength: {value: 6},
                                                                maxLength: {value: 6},
                                                                match: {value: "password"}
                                                            }}
                                                            type="number"
                                                            className="form-control pl-5"
                                                            placeholder={rePassword}
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

export default connect(mstp, null)(ResetPassword);

