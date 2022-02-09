import React, {Component} from "react";
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Input,
    Button,
} from "reactstrap";
import Pagination from "rc-pagination"

//Import components
import PageBreadcrumb from "../../../components/Shared/PageBreadcrumb";
import ProductGrid from "../../../components/Shared/ProductGrid";
import {getProducts} from "../../../server/config/web-site/product";
import {connect} from "react-redux";

class ShopProducts extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props)

        this.state = {
            pathItems: [
                //id must required
                {id: 1, name: this.props.lang.lang.index, link: "/"},
                {id: 3, name: this.props.lang.lang.products},
            ],
            current: 1,
            total: 0,
            pageSize: 15,
            products: [],

        };
    }


    onPaginationChange = (e) => {
        // console.log(e)
        this.setState({current: e}, ()=>this.getList())

    }

    onSortChange = (e) => {
        e.preventDefault();
        // console.log(e.target.value)
        this.props?.props?.history?.push({
            pathname: "/products",
            search: `${'?sort=' + e.target.value}`,
            state: {
                sort: `${e.target.value}`
            }
        })
    }

    getList = () => {

        getProducts(this.props.props.location.search.substring(6), this.props.props.location?.state?.search, 0, 4).then((res) => {
            this.setState({
                products: res.data.content,
                totalPage: res.data.totalItems
            })
        }).catch(err => {

        })

    }


    componentDidMount() {
        this.getList();
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
        const {
            from,
            to,
            filter,
            sortByPrice,
            latest,
            oldest,
            categories,
            products,
            rate,
            asc,
            desc,
            select
        } = this.props.lang.lang
        const {history, location, search, state} = this.props

        console.log(this.props)

        return (
            <React.Fragment>
                {/* breadcrumb */}
                <PageBreadcrumb key={10000} title={products} pathItems={this.state.pathItems}/>
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
                            {/*<Col lg={3} md={4} xs={12}>*/}
                            {/*    <Card className="border-0 sidebar sticky-bar">*/}
                            {/*        <CardBody className="p-0">*/}
                            {/*            <div className="widget">*/}
                            {/*                <div id="search2" className="widget-search mb-0">*/}
                            {/*                    <Form*/}
                            {/*                        role="search"*/}
                            {/*                        method="get"*/}
                            {/*                        id="searchform"*/}
                            {/*                        className="searchform"*/}
                            {/*                    >*/}
                            {/*                        <div>*/}
                            {/*                            <Input*/}
                            {/*                                type="text"*/}
                            {/*                                className="border rounded"*/}
                            {/*                                name="s"*/}
                            {/*                                id="s"*/}
                            {/*                                placeholder="Search Keywords..."*/}
                            {/*                            />*/}
                            {/*                            <Input*/}
                            {/*                                type="submit"*/}
                            {/*                                id="searchsubmit"*/}
                            {/*                                value="Search"*/}
                            {/*                            />*/}
                            {/*                            /!* <FeatherIcon icon="search" /> *!/*/}
                            {/*                        </div>*/}
                            {/*                    </Form>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}

                            {/*            <div className="widget mt-4 pt-2">*/}
                            {/*                <h4 className="widget-title">Catagories</h4>*/}
                            {/*                <ul className="list-unstyled mt-4 mb-0 blog-categories">*/}
                            {/*                    <li>*/}
                            {/*                        <Link to="#">Men</Link>*/}
                            {/*                    </li>*/}
                            {/*                    <li>*/}
                            {/*                        <Link to="#">Women</Link>*/}
                            {/*                    </li>*/}
                            {/*                    <li>*/}
                            {/*                        <Link to="#">Electronics</Link>*/}
                            {/*                    </li>*/}
                            {/*                    <li>*/}
                            {/*                        <Link to="#">Jewellery</Link>*/}
                            {/*                    </li>*/}
                            {/*                    <li>*/}
                            {/*                        <Link to="#">Shoes</Link>*/}
                            {/*                    </li>*/}
                            {/*                    <li>*/}
                            {/*                        <Link to="#">Kid’s Wear</Link>*/}
                            {/*                    </li>*/}
                            {/*                    <li>*/}
                            {/*                        <Link to="#">Sports</Link>*/}
                            {/*                    </li>*/}
                            {/*                    <li>*/}
                            {/*                        <Link to="#">Toys</Link>*/}
                            {/*                    </li>*/}
                            {/*                    <li>*/}
                            {/*                        <Link to="#">Gift Corners</Link>*/}
                            {/*                    </li>*/}
                            {/*                </ul>*/}
                            {/*            </div>*/}

                            {/*            <div className="widget mt-4 pt-2">*/}
                            {/*                <h4 className="widget-title">Color</h4>*/}
                            {/*                <ul className="list-unstyled mt-4 mb-0">*/}
                            {/*                    <li className="list-inline-item">*/}
                            {/*                        <Link*/}
                            {/*                            to="#"*/}
                            {/*                            className="px-3 py-1 rounded-pill bg-primary"*/}
                            {/*                        ></Link>*/}
                            {/*                    </li>*/}
                            {/*                    <li className="list-inline-item">*/}
                            {/*                        <Link*/}
                            {/*                            to="#"*/}
                            {/*                            className="px-3 py-1 rounded-pill bg-danger ml-1"*/}
                            {/*                        ></Link>*/}
                            {/*                    </li>*/}
                            {/*                    <li className="list-inline-item">*/}
                            {/*                        <Link*/}
                            {/*                            to="#"*/}
                            {/*                            className="px-3 py-1 rounded-pill bg-success ml-1"*/}
                            {/*                        ></Link>*/}
                            {/*                    </li>*/}
                            {/*                    <li className="list-inline-item">*/}
                            {/*                        <Link*/}
                            {/*                            to="#"*/}
                            {/*                            className="px-3 py-1 rounded-pill bg-info ml-1"*/}
                            {/*                        ></Link>*/}
                            {/*                    </li>*/}
                            {/*                    <li className="list-inline-item">*/}
                            {/*                        <Link*/}
                            {/*                            to="#"*/}
                            {/*                            className="px-3 py-1 rounded-pill bg-secondary ml-1"*/}
                            {/*                        ></Link>*/}
                            {/*                    </li>*/}
                            {/*                    <li className="list-inline-item">*/}
                            {/*                        <Link*/}
                            {/*                            to="#"*/}
                            {/*                            className="px-3 py-1 rounded-pill bg-warning ml-1"*/}
                            {/*                        ></Link>*/}
                            {/*                    </li>*/}
                            {/*                </ul>*/}
                            {/*            </div>*/}

                            {/*            <div className="widget mt-4 pt-2">*/}
                            {/*                <h4 className="widget-title">Top Products</h4>*/}
                            {/*                <ul className="list-unstyled mt-4 mb-0">*/}
                            {/*                    {this.state.topProducts.map((product, key) => (*/}
                            {/*                        <li*/}
                            {/*                            key={key}*/}
                            {/*                            className={*/}
                            {/*                                key + 1 === 1*/}
                            {/*                                    ? "media align-items-center"*/}
                            {/*                                    : "media align-items-center mt-2"*/}
                            {/*                            }*/}
                            {/*                        >*/}
                            {/*                            <Link*/}
                            {/*                                to={"/"}>*/}
                            {/*                                <img*/}
                            {/*                                    src={product.image}*/}
                            {/*                                    className="img-fluid avatar avatar-small rounded shadow"*/}
                            {/*                                    style={{height: "auto"}}*/}
                            {/*                                    alt="Landrick"*/}
                            {/*                                />*/}
                            {/*                            </Link>*/}
                            {/*                            <div className="content ml-3">*/}
                            {/*                                <Link to="#" className="text-dark h6">*/}
                            {/*                                    {product.name}*/}
                            {/*                                </Link>*/}
                            {/*                                <h6 className="text-muted small font-italic mb-0 mt-1">*/}
                            {/*                                    {product.NewPrice}{" "}*/}
                            {/*                                    <del className="text-danger ml-2">*/}
                            {/*                                        {product.oldPrice}*/}
                            {/*                                    </del>*/}
                            {/*                                    {" "}*/}
                            {/*                                </h6>*/}
                            {/*                            </div>*/}
                            {/*                        </li>*/}
                            {/*                    ))}*/}
                            {/*                </ul>*/}
                            {/*            </div>*/}
                            {/*        </CardBody>*/}
                            {/*    </Card>*/}
                            {/*</Col>*/}
                            <Col lg={3} md={4} xs={12}>
                                <div className="sidebar sticky-bar p-4 rounded shadow">
                                    <div className="widget mb-4 pb-4 border-bottom">
                                        <h4 className="widget-title">{sortByPrice}</h4>

                                        <div id="jobkeywords" className="widget-search mt-4 mb-0">
                                            <Form
                                                role="search"
                                                method="get"
                                                id="searchform"
                                                // className="searchform"
                                            >
                                                <div>
                                                    <Input
                                                        type="number"
                                                        className="border rounded"
                                                        name="s"
                                                        id="s"
                                                        placeholder={from + "..."}
                                                    />
                                                </div>
                                                <div className={"mt-2"}>
                                                    <Input
                                                        type="number"
                                                        className="border rounded"
                                                        name="s"
                                                        id="s"
                                                        placeholder={to + "..."}

                                                    />
                                                </div>
                                                <div className={"mt-2"}>
                                                    <Button
                                                        type="button"
                                                        className="border btn btn-primary d-block w-100 rounded"
                                                        name="s"
                                                        id="s"
                                                    >{filter}</Button>
                                                </div>

                                            </Form>
                                        </div>
                                    </div>

                                    {/*<div className="widget mb-4 pb-4 border-bottom">*/}
                                    {/*  <h4 className="widget-title">Catagories</h4>*/}
                                    {/*  <FormGroup className="mt-4 mb-0">*/}
                                    {/*    <select*/}
                                    {/*        className="form-control custom-select"*/}
                                    {/*        id="job-catagories"*/}
                                    {/*    >*/}
                                    {/*      <option>All Jobs</option>*/}
                                    {/*      <option>Digital & Creative</option>*/}
                                    {/*      <option>Accountancy</option>*/}
                                    {/*      <option>Banking</option>*/}
                                    {/*      <option>IT Contractor</option>*/}
                                    {/*      <option>Graduate</option>*/}
                                    {/*      <option>Estate Agency</option>*/}
                                    {/*    </select>*/}
                                    {/*  </FormGroup>*/}
                                    {/*</div>*/}

                                    {/*<div className="widget mb-4 pb-4 border-bottom">*/}
                                    {/*  <h4 className="widget-title">Date Posted</h4>*/}
                                    {/*  <div className="mt-4">*/}
                                    {/*    <div className="custom-control custom-radio">*/}
                                    {/*      <FormGroup className="mb-2">*/}
                                    {/*        <Input*/}
                                    {/*            type="radio"*/}
                                    {/*            id="lasthour"*/}
                                    {/*            name="customRadio"*/}
                                    {/*            className="custom-control-input"*/}
                                    {/*        />*/}
                                    {/*        <Label*/}
                                    {/*            className="custom-control-label"*/}
                                    {/*            htmlFor="lasthour"*/}
                                    {/*        >*/}
                                    {/*          Last Hour*/}
                                    {/*        </Label>*/}
                                    {/*      </FormGroup>*/}
                                    {/*    </div>*/}

                                    {/*    <div className="custom-control custom-radio">*/}
                                    {/*      <FormGroup className="mb-2">*/}
                                    {/*        <Input*/}
                                    {/*            type="radio"*/}
                                    {/*            id="oneday"*/}
                                    {/*            name="customRadio"*/}
                                    {/*            className="custom-control-input"*/}
                                    {/*        />*/}
                                    {/*        <Label*/}
                                    {/*            className="custom-control-label"*/}
                                    {/*            htmlFor="oneday"*/}
                                    {/*        >*/}
                                    {/*          Last 24 hours*/}
                                    {/*        </Label>*/}
                                    {/*      </FormGroup>*/}
                                    {/*    </div>*/}

                                    {/*    <div className="custom-control custom-radio">*/}
                                    {/*      <FormGroup className="mb-2">*/}
                                    {/*        <Input*/}
                                    {/*            type="radio"*/}
                                    {/*            id="sevenday"*/}
                                    {/*            name="customRadio"*/}
                                    {/*            className="custom-control-input"*/}
                                    {/*        />*/}
                                    {/*        <Label*/}
                                    {/*            className="custom-control-label"*/}
                                    {/*            htmlFor="sevenday"*/}
                                    {/*        >*/}
                                    {/*          Last 7 days*/}
                                    {/*        </Label>*/}
                                    {/*      </FormGroup>*/}
                                    {/*    </div>*/}

                                    {/*    <div className="custom-control custom-radio">*/}
                                    {/*      <FormGroup className="mb-2">*/}
                                    {/*        <Input*/}
                                    {/*            type="radio"*/}
                                    {/*            id="fourteenday"*/}
                                    {/*            name="customRadio"*/}
                                    {/*            className="custom-control-input"*/}
                                    {/*        />*/}
                                    {/*        <Label*/}
                                    {/*            className="custom-control-label"*/}
                                    {/*            htmlFor="fourteenday"*/}
                                    {/*        >*/}
                                    {/*          Last 14 days*/}
                                    {/*        </Label>*/}
                                    {/*      </FormGroup>*/}
                                    {/*    </div>*/}

                                    {/*    <div className="custom-control custom-radio">*/}
                                    {/*      <FormGroup className="mb-0">*/}
                                    {/*        <Input*/}
                                    {/*            type="radio"*/}
                                    {/*            id="onemonth"*/}
                                    {/*            name="customRadio"*/}
                                    {/*            className="custom-control-input"*/}
                                    {/*        />*/}
                                    {/*        <Label*/}
                                    {/*            className="custom-control-label"*/}
                                    {/*            htmlFor="onemonth"*/}
                                    {/*        >*/}
                                    {/*          Last 30 days*/}
                                    {/*        </Label>*/}
                                    {/*      </FormGroup>*/}
                                    {/*    </div>*/}
                                    {/*  </div>*/}
                                    {/*</div>*/}

                                    {/*<div className="widget mb-4 pb-4 border-bottom">*/}
                                    {/*  <h4 className="widget-title">Job Type</h4>*/}
                                    {/*  <div className="mt-4">*/}
                                    {/*    <FormGroup className="mb-2">*/}
                                    {/*      <div className="custom-control custom-checkbox">*/}
                                    {/*        <Input*/}
                                    {/*            type="checkbox"*/}
                                    {/*            className="custom-control-input"*/}
                                    {/*            id="contract"*/}
                                    {/*        />*/}
                                    {/*        <Label*/}
                                    {/*            className="custom-control-label"*/}
                                    {/*            htmlFor="contract"*/}
                                    {/*        >*/}
                                    {/*          Contract Base*/}
                                    {/*        </Label>*/}
                                    {/*      </div>*/}
                                    {/*    </FormGroup>*/}

                                    {/*    <FormGroup className="mb-2">*/}
                                    {/*      <div className="custom-control custom-checkbox">*/}
                                    {/*        <Input*/}
                                    {/*            type="checkbox"*/}
                                    {/*            className="custom-control-input"*/}
                                    {/*            id="freelancer"*/}
                                    {/*        />*/}
                                    {/*        <Label*/}
                                    {/*            className="custom-control-label"*/}
                                    {/*            htmlFor="freelancer"*/}
                                    {/*        >*/}
                                    {/*          Freelancer*/}
                                    {/*        </Label>*/}
                                    {/*      </div>*/}
                                    {/*    </FormGroup>*/}

                                    {/*    <FormGroup className="mb-2">*/}
                                    {/*      <div className="custom-control custom-checkbox">*/}
                                    {/*        <Input*/}
                                    {/*            type="checkbox"*/}
                                    {/*            className="custom-control-input"*/}
                                    {/*            id="fulltime"*/}
                                    {/*        />*/}
                                    {/*        <Label*/}
                                    {/*            className="custom-control-label"*/}
                                    {/*            htmlFor="fulltime"*/}
                                    {/*        >*/}
                                    {/*          Full Time*/}
                                    {/*        </Label>*/}
                                    {/*      </div>*/}
                                    {/*    </FormGroup>*/}

                                    {/*    <FormGroup className="mb-2">*/}
                                    {/*      <div className="custom-control custom-checkbox">*/}
                                    {/*        <Input*/}
                                    {/*            type="checkbox"*/}
                                    {/*            className="custom-control-input"*/}
                                    {/*            id="parttime"*/}
                                    {/*        />*/}
                                    {/*        <Label*/}
                                    {/*            className="custom-control-label"*/}
                                    {/*            htmlFor="parttime"*/}
                                    {/*        >*/}
                                    {/*          Part Time*/}
                                    {/*        </Label>*/}
                                    {/*      </div>*/}
                                    {/*    </FormGroup>*/}

                                    {/*    <FormGroup className="mb-2">*/}
                                    {/*      <div className="custom-control custom-checkbox">*/}
                                    {/*        <Input*/}
                                    {/*            type="checkbox"*/}
                                    {/*            className="custom-control-input"*/}
                                    {/*            id="remote"*/}
                                    {/*        />*/}
                                    {/*        <Label*/}
                                    {/*            className="custom-control-label"*/}
                                    {/*            htmlFor="remote"*/}
                                    {/*        >*/}
                                    {/*          Remote*/}
                                    {/*        </Label>*/}
                                    {/*      </div>*/}
                                    {/*    </FormGroup>*/}

                                    {/*    <FormGroup className="mb-0">*/}
                                    {/*      <div className="custom-control custom-checkbox">*/}
                                    {/*        <Input*/}
                                    {/*            type="checkbox"*/}
                                    {/*            className="custom-control-input"*/}
                                    {/*            id="intership"*/}
                                    {/*        />*/}
                                    {/*        <Label*/}
                                    {/*            className="custom-control-label"*/}
                                    {/*            htmlFor="intership"*/}
                                    {/*        >*/}
                                    {/*          Intership*/}
                                    {/*        </Label>*/}
                                    {/*      </div>*/}
                                    {/*    </FormGroup>*/}
                                    {/*  </div>*/}
                                    {/*</div>*/}

                                    {/*<div className="widget">*/}
                                    {/*  <h4 className="widget-title">Experience</h4>*/}
                                    {/*  <div className="mt-4">*/}
                                    {/*    <div className="custom-control custom-radio">*/}
                                    {/*      <FormGroup className="mb-2">*/}
                                    {/*        <Input*/}
                                    {/*            type="radio"*/}
                                    {/*            id="freshers"*/}
                                    {/*            name="customRadio"*/}
                                    {/*            className="custom-control-input"*/}
                                    {/*        />*/}
                                    {/*        <Label*/}
                                    {/*            className="custom-control-label"*/}
                                    {/*            htmlFor="freshers"*/}
                                    {/*        >*/}
                                    {/*          Fresher*/}
                                    {/*        </Label>*/}
                                    {/*      </FormGroup>*/}
                                    {/*    </div>*/}

                                    {/*    <div className="custom-control custom-radio">*/}
                                    {/*      <FormGroup className="mb-2">*/}
                                    {/*        <Input*/}
                                    {/*            type="radio"*/}
                                    {/*            id="oneyearex"*/}
                                    {/*            name="customRadio"*/}
                                    {/*            className="custom-control-input"*/}
                                    {/*        />*/}
                                    {/*        <Label*/}
                                    {/*            className="custom-control-label"*/}
                                    {/*            htmlFor="oneyearex"*/}
                                    {/*        >*/}
                                    {/*          +1 Year*/}
                                    {/*        </Label>*/}
                                    {/*      </FormGroup>*/}
                                    {/*    </div>*/}

                                    {/*    <div className="custom-control custom-radio">*/}
                                    {/*      <FormGroup className="mb-2">*/}
                                    {/*        <Input*/}
                                    {/*            type="radio"*/}
                                    {/*            id="twoyearex"*/}
                                    {/*            name="customRadio"*/}
                                    {/*            className="custom-control-input"*/}
                                    {/*        />*/}
                                    {/*        <Label*/}
                                    {/*            className="custom-control-label"*/}
                                    {/*            htmlFor="twoyearex"*/}
                                    {/*        >*/}
                                    {/*          +2 Year*/}
                                    {/*        </Label>*/}
                                    {/*      </FormGroup>*/}
                                    {/*    </div>*/}

                                    {/*    <div className="custom-control custom-radio">*/}
                                    {/*      <FormGroup className="mb-2">*/}
                                    {/*        <Input*/}
                                    {/*            type="radio"*/}
                                    {/*            id="threeyearex"*/}
                                    {/*            name="customRadio"*/}
                                    {/*            className="custom-control-input"*/}
                                    {/*        />*/}
                                    {/*        <Label*/}
                                    {/*            className="custom-control-label"*/}
                                    {/*            htmlFor="threeyearex"*/}
                                    {/*        >*/}
                                    {/*          +3 Year*/}
                                    {/*        </Label>*/}
                                    {/*      </FormGroup>*/}
                                    {/*    </div>*/}

                                    {/*    <div className="custom-control custom-radio">*/}
                                    {/*      <FormGroup className="mb-0">*/}
                                    {/*        <Input*/}
                                    {/*            type="radio"*/}
                                    {/*            id="fiveyearex"*/}
                                    {/*            name="customRadio"*/}
                                    {/*            className="custom-control-input"*/}
                                    {/*        />*/}
                                    {/*        <Label*/}
                                    {/*            className="custom-control-label"*/}
                                    {/*            htmlFor="fiveyearex"*/}
                                    {/*        >*/}
                                    {/*          +5 Year*/}
                                    {/*        </Label>*/}
                                    {/*      </FormGroup>*/}
                                    {/*    </div>*/}
                                    {/*  </div>*/}
                                    {/*</div>*/}

                                </div>
                            </Col>

                            <Col lg={9} md={8} xs={12} className="mt-5 pt-2 mt-sm-0 pt-sm-0">
                                <Row className="align-items-center">
                                    <Col lg={8} md={7}>
                                        <div className="section-title">
                                            <h5 className="mb-0">{this.state.total}{" " + from + " "}{(this.state.current - 1) * (this.state.pageSize) + 1}–{(this.state.current - 1) * (this.state.pageSize) + this.state.products.length} </h5>
                                        </div>
                                    </Col>

                                    <Col lg={4} md={5} className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                                        <div className="d-flex justify-content-md-between align-items-center">
                                            <div className="form custom-form">
                                                <FormGroup className=" mb-0">
                                                    <select
                                                        className="form-control custom-select"
                                                        id="Sortbylist-job"
                                                        onChange={this.onSortChange}
                                                        defaultValue={this.state.sort}
                                                    >

                                                        <option value={"LATEST"}>{latest}</option>
                                                        <option value={"RATE"}>{rate}</option>
                                                        <option value={"ASC"}>{asc}</option>
                                                        <option value={"DESC"}>{desc}</option>

                                                    </select>
                                                </FormGroup>
                                            </div>

                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    {this.state.products.map((product, key) => (
                                        <ProductGrid product={product} col={4}/>
                                    ))}

                                    <Col xs="12" className={"mt-4 pt-2 justify-items-center text-center"}>
                                        <Pagination
                                            hideOnSinglePage={true}
                                            current={this.state.current}
                                            pageSize={this.state.pageSize}
                                            total={this.state.total}
                                            onChange={this.onPaginationChange}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        );
    }
}
const mstp = (state) => state
export default connect(mstp, null)(ShopProducts);
