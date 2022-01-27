import React, { Component } from "react";
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
import { Link } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";

//Import Icons
import FeatherIcon from "feather-icons-react";
import {connect} from "react-redux";

class PageSignupThree extends Component {

  componentDidMount() {

  }
  handleValidSubmit = (event, values) => {

    console.log(event, values)
    this.props.history.push("/verifying")

  };



  render() {
    const {register, haveAccount, login, yourPhone, firstName, lastName, password, rePassword, iAccept, termsOfServices } = this.props.lang.lang;
    return (
      <React.Fragment>
        <div className="back-to-home rounded d-none d-sm-block">
          <Link
            to="/"
            className="btn btn-icon btn-soft-primary"
          >
            <i>
              <FeatherIcon icon="home" className="icons" />
            </i>
          </Link>
        </div>

        <section className="bg-home bg-circle-gradiant ">
          <div className="bg-overlay bg-overlay-white"></div>
          <Container>
            <Row className="justify-content-center">
              <Col lg={5} md={8}>
                <Card className="login-page bg-white shadow rounded border-0">
                  <CardBody>
                    <h4 className="card-title text-center">{register}</h4>
                    <AvForm className="login-form mt-4"  onValidSubmit={this.handleValidSubmit}>
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
                              validate={{ required: { value: true } }}
                              placeholder={firstName}
                              name="fname"
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
                              validate={{ required: { value: true } }}
                              placeholder={lastName}
                              name="lname"
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
                                required: { value: true }
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
                              validate={{ required: { value: true } }}
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
                                required: { value: true },
                                match: { value: "password" },
                              }}
                              name="repassword"
                              placeholder={rePassword}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={12}>
                          <FormGroup>
                            <div className="custom-control custom-checkbox">
                              <Input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck1"
                              />
                              <Label
                                className="custom-control-label"
                                htmlFor="customCheck1"
                              >
                                <Link to="/page-terms" className="text-primary">
                                  {termsOfServices}{" "}
                                </Link>
                                {iAccept}
                              </Label>
                            </div>
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

export default connect(mstp,null)(PageSignupThree);
