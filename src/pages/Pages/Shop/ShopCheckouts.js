import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Input,
  FormGroup,
  Form,
  Label,
  CustomInput,
} from "reactstrap";
import { Link } from "react-router-dom";

//Import components
import PageBreadcrumb from "../../../components/Shared/PageBreadcrumb";
import {connect} from "react-redux";

class ShopCheckouts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathItems: [
        //id must required
        { id: 1, name: props.lang.lang.index, link: "/" },
        { id: 2, name:  props.lang.lang.cart, link: "/shop-cart" },
        { id: 3, name: props.lang.lang.getShop},
      ],
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.scrollNavigation, true);
  }

  // Make sure to remove the DOM listener when the component is unmounted.
  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollNavigation, true);
  }

  scrollNavigation = () => {
    var doc = document.documentElement;
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    if (top > 80) {
      document.getElementById("topnav").classList.add("nav-sticky");
    } else {
      document.getElementById("topnav").classList.remove("nav-sticky");
    }
  };
  render() {
    const {getShop, shipping, firstName, lastName, street, regions, province, buildingName, numberOfHome, yourPhone, comments, commentYourOrder,
              payment, total, subTotal, delivery} = this.props.lang.lang
    return (
      <React.Fragment>
        {/* breadcrumb */}
        <PageBreadcrumb title={getShop} pathItems={this.state.pathItems} />
        <div className="position-relative">
          <div className="shape overflow-hidden text-white">
            <svg
              viewBox="0 0 2880 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>

        <section className="section">
          <Container>
            <Row>
              <Col lg={7} md={6}>
                <div className="rounded shadow-lg p-4">
                  <h5 className="mb-0">{shipping}</h5>

                  <Form className="mt-4">
                    <Row>
                      <Col xs={12}>
                        <FormGroup className="position-relative">
                          <Label>
                            {firstName}<span className="text-danger">*</span>
                          </Label>
                          <Input
                            name="name"
                            id="firstname"
                            type="text"
                            className="form-control"
                            placeholder={firstName}
                          />
                        </FormGroup>
                      </Col>
                      <Col xs={12}>
                        <FormGroup className="position-relative">
                          <Label>
                            {lastName}<span className="text-danger">*</span>
                          </Label>
                          <Input
                            name="name"
                            id="lastname"
                            type="text"
                            className="form-control"
                            placeholder={lastName}
                          />
                        </FormGroup>
                      </Col>
                      <Col xs={12}>
                        <FormGroup className="position-relative">
                          <Label>
                            {buildingName}
                          </Label>
                          <Input
                            name="name"
                            id="companyname"
                            type="text"
                            className="form-control"
                            placeholder={buildingName}
                          />
                        </FormGroup>
                      </Col>
                      <Col xs={12}>
                        <FormGroup className="position-relative">
                          <Label>
                            {street}
                            <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="text"
                            name="address1"
                            id="address1"
                            className="form-control"
                            placeholder={street}
                          />
                        </FormGroup>
                      </Col>
                      <Col xs={12}>
                        <FormGroup className="position-relative">
                          <Label>
                            {numberOfHome}
                          </Label>
                          <Input
                            type="text"
                            name="address2"
                            id="address2"
                            className="form-control"
                            placeholder={numberOfHome}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup className="position-relative">
                          <Label>
                            {province} <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="text"
                            name="city"
                            id="city"
                            className="form-control"
                            placeholder= {province}
                          />
                        </FormGroup>
                      </Col>
                      {/*<Col md={6}>*/}
                      {/*  <FormGroup className="position-relative">*/}
                      {/*    <Label>*/}
                      {/*      Postal Code <span className="text-danger">*</span>*/}
                      {/*    </Label>*/}
                      {/*    <Input*/}
                      {/*      type="text"*/}
                      {/*      name="postcode"*/}
                      {/*      id="postcode"*/}
                      {/*      className="form-control"*/}
                      {/*      placeholder="Zip :"*/}
                      {/*    />*/}
                      {/*  </FormGroup>*/}
                      {/*</Col>*/}
                      <Col md={6}>
                        <FormGroup className="position-relative">
                          <Label>
                            {regions} <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="text"
                            name="state"
                            id="state"
                            className="form-control"
                            placeholder= {regions}
                          />
                        </FormGroup>
                      </Col>
                      {/*<Col md={6}>*/}
                      {/*  <FormGroup className="position-relative">*/}
                      {/*    <Label>*/}
                      {/*      Country <span className="text-danger">*</span>*/}
                      {/*    </Label>*/}
                      {/*    <select className="form-control custom-select">*/}
                      {/*      <option defaultValue="">India</option>*/}
                      {/*      <option value="AF">Afghanistan</option>*/}
                      {/*      <option value="AX">&Aring;land Islands</option>*/}
                      {/*      <option value="AL">Albania</option>*/}
                      {/*      <option value="DZ">Algeria</option>*/}
                      {/*      <option value="AS">American Samoa</option>*/}
                      {/*      <option value="AD">Andorra</option>*/}
                      {/*      <option value="AO">Angola</option>*/}
                      {/*      <option value="AI">Anguilla</option>*/}
                      {/*      <option value="AQ">Antarctica</option>*/}
                      {/*    </select>*/}
                      {/*  </FormGroup>*/}
                      {/*</Col>*/}
                      <Col xs={12}>
                        <FormGroup className="position-relative">
                          <Label>
                            {yourPhone} <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="text"
                            name="phone"
                            id="phone"
                            className="form-control"
                            placeholder={yourPhone}
                          />
                        </FormGroup>
                      </Col>
                      {/*<Col xs={12}>*/}
                      {/*  <FormGroup className="position-relative">*/}
                      {/*    <Label>*/}
                      {/*      Your Email <span className="text-danger">*</span>*/}
                      {/*    </Label>*/}
                      {/*    <Input*/}
                      {/*      name="email"*/}
                      {/*      id="email"*/}
                      {/*      type="email"*/}
                      {/*      className="form-control"*/}
                      {/*      placeholder="Your email :"*/}
                      {/*    />*/}
                      {/*  </FormGroup>*/}
                      {/*</Col>*/}
                    </Row>
                  </Form>
                </div>

                <div className="rounded shadow-lg p-4">
                  {/*<div className="form-check form-check-inline">*/}
                  {/*  <FormGroup>*/}
                  {/*    <CustomInput*/}
                  {/*      type="checkbox"*/}
                  {/*      label="Ship to a different address ?"*/}
                  {/*      id="addnewaddress"*/}
                  {/*    />*/}
                  {/*  </FormGroup>*/}
                  {/*</div>*/}

                  <FormGroup className="position-relative">
                    <Label>{commentYourOrder}</Label>
                    <textarea
                      name="comments"
                      id="comments"
                      rows="4"
                      className="form-control"
                      placeholder={commentYourOrder}
                    ></textarea>
                  </FormGroup>
                </div>
              </Col>

              <Col lg={5} md={6} className=" mt-4 mt-sm-0 pt-2 pt-sm-0">
                <div className="rounded shadow-lg p-4">
                  {/*<div className="d-flex mb-4 justify-content-between">*/}
                  {/*  <h5>4 Items</h5>*/}
                  {/*  <Link to="shop-cart" className="text-muted h6">*/}
                  {/*    Show Details*/}
                  {/*  </Link>*/}
                  {/*</div>*/}
                  <div className="table-responsive">
                    <Table className="table-center table-padding mb-0">
                      <tbody>
                        <tr>
                          <td className="h6 border-0">{subTotal}</td>
                          <td className="text-center font-weight-bold border-0">
                            $ 2409
                          </td>
                        </tr>
                        <tr>
                          <td className="h6">{delivery}</td>
                          <td className="text-center font-weight-bold">
                            $ 0.00
                          </td>
                        </tr>
                        <tr className="bg-light">
                          <td className="h5 font-weight-bold">{total}</td>
                          <td className="text-center text-primary h4 font-weight-bold">
                            $ 2409
                          </td>
                        </tr>
                      </tbody>
                    </Table>

                    <ul className="list-unstyled mt-4 mb-0">
                      <li>
                        <FormGroup className="mb-0">
                          <CustomInput
                            inline={true}
                            type="radio"
                            label="Bank Transfer"
                            id="banktransfer"
                            defaultChecked
                            name="customRadio"
                          />
                        </FormGroup>
                      </li>

                      <li className="mt-3">
                        <FormGroup className="mb-0">
                          <CustomInput
                            type="radio"
                            id="chaquepayment"
                            inline={true}
                            label="Cheque Payment"
                            name="customRadio"
                          />
                        </FormGroup>
                      </li>

                      <li className="mt-3">
                        <FormGroup className="mb-0">
                          <CustomInput
                            type="radio"
                            id="cashpayment"
                            name="customRadio"
                            inline={true}
                            label="Cash on Delivery"
                          />
                        </FormGroup>
                      </li>

                      <li className="mt-3">
                        <FormGroup className="mb-0">
                          <CustomInput
                            type="radio"
                            id="paypal"
                            name="customRadio"
                            label="Paypal"
                            inline={true}
                          />
                        </FormGroup>
                      </li>
                    </ul>

                    <div className="mt-4 pt-2">
                      <Link
                        to="shop-checkouts"
                        className="btn btn-block btn-primary"
                      >
                        {payment}
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

const mstp = state => state
export default connect(mstp,null)(ShopCheckouts);
