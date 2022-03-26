// React Basic and Bootstrap
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Media } from "reactstrap";

//Import Icons
import FeatherIcon from "feather-icons-react";

// import images
import contactDetail from "../../../assets/images/contact-detail.jpg";
import Topbar from "../../../components/Layout/Topbar";
import {connect} from "react-redux";

import constants from "../../../constants"

class PageContactDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:   constants.mail,
      phone:  constants.phone,
      location:    constants.location,
      title: props.lang.lang.contactTitle,
      desc:props.lang.lang.contactDesc,
      socials: constants.socials
    };
    this.sendMail.bind(this);
    this.callNumber.bind(this);
  }

  sendMail() {
    window.location.href = "mailto"+ constants.mail;
  }

  callNumber() {
    window.location.href = constants.phone;
  }

  render() {
    const {socials, title, desc, email, phone, location, contactDesc, contactTitle} = this.state
    return (
      <React.Fragment>
        <Topbar />

        <section
          className="vh-100 d-flex align-items-center"
          style={{ background: `url(${contactDetail}) center center` }}
        >
          <div className="bg-overlay bg-overlay-white"></div>
          <Container>
            <Row className="align-items-center">
              <Col lg={{ size: 6, offset: 6 }} md={{ size: 7, offset: 5 }}>
                <div className="title-heading mt-5 pt-4">
                  <h1 className="heading">{title}</h1>
                  <p className="text-dark">
                    {desc}
                  </p>

                  <Media className="contact-detail align-items-center mt-3">
                    <div className="icon">
                      <i>
                        <FeatherIcon
                          icon="mail"
                          className="fea icon-m-md text-dark mr-3"
                        />
                      </i>
                    </div>
                    <Media body className="content">
                      <h5 className="title font-weight-bold mb-0">Email</h5>
                      <Link
                        to="#"
                        onClick={this.sendMail}
                        className="text-primary"
                      >
                        {email}
                      </Link>
                    </Media>
                  </Media>

                  <Media className="contact-detail align-items-center mt-3">
                    <div className="icon">
                      <i>
                        <FeatherIcon
                          icon="phone"
                          className="fea icon-m-md text-dark mr-3"
                        />
                      </i>
                    </div>
                    <Media body className="content">
                      <h5 className="title font-weight-bold mb-0">{this.props.lang.lang.phone}</h5>
                      <Link
                        to="#"
                        onClick={this.callNumber}
                        className="text-primary"
                      >
                        {phone}
                      </Link>
                    </Media>
                  </Media>

                  <Media className="contact-detail align-items-center mt-3">
                    <div className="icon">
                      <i>
                        <FeatherIcon
                          icon="map-pin"
                          className="fea icon-m-md text-dark mr-3"
                        />
                      </i>
                    </div>
                    <Media body className="content">
                      <h5 className="title font-weight-bold mb-0">{this.props.lang.lang.location}</h5>
                      <Link to="#" className="video-play-icon text-primary">
                        {location}
                      </Link>
                    </Media>
                  </Media>

                  <ul className="list-unstyled social-icon mb-0 mt-4">
                    {
                      socials.map((value, index )=>(
                          <li key={index} className="list-inline-item ml-1">
                            <Link to="#" className="rounded mr-1">
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

export default connect(mstp,null)(PageContactDetail);

