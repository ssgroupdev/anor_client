import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Container, Row, Col, Form, Input, Label} from "reactstrap";

//Import Icons
import FeatherIcon from "feather-icons-react";
import discover from "../../assets/images/payments/discover.png";
import masterCard from "../../assets/images/payments/master-card.png";
import paypal from "../../assets/images/payments/paypal.png";

//Import Images
import logolight from "../../assets/images/logo-light.png";
import logodark from "../../assets/images/logo-dark.png";
import play1 from "../../assets/play2.png";
import play2 from "../../assets/play.png";
import {connect} from "react-redux";
import constants from "./../../constants"

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid1: [
                {title: props.lang.lang.aboutUs, link: "/page-aboutus"},
                {title: props.lang.lang.news, link: "/news"},
                {title: props.lang.lang.stores, link: "/stores"},
                {title: props.lang.lang.brands, link: "/brands"},
          ],
            grid2: [
                {title: props.lang.lang.contact, link: "/contact"},
                // {title: "Terms of Services", link: "/page-terms"},
                {title: props.lang.lang.helpCenter, link: "/help-center"},

                {title:"FAQs", link: "/faqs"},
                {title: props.lang.lang.privacyPolicy, link: "/page-privacy"},
                {title: props.lang.lang.support, link: "/support"},

            ],
            paymentTypes: [
                {
                    img: masterCard
                }, {
                    img: discover
                }, {
                    img: paypal
                },

            ],
            socials: constants.socials
        }
    }

    componentDidMount() {

    }


    render() {
        const {footerDesc, usefullLinks, sections} = this.props.lang.lang;
        return (
            <React.Fragment>
                <footer className={this.props.isLight ? "footer bg-light" : "footer footer-border"}>
                    <Container>
                        <Row>
                            <Col
                                lg="4"
                                xs="12"
                                className="mb-0 mb-md-4 pb-0 pb-md-2"
                                name="footercolumn"
                            >
                                <Link to="#" className="logo-footer">
                                    <img
                                        src={this.props.isLight ? logodark : logolight}
                                        height="24"
                                        alt=""
                                    />
                                </Link>
                                <p className={this.props.isLight ? "mt-4 text-muted" : "mt-4"}>
                                    {footerDesc}
                                </p>
                                <ul className="list-unstyled social-icon social mb-0 mt-4">
                                    {
                                        this.state.socials.map((value, index) => (
                                            <li className="list-inline-item ml-1">
                                                <Link to={value.link} className="rounded">
                                                    <i>
                                                        <FeatherIcon
                                                            icon={value.icon}
                                                            className="fea icon-sm fea-social"
                                                        />
                                                    </i>
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </Col>

                            <Col
                                lg="2"
                                md="4"
                                xs="12"
                                className="mt-4 mt-sm-0 pt-2 pt-sm-0"
                                name="footercolumn"
                            >
                                <h5
                                    className={
                                        this.props.isLight
                                            ? "text-dark footer-head"
                                            : "text-light footer-head"
                                    }
                                >
                                    {sections}
                                </h5>
                                <ul className="list-unstyled footer-list mt-4">
                                    {this.state.grid1.map((grid, key) => (
                                        <li key={key}>
                                            <Link
                                                to={grid.link}
                                                className={
                                                    this.props.isLight ? "text-muted" : "text-foot"
                                                }
                                            >
                                                <i className="mdi mdi-chevron-right mr-1"></i>{" "}
                                                {grid.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </Col>

                            <Col
                                lg="3"
                                md="4"
                                xs="12"
                                className="mt-4 mt-sm-0 pt-2 pt-sm-0"
                                name="footercolumn"
                            >
                                <h5
                                    className={
                                        this.props.isLight
                                            ? "text-dark footer-head"
                                            : "text-light footer-head"
                                    }
                                >
                                    {usefullLinks}
                                </h5>
                                <ul className="list-unstyled footer-list mt-4">
                                    {this.state.grid2.map((grid, key) => (
                                        <li key={key}>
                                            <Link
                                                to={grid.link}
                                                className={
                                                    this.props.isLight ? "text-muted" : "text-foot"
                                                }
                                            >
                                                <i className="mdi mdi-chevron-right mr-1"></i>
                                                {grid.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </Col>

                            <Col
                                lg="3"
                                md="4"
                                xs="12"
                                className="mt-4 mt-sm-0 pt-2 pt-sm-0 w-100"
                                name="footercolumn"
                            >

                                <a href={constants.google_play} target={"_blank"}>
                                    <img src={play1} className={"img w-100"} alt={"google play"}/>
                                </a>
                            </Col>
                        </Row>
                    </Container>
                </footer>
                <footer className="footer footer-bar">
                    <Container className="text-center">
                        <Row className="align-items-center">
                            <Col sm="6">
                                <div className="text-sm-left">
                                    <p className="mb-0">
                                        © 2021-22 Anor. Develop by{" "}
                                        <a
                                            href="https://t.me/backend_java"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-success"
                                        >
                                            Software Systems
                                        </a>
                                        .
                                    </p>
                                </div>
                            </Col>

                            <Col sm="6" className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                                <ul className="list-unstyled text-sm-right mb-0">
                                    {
                                        this.state.paymentTypes.map((value, index) => (
                                            <li className="list-inline-item mr-1">
                                                <img
                                                    src={value.img}
                                                    className="avatar avatar-ex-sm"
                                                    title="Visa"
                                                    alt=""
                                                />
                                            </li>

                                        ))
                                    }
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </footer>
            </React.Fragment>
        );
    }
}

const mstp = state => state;
export default connect(mstp, null)(Footer);
