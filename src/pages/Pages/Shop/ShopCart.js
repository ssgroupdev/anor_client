import React, {Component} from "react";
import {Container, Row, Col, Table, Input} from "reactstrap";
import {Link} from "react-router-dom";

//Import components
import PageBreadcrumb from "../../../components/Shared/PageBreadcrumb";

//Import Images
import product1 from "../../../assets/images/shop/product/s1.jpg";
import {connect} from "react-redux";
import {addProductToBaskets, deleteBasket, editBasket, getAllBaskets} from "../../../server/config/web-site/basket";
import {imgUrl} from "../../../server/host";
import {toast} from "react-toastify";

class ShopCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pathItems: [
                //id must required
                {id: 1, name: props.lang.lang.index, link: "/"},
                {id: 3, name: props.lang.lang.cart},
            ],
            items: [
                {id: 1, imageUrl: product1, name: "T-Shirt", cost: 255, cur: "UZS", count: 2},
            ],
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

        const data = {productId: itemId, count: count}

        addProductToBaskets(data).then(res => {
            this.calculationTotal();
        }).catch(err => {
        });

    }

    editProductToBasket = (id, itemId, count = 1) => {

        const data = {id: id, productId: itemId, count: (count - 1) > 0 ?(count - 1) : 1}

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
                    total += item.cost * item.count
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

    componentDidMount() {
        window.addEventListener("scroll", this.scrollNavigation, true);
        this.calculationTotal();
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

        const {cart, cost, product, count1, total, shopMore, checkout, delivery, subTotal} = this.props.lang.lang;

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
                                            <th
                                                className="text-center py-3"
                                                style={{minWidth: "160px"}}
                                            >
                                                {cost}
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
                                                <td className="text-center">{item.cost}{" " + item.cur}</td>
                                                <td className="text-center">
                                                    <Input
                                                        type="button"
                                                        value="-"
                                                        onClick={() => this.removeItem(item.id, item.productId, item.count)}
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
                                                        onClick={() => this.addItem(item.productId)}
                                                        readOnly
                                                        className="plus btn btn-icon btn-soft-primary font-weight-bold"
                                                    />
                                                </td>
                                                <td className="text-center font-weight-bold">
                                                    {item.count * item.cost}{" " + item.cur}
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                        </Row>
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
                                        <tr>
                                            <td className="h6">{delivery}</td>
                                            <td className="text-center font-weight-bold">{this.state.taxes}{" " + this.state.cur}</td>
                                        </tr>
                                        <tr className="bg-light">
                                            <td className="h6">{total}</td>
                                            <td className="text-center font-weight-bold">{this.state.total}{" " + this.state.cur}</td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </div>
                                <div className="mt-4 pt-2 text-right">
                                    <Link to="shop-checkouts" className="btn btn-primary">
                                        {checkout}
                                    </Link>
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

export default connect(mstp, null)(ShopCart);

