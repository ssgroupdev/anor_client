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
import {Link} from "react-router-dom";
import {AvForm, AvField, AvInput} from "availity-reactstrap-validation";
import {ToastContainer, toast} from 'react-toastify';

//Import Icons
import FeatherIcon from "feather-icons-react";
import {connect} from "react-redux";
import {getProvince, getRegionsByProvince, register} from "../../../server/config/web-site/client";

class PageSignupThree extends Component {

    state = {
        provinces: [],
        regionsList: [],
        data: {
            provinceId: null,
            regionId: null
        }
    }

    getList = () => {
        getProvince().then(res => {
            this.setState({
                provinces: res?.data,
                data: {
                    provinceId: res?.data[0].id
                }
            }, () => this.getRegions())
        })

    }

    getRegions = () => {
        console.log(this.state.data.provinceId)
        getRegionsByProvince(this.state.data.provinceId).then(res => {
            this.setState({
                regionsList: res.data
            })
        }).catch()
    }

    componentDidMount() {
        this.getList();
    }

    error = () => toast(this.props.lang.lang.errorRegister);

    handleValidSubmit = (event, values) => {

        const sendData = {
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.phone,
            password: values.password,
            address: {
                regionId: values.regionId,
                provinceId: values.provinceId,
                street: values.street,
                household: values.household,
                postIndex: values.post,
            }
        }

        register(sendData).then(res => {

            this.props.history.push({
                pathname: '/verifying',
                state: {username: res.data.username}
            })
        }).catch(err => {
            this.error();
        })
    };
    onProvinceChange = (e, v) => {
        this.setState({
            data: {
                provinceId: v
            }
        }, () => this.getRegions())
    }


