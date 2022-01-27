import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

//Import Icons
import FeatherIcon from "feather-icons-react";

//Import Images
import imgbg from "../../../assets/images/job/company.jpg";
import profile from "../../../assets/images/job/Circleci.svg";

//Import Images
import logolight from "../../../assets/images/logo-light.png";
import logodark from "../../../assets/images/logo-dark.png";
import {connect} from "react-redux";

class PageJobCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1
    };
    this.togglemodal.bind(this);
  }

  componentDidMount() {
    // document.body.classList = "";
    // document.getElementById("top-menu").classList.add("nav-light");
    // document.getElementById("buyButton").className = "btn btn-light";
    // document.getElementById("brandLogo").src = logolight;
    // window.addEventListener("scroll", this.scrollNavigation, true);
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
      document.getElementById("buyButton").className = "btn btn-primary";
      document.getElementById("brandLogo").src = logodark;
    } else {
      document.getElementById("topnav").classList.remove("nav-sticky");
      document.getElementById("buyButton").className = "btn btn-light";
      document.getElementById("brandLogo").src = logolight;
    }
  };

  togglemodal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  render() {
    const {location, aboutUs, storeDetails, store, seeAllPro} = this.props.lang.lang
    return (
      <React.Fragment>
        <section
          className="bg-half-260 d-table w-100"
          style={{ background: `url(${imgbg}) center center` }}
        >
          <div className="bg-overlay"></div>
        </section>
        <section className="section">
          <Container>
            <Row>
              <Col lg="4" md="5" xs="12">
                <div className="job-profile position-relative">
                  <div className="rounded shadow bg-white">
                    <div className="text-center py-5 border-bottom">
                      <img
                        src={profile}
                        className="avatar avatar-medium mx-auto rounded-circle d-block"
                        alt=""
                      />
                      <h5 className="mt-3 mb-0">CircleCi</h5>
                      <p className="text-muted mb-0">Internet Services</p>
                    </div>

                    <div className="p-4">
                      <h5>{storeDetails}:</h5>
                      <ul className="list-unstyled feature-list mb-4">
                        <li className="h6">
                          <i>
                            <FeatherIcon
                              icon="map-pin"
                              className="fea icon-sm text-warning mr-2"
                            />
                          </i>
                          <span className="text-muted">{location} :</span> San
                          Francisco
                        </li>
                        <li className="h6">
                          <i>
                            <FeatherIcon
                              icon="link"
                              className="fea icon-sm text-warning mr-2"
                            />
                          </i>
                          <span className="text-muted">{store} :</span>{" "}
                          circleci.com
                        </li>
                      </ul>
                      <Link
                        to={"/stores/"+this.state.id+"/products"}
                        onClick={this.togglemodal}
                        className="btn btn-block btn-primary"
                      >
                        {seeAllPro}
                      </Link>
                    </div>
                  </div>

                  <div className="map mt-4 pt-2">
                   bu yerda karta turishi kerak*
                  </div>
                </div>
              </Col>

              <Col lg="8" md="7" xs="12" className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                <div className="ml-md-4">
                  <h4>{aboutUs}:</h4>
                  <p className="text-muted">
                    Almost no business is immune from the need for quality
                    software development. The act of building quality software,
                    and shipping it quickly, has become the core engine of value
                    creation in companies across all industries. CircleCI allows
                    teams to rapidly release code they trust by automating the
                    build, test, and delivery process. Thousands of leading
                    companies, including Samsung, Ford Motor Company, Spotify,
                    Lyft, Coinbase, PagerDuty, Stitch Fix, and BuzzFeed rely on
                    CircleCI to accelerate delivery and improve quality.
                  </p>
                  <p className="text-muted">
                    CircleCI was named a Leader in cloud-native continuous
                    integration by Forrester in 2019 and has been named to
                    multiple Best DevOps Tools lists. CircleCI is the first
                    CI/CD tool to become FedRAMP certified and processes more
                    than 30 million builds each month across Linux, macOS,
                    Docker and Windows build environments.
                  </p>
                  <p className="text-muted mb-0">
                    Founded in 2011 and headquartered in San Francisco with a
                    global remote workforce, CircleCI is venture-backed by Scale
                    Venture Partners, Threshold Ventures (formerly DFJ),
                    Baseline Ventures, Top Tier Capital, Industry Ventures,
                    Heavybit, Harrison Metal Capital, Owl Rock Capital Partners,
                    and NextEquity Partners.
                  </p>

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

export default connect(mstp,null)(PageJobCompany);