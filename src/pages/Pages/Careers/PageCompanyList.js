// React Basic and Bootstrap
import React, {Component} from "react";
import {Link} from "react-router-dom";
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
import {getProducts} from "../../../server/config/web-site/product";
import {getBranches} from "../../../server/config/web-site/brand/branches";
import {imgUrl} from "../../../server/host";

class PageCompanyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            total: 0,
            pageSize: 9,
            pathItems: [
                //id must required
                {id: 1, name: props.lang.lang.index, link: "/"},
                {id: 4, name: props.lang.lang.stores},
            ],
            companydetails: [
                {
                    id: 1,
                    img: circleci,
                    name: "CircleCi",
                    subname: "Internet Services",
                    heading: "Company Details :",
                    location: "San Francisco",
                    company: " circleci.com",
                    employees: "200",
                }
            ],
        };
    }

    getList = () => {

        getBranches(this.state.current - 1, this.state.pageSize).then((res) => {
            this.setState({
                companydetails: res.data.content,
                total: res.data.totalItems
            })
        }).catch(err => {

        })

    }
    onPaginationChange = (e) => {
        // console.log(e)
        this.setState({current: e}, () => this.getList())

    }

    componentDidMount() {
        this.getList();
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
                    name={stores}
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
                                                src={imgUrl + detail.imageUrl}
                                                className="avatar avatar-small mx-auto rounded-circle d-block mb-3"
                                                alt=""
                                            />
                                            <Link
                                                to={"/stores/" + detail.id}
                                                className="text-dark h5 name"
                                            >
                                                {detail.name}
                                            </Link>
                                            {/*<p className="text-muted mt-1 mb-0">{detail.subname}</p>*/}
                                        </div>

                                        <div className="p-4">
                                            <ul className="list-unstyled mb-4">
                                                {detail.phone && <li className="h6">
                                                    <svg xmlns="http://www.w3.org/2000/svg"
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
                                                        <path
                                                            d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>

                                                        <circle cx="12" cy="10" r="3"></circle>
                                                    </svg>
                                                    <span
                                                        className="text-muted">{this.props.lang.lang.phone} :</span>{" "}
                                                    {detail.phone}
                                                </li>}

                                            </ul>
                                            <Link
                                                to={"/stores/" + detail.id}
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
                                    hideOnSinglePage={true}
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

export default connect(mstp, null)(PageCompanyList);

{/*<li className="h6">*/
}
{/*  <svg*/
}
{/*    xmlns="http://www.w3.org/2000/svg"*/
}
{/*    width="24"*/
}
{/*    height="24"*/
}
{/*    viewBox="0 0 24 24"*/
}
{/*    fill="none"*/
}
{/*    stroke="currentColor"*/
}
{/*    strokeWidth="2"*/
}
{/*    strokeLinecap="round"*/
}
{/*    strokeLinejoin="round"*/
}
{/*    className="feather feather-dollar-sign fea icon-sm text-warning mr-2"*/
}
{/*  >*/
}
{/*    <line x1="12" y1="1" x2="12" y2="23"></line>*/
}
{/*    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>*/
}
{/*  </svg>*/
}
{/*  <span className="text-muted">Revenue :</span>{" "}*/
}
{/*  {detail.revenue}*/
}
{/*</li>*/
}
{/*<li className="h6">*/
}
{/*  <svg*/
}
{/*    xmlns="http://www.w3.org/2000/svg"*/
}
{/*    width="24"*/
}
{/*    height="24"*/
}
{/*    viewBox="0 0 24 24"*/
}
{/*    fill="none"*/
}
{/*    stroke="currentColor"*/
}
{/*    strokeWidth="2"*/
}
{/*    strokeLinecap="round"*/
}
{/*    strokeLinejoin="round"*/
}
{/*    className="feather feather-users fea icon-sm text-warning mr-2"*/
}
{/*  >*/
}
{/*    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>*/
}
{/*    <circle cx="9" cy="7" r="4"></circle>*/
}
{/*    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>*/
}
{/*    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>*/
}
{/*  </svg>*/
}
{/*  <span className="text-muted">No. of employees :</span>{" "}*/
}
{/*  {detail.employees}*/
}
{/*</li>*/
}