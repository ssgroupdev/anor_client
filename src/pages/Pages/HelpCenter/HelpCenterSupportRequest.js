import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Media,
  Form,
  FormGroup,
  Input,
  Label,
  Alert,
} from "reactstrap";
import { Link } from "react-router-dom";

//Import Icons
import FeatherIcon from "feather-icons-react";

//Import components
import PageBreadcrumb from "../../../components/Shared/PageBreadcrumb";
import {connect} from "react-redux";

class HelpCenterSupportRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathItems: [
        //id must required
        { id: 1, name: props.lang.lang.index, link: "/" },
        { id: 2, name: props.lang.lang.helpCenter, link: "/help-center" },
        { id: 3, name:  props.lang.lang.support},
      ],
      isOpen: false,
    };
    this.handleSubmit.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isOpen: true });
  };

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
    const {support, firstName, lastName, yourPhone, comments, message, send, subject} = this.props.lang.lang
    return (
      <React.Fragment>
        {/* breadcrumb */}
        <PageBreadcrumb
          title={support}
          pathItems={this.state.pathItems}
        />

        <section className="section">
          <Container>
            <Row className="justify-content-center">
              <Col lg={7} xs={12}>
                <div className="rounded p-4 shadow">
                  <Row>
                    <Col xs={12}>
                      <Alert
                        isOpen={this.state.isOpen}
                        toggle={() => this.setState({ isOpen: false })}
                        color="primary"
                      >
                        Data Submtted Successfully
                      </Alert>
                      <Form onSubmit={this.handleSubmit}>
                        <Row>
                          <Col md={6}>
                            <FormGroup>
                              <Label>
                                {firstName+" "+lastName} <span className="text-danger">*</span>
                              </Label>
                              <div className="position-relative">
                                <i>
                                  <FeatherIcon
                                    icon="user"
                                    className="fea icon-sm icons"
                                  />
                                </i>
                              </div>
                              <Input
                                name="name"
                                id="name"
                                type="text"
                                className="form-control pl-5"
                                placeholder={firstName+" "+lastName}
                              />
                            </FormGroup>
                          </Col>
                          <Col md={6}>
                            <FormGroup>
                              <Label>
                                {yourPhone}{" "}
                                <span className="text-danger">*</span>
                              </Label>
                              <div className="position-relative">
                                <i>
                                  <FeatherIcon
                                    icon="phone"
                                    className="fea icon-sm icons"
                                  />
                                </i>
                              </div>
                              <Input
                                name="phone"
                                id="phone"
                                type="phone"
                                className="form-control pl-5"
                                placeholder={yourPhone}
                              />
                            </FormGroup>
                          </Col>
                          <Col md={12}>
                            <FormGroup>
                              <Label>{subject}</Label>
                              <div className="position-relative">
                                <i>
                                  <FeatherIcon
                                    icon="book"
                                    className="fea icon-sm icons"
                                  />
                                </i>
                              </div>
                              <Input
                                name="subject"
                                id="subject"
                                className="form-control pl-5"
                                placeholder={subject}
                              />
                            </FormGroup>
                          </Col>
                          <Col md={12}>
                            <FormGroup>
                              <Label>{comments}</Label>
                              <div className="position-relative">
                                <i>
                                  <FeatherIcon
                                    icon="message-circle"
                                    className="fea icon-sm icons"
                                  />
                                </i>
                              </div>
                              <textarea
                                name="comments"
                                id="comments"
                                rows="4"
                                className="form-control pl-5"
                                placeholder={message}
                              ></textarea>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm={12}>
                            <input
                              type="submit"
                              id="submit"
                              name="send"
                              className="btn btn-primary"
                              value={send}
                            />
                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

const mstp = state => state;

export default connect(mstp,null)(HelpCenterSupportRequest);