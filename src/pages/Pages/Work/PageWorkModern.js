// React Basic and Bootstrap
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Col, Card, CardBody} from 'reactstrap';

//Import components
import PageBreadcrumb from "../../../components/Shared/PageBreadcrumb";
import Pagination from 'rc-pagination';
import 'rc-select/assets/index.less';
import {connect} from "react-redux";
import {getNews} from "../../../server/config/web-site/client";
import {pageSize} from "../../../constants/all";
import {imgUrl} from "../../../server/host";

class PageWork extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            total: 0,
            pageSize: pageSize-1,
            pathItems: [
                //id must required
                {id: 1, name: props.lang.lang.index, link: "/"},
                {id: 4, name: props.lang.lang.news},
            ],
            news: [
            ],
        }
        this.onPaginationChange.bind(this);
    }

    onPaginationChange = (e) => {
        // console.log(e)
        this.setState({current: e},()=>this.getList())

    }

    getList = () => {
        const {current, pageSize} = this.state;

        getNews(current-1, pageSize).then(res=>{
            this.setState({
                news: res.data.content,
                total: res.data.totalElements,
                current: res.data.number+1
            })
        }).catch(err=>{
            // console.log(err)
        })

    }

    componentDidMount() {
        window.addEventListener("scroll", this.scrollNavigation, true);
        this.getList();
    }

    // Make sure to remove the DOM listener when the component is unmounted.
    componentWillUnmount() {
        window.removeEventListener("scroll", this.scrollNavigation, true);
    }

    scrollNavigation = () => {
        var doc = document.documentElement;
        var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        var topnav = document.getElementById('topnav');
        if (top > 80 && topnav) {
            topnav.classList.add('nav-sticky');
        } else if (topnav) {
            topnav.classList.remove('nav-sticky');
        }
    }

    render() {
        const {news} = this.props.lang.lang;
        return (
            <React.Fragment>
                {/* breadcrumb */}
                <PageBreadcrumb title={news} pathItems={this.state.pathItems}/>
                <div className="position-relative">
                    <div className="shape overflow-hidden text-white">
                        <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                        </svg>
                    </div>
                </div>

                <section className="section">
                    <Container>
                        <Row className="projects-wrapper d-flex">
                            {
                                this.state.news.map((work, key) =>
                                    <Col lg="4" md="6" xs="12" key={key} className="mb-4 pb-2">
                                        <Card
                                            className="work-container work-modern position-relative overflow-hidden shadow rounded border-0">
                                            <CardBody className="p-0"  height={"125px!important"}>
                                                <img src={imgUrl+work.imageUrl} className="img-fluid rounded h-100" alt="work"/>
                                                <div className="overlay-work bg-dark"></div>
                                                <div className="content">
                                                    <Link  to={"/news/" + work.id}
                                                          className="title text-white d-block font-weight-bold">{work.title}</Link>
                                                </div>
                                                <div className="client">
                                                    <small className="text-light date"><i
                                                        className="mdi mdi-calendar-check"></i> {new Date(work.createdAt).toLocaleString().substr(0,17)}</small>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                )
                            }

                            <Col xs="12" className={"justify-items-center text-center"}>
                                <Pagination
                                    current={this.state.current}
                                    pageSize={this.state.pageSize}
                                    total={this.state.total}
                                    hideOnSinglePage={true}
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

export default connect(mstp, null)(PageWork);
