import React, {Component} from "react";
import {Link} from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Collapse,
    CardHeader,
    Media, Form, FormGroup, Button,
} from "reactstrap";

//Import components
import PageBreadcrumb from "../../../components/Shared/PageBreadcrumb";
import {connect} from "react-redux";

class HelpCenterOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pathItems: [
                //id must required
                {id: 1, name: props.lang.lang.index, link: "/"},
                {id: 3, name: props.lang.lang.helpCenter},
            ],
            features: [
                {
                    icon: "uil uil-question-circle",
                    link: "/faqs",
                    title: "FAQs",
                    desc:
                    props.lang.lang.faqDesc,
                },
                {
                    icon: "uil uil-file-bookmark-alt",
                    link: "/page-privacy",
                    title:   props.lang.lang.guidesSupport,
                    desc:
                    props.lang.lang.guidesSupportDesc,
                },
                {
                    icon: "uil uil-cog",
                    link: "/support",
                    title:  props.lang.lang.supportReq,
                    desc:
                    props.lang.lang.supportReqDesc
                },
            ],
            globalQuestions: [
                {
                    id: 1,
                    question: "How it works?",
                    answer: "It is easy", col: true
                }, {
                    id: 2,
                    question: "How it works?",
                    answer: "It is easy", col: false
                }, {
                    id: 3,
                    question: "How it works?",
                    answer: "It is easy", col: false
                }
            ],
            titleGetStarted: props.lang.lang.getStarts,
            descGetStarted:  props.lang.lang.getStartsDesc,
            title: props.lang.lang.helpCenter,
            desc: props.lang.lang.helpCenterDesc,
            find: props.lang.lang.helpCenterTitle
        };
        this.t_col.bind(this);
    }

    t_col = (id) => {

        let arr = this.state.globalQuestions.find(value => value.id === id);
        if (arr != null) {
            let elements = this.state.globalQuestions;
            elements.map(value => {
                if (value.id === id) {
                    value.col = !value.col;
                }
            })
            this.setState({
                questions: elements
            });
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
        const {getStartsDesc,getStarts} = this.props.lang.lang
        return (
            <React.Fragment>
                {/* breadcrumb */}
                <PageBreadcrumb pathItems={this.state.pathItems}>
                    <h4 className="title">
                        {this.state.title} </h4>

                </PageBreadcrumb>

                <section className="section">
                    <Container>
                        <Row className="justify-content-center">
                            <Col xs={12}>
                                <div className="section-title text-center mb-4 pb-2">
                                    <h4 className="mb-4">{this.state.find}</h4>
                                    <p className="para-desc mx-auto text-muted">
                                        {this.state.desc}
                                    </p>
                                </div>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            {this.state.features.map((feature, key) => (
                                <Col key={key} lg={4} md={6} xs={12} className="mt-4 pt-2">
                                    <Card className="explore-feature border-0 rounded text-center bg-white">
                                        <CardBody>
                                            <div className="icon rounded-circle shadow-lg d-inline-block mb-2 h2">
                                                <i className={feature.icon}></i>
                                            </div>
                                            <div className="content mt-3">
                                                <Link to={feature.link} className="title h5 text-dark">
                                                    {feature.title}
                                                </Link>
                                                <p className="text-muted mt-3 mb-0">{feature.desc}</p>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Container>

                    <Container className="mt-100 mt-60">
                        <Row className="justify-content-center">
                            <Col xs={12}>
                                <div className="section-title text-center mb-4 pb-2">
                                    <h4 className="mb-4">
                                        {this.state.titleGetStarted}
                                    </h4>
                                    <p className="para-desc mx-auto text-muted">
                                        {this.state.descGetStarted}
                                    </p>
                                </div>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            <Col lg={9} className="mt-4 pt-2">
                                <div className="faq-content">
                                    <div className="accordion" id="accordionExample">
                                        {
                                            this.state.globalQuestions.map((value, index) => (

                                                <Card className="border-0 rounded mb-2" key={index}>
                                                    <Link
                                                        to="#"
                                                        onClick={(e) => this.t_col(value.id)}
                                                        className={
                                                            value.col
                                                                ? "faq position-relative text-primary"
                                                                : "faq position-relative text-dark"
                                                        }
                                                    >
                                                        <CardHeader
                                                            className="border-0 shadow bg-light p-3"
                                                            id="headingOne"
                                                        >
                                                            <h6 className="title mb-0">
                                                                {" "}
                                                                {value.question}
                                                                <i
                                                                    className={
                                                                        value.col
                                                                            ? "mdi mdi-chevron-up float-right"
                                                                            : "mdi mdi-chevron-down float-right"
                                                                    }
                                                                ></i>
                                                            </h6>
                                                        </CardHeader>
                                                    </Link>
                                                    <Collapse isOpen={value.col}>
                                                        <CardBody>
                                                            <p className="text-muted mb-0 faq-ans">
                                                                {value.answer}
                                                            </p>
                                                        </CardBody>
                                                    </Collapse>
                                                </Card>
                                            ))
                                        }
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

const mstp = state => state;

export default connect(mstp,null)(HelpCenterOverview);