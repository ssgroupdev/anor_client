import React, {Component} from "react";
import {Container, Row, Col, Table, Input} from "reactstrap";
import {Link} from "react-router-dom";

//Import components
import PageBreadcrumb from "../../../components/Shared/PageBreadcrumb";

//Import Images
import product1 from "../../../assets/images/shop/product/s1.jpg";
import product3 from "../../../assets/images/shop/product/s3.jpg";
import product6 from "../../../assets/images/shop/product/s6.jpg";
import product10 from "../../../assets/images/shop/product/s10.jpg";
import {connect} from "react-redux";

class ShopCartCheckouts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pathItems: [
                //id must required
                {id: 1, name: props.lang.lang.index, link: "/"},
                {id: 3, name: props.lang.lang.myCheckout},
            ],
            items: [
                {id: 1, image: product1, name: "T-Shirt", price: 255, cur: "UZS", count: 2},
                {id: 2, image: product3, name: "Branded Watch", price: 520, cur: "UZS", count: 1},
                {id: 3, image: product6, name: "T-Shirt", price: 160, cur: "UZS", count: 4},
                {id: 4, image: product10, name: "Sunglasses", price: 260, cur: "UZS", count: 2},
            ],
            status: "DELIVERED",
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
        let items = this.state.items;

        var filtered = items.filter(function (item) {
            return item.id !== itemId;
        });

        this.setState({items: filtered});
        this.calculationTotal();

    };


    addItem = (itemId) => {
        var newItems = this.state.items;
        newItems.map((item, key) =>
            item.id === itemId ? (item.count = item.count + 1) : false
        );
        this.setState({items: newItems});
        this.calculationTotal();
    };

    calculationTotal = () => {
        let total = 0;
        this.state.items.map((item) => {
            total += item.price * item.count
        })
        this.setState({subTotal: total});
        this.setState({total: total})
    }

    removeItem = (itemId) => {
        var newItems = this.state.items;
        newItems.map(
            (item, key) => {
                if (item.id === itemId && item.count > 0) {
                    return (item.count = item.count - 1);
                } else {
                    return false;
                }
            }
            // item.id === itemId ? (item.count = item.count - 1) : false
        );
        this.setState({items: newItems});
        this.calculationTotal();

    };

    componentDidMount() {
        window.addEventListener("scroll", this.scrollNavigation, true);
        this.calculationTotal();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevState.items.size!==this.state.items.size){
        //   this.calculationTotal();
        // }
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

    render() {const {cart, price, product, count1, total,date, printCheck,status, shopMore, checkout,delivery, subTotal, myCheckout} = this.props.lang.lang;

        return (
            <React.Fragment>
                {/* breadcrumb */}
                <PageBreadcrumb
                    title={myCheckout}
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
                                            <th className="py-3" style={{ minWidth: "300px" }}>
                                                {product}
                                            </th>
                                            <th
                                                className="text-center py-3"
                                                style={{ minWidth: "160px" }}
                                            >
                                                {price}
                                            </th>
                                            <th
                                                className="text-center py-3"
                                                style={{ minWidth: "160px" }}
                                            >
                                                {count1}
                                            </th>
                                            <th
                                                className="text-center py-3"
                                                style={{ minWidth: "160px" }}
                                            >
                                                {total}
                                            </th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {this.state.items.map((item, key) => (
                                            <tr key={key}>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <img
                                                            src={item.image}
                                                            className="img-fluid avatar avatar-small rounded shadow"
                                                            style={{height: "auto"}}
                                                            alt=""
                                                        />
                                                        <h6 className="mb-0 ml-3">{item.name}</h6>
                                                    </div>
                                                </td>
                                                <td className="text-center">{item.price}{" " + item.cur}</td>
                                                <td className="text-center">

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
                                                </td>
                                                <td className="text-center font-weight-bold">
                                                    {item.count * item.price}{" " + item.cur}
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} md={9} className="ml-auto mt-4 pt-2">
                                <div className="table-responsive bg-white rounded shadow">
                                    <Table className="table-center table-padding mb-0">
                                        <tbody>
                                        <tr>
                                            <td className="h6">{status}</td>
                                            <td className="text-center font-weight-bold">{this.state.status}</td>
                                        </tr>
                                        <tr>
                                            <td className="h6">{subTotal}</td>
                                            <td className="text-center font-weight-bold">{this.state.subTotal} {" "+this.state.cur}</td>
                                        </tr>
                                        <tr>
                                            <td className="h6">{delivery}</td>
                                            <td className="text-center font-weight-bold">{this.state.taxes}{" "+this.state.cur}</td>
                                        </tr>
                                        <tr className="bg-light">
                                            <td className="h6">{total}</td>
                                            <td className="text-center font-weight-bold">{this.state.total}{" "+this.state.cur}</td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </div>
                                <div className="mt-4 pt-2 text-right ">
                                    <Row className={"d-flex  justify-content-around"}>
                                        <Col md={5} col={12} className={"text-left"}>
                                            <div>
                                                {date}
                                                <span>some.date</span>
                                            </div>
                                        </Col>
                                        <Col md={7} col={12}>
                                            <Link to="shop-checkouts" className="btn btn-primary">
                                                {printCheck}
                                            </Link>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        );
    }
}

const mstp = state => state;

export default connect(mstp, null)(ShopCartCheckouts);

