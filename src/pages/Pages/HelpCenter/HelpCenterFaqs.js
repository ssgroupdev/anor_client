import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Container, Row, Col, Media, Card, CardHeader, Collapse, CardBody} from "reactstrap";

//Import components
import PageBreadcrumb from "../../../components/Shared/PageBreadcrumb";
import AccordianCommon from "../../../components/Shared/AccordianCommon";

import ScrollspyNav from "./ScrollspyNav";
import {connect} from "react-redux";

class HelpCenterFaqs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pathItems: [
                //id must required
                {id: 1, name: props.lang.lang.index, link: "/"},
                {id: 2, name: props.lang.lang.helpCenter, link: "/help-center"},
                {id: 3, name: props.lang.lang.faq},
            ],
            questions: [
                {
                    id: 1,
                    title: "Buying questions",
                    questions: [
                        {
                            id: 1,
                            question: "name?",
                            answer: "test",
                            col:true,
                        },{
                            id: 2,
                            question: "name?",
                            answer: "test",
                            col:false,
                        },{
                            id: 3,
                            question: "name?",
                            answer: "test",
                            col:false,
                        },
                    ]
                } ,  {
                    id: 2,
                    title: "Buying questions",
                    questions: [
                        {
                            id: 4,
                            question: "name?",
                            answer: "test",
                            col:false,
                        },{
                            id: 5,
                            question: "name?",
                            answer: "test",
                            col:false,
                        },{
                            id: 6,
                            question: "name?",
                            answer: "test",
                            col:false,
                        },
                    ]
                },  {
                    id: 3,
                    title: "Buying questions",
                    questions: [
                        {
                            id: 7,
                            question: "name?",
                            answer: "test",
                            col:false,
                        },{
                            id: 8,
                            question: "name?",
                            answer: "test",
                            col:false,
                        },{
                            id: 9,
                            question: "name?",
                            answer: "test",
                            col:false,
                        },
                    ]
                }
            ]
            , ids: [
                1, 2, 3
            ]
        }
        this.scrollNavigation.bind(this);
    }
    t_col = (id) => {

        let arr = this.state.questions.find(value => value.questions.find(value1 =>value1.id=== id));
        console.log(arr)
        if (arr!=null) {
            let elements = this.state.questions;

            elements.map(value => {
                if (value.id === arr.id) {
                    value.questions.map(value1 => {
                        if (value1.id === id){
                            value1.col = !value1.col;
                        }
                    })
                }
            });

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
        const ids = ["tech", "general", "payment", "support"];
        const {faq} = this.props.lang.lang;
        return (
            <React.Fragment>
                {/* breadcrumb */}
                <PageBreadcrumb
                    title={faq}
                    pathItems={this.state.pathItems}
                />

                <section className="section">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={4} md={5} xs={12} className="d-none d-md-block">
                                <div className="rounded shadow p-4 sticky-bar">
                                    <ScrollspyNav
                                        scrollTargetIds={this.state.ids}
                                        activeNavclassName="active"
                                        scrollDuration="800"
                                        headerBackground="true"
                                        className="sticky-bar"
                                    >
                                        <ul className="list-unstyled mb-0">
                                            {
                                                this.state.questions.map((value, index) => (
                                                    <li key={index}>
                                                        <a href={"#" + value.id} className="mouse-down h6 text-dark">
                                                            {value.title}
                                                        </a>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </ScrollspyNav>
                                </div>
                            </Col>

                            <Col lg={8} md={7} xs={12}>

                                {
                                    this.state.questions.map((value, index) => (
                                        <>
                                            <div className="section-title" id={value.id}>
                                                <h4>{value.title}</h4>
                                            </div>
                                            <div className="faq-content mt-4 pt-2">
                                                <div className="accordion" id="accordionExampleone">
                                                    {/* accoridan */}
                                                  {
                                                    value.questions.map((value1, index1) => (

                                                        <Card className="border-0 rounded mb-2" key={index1}>
                                                            <Link
                                                                to="#"
                                                                onClick={(e)=>this.t_col(value1.id)}
                                                                className={
                                                                    value1.col
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
                                                                        {value1.question}
                                                                        <i
                                                                            className={
                                                                                value1.col
                                                                                    ? "mdi mdi-chevron-up float-right"
                                                                                    : "mdi mdi-chevron-down float-right"
                                                                            }
                                                                        ></i>
                                                                    </h6>
                                                                </CardHeader>
                                                            </Link>
                                                            <Collapse isOpen={value1.col}>
                                                                <CardBody>
                                                                    <p className="text-muted mb-0 faq-ans">
                                                                        {value1.answer}
                                                                    </p>
                                                                </CardBody>
                                                            </Collapse>
                                                        </Card>

                                                    ))
                                                  }

                                                </div>
                                            </div>
                                        </>
                                    ))
                                }
                            </Col>

                        </Row>
                    </Container>

                </section>
            </React.Fragment>
        );
    }
}

const mstp = state => state;

export default connect(mstp,null)(HelpCenterFaqs);
