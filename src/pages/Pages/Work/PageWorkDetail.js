// React Basic and Bootstrap
import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Alert,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Card,
  CardBody,
} from "reactstrap";

//Import Icons
import FeatherIcon from "feather-icons-react";

//Import components
import PageBreadcrumb from "../../../components/Shared/PageBreadcrumb";
import CommentsBox from "../../../components/Shared/CommentsBox";

//Import Images
import singleImg from "../../../assets/images/work/single.jpg";
import work2 from "../../../assets/images/work/2.jpg";
import work3 from "../../../assets/images/work/3.jpg";
import work6 from "../../../assets/images/work/6.jpg";

// Client Images
import client1 from "../../../assets/images/client/01.jpg";
import client2 from "../../../assets/images/client/02.jpg";
import client3 from "../../../assets/images/client/03.jpg";
import client4 from "../../../assets/images/client/04.jpg";

class PageWorkDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {

      news: {
        id: 1,
        title: "test"
      },
      pathItems: [
        //id must required
        { id: 1, name: "Bosh Sahifa", link: "/" },
        { id: 2, name: "Yangiklar", link: "/news" },
        { id: 4, name: "this.state.news.title" },
      ],
      Contactvisible: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ Contactvisible: true });
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
        <PageBreadcrumb pathItems={this.state.pathItems}>
          <h4 className="title"> New Trends in SEO </h4>
          <ul className="list-unstyled mt-4">
            <li className="list-inline-item h6 user text-muted mr-2">
              {" "}
              <span className="text-dark">Client :</span> Calvin Carlo
            </li>
            <li className="list-inline-item h6 date text-muted ml-1">
              {" "}
              <span className="text-dark">Date :</span> 23th Sep, 2019
            </li>
          </ul>
        </PageBreadcrumb>

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
              <Col xs={12} className="text-center">
                <img src={singleImg} className="img-fluid rounded" alt="" />
              </Col>

              <Col md={10} className="mt-4 pt-2">
                <div className="bg-light rounded p-4">
                  <p className="text-muted font-italic mb-0">
                    " One disadvantage of Lorum Ipsum is that in Latin certain
                    letters appear more frequently than others - which creates a
                    distinct visual impression. Moreover, in Latin only words at
                    the beginning of sentences are capitalized; this means that
                    Lorem Ipsum cannot accurately represent, for example,
                    German, in which all nouns are capitalized. Thus, Lorem
                    Ipsum has only limited suitability as a visual filler for
                    German texts. If the fill text is intended to illustrate the
                    characteristics of different typefaces, it sometimes makes
                    sense to select texts containing the various letters and
                    symbols specific to the output language. "
                  </p>
                </div>


                {/*<Card className="shadow rounded border-0 mt-4">*/}
                {/*  <CardBody>*/}
                {/*    <h5 className="card-title mb-0">Leave A Comment :</h5>*/}
                {/*    <Alert*/}
                {/*      color="primary"*/}
                {/*      isOpen={this.state.Contactvisible}*/}
                {/*      toggle={() => {*/}
                {/*        this.setState({*/}
                {/*          Contactvisible: !this.state.Contactvisible,*/}
                {/*        });*/}
                {/*      }}*/}
                {/*    >*/}
                {/*      Data Sended Successfully.*/}
                {/*    </Alert>*/}
                {/*    <Form className="mt-3" onSubmit={this.handleSubmit}>*/}
                {/*      <Row>*/}
                {/*        <Col md={12}>*/}
                {/*          <FormGroup>*/}
                {/*            <Label>Your Comment</Label>*/}
                {/*            <div className="position-relative">*/}
                {/*              <i>*/}
                {/*                <FeatherIcon*/}
                {/*                  icon="message-circle"*/}
                {/*                  className="fea icon-sm icons"*/}
                {/*                />*/}
                {/*              </i>*/}
                {/*            </div>*/}
                {/*            <textarea*/}
                {/*              id="message"*/}
                {/*              placeholder="Your Comment"*/}
                {/*              rows="5"*/}
                {/*              name="message"*/}
                {/*              className="form-control pl-5"*/}
                {/*              required*/}
                {/*            ></textarea>*/}
                {/*          </FormGroup>*/}
                {/*        </Col>*/}

                {/*        <Col md={6}>*/}
                {/*          <FormGroup>*/}
                {/*            <Label>*/}
                {/*              Name <span className="text-danger">*</span>*/}
                {/*            </Label>*/}
                {/*            <div className="position-relative">*/}
                {/*              <i>*/}
                {/*                <FeatherIcon*/}
                {/*                  icon="user"*/}
                {/*                  className="fea icon-sm icons"*/}
                {/*                />*/}
                {/*              </i>*/}
                {/*            </div>*/}
                {/*            <Input*/}
                {/*              id="name"*/}
                {/*              name="name"*/}
                {/*              type="text"*/}
                {/*              placeholder="Name"*/}
                {/*              className="form-control pl-5"*/}
                {/*              required*/}
                {/*            />*/}
                {/*          </FormGroup>*/}
                {/*        </Col>*/}

                {/*        <Col md={6}>*/}
                {/*          <FormGroup className="position-relative">*/}
                {/*            <Label>*/}
                {/*              Your Email <span className="text-danger">*</span>*/}
                {/*            </Label>*/}
                {/*            <div className="position-relative">*/}
                {/*              <i>*/}
                {/*                <FeatherIcon*/}
                {/*                  icon="mail"*/}
                {/*                  className="fea icon-sm icons"*/}
                {/*                />*/}
                {/*              </i>*/}
                {/*            </div>*/}
                {/*            <Input*/}
                {/*              id="email"*/}
                {/*              type="email"*/}
                {/*              placeholder="Email"*/}
                {/*              name="email"*/}
                {/*              className="form-control pl-5"*/}
                {/*              required*/}
                {/*            />*/}
                {/*          </FormGroup>*/}
                {/*        </Col>*/}

                {/*        <Col md={12}>*/}
                {/*          <div className="send">*/}
                {/*            <Button*/}
                {/*              color="primary"*/}
                {/*              type="submit"*/}
                {/*              className="w-100"*/}
                {/*            >*/}
                {/*              Send Message*/}
                {/*            </Button>*/}
                {/*          </div>*/}
                {/*        </Col>*/}
                {/*      </Row>*/}
                {/*    </Form>*/}
                {/*  </CardBody>*/}
                {/*</Card>*/}
              </Col>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}
export default PageWorkDetail;
