import React, {Component} from "react";
import {
    Container,
    Row,
    Col,
    Input,
    Card,
    CardBody,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Table,
    FormGroup,
    Label,
    ListGroup, ListGroupItem,
} from "reactstrap";
import {Link} from "react-router-dom";
import classnames from "classnames";
import "./product-detail.scss";

//Import Slick Slider
import Slider from "react-slick";

//Import Icons
import FeatherIcon from "feather-icons-react";

//Import Slick Slider CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//Import components
import PageBreadcrumb from "../../../components/Shared/PageBreadcrumb";

import client1 from "../../../assets/images/client/01.jpg";
import client2 from "../../../assets/images/client/02.jpg";

import {connect} from "react-redux";
import ReactStars from "react-stars";
import {getProductById} from "../../../server/config/web-site/product";
import {imgUrl} from "../../../server/host";
import {addProductToBaskets} from "../../../server/config/web-site/basket";
import {toast} from "react-toastify";
import {getUser} from "../../../server/config/web-site/user";

class ShopProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pathItems: [
                {id: 1, name: props.lang.lang.index, link: "/"},
                {id: 3, name: props.lang.lang.productDetail},
            ],
            products: [],
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 2,
                },
                1000: {
                    items: 4,
                },
            },
            nav1: null,
            nav2: null,
            items: 1,
            id: props.props?.match?.params?.id,
            activeTab: "1",
            name: "",
            desc: "",
            futureGroup: [],
            images: [],
            branchProductId: new URLSearchParams(props.props.location.search).get("branchProduct"),
            isLogin: false
        }
        ;
        this.addItem.bind(this);
        this.removeItem.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle(tab) {
        this.setState({activeTab: tab});
    }

    addItem = () => {
        this.setState({items: this.state.items + 1});
    };

    removeItem = () => {
        if (this.state.items > 1) {
            this.setState({items: this.state.items - 1});
        }
    };


    getList = () => {

        getProductById(this.state.id, (this.state.branchProductId) !== 'undefined' ? this.state.branchProductId : null).then((res) => {
            this.setState({
                id: res.data.id,
                name: res.data.name,
                desc: res.data.description,
                cost: res.data.branch?.price?.price,
                oldPrice: res.data.branch?.price?.oldPrice,
                branchName: res.data.branch?.name,
                rate: res.data.rate,
                images: res.data.images,
                futureGroup: res.data.futureGroups,
                products: res.data.products,
                branch: res.data.branch
            })
        }).catch(err => {

        })
        getUser().then(res => {
            if (res && res.data && res.data.id) {
                this.setState({isLogin: true})
            } else {
                this.setState({isLogin: false})
            }
        }).catch(err => {
            this.setState({isLogin: false})
        })

    }


    componentDidMount() {
        this.getList();
        window.addEventListener("scroll", this.scrollNavigation, true);
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2,
            branchProductId: new URLSearchParams(this.props?.props?.location?.search).get("branchProduct")
        });
    }

    addProductToBasket = (count) => {
        if (!this.state.isLogin) {

            this.props.props.history.push("/login")

        } else {
            const data = {productId: this.state.id, branchProductId: this.state.branchProductId, count: count}

            addProductToBaskets(data).then(res => {
                if (res && res.data) {
                    toast.success(this.props.lang.lang.finish)
                } else {
                    toast.error(this.props.lang.lang.error)
                }
            }).catch(err => {
                toast.error(this.props.lang.lang.error)
            });
        }


    }

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
        const {
            productOverview,
            description,
            addToCart,
            getShop,
            count1,
            relatedPro,
            send,
            future,
            atStore
        } = this.props.lang.lang;
        var settings = {
            autoplay: true,
            infinite: true,
            autoplaySpeed: 10000,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            draggable: true,
            pauseOnHover: true,
        };

        const settings2 = {
            dots: false,
            infinite: true,
            autoplaySpeed: 10000,
            autoplay: true,
            slidesToShow: 4,
            slidesToScroll: 2,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        return (
            <React.Fragment>
                {/* breadcrumb */}
                <PageBreadcrumb
                    title={this.state.name}
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
                        <Row className="align-items-center">
                            <Col md={5}>
                                {/* main slider */}
                                <Slider
                                    {...settings}
                                    asNavFor={this.state.nav2}
                                    ref={(slider) => (this.slider1 = slider)}
                                >
                                    {this.state.images.map(value => <div>
                                            <img
                                                src={imgUrl + value?.imageUrl}
                                                className="img-fluid rounded"
                                                alt="alt"
                                            />
                                        </div>
                                    )}

                                </Slider>

                                {/* Slider thumbnails */}
                                <Slider
                                    asNavFor={this.state.nav1}
                                    ref={(slider) => (this.slider2 = slider)}
                                    slidesToShow={this.state.images.length > 2 ? 3 : 2}
                                    swipeToSlide={true}
                                    focusOnSelect={true}
                                >
                                    {this.state.images.map(value => <div>
                                        <img src={imgUrl + value?.imageUrl} className="img-fluid" alt=""/>
                                    </div>)}

                                </Slider>
                            </Col>

                            <Col md={7} className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                                <div className="section-title ml-md-4">
                                    <h4 className="title">{this.state.name}</h4>
                                    {this.state.branch !== null && this.state.branch?.totalQty > 0 ? (this.state.oldPrice > this.state.cost ?
                                        <h5 className="text-muted">
                                            {this.state.cost + this.props.lang.lang.sum}
                                            <del className="text-danger ml-2"
                                                 style={{fontSize: "16px"}}>{"  " + this.state.oldPrice + this.props.lang.lang.sum}</del>
                                        </h5> : <h5 className="text-muted">
                                            {this.state.cost + this.props.lang.lang.sum}
                                        </h5>) : <h5 className="text-danger">{this.props.lang.lang.noResidue}</h5>}
                                    {/*<ul className="list-unstyled text-warning mb-0">*/}
                                    {/*    <ReactStars*/}
                                    {/*        count={this.state.rate}*/}
                                    {/*        edit={false}*/}
                                    {/*        size={23}*/}
                                    {/*        color1={"#f17425"}*/}
                                    {/*    />*/}

                                    {/*</ul>*/}
                                    {/*<h5 className="mt-4 py-2">{productOverview}</h5>*/}
                                    {this.state.branch !== null ? <p className="text-muted text-right">
                                        {this.props.lang.lang.store + ": " + this.state.branchName}
                                    </p> : null
                                    }

                                    {this.state.branch !== null && this.state.branch?.totalQty > 0 ? (
                                        <div className="mt-4 pt-2">
                                            {/*<Link to="#" className="btn btn-primary">*/}
                                            {/*    {getShop}*/}
                                            {/*</Link>*/}
                                            <button type={"button"}
                                                    onClick={() => this.addProductToBasket(this.state.items)}
                                                    className="btn btn-soft-primary ml-2">
                                                {addToCart}
                                            </button>
                                        </div>) : null}
                                </div>
                            </Col>
                        </Row>
                    </Container>

                    <Container className="mt-100 mt-60">
                        <Row>
                            <Col xs={12}>
                                <ul className="nav nav-pills shadow flex-column flex-sm-row d-md-inline-flex mb-0 p-1 mt-0 bg-white rounded position-relative overflow-hidden">
                                    <NavItem className="m-1">
                                        <NavLink
                                            to="#"
                                            className={classnames(
                                                {active: this.state.activeTab === "1"},
                                                "rounded py-2 px-5 "
                                            )}
                                            onClick={() => {
                                                this.toggle("1");
                                            }}
                                        >
                                            <div className="text-center">
                                                <h6 className="mb-0">{description}</h6>
                                            </div>
                                        </NavLink>
                                    </NavItem>

                                    <NavItem className="m-1">
                                        <NavLink
                                            to="#"
                                            className={classnames(
                                                {active: this.state.activeTab === "2"},
                                                "rounded py-2 px-5 "
                                            )}
                                            onClick={() => {
                                                this.toggle("2");
                                            }}
                                        >
                                            <div className="text-center">
                                                <h6 className="mb-0">{future}</h6>
                                            </div>
                                        </NavLink>
                                    </NavItem><NavItem className="m-1">
                                    {
                                        this.state.branch && this.state.branch?.totalQty > 0 ? (
                                            <NavLink
                                                to="#"
                                                className={classnames(
                                                    {active: this.state.activeTab === "4"},
                                                    "rounded py-2 px-5 "
                                                )}
                                                onClick={() => {
                                                    this.toggle("4");
                                                }}
                                            >
                                                <div className="text-center">
                                                    <h6 className="mb-0">{atStore}</h6>
                                                </div>
                                            </NavLink>) : null
                                    }
                                </NavItem>

                                    {/*<NavItem className="m-1">*/}
                                    {/*  <NavLink*/}
                                    {/*    to="#"*/}
                                    {/*    className={classnames(*/}
                                    {/*      { active: this.state.activeTab === "3" },*/}
                                    {/*      "rounded py-2 px-5 "*/}
                                    {/*    )}*/}
                                    {/*    onClick={() => {*/}
                                    {/*      this.toggle("3");*/}
                                    {/*    }}*/}
                                    {/*  >*/}
                                    {/*    /!*<div className="text-center">*!/*/}
                                    {/*    /!*  <h6 className="mb-0">{commentsAndRates}</h6>*!/*/}
                                    {/*    /!*</div>*!/*/}
                                    {/*  </NavLink>*/}
                                    {/*</NavItem>*/}

                                </ul>

                                <TabContent className="mt-3" activeTab={this.state.activeTab}>
                                    <TabPane className="card border-0 fade show" tabId="1">
                                        <p className="text-muted mb-0"
                                           dangerouslySetInnerHTML={{__html: this.state.desc}}>
                                            {/*{this.state.desc}*/}
                                        </p>
                                    </TabPane>

                                    <TabPane className="card border-0 fade show" tabId="2">
                                        {
                                            this.state?.futureGroup?.map((futureGr, key) => (
                                                <Table key={futureGr.id}>
                                                    <tbody><h4>{futureGr.name}</h4>
                                                    {
                                                        futureGr?.futures?.map((item, index) => (
                                                            <tr key={index}>
                                                                <td className={"future-col"}>{item.futureGroupName}</td>
                                                                <td className="text-muted future-col">
                                                                    {item.value}
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                    </tbody>
                                                </Table>
                                            ))
                                        }

                                    </TabPane>

                                    {/*// this pane for comments
                                    it will add in the future for comment or rate
                                    */}
                                    <TabPane className="card border-0 fade show" tabId="3">
                                        <Row>
                                            <Col lg={6}>
                                                <ul className="media-list list-unstyled mb-0">
                                                    <li>
                                                        <div className="d-flex justify-content-between">
                                                            <div className="media align-items-center">
                                                                <Link className="pr-3" to="#">
                                                                    <img
                                                                        src={client1}
                                                                        className="img-fluid avatar avatar-md-sm rounded-circle shadow"
                                                                        alt="img"
                                                                    />
                                                                </Link>
                                                                <div className="commentor-detail">
                                                                    <h6 className="mb-0">
                                                                        <Link
                                                                            to="#"
                                                                            className="text-dark media-heading"
                                                                        >
                                                                            Lorenzo Peterson
                                                                        </Link>
                                                                    </h6>
                                                                    <small className="text-muted">
                                                                        15th August, 2019 at 01:25 pm
                                                                    </small>
                                                                </div>
                                                            </div>
                                                            <ul className="list-unstyled mb-0">
                                                                <li className="list-inline-item">
                                                                    <i className="mdi mdi-star text-warning"></i>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <i className="mdi mdi-star text-warning"></i>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <i className="mdi mdi-star text-warning"></i>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <i className="mdi mdi-star text-warning"></i>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <i className="mdi mdi-star text-warning"></i>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="mt-3">
                                                            <p className="text-muted font-italic p-3 bg-light rounded">
                                                                " Awesome product "
                                                            </p>
                                                        </div>
                                                    </li>

                                                    <li className="mt-4">
                                                        <div className="d-flex justify-content-between">
                                                            <div className="media align-items-center">
                                                                <Link className="pr-3" to="#">
                                                                    <img
                                                                        src={client2}
                                                                        className="img-fluid avatar avatar-md-sm rounded-circle shadow"
                                                                        alt="img"
                                                                    />
                                                                </Link>
                                                                <div className="commentor-detail">
                                                                    <h6 className="mb-0">
                                                                        <Link
                                                                            to="#"
                                                                            className="media-heading text-dark"
                                                                        >
                                                                            Tammy Camacho
                                                                        </Link>
                                                                    </h6>
                                                                    <small className="text-muted">
                                                                        15th August, 2019 at 05:44 pm
                                                                    </small>
                                                                </div>
                                                            </div>
                                                            <ul className="list-unstyled mb-0">
                                                                <li className="list-inline-item">
                                                                    <i className="mdi mdi-star text-warning"></i>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <i className="mdi mdi-star text-warning"></i>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <i className="mdi mdi-star text-warning"></i>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <i className="mdi mdi-star text-warning"></i>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <i className="mdi mdi-star-outline text-warning"></i>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="mt-3">
                                                            <p className="text-muted font-italic p-3 bg-light rounded mb-0">
                                                                " Good "
                                                            </p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </Col>

                                            <Col lg={6} className="mt-4 mt-lg-0 pt-2 pt-lg-0">
                                                <form className="ml-lg-4">
                                                    <Row>
                                                        <Col xs={12}>
                                                            <h5>Add your review:</h5>
                                                        </Col>
                                                        <Col xs={12} className="mt-4">
                                                            <h6 className="small font-weight-bold">
                                                                Your Rating:
                                                            </h6>
                                                            <Link to="#" className="d-inline-block mr-3">
                                                                <ul className="list-unstyled mb-0 small">
                                                                    <li className="list-inline-item">
                                                                        <i className="mdi mdi-star text-warning"></i>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <i className="mdi mdi-star-outline text-warning"></i>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <i className="mdi mdi-star-outline text-warning"></i>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <i className="mdi mdi-star-outline text-warning"></i>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <i className="mdi mdi-star-outline text-warning"></i>
                                                                    </li>
                                                                </ul>
                                                            </Link>

                                                            <Link to="#" className="d-inline-block mr-3">
                                                                <ul className="list-unstyled mb-0 small">
                                                                    <li className="list-inline-item">
                                                                        <i className="mdi mdi-star text-warning"></i>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <i className="mdi mdi-star text-warning"></i>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <i className="mdi mdi-star-outline text-warning"></i>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <i className="mdi mdi-star-outline text-warning"></i>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <i className="mdi mdi-star-outline text-warning"></i>
                                                                    </li>
                                                                </ul>
                                                            </Link>

                                                            <Link to="#" className="d-inline-block mr-3">
                                                                <ul className="list-unstyled mb-0 small">
                                                                    <li className="list-inline-item">
                                                                        <i className="mdi mdi-star text-warning"></i>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <i className="mdi mdi-star text-warning"></i>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <i className="mdi mdi-star text-warning"></i>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <i className="mdi mdi-star-outline text-warning"></i>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <i className="mdi mdi-star-outline text-warning"></i>
                                                                    </li>
                                                                </ul>
                                                            </Link>

                                                            <Link to="#" className="d-inline-block mr-3">
                                                                <ul className="list-unstyled mb-0 small">
                                                                    <li className="list-inline-item">
                                                                        <i className="mdi mdi-star text-warning"></i>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <i className="mdi mdi-star text-warning"></i>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <i className="mdi mdi-star text-warning"></i>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <i className="mdi mdi-star text-warning"></i>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <i className="mdi mdi-star-outline text-warning"></i>
                                                                    </li>
                                                                </ul>
                                                            </Link>

                                                            <Link to="#" className="d-inline-block">
                                                                <ul className="list-unstyled mb-0 small">
                                                                    <li className="list-inline-item">
                                                                        <i className="mdi mdi-star text-warning"></i>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <i className="mdi mdi-star text-warning"></i>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <i className="mdi mdi-star text-warning"></i>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <i className="mdi mdi-star text-warning"></i>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <i className="mdi mdi-star text-warning"></i>
                                                                    </li>
                                                                </ul>
                                                            </Link>
                                                        </Col>
                                                        <Col md={12} className="mt-3">
                                                            <FormGroup>
                                                                <Label>Your Review:</Label>
                                                                <div className="position-relative">
                                                                    <FeatherIcon
                                                                        icon="message-circle"
                                                                        className="fea icon-sm icons"
                                                                    />
                                                                    <textarea
                                                                        id="message"
                                                                        placeholder="Your Comment"
                                                                        rows="5"
                                                                        name="message"
                                                                        className="form-control pl-5"
                                                                        required=""
                                                                    ></textarea>
                                                                </div>
                                                            </FormGroup>
                                                        </Col>

                                                        <div className="col-lg-6">
                                                            <FormGroup>
                                                                <label>
                                                                    Name <span className="text-danger">*</span>
                                                                </label>
                                                                <div className="position-relative">
                                                                    <i
                                                                        data-feather="user"
                                                                        className="fea icon-sm icons"
                                                                    ></i>
                                                                    <input
                                                                        id="name"
                                                                        name="name"
                                                                        type="text"
                                                                        placeholder="Name"
                                                                        className="form-control pl-5"
                                                                        required=""
                                                                    />
                                                                </div>
                                                            </FormGroup>
                                                        </div>

                                                        <Col lg={6}>
                                                            <FormGroup>
                                                                <label>
                                                                    Your Email{" "}
                                                                    <span className="text-danger">*</span>
                                                                </label>
                                                                <div className="position-relative">
                                                                    <i
                                                                        data-feather="mail"
                                                                        className="fea icon-sm icons"
                                                                    ></i>
                                                                    <input
                                                                        id="email"
                                                                        type="email"
                                                                        placeholder="Email"
                                                                        name="email"
                                                                        className="form-control pl-5"
                                                                        required=""
                                                                    />
                                                                </div>
                                                            </FormGroup>
                                                        </Col>

                                                        <Col md={12}>
                                                            <div className="send">
                                                                <button
                                                                    type="submit"
                                                                    className="btn btn-primary"
                                                                >
                                                                    {send}
                                                                </button>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </form>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane className="card border-0 fade show" tabId="4">

                                        <ListGroup>
                                            {
                                                this.state.branch?.warehouses?.map(item => (
                                                    <ListGroupItem key={item.id}
                                                                   className={"d-flex justify-content-between"}>
                                                <span style={{fontSize: "20px", fontStyle: "bold"}}>
                                                    {item.warehouseName}
                                                </span>
                                                        <span className={"mr-4 text-muted"} style={{fontSize: "18px"}}>
                                                    {item.quantity > 5 ? "5+" : item.quantity}
                                                </span>
                                                    </ListGroupItem>
                                                ))
                                            }
                                        </ListGroup>

                                    </TabPane>
                                </TabContent>
                            </Col>
                        </Row>
                    </Container>
                    {this.state.products?.length > 0 &&
                        <Container className="mt-100 mt-60">
                            <Row>
                                <Col xs={12}>
                                    <h5 className="mb-0">{relatedPro}</h5>
                                </Col>

                                <Col xs={12} className="mt-4">
                                    <Slider {...settings2} className="owl-carousel owl-theme">
                                        {this.state.products?.map((product, key) => (
                                            <div key={key} style={{marginLeft: 5, marginRight: 5}}>
                                                <Card
                                                    className="shop-list border-0 position-relative overflow-hidden m-2">
                                                    <div
                                                        className="shop-image position-relative overflow-hidden rounded shadow">
                                                        <Link to={"/shop-product-detail/" + product.id}>
                                                            <img
                                                                src={imgUrl + product.imageUrl}
                                                                className="img-fluid"
                                                                alt="Landrick"
                                                            />
                                                        </Link>
                                                        <ul className="list-unstyled shop-icons">

                                                            <li className="mt-2">
                                                                <Link
                                                                    to={"/shop-product-detail/" + product.id}
                                                                    className="btn btn-icon btn-pills btn-soft-primary"
                                                                >
                                                                    <i>
                                                                        <FeatherIcon icon="eye" className="icons"/>
                                                                    </i>
                                                                </Link>
                                                            </li>
                                                            <li className="mt-2">
                                                                <Link
                                                                    to="shop-cart"
                                                                    className="btn btn-icon btn-pills btn-soft-warning"
                                                                >
                                                                    <i>
                                                                        <FeatherIcon
                                                                            icon="shopping-cart"
                                                                            className="icons"
                                                                        />
                                                                    </i>
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <CardBody className="content pt-4 p-2">
                                                        <Link
                                                            to={"/shop-product-detail/" + product.id}
                                                            className="text-dark product-name h6"
                                                        >
                                                            {product.name}
                                                        </Link>
                                                        <div className="d-flex justify-content-between mt-1">
                                                            <h6 className="text-muted small font-italic mb-0 mt-1">
                                                                ${product.price}{" "}
                                                                {product.oldPrice ? (
                                                                    <del className="text-danger ml-2">
                                                                        ${product.oldPrice}
                                                                    </del>
                                                                ) : null}
                                                                {product.desc ? (
                                                                    <span className="text-success ml-1">
                                  {product.desc}
                                </span>
                                                                ) : null}
                                                            </h6>
                                                            <ul className="list-unstyled text-warning mb-0">
                                                                <ReactStars
                                                                    count={product.rate}
                                                                    edit={false}
                                                                    size={23}
                                                                    color1={"#f17425"}
                                                                />
                                                            </ul>
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            </div>
                                        ))}
                                    </Slider>
                                </Col>
                            </Row>
                        </Container>}
                </section>
            </React.Fragment>
        );
    }
}

const mstp = state => state;

export default connect(mstp, null)(ShopProductDetail);

