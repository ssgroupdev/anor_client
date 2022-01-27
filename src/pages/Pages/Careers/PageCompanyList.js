// React Basic and Bootstrap
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,

} from "reactstrap";

//Import components
import PageBreadcrumb from "../../../components/Shared/PageBreadcrumb";

// import images
import circleci from "../../../assets/images/job/Circleci.svg";
import mg from "../../../assets/images/job/Mg.svg";
import twilio from "../../../assets/images/job/Twilio.svg";
import udemy from "../../../assets/images/job/Udemy.svg";
import webhooks from "../../../assets/images/job/Webhooks.svg";
import discord from "../../../assets/images/job/Discord.svg";
import eslint from "../../../assets/images/job/Eslint.svg";
import gitlab from "../../../assets/images/job/Gitlab.svg";
import Pagination from "rc-pagination";
import {connect} from "react-redux";

class PageCompanyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      total: 20,
      pageSize: 9,
      pathItems: [
        //id must required
        { id: 1, name: props.lang.lang.index, link: "/" },
        { id: 4, name: props.lang.lang.stores },
      ],
      companydetails: [
        {
          id: 1,
          img: circleci,
          title: "CircleCi",
          subtitle: "Internet Services",
          heading: "Company Details :",
          location: "San Francisco",
          company: " circleci.com",
          revenue: " $ 5M / Annual",
          employees: "200",
        },
        {
          id: 2,
          img: mg,
          title: "CircleCi",
          subtitle: "Internet Services",
          heading: "Company Details :",
          location: "San Francisco",
          company: " circleci.com",
          revenue: " $ 5M / Annual",
          employees: "200",
        },
        {
          id: 3,
          img: twilio,
          title: "CircleCi",
          subtitle: "Internet Services",
          heading: "Company Details :",
          location: "San Francisco",
          company: " circleci.com",
          revenue: " $ 5M / Annual",
          employees: "200",
        },
        {
          id: 4,
          img: udemy,
          title: "CircleCi",
          subtitle: "Internet Services",
          heading: "Company Details :",
          location: "San Francisco",
          company: " circleci.com",
          revenue: " $ 5M / Annual",
          employees: "200",
        },
        {
          id: 5,
          img: webhooks,
          title: "CircleCi",
          subtitle: "Internet Services",
          heading: "Company Details :",
          location: "San Francisco",
          company: " circleci.com",
          revenue: " $ 5M / Annual",
          employees: "200",
        },
        {
          id: 6,
          img: discord,
          title: "CircleCi",
          subtitle: "Internet Services",
          heading: "Company Details :",
          location: "San Francisco",
          company: " circleci.com",
          revenue: " $ 5M / Annual",
          employees: "200",
        },
        {
          id: 7,
          img: eslint,
          title: "CircleCi",
          subtitle: "Internet Services",
          heading: "Company Details :",
          location: "San Francisco",
          company: " circleci.com",
          revenue: " $ 5M / Annual",
          employees: "200",
        },
        {
          id: 8,
          img: gitlab,
          title: "CircleCi",
          subtitle: "Internet Services",
          heading: "Company Details :",
          location: "San Francisco",
          company: " circleci.com",
          revenue: " $ 5M / Annual",
          employees: "200",
        },
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
    const {stores, store, location, viewDetail, seeAllPro} = this.props.lang.lang;
    return (
      <React.Fragment>
        {/* breadcrumb */}
        <PageBreadcrumb
          title={stores}
          pathItems={this.state.pathItems}
        />
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
              {this.state.companydetails.map((detail, key) => (
                <Col lg={4} md={6} xs={12} className="mt-4 pt-2" key={key}>
                  <Card className="company-list border-0 rounded shadow bg-white">
                    <div className="text-center py-5 border-bottom">
                      <img
                        src={detail.img}
                        className="avatar avatar-small mx-auto rounded-circle d-block mb-3"
                        alt=""
                      />
                      <Link
                        to={"/stores/"+detail.id}
                        className="text-dark h5 name"
                      >
                        {detail.title}
                      </Link>
                      <p className="text-muted mt-1 mb-0">{detail.subtitle}</p>
                    </div>

                    <div className="p-4">
                      <ul className="list-unstyled mb-4">
                        <li className="h6">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-map-pin fea icon-sm text-warning mr-2"
                          >
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          <span className="text-muted">{location} :</span>{" "}
                          {detail.location}
                        </li>
                        <li className="h6">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-link fea icon-sm text-warning mr-2"
                          >
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                          </svg>
                          <span className="text-muted">{store} :</span>{" "}
                          {detail.company}
                        </li>

                      </ul>
                      <Link
                        to={"/stores/"+detail.id}
                        className="btn btn-block btn-soft-primary"
                      >
                        {viewDetail}{" "}
                        <i
                          data-feather="arrow-right"
                          className="fea icon-sm"
                        ></i>
                      </Link>
                    </div>
                  </Card>
                </Col>
              ))}

                <Col xs="12" className={"mt-4 pt-2 justify-items-center text-center"}>
                  <Pagination
                      current={this.state.current}
                      pageSize={this.state.pageSize}
                      total={this.state.total}
                      onChange={this.onPaginationChange}
                  />
                </Col>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}
const mstp = state => state

export default connect(mstp,null)(PageCompanyList);

{/*<li className="h6">*/}
{/*  <svg*/}
{/*    xmlns="http://www.w3.org/2000/svg"*/}
{/*    width="24"*/}
{/*    height="24"*/}
{/*    viewBox="0 0 24 24"*/}
{/*    fill="none"*/}
{/*    stroke="currentColor"*/}
{/*    strokeWidth="2"*/}
{/*    strokeLinecap="round"*/}
{/*    strokeLinejoin="round"*/}
{/*    className="feather feather-dollar-sign fea icon-sm text-warning mr-2"*/}
{/*  >*/}
{/*    <line x1="12" y1="1" x2="12" y2="23"></line>*/}
{/*    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>*/}
{/*  </svg>*/}
{/*  <span className="text-muted">Revenue :</span>{" "}*/}
{/*  {detail.revenue}*/}
{/*</li>*/}
{/*<li className="h6">*/}
{/*  <svg*/}
{/*    xmlns="http://www.w3.org/2000/svg"*/}
{/*    width="24"*/}
{/*    height="24"*/}
{/*    viewBox="0 0 24 24"*/}
{/*    fill="none"*/}
{/*    stroke="currentColor"*/}
{/*    strokeWidth="2"*/}
{/*    strokeLinecap="round"*/}
{/*    strokeLinejoin="round"*/}
{/*    className="feather feather-users fea icon-sm text-warning mr-2"*/}
{/*  >*/}
{/*    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>*/}
{/*    <circle cx="9" cy="7" r="4"></circle>*/}
{/*    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>*/}
{/*    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>*/}
{/*  </svg>*/}
{/*  <span className="text-muted">No. of employees :</span>{" "}*/}
{/*  {detail.employees}*/}
{/*</li>*/}