import React, {Component} from "react";
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Input,
    Card,
    CardBody, Label, Button,
} from "reactstrap";
import {Link, Redirect} from "react-router-dom";
import Pagination from "rc-pagination"
//Import Icons
import FeatherIcon from "feather-icons-react";

//Import components
import PageBreadcrumb from "../../../components/Shared/PageBreadcrumb";

import ProductGrid from "../../../components/Shared/ProductGrid";
import {connect} from "react-redux";
import {getBranchId, getBranchProductByBranchId} from "../../../server/config/web-site/brand/branches";
import {getUser} from "../../../server/config/web-site/user";
import {deleteCookie} from "../../../utils/useCookies";
import {userAccessTokenName} from "../../../constants/application";

class ShopProducts extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props)

        this.state = {
            id: props?.props?.match?.params?.id || null,

            pathItems: [
                //id must required
                {id: 1, name: props.lang.lang.index, link: "/"},
                {id: 2, name: props.lang.lang.stores, link: "/stores"},
            ],
            branch: {},
            current: 1,
            total: 20,
            pageSize: 15,
            products: [],
            sort: new URLSearchParams(props?.props?.location?.search).get("sort") || "LATEST",
            minPrice: new URLSearchParams(props.props.location.search).get("minPrice"),
            maxPrice: new URLSearchParams(props.props.location.search).get("maxPrice")

        };
    }

    onSortChange = (e) => {
        e.preventDefault();

        this.props?.props?.history?.push({
            pathname: "/stores/" + this.state.id + "/products",
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
            pathname: "/stores/" + this.state.id + "/products",
            search: `${'?sort=' + this.state?.sort + `&minPrice=${this.state.minPrice}&maxPrice=${this.state.maxPrice}`}`,
            state: {
                sort: this.state.sort,
                minPrice: this.state?.minPrice,
                maxPrice: this.state?.maxPrice,
            }
        })

    }

    onPaginationChange = (e) => {
        // console.log(e)
        this.setState({current: e},()=> this.getList())

    }

    getList = () => {
        getBranchProductByBranchId(this.state.id,  this.state.current - 1, this.state.pageSize,this.state.sort, this.state.minPrice != null ? this.state.minPrice : 0, this.state.maxPrice != null ? this.state.maxPrice : 0).then((res) => {
            this.setState({
                    products: res.data.content,
                    total: res.data.totalElements
                }
            )
        }).catch(err => {

        })

    }

    getBranch = () => {
        this.setState({
            id: this.props?.props?.match?.params?.id
        }, () => {

            getBranchId(this.state.id).then(res => {
                this.setState({
                        branch: res.data,
                        pathItems: [...(this.state.pathItems.slice(0, 2)),
                            {
                                name: res.data.name,
                                id: 3
                            }
                        ]
                    }
                )
            }).catch(err => {

            })
        })
    }

    componentDidMount() {
        this.getMe();

        this.getBranch();
        this.getList();
        window.addEventListener("scroll", this.scrollNavigation, true);

    }

    // Make sure to remove the DOM listener when the component is unmounted.
    componentWillUnmount() {
        window.removeEventListener("scroll", this.scrollNavigation, true);
    }

    getMe = () => {

        getUser().then(res => {
            if (res && res.data) {
                this.setState({
                    isLogin: true
                })
            } else {
                deleteCookie(userAccessTokenName)
                this.setState({
                    isLogin: false
                })
            }
        }).catch(err => {
            deleteCookie(userAccessTokenName)
            this.setState({
                isLogin: false
            })
        })

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

        return (
            <React.Fragment>
                {/* breadcrumb */}
                <PageBreadcrumb key={10000} title={this.state.branch?.name} pathItems={this.state.pathItems}/>
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
                                        <ProductGrid  isLogin={this.state.isLogin} product={product} col={4}/>
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

const mstp = state => state;

export default connect(mstp, null)(ShopProducts);

