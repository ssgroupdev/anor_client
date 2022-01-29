// React Basic and Bootstrap
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Collapse,
} from "reactstrap";

//Import Icons
import FeatherIcon from "feather-icons-react";

//Import components
import PageBreadcrumb from "../../../components/Shared/PageBreadcrumb";
import {connect} from "react-redux";

class PageTerms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathItems: [
        //id must required
        {id: 1, name: this.props.lang.lang.index, link: "/"},
        {id: 4, name: this.props.lang.lang.pageTerms},
      ],
    }
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
    return (
      <React.Fragment>
        {/* breadcrumb */}
        <PageBreadcrumb
          title="Terms of Services"
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
            <Row className="justify-content-center">
              <Col lg={9}>
                <Card className="shadow border-0 rounded">
                  <CardBody>
                    <h5 className="card-title">Introduction :</h5>
                    <p className="text-muted">
                      It seems that only fragments of the original text remain
                      in the Lorem Ipsum texts used today. One may speculate
                      that over the course of time certain letters were added or
                      deleted at various positions within the text.
                    </p>

                    <h5 className="card-title">User Agreements :</h5>
                    <p className="text-muted">
                      The most well-known dummy text is the 'Lorem Ipsum', which
                      is said to have <b className="text-danger">originated</b>{" "}
                      in the 16th century. Lorem Ipsum is{" "}
                      <b className="text-danger">composed</b> in a pseudo-Latin
                      language which more or less{" "}
                      <b className="text-danger">corresponds</b> to 'proper'
                      Latin. It contains a series of real Latin words. This
                      ancient dummy text is also{" "}
                      <b className="text-danger">incomprehensible</b>, but it
                      imitates the rhythm of most European languages in Latin
                      script. The <b className="text-danger">advantage</b> of
                      its Latin origin and the relative{" "}
                      <b className="text-danger">meaninglessness</b> of Lorum
                      Ipsum is that the text does not attract attention to
                      itself or distract the viewer's{" "}
                      <b className="text-danger">attention</b> from the layout.
                    </p>
                    <p className="text-muted">
                      There is now an <b className="text-danger">abundance</b>{" "}
                      of readable dummy texts. These are usually used when a
                      text is <b className="text-danger">required purely</b> to
                      fill a space. These alternatives to the classic Lorem
                      Ipsum texts are often amusing and tell short, funny or{" "}
                      <b className="text-danger">nonsensical</b> stories.
                    </p>
                    <p className="text-muted">
                      It seems that only{" "}
                      <b className="text-danger">fragments</b> of the original
                      text remain in the Lorem Ipsum texts used today. One may
                      speculate that over the course of time certain letters
                      were added or deleted at various positions within the
                      text.
                    </p>

                    <h5 className="card-title">Restrictions :</h5>
                    <p className="text-muted">
                      You are specifically restricted from all of the following
                      :
                    </p>
                    <ul className="list-unstyled feature-list text-muted">
                      <li>
                        <i>
                          <FeatherIcon
                            icon="arrow-right"
                            className="fea icon-sm mr-2"
                          />
                        </i>
                        Digital Marketing Solutions for Tomorrow
                      </li>
                      <li>
                        <i>
                          <FeatherIcon
                            icon="arrow-right"
                            className="fea icon-sm mr-2"
                          />
                        </i>
                        Our Talented & Experienced Marketing Agency
                      </li>
                      <li>
                        <i>
                          <FeatherIcon
                            icon="arrow-right"
                            className="fea icon-sm mr-2"
                          />
                        </i>
                        Create your own skin to match your brand
                      </li>
                      <li>
                        <i>
                          <FeatherIcon
                            icon="arrow-right"
                            className="fea icon-sm mr-2"
                          />
                        </i>
                        Digital Marketing Solutions for Tomorrow
                      </li>
                      <li>
                        <i>
                          <FeatherIcon
                            icon="arrow-right"
                            className="fea icon-sm mr-2"
                          />
                        </i>
                        Our Talented & Experienced Marketing Agency
                      </li>
                      <li>
                        <i>
                          <FeatherIcon
                            icon="arrow-right"
                            className="fea icon-sm mr-2"
                          />
                        </i>
                        Create your own skin to match your brand
                      </li>
                    </ul>

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
export default connect(mstp, null)(PageTerms);