    render() {
        const {
            register,
            haveAccount,
            login,
            yourPhone,
            firstName,
            lastName,
            province,
            regions,
            password,
            rePassword,
            iAccept,
            termsOfServices, post,
            household,
            street
        } = this.props.lang.lang;
        const {provinces, regionsList} = this.state
        return (
            <React.Fragment>
                <div className="back-to-home rounded d-none d-sm-block">
                    <Link
                        to="/"
                        className="btn btn-icon btn-soft-primary"
                    >
                        <i>
                            <FeatherIcon icon="home" className="icons"/>
                        </i>
                    </Link>
                </div>

                <section className="bg-home bg-circle-gradiant ">
                    <div className="bg-overlay bg-overlay-white"></div>
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={10} md={12}>
                                <Card className="login-page bg-white shadow rounded border-0">
                                    <CardBody>
                                        <h4 className="card-title text-center">{register}</h4>
                                        <AvForm className="login-form mt-4" onValidSubmit={this.handleValidSubmit}>
                                            <Row>
                                                <Col md={6}>
                                                    <Row>
                                                        <Col md={6}>
                                                            <FormGroup className="position-relative">
                                                                <Label>
                                                                    {firstName} <span className="text-danger">*</span>
                                                                </Label>
                                                                <div className="position-relative">
                                                                    <i>
                                                                        <FeatherIcon
                                                                            icon="user"
                                                                            className="fea icon-sm icons"
                                                                        />
                                                                    </i>
                                                                </div>
                                                                <AvField
                                                                    type="text"
                                                                    className="form-control pl-5"
                                                                    errorMessage="Enter First Name"
                                                                    validate={{required: {value: true}}}
                                                                    placeholder={firstName}
                                                                    name="firstName"
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup className="position-relative">
                                                                <Label>
                                                                    {lastName} <span className="text-danger">*</span>
                                                                </Label>
                                                                <div className="position-relative">
                                                                    <i>
                                                                        <FeatherIcon
                                                                            icon="user-check"
                                                                            className="fea icon-sm icons"
                                                                        />
                                                                    </i>
                                                                </div>
                                                                <AvField
                                                                    type="text"
                                                                    className="form-control pl-5"
                                                                    errorMessage="Enter Last Name"
                                                                    validate={{required: {value: true}}}
                                                                    placeholder={lastName}
                                                                    name="lastName"
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={12}>
                                                            <FormGroup className="position-relative">
                                                                <Label>
                                                                    {yourPhone} <span className="text-danger">*</span>
                                                                </Label>
                                                                <div className="position-relative">
                                                                    <i>
                                                                        <FeatherIcon
                                                                            icon="phone"
                                                                            className="fea icon-sm icons"
                                                                        />
                                                                    </i>
                                                                </div>
                                                                <AvField
                                                                    type="number"
                                                                    className="form-control pl-5"
                                                                    errorMessage="Invalid PhoneNumber"
                                                                    validate={{
                                                                        required: {value: true}
                                                                    }}
                                                                    placeholder={yourPhone}
                                                                    name="phone"
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={12}>
                                                            <FormGroup className="position-relative">
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
                                                                    errorMessage="Enter Last Name"
                                                                    validate={{required: {value: true}}}
                                                                    name="password"
                                                                    placeholder={password}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={12}>
                                                            <FormGroup className="position-relative">
                                                                <Label>
                                                                    {rePassword}{" "}
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
                                                                    type="password"
                                                                    className="form-control pl-5"
                                                                    errorMessage="Enter Re-password"
                                                                    validate={{
                                                                        required: {value: true},
                                                                        match: {value: "password"},
                                                                    }}
                                                                    name="repassword"
                                                                    placeholder={rePassword}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col md={6}>
                                                    <Row>
                                                        <Col md={6}>
                                                            <FormGroup className="position-relative">

                                                                <AvField type="select" name="provinceId"
                                                                         label={province}
                                                                    // helpMessage="This is an example. Deal with it!"
                                                                         required
                                                                         onChange={this.onProvinceChange}
                                                                >

                                                                    {
                                                                        provinces?.map(item => (
                                                                            <option value={item.id}>{item.name}</option>
                                                                        ))
                                                                    }
                                                                </AvField>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup className="position-relative">
                                                                <AvField type="select" name="regionId" label={regions}
                                                                    // helpMessage="This is an example. Deal with it!"
                                                                         required>
                                                                    {
                                                                        regionsList?.map(item => (
                                                                            <option value={item.id}>{item.name}</option>
                                                                        ))
                                                                    }
                                                                </AvField>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={12}>
                                                            <FormGroup className="position-relative">
                                                                <Label>
                                                                    {street} <span className="text-danger">*</span>
                                                                </Label>
                                                                <div className="position-relative">
                                                                    <i>
                                                                        <FeatherIcon
                                                                            icon="git-merge"
                                                                            className="fea icon-sm icons"
                                                                        />
                                                                    </i>
                                                                </div>
                                                                <AvField
                                                                    type="text"
                                                                    className="form-control pl-5"
                                                                    errorMessage="Invalid Street"
                                                                    validate={{
                                                                        required: {value: true}
                                                                    }}
                                                                    placeholder={street}
                                                                    name="street"
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={12}>
                                                            <FormGroup className="position-relative">
                                                                <Label>
                                                                    {household} <span className="text-danger">*</span>
                                                                </Label>
                                                                <div className="position-relative">
                                                                    <i>
                                                                        <FeatherIcon
                                                                            icon="home"
                                                                            className="fea icon-sm icons"
                                                                        />
                                                                    </i>
                                                                </div>
                                                                <AvField
                                                                    type="text"
                                                                    className="form-control pl-5"
                                                                    errorMessage={"Enter " + household}
                                                                    validate={{required: {value: true}}}
                                                                    name={"household"}
                                                                    placeholder={household}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={12}>
                                                            <FormGroup className="position-relative">
                                                                <Label>
                                                                    {post}{" "}
                                                                    <span className="text-danger">*</span>
                                                                </Label>
                                                                <div className="position-relative">
                                                                    <i>
                                                                        <FeatherIcon
                                                                            icon="inbox"
                                                                            className="fea icon-sm icons"
                                                                        />
                                                                    </i>
                                                                </div>
                                                                <AvField
                                                                    type="number"
                                                                    className="form-control pl-5"
                                                                    errorMessage={"Enter " + post}
                                                                    validate={{
                                                                        required: {value: true},
                                                                    }}
                                                                    name="post"
                                                                    placeholder={post}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col md={12}>
                                                    <FormGroup>
                                                        {/*<div className="custom-control custom-checkbox">*/}
                                                        {/*<AvField*/}
                                                        {/*    name={"iAccept"}*/}
                                                        {/*    type="checkbox"*/}
                                                        {/*    className="custom-control-input"*/}
                                                        {/*    id="customCheck1"*/}
                                                        {/*    // validate={{required: {value: true}}}*/}
                                                        {/*    errorMessage={"Required"}*/}

                                                        {/*/>*/}

                                                        <Label
                                                            className="ml-3"
                                                            htmlFor="customCheck1"
                                                        >
                                                            <AvInput type="checkbox" name="agree" required
                                                                     errorMessage={"This field must required"}/>

                                                            <Link to="/page-terms" className="text-primary"
                                                                  target={"_blank"}>
                                                                {termsOfServices}{" "}
                                                            </Link>
                                                            {iAccept}
                                                        </Label>
                                                        {/*</div>*/}
                                                    </FormGroup>
                                                </Col>

                                                <Col lg={12} className="mb-0">
                                                    <Button color="primary" block>
                                                        {register}
                                                    </Button>
                                                </Col>
                                                <Col xs={12} className="text-center">
                                                    <p className="mb-0 mt-3">
                                                        <small className="text-dark mr-2">
                                                            {haveAccount}
                                                        </small>{" "}
                                                        <Link
                                                            to="login"
                                                            className="text-dark font-weight-bold"
                                                        >
                                                            {login}
                                                        </Link>
                                                    </p>
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

export default connect(mstp, null)(PageSignupThree);
