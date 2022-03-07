import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Link } from "react-router-dom";

//Import Light box
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

//Import components
import PageBreadcrumb from "../../../components/Shared/PageBreadcrumb";

const images = [
];

class PageWorkGrid extends Component {
    constructor(props) {
        super(props);
        this.state={
            pathItems : [
                //id must required
                { id : 1, name : "Landrick", link : "/index" },
                { id : 2, name : "Pages", link : "#" },
                { id : 3, name : "Work", link : "#" },
                { id : 4, name : "Grid" },
            ],
            works : [],
            photoIndex: 0,
            isOpen: false,
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
        var topnav = document.getElementById('topnav');
        if (top > 80 && topnav) {
            topnav.classList.add('nav-sticky');
        }
        else if(topnav) {
            topnav.classList.remove('nav-sticky');
        }
    }

    render() {
        const { photoIndex, isOpen } = this.state;
        return (
            <React.Fragment>
                {/* breadcrumb */}
                <PageBreadcrumb title="Work Grid" pathItems = {this.state.pathItems} />
                <div className="position-relative">
                    <div className="shape overflow-hidden text-white">
                        <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                        </svg>
                    </div>
                </div>

        <section className="section">
            <Container>
                <Row className="projects-wrapper">

                    {
                        this.state.works.map((work, key) =>
                            <Col key={key} lg={4} md={6} xs={12} className="mb-4 pb-2 branding">
                                <Card className="border-0 work-container work-grid position-relative d-block overflow-hidden rounded">
                                    <CardBody className="p-0">
                                        <Link className="mfp-image d-inline-block" to="#" onClick={(event) => {event.preventDefault(); this.setState({ isOpen: true, photoIndex : key })}} title="">
                                            <img src={work.image} className="img-fluid" alt="work"/>
                                        </Link>
                                        <div className="content bg-white p-3">
                                            <h5 className="mb-0"><Link to="page-work-detail" className="text-dark title">{work.title}</Link></h5>
                                            <h6 className="text-muted tag mb-0">{work.subtitle}</h6>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        )
                    }

                    {/* lightbox for portfolio images */}
                    { isOpen && (
                                    <Lightbox
                                        mainSrc={images[photoIndex]}
                                        nextSrc={images[(photoIndex + 1) % images.length]}
                                        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                                        imagePadding={100}
                                        onCloseRequest={() => this.setState({ isOpen: false })}
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
                    ) }
               
                    <Col xs={12}>
                                <Pagination listClassName="justify-content-center mb-0">
                                    <PaginationItem><PaginationLink href="#" aria-label="Previous">Prev</PaginationLink></PaginationItem>
                                    <PaginationItem active><PaginationLink href="#">1</PaginationLink></PaginationItem>
                                    <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
                                    <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                                    <PaginationItem><PaginationLink href="#" aria-label="Next">Next</PaginationLink></PaginationItem>
                                </Pagination>
                    </Col>

                </Row>
            </Container>
        </section>
            </React.Fragment>
        );
    }
}

export default PageWorkGrid;