import React, {Component} from "react";
import {Container, Row, Col, Table, Input} from "reactstrap";
import {Link} from "react-router-dom";

//Import components
import PageBreadcrumb from "../../../components/Shared/PageBreadcrumb";

//Import Images
import {connect} from "react-redux";
import {addProductToBaskets, deleteBasket, editBasket, getAllBaskets} from "../../../server/config/web-site/basket";
import {imgUrl} from "../../../server/host";
import {toast} from "react-toastify";
import {bindActionCreators} from "redux";
import {setBasketsItem} from "../../../redux/actions/lang";
import Price from "react-price";
import ReactPrice from "react-price";

class ShopCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            pathItems: [
                //id must required
                {id: 1, name: props.lang.lang.index, link: "/"},
                {id: 3, name: props.lang.lang.cart},
            ],
            items: [],
            cur: "UZS",
            "subTotal": 0,
            "taxes": 0,
            "total": 0
        };
        this.addItem.bind(this);
        this.calculationTotal.bind(this);
        this.removeItem.bind(this);
        this.removeCartItem.bind(this);
    }

    removeCartItem = (itemId) => {

        deleteBasket(itemId).then(res => {

            this.calculationTotal();

        }).catch(err => {

        })

    };

    addProductToBasket = (itemId, count = 1) => {

        const data = {branchProductId: itemId, count: count}

        addProductToBaskets(data).then(res => {
            this.calculationTotal();
        }).catch(err => {
        });

    }

    onLocateToOrder = () => {

        const list = this.state.items.map(item => item.id)
        let prices = 0;
        this.state.items.map((item) => {
            prices += item?.branchesProduct?.price?.price * item.count
        })

        this.props.setBasketsItem(list, prices);
        this.props?.props?.history.push("/shop-checkouts")

    }

    editProductToBasket = (id, itemId, count = 1) => {

        const data = {id: id, branchProductId: itemId, count: (count - 1) > 0 ? (count - 1) : 1}

        editBasket(data).then(res => {
            this.calculationTotal();
        }).catch(err => {
        });

    }


    addItem = (itemId) => {
        this.addProductToBasket(itemId);
    };

    calculationTotal = () => {

        getAllBaskets().then(res => {
            this.setState({
                items: res.data
            }, () => {
                let total = 0;
                this.state.items.map((item) => {
                    total += item?.branchesProduct?.price?.price * item.count
                })
                this.setState({subTotal: total});
                this.setState({total: total})

            })
        }).catch(err => {

        })

    }

    removeItem = (id, itemId, count) => {
        this.editProductToBasket(id, itemId, count);

    };

    getNotLoginCart = () => {
        this.setState({
            items: this.props?.basket?.basket
        })
    }

    componentDidMount() {
        if (this.props?.user?.user === null) {
            this.setState({isLogin: true}, this.getNotLoginCart())
        } else {
            this.calculationTotal();
        }
        window.addEventListener("scroll", this.scrollNavigation, true);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
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
            cart,
            cost,
            price,
            store,
            product,
            count1,
            total,
            shopMore,
            checkout,
            delivery,
            subTotal
        } = this.props.lang.lang;

        return (
            <React.Fragment>
                {/* breadcrumb */}
                <PageBreadcrumb
                    title={cart}
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
                        {window.innerWidth > 880 &&
                            <Row>
                                <Col xs={12}>
                                    <div className="table-responsive bg-white shadow">
                                        <Table className="table-center table-padding mb-0">
                                            <thead>
                                            <tr>
                                                <th className="py-3" style={{minWidth: "20px"}}></th>
                                                <th className="py-3" style={{minWidth: "300px"}}>
                                                    {product}
                                                </th>
                                                <th className="py-3" style={{minWidth: "150px"}}>
                                                    {store}
                                                </th>
                                                <th
                                                    className="text-center py-3"
                                                    style={{minWidth: "160px"}}
                                                >
                                                    {price}
                                                </th>
                                                <th
                                                    className="text-center py-3"
                                                    style={{minWidth: "160px"}}
                                                >
                                                    {count1}
                                                </th>
                                                <th
                                                    className="text-center py-3"
                                                    style={{minWidth: "160px"}}
                                                >
                                                    {total}
                                                </th>
                                            </tr>
                                            </thead>

                                            <tbody>
                                            {this.state.items.map((item, key) => (
                                                <tr key={key}>
                                                    <td className="h6">
                                                        <Link
                                                            to="#"
                                                            onClick={() => this.removeCartItem(item.id)}
                                                            className="text-danger"
                                                        >
                                                            X
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <img
                                                                src={imgUrl + item.imageUrl}
                                                                className="img-fluid avatar avatar-small rounded shadow"
                                                                style={{height: "auto"}}
                                                                alt=""
                                                            />
                                                            <h6 className="mb-0 ml-3">{item.productName}</h6>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 ml-3">{item?.branchesProduct?.name}</p>
                                                    </td>
                                                    <td className="text-center">{item?.branchesProduct?.price?.price}{" UZS"}</td>
                                                    <td className="text-center">
                                                        <Input
                                                            type="button"
                                                            value="-"
                                                            onClick={() => this.removeItem(item?.id, item.productId, item.count)}
                                                            className="minus btn btn-icon btn-soft-primary font-weight-bold"
                                                            readOnly
                                                        />
                                                        <Input
                                                            type="text"
                                                            step="1"
                                                            min="1"
                                                            name="quantity"
                                                            value={item.count}
                                                            title={count1}
                                                            readOnly
                                                            className="btn btn-icon btn-soft-primary font-weight-bold mr-1 ml-1"
                                                        />
                                                        <Input
                                                            type="button"
                                                            value="+"
                                                            onClick={() => this.addItem(item?.branchesProduct?.id)}
                                                            readOnly
                                                            className="plus btn btn-icon btn-soft-primary font-weight-bold"
                                                        />
                                                    </td>
                                                    <td className="text-center font-weight-bold">
                                                        {item?.branchesProduct?.price?.price * item.count}{" UZS"}
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                </Col>
                            </Row>
                        }
                        {
                            window.innerWidth <= 880 && <Row>
                                <Col sm={12} xs={12} lg={6} md={12}>
                                    {this.state.items.map((item, key) => (
                                        <Row key={key} className={"mx-1"}>
                                            <Col xs={2}>
                                                <div className="align-items-center">
                                                    <img
                                                        src={imgUrl + item.imageUrl}
                                                        className="img-fluid avatar avatar-small rounded shadow"
                                                        style={{height: "auto"}}
                                                        alt=""
                                                    />
                                                </div>
                                            </Col>
                                            <Col xs={10}>
                                                <Row>
                                                    <Col xs={12} className={"p-2"}>
                                                        <Row>
                                                            <Col xs={11}>
                                                                <p className="mb-0"
                                                                   style={{fontSize: "16px"}}>{item.productName}</p>
                                                            </Col>
                                                            <Col xs={1}>
                                                                <td className="h6">
                                                                    <Link
                                                                        to="#"
                                                                        onClick={() => this.removeCartItem(item.id)}
                                                                        className="text-danger"
                                                                    >
                                                                        X
                                                                    </Link>
                                                                </td>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col xs={12} className={"p-2"}>
                                                        <Row>
                                                            <Col xs={5}>
                                                                <p className="mb-0">{item?.branchesProduct?.name}</p>
                                                            </Col>
                                                            <Col xs={1}></Col>
                                                            <Col xs={6} className={"align-items-end justify-content-end text-right"}>
                                                                <Price cost={item?.branchesProduct?.price?.price}
                                                                       currency={this.props.lang.lang.sum}/>

                                                            </Col>
                                                            <Col xs={7} className={"mt-2"}>
                                                                <Input
                                                                    style={{fontSize: "16px"}}
                                                                    type="button"
                                                                    value="-"

                                                                    onClick={() => this.removeItem(item?.id, item.productId, item.count)}
                                                                    className="minus btn btn-icon btn-soft-primary font-weight-bold"
                                                                    readOnly
                                                                />
                                                                <Input
                                                                    style={{fontSize: "16px"}}
                                                                    type="text"
                                                                    step="1"
                                                                    min="1"
                                                                    name="quantity"
                                                                    value={item.count}
                                                                    title={count1}
                                                                    readOnly
                                                                    className="btn btn-icon btn-soft-primary font-weight-bold mr-1 ml-1"
                                                                />
                                                                <Input
                                                                    style={{fontSize: "16px"}}
                                                                    type="button"
                                                                    value="+"
                                                                    onClick={() => this.addItem(item?.branchesProduct?.id)}
                                                                    readOnly
                                                                    className="plus btn btn-icon btn-soft-primary font-weight-bold"
                                                                    width={"10px"}
                                                                />
                                                            </Col>
                                                            <Col xs={5}
                                                                 className={"align-items-center justify-content-center mt-3 text-right"}
                                                                 style={{fontSize: "16px"}}>
                                                                <ReactPrice
                                                                    cost={Number.parseFloat(item?.branchesProduct?.price?.price * item.count)}
                                                                    className="text-center font-weight-bold"
                                                                    currency={this.props.lang.lang.sum}

                                                                >
                                                                </ReactPrice>

                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>


                                            </Col>
                                        </Row>
                                    ))}
                                </Col></Row>
                        }
                        <Row>
                            <Col lg={8} md={6} className="mt-4 pt-2">
                                <Link to="/products" className="btn btn-primary">
                                    {shopMore}
                                </Link>

                            </Col>
                            <Col lg={4} md={6} className="ml-auto mt-4 pt-2">
                                <div className="table-responsive bg-white rounded shadow">
                                    <Table className="table-center table-padding mb-0">
                                        <tbody>
                                        <tr>
                                            <td className="h6">{subTotal}</td>
                                            <td className="text-center font-weight-bold">{this.state.subTotal} {" " + this.state.cur}</td>
                                        </tr>
                                        {/*<tr>*/}
                                        {/*    <td className="h6">{delivery}</td>*/}
                                        {/*    <td className="text-center font-weight-bold">{this.state.taxes}{" " + this.state.cur}</td>*/}
                                        {/*</tr>*/}
                                        <tr className="bg-light">
                                            <td className="h6">{total}</td>
                                            <td className="text-center font-weight-bold">{this.state.total}{" " + this.state.cur}</td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </div>
                                <div className="mt-4 pt-2 text-right">
                                    <button type={"button"} onClick={this.onLocateToOrder}
                                            className="btn btn-primary">
                                        {checkout}
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        );
    }
}

const mstp = state => state
const mdtp = dispatch => bindActionCreators({setBasketsItem}, dispatch)

export default connect(mstp, mdtp)(ShopCart);

