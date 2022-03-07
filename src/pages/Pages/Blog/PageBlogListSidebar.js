import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Card,
  CardBody,
} from "reactstrap";
import { Link } from "react-router-dom";

//Import components
import PageBreadcrumb from "../../../components/Shared/PageBreadcrumb";
import PageSearchSidebar from "../../../components/Shared/PageSearchSidebar";

class PageBlogListSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathItems: [
        //id must required
        { id: 1, name: "Landrick", link: "/index" },
        { id: 2, name: "Page", link: "#" },
        { id: 3, name: "Blog", link: "#" },
        { id: 4, name: "Blog List With Sidebar" },
      ],
      blogs: [
      ],
    };
  }

  componentDidMount() {
    document.body.classList = "";
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
          title="Blog Listing & Sidebar"
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
              <Col lg={8} xs={12}>
                <Row>
                  {this.state.blogs.map((blog, key) =>
                    key % 2 === 0 ? (
                      <Col key={key} xs={12} className="mb-4 pb-2">
                        <Card className="blog rounded border-0 shadow overflow-hidden">
                          <Row className="align-items-center no-gutters">
                            <Col md={6}>
                              <img
                                src={blog.image}
                                className="img-fluid"
                                alt="Landrick"
                              />
                              <div className="overlay bg-dark"></div>
                              <div className="author">
                                <small className="text-light user d-block">
                                  <i className="mdi mdi-account"></i>{" "}
                                  {blog.autor}
                                </small>
                                <small className="text-light date">
                                  <i className="mdi mdi-calendar-check"></i>{" "}
                                  {blog.date}
                                </small>
                              </div>
                            </Col>

                            <Col md={6}>
                              <CardBody className="content">
                                <h5>
                                  <Link
                                    to="#"
                                    className="card-title title text-dark"
                                  >
                                    {blog.title}
                                  </Link>
                                </h5>
                                <p className="text-muted mb-0">{blog.desc}</p>
                                <div className="post-meta d-flex justify-content-between mt-3">
                                  <ul className="list-unstyled mb-0">
                                    <li className="list-inline-item mr-2 mb-0">
                                      <Link to="#" className="text-muted like">
                                        <i className="mdi mdi-heart-outline mr-1"></i>
                                        {blog.like}
                                      </Link>
                                    </li>
                                    <li className="list-inline-item ml-1">
                                      <Link
                                        to="#"
                                        className="text-muted comments"
                                      >
                                        <i className="mdi mdi-comment-outline mr-1"></i>
                                        {blog.comment}
                                      </Link>
                                    </li>
                                  </ul>
                                  <Link
                                    to="page-blog-detail"
                                    className="text-muted readmore"
                                  >
                                    Read More{" "}
                                    <i className="mdi mdi-chevron-right"></i>
                                  </Link>
                                </div>
                              </CardBody>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                    ) : (
                      <Col key={key} xs={12} className="mb-4 pb-2">
                        <Card className="blog rounded border-0 shadow overflow-hidden">
                          <Row className="align-items-center no-gutters">
                            <Col md={{ size: 6, order: 1 }} xs={{ order: 2 }}>
                              <CardBody className="content">
                                <h5>
                                  <Link
                                    to="#"
                                    className="card-title title text-dark"
                                  >
                                    {blog.title}
                                  </Link>
                                </h5>
                                <p className="text-muted mb-0">{blog.desc}</p>
                                <div className="post-meta d-flex justify-content-between mt-3">
                                  <ul className="list-unstyled mb-0">
                                    <li className="list-inline-item mr-2 mb-0">
                                      <Link to="#" className="text-muted like">
                                        <i className="mdi mdi-heart-outline mr-1"></i>
                                        {blog.like}
                                      </Link>
                                    </li>
                                    <li className="list-inline-item ml-1">
                                      <Link
                                        to="#"
                                        className="text-muted comments"
                                      >
                                        <i className="mdi mdi-comment-outline mr-1"></i>
                                        {blog.comment}
                                      </Link>
                                    </li>
                                  </ul>
                                  <Link
                                    to="page-blog-detail"
                                    className="text-muted readmore"
                                  >
                                    Read More{" "}
                                    <i className="mdi mdi-chevron-right"></i>
                                  </Link>
                                </div>
                              </CardBody>
                            </Col>

                            <Col md={{ size: 6, order: 2 }} xs={{ order: 1 }}>
                              <img
                                src={blog.image}
                                className="img-fluid"
                                alt="Landrick"
                              />
                              <div className="overlay bg-dark"></div>
                              <div className="author">
                                <small className="text-light user d-block">
                                  <i className="mdi mdi-account"></i>{" "}
                                  {blog.autor}
                                </small>
                                <small className="text-light date">
                                  <i className="mdi mdi-calendar-check"></i>{" "}
                                  {blog.date}
                                </small>
                              </div>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                    )
                  )}

                  <Col xs={12}>
                    <Pagination listClassName="justify-content-center mb-0">
                      <PaginationItem>
                        <PaginationLink href="#" aria-label="Previous">
                          Prev
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem active>
                        <PaginationLink href="#">1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" aria-label="Next">
                          Next
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </Col>
                </Row>
              </Col>

              {/* sidebar */}
              <Col lg={4} xs={12} className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                <PageSearchSidebar
                  blog01={blog01}
                  blog07={blog07}
                  blog08={blog08}
                />
              </Col>
              {/* <!-- END SIDEBAR --> */}
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

export default PageBlogListSidebar;
