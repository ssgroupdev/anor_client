import React, {Component} from 'react';
import {Container, Row, Card, CardBody, Col} from 'reactstrap';
import {Link} from "react-router-dom";

//Import Light box
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

//Import components
import PageBreadcrumb from "../../../components/Shared/PageBreadcrumb";

//Import Icons
import FeatherIcon from 'feather-icons-react';

import {connect} from "react-redux";
import {getBrand, getNews} from "../../../server/config/web-site/client";
import Pagination from "rc-pagination";
import {imgUrl} from "../../../server/host";

const images = [
];

let brakePoints = [350, 500, 750];

class PageWorkMasonry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pathItems: [
                //id must required
                {id: 1, name: props.lang.lang.index, link: "/"},
                {id: 4, name: props.lang.lang.brands},
            ],
            current: 1,
            total: 0,
            pageSize: 50,

            works: [
                ],
            photoIndex: 0,
            isOpen: false,
        }
    }
    onPaginationChange = (e) => {
        // console.log(e)
        this.setState({current: e},()=>this.getList())

    }
    componentDidMount() {
        this.getList();
        window.addEventListener("scroll", this.scrollNavigation, true);
    }

    // Make sure to remove the DOM listener when the component is unmounted.
    componentWillUnmount() {
        window.removeEventListener("scroll", this.scrollNavigation, true);
    }
    getList = () => {
        const {current, pageSize} = this.state;

        getBrand(current-1, pageSize).then(res=>{
            this.setState({
                works: res.data.content,
                total: res.data.totalElements,
                current: res.data.number+1
            })
        }).catch(err=>{
            // console.log(err)
        })

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
        const {photoIndex, isOpen} = this.state;
        const {brands} = this.props.lang.lang;
        return (
            <React.Fragment>
                {/* breadcrumb */}
                <PageBreadcrumb title={brands} pathItems={this.state.pathItems}/>
                <div className="position-relative">
                    <div className="shape overflow-hidden text-white">
                        <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                        </svg>
                    </div>
                </div>

                <section className="section">
                    <Container>

                        <Row className="projects-wrapper  pt-2">
                            <div className="masonry-container">
                                <Masonry brakePoints={brakePoints}>
                                    {this.state.works
                                        .map(({id,name, imageUrl}, key) => (
                                            <Card key={key}
                                                  className="tile border-0 work-container work-modern position-relative d-block overflow-hidden rounded-0">
                                                <CardBody className="p-0">
                                                    <img src={imgUrl+imageUrl} className="img-fluid" alt="work"/>
                                                    <div className="overlay-work bg-dark"></div>
                                                    <div className="content">
                                                        <h5 className="mb-0"><Link to={"/brands/"+id+"/products"}
                                                                                   className="text-white title">{name}</Link>
                                                        </h5>
                                                        {/*<h6 className="text-light tag mb-0">{subtitle}</h6>*/}
                                                    </div>
                                                    <div className="icons text-center">
                                                        <Link to={"/brands/"+id+"/products"} onClick={(event) => {
                                                            event.preventDefault();
                                                            this.setState({isOpen: true, photoIndex: key})
                                                        }}
                                                              className="text-primary work-icon bg-white d-inline-block rounded-pill mfp-image"><i><FeatherIcon
                                                            icon="camera" className="fea icon-sm"/></i></Link>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        ))}
                                </Masonry>
                            </div>
                            {/* lightbox for portfolio images */}
                            {isOpen && (
                                <Lightbox
                                    mainSrc={images[photoIndex]}
                                    nextSrc={images[(photoIndex + 1) % images.length]}
                                    prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                                    imagePadding={100}
                                    onCloseRequest={() => this.setState({isOpen: false})}
                                    onMovePrevRequest={() =>
                                        this.setState({
                                            photoIndex: (photoIndex + images.length - 1) % images.length,
                                        })
                                    }
                                    onMoveNextRequest={() =>
                                        this.setState({
                                            photoIndex: (photoIndex + 1) % images.length,
                                        })
                                    }
                                />
                            )}
                            <Col xs="12" className={"justify-items-center text-center mt-3"}>
                                <Pagination
                                    hideOnSinglePage={true} current={this.state.current}
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

class Masonry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {columns: 1};
        this.onResize = this.onResize.bind(this);
    }

    componentDidMount() {
        this.onResize();
        window.addEventListener('resize', this.onResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize)
    }

    getColumns(w) {
        return this.props.brakePoints.reduceRight((p, c, i) => {
            return c < w ? p : i;
        }, this.props.brakePoints.length) + 1;
    }

    onResize() {
        const columns = this.getColumns(this.refs.Masonry.offsetWidth);
        if (columns !== this.state.columns) {
            this.setState({columns: columns});
        }

    }

    mapChildren() {
        let col = [];
        const numC = this.state.columns;
        for (let i = 0; i < numC; i++) {
            col.push([]);
        }
        return this.props.children.reduce((p, c, i) => {
            p[i % numC].push(c);
            return p;
        }, col);
    }

    render() {
        return (
            <div className="masonry" ref="Masonry">
                {this.mapChildren().map((col, ci) => {
                    return (
                        <div className="column" key={ci}>
                            {col.map((child, i) => {
                                return <div key={i}>{child}</div>
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }
}
const mstp = state => state

export default connect(mstp,null)(PageWorkMasonry);
