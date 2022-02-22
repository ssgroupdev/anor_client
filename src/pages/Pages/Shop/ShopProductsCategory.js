import React, {Component} from "react";
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup, Button,
    Input
} from "reactstrap";
import Pagination from "rc-pagination"

//Import components
import PageBreadcrumb from "../../../components/Shared/PageBreadcrumb";

import ProductGrid from "../../../components/Shared/ProductGrid";
import {connect} from "react-redux";
import {getCategoriesByMenu, getCategoryProducts} from "../../../server/config/web-site/client";

class ShopProducts extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props)

        this.state = {
            id: props?.props?.match?.params?.id || 2,
            parentId: 2,
            pathItems: [
                //id must required
                {id: 1, name: props.lang.lang.index, link: "/"},
            ],
            current: 1,
            total: 0,
            pageSize: 15,
            products: [],
            topProducts: [],
            isHaveChild: true,
            subCategories: [],
            sort: new URLSearchParams(props?.props?.location?.search).get("sort") || "LATEST",
            minPrice: new URLSearchParams(props.props.location.search).get("minPrice"),
            maxPrice: new URLSearchParams(props.props.location.search).get("maxPrice")

        };
    }


    onPaginationChange = (e) => {
        // console.log(e)
        this.setState({current: e}, () => this.getList())

    }


    getList = () => {

        getCategoryProducts(this.state.id, this.state.sort, this.state.current - 1, this.state.pageSize, this.state.minPrice!=null?this.state.minPrice:0, this.state.maxPrice!=null?this.state.maxPrice:0).then((res) => {
            this.setState({
                    products: res.data.products.content,
                    name: res.data.name,
                    subCategories: res.data.nestedChild
                    , totalPage: res.data.products.totalItems
                }, () => {
                    if (res.data.parent !== null) {
                        this.setState({
                            pathItems: [...(this.state.pathItems.slice(0, 1)),
                                {
                                    id: 2,
                                    name: res.data.parent.name,
                                    link: "/category-products/" + res.data.parent.id
                                }, {
                                    name: res.data.name,
                                    id: 3
                                }]

                        })
                    } else {
                        this.setState({
                            pathItems: [...(this.state.pathItems.slice(0, 1)),
                                {
                                    name: res.data.name,
                                    id: 3
                                }]

                        })
                    }
                }
            )
        }).catch(err => {

        })

    }

    onSortChange = (e) => {
        e.preventDefault();

        this.props?.props?.history?.push({
            pathname: "/category-products/"+this.state.id,
            search: `${'?sort=' + e.target.value + `&minPrice=${this.state.minPrice}&maxPrice=${this.state.maxPrice}`}`,
            state: {
                sort: e.target.value,
                minPrice: this.state?.minPrice,
                maxPrice: this.state?.maxPrice,

            }
        })
        this.setState({
            sort: e.target.value
        }, () => this.getList())

    }
    onInputChange = () => {

        this.props?.props?.history?.push({
            pathname: "/category-products/"+this.state.id,
            search: `${'?sort=' + this.state?.sort + `&minPrice=${this.state.minPrice}&maxPrice=${this.state.maxPrice}`}`,
            state: {
                sort: this.state.sort,
                minPrice: this.state?.minPrice,
                maxPrice: this.state?.maxPrice,
            }
        })

    }
    handleCategory = e => {
        this.props?.props?.history?.push({
            pathname: "/category-products/" + e.target.value,
            search: `${'?sort=' + this.state?.sort + `&minPrice=${this.state.minPrice}&maxPrice=${this.state.maxPrice}`}`,
            state: {
                sort: "LATEST"
            }
        })
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.id !== this.props.props?.match?.params?.id) {
            this.setState({
                id: this.props.props.match.params.id
            }, () => {
                this.getList()
            })
        }
    }


    componentDidMount() {
        this.getList()
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
        const {history, location, search, state} = this.props
        const {
            from,
            to,
            filter,
            sortByPrice,
            latest,
            oldest,
            categories,
            rate,
            asc,
            desc,
            select
        } = this.props.lang.lang

        console.log(this.props)

        return (
            <React.Fragment>
                {/* breadcrumb */}
                <PageBreadcrumb key={10000} title={this.state.name} pathItems={this.state.pathItems}/>
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
                                                        defaultValue={this.state.minPrice}
                                                        onChange={(e) => {
                                                            this.setState({
                                                                minPrice: e.target.value
                                                            }, () => this.onInputChange())
                                                        }}
                                                        placeholder={from + "..."}
                                                    />
                                                </div>
                                                <div className={"mt-2"}>
                                                    <Input
                                                        type="number"
                                                        className="border rounded"
                                                        name="s"
                                                        id="s"
                                                        onChange={(e) => {
                                                            this.setState({
                                                                maxPrice: e.target.value
                                                            }, () => this.onInputChange())
                                                        }}
                                                        placeholder={to + "..."}
                                                        defaultValue={this.state.maxPrice>0?this.state.maxPrice:null}

                                                    />
                                                </div>
                                                <div className={"mt-2"}>
                                                    <Button
                                                        type="button"
                                                        className="border btn btn-primary d-block w-100 rounded"
                                                        name="s"
                                                        id="s"
                                                        onClick={this.getList}

                                                    >{filter}</Button>
                                                </div>

                                            </Form>
                                        </div>
                                    </div>

                                    {this.state.subCategories.length > 0 &&
                                        <div className="widget mb-4 pb-4 border-bottom">
                                            <h4 className="widget-title">{categories}</h4>
                                            <FormGroup className="mt-4 mb-0">
                                                <select
                                                    className="form-control custom-select"
                                                    id="job-catagories"
                                                    onChange={this.handleCategory}
                                                    defaultValue={"def"}
                                                >
                                                    <option value={"def"}>{select}</option>
                                                    {
                                                        this.state.subCategories.map((value, index) => (
                                                            <option value={value.id} key={index}>
                                                                {value.name}
                                                            </option>

                                                        ))
                                                    }

                                                </select>
                                            </FormGroup>
                                        </div>
                                    }
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
                                                        {/*<option value={"OLDEST"}>{oldest}</option>*/}
                                                        {/*<option value={"RATE"}>{rate}</option>*/}
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

const mstp = state => state

export default connect(mstp, null)(ShopProducts);

