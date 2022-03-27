import React, {Component} from "react";
import {Container, Row, Col, Table, Input, Button} from "reactstrap";
import {Link} from "react-router-dom";

//Import components
import PageBreadcrumb from "../../../components/Shared/PageBreadcrumb";
import {connect} from "react-redux";
import {editStatus, getOrder} from "../../../server/config/user/order";
import Price from "react-price";
import {imgUrl} from "../../../server/host";
import {toast} from "react-toastify";

class ShopCartCheckouts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pathItems: [
                //id must required
                {id: 1, name: props.lang.lang.index, link: "/"},
                {id: 3, name: props.lang.lang.myCheckout},
            ],
            products: [],
            status: "DELIVERED",
            cur: "UZS",
            order: {},
            address: {},
            user: {},
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


    calculationTotal = () => {

    }


    getOrder = () => {
        getOrder(this.props?.props?.match?.params?.id).then(res => {
            this.setState({
                products: res.data.products,
                total: res.data.totalPrice,
                address: res.data.addressPayload,
                order: res.data,
                user: res.data.user
            }, () => this.calculationTotal())
        }).catch(err => {

        })
    }

    componentDidMount() {
        this.getOrder();
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

    render() {
        const {
            cart,
            price,
            product,
            count1,
            total,
            date,
            printCheck,
            status,
            shopMore,
            checkout,
            delivery,
            subTotal,
            myCheckout, sum,
            processing, cancelled, delivered, notFound, deliveryDate, deliveryFinish, finished
        } = this.props.lang.lang;
        const {order} = this.state
        const {
            provinceId,
            regionId,
            provinceName,
            regionName,
            floor,
            porch,
            household,
            numberHome,
            street,
            postIndex
        } = this.state.address
        const {user} = this.state
        const {lang} = this.props.lang

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
                                            <th className="py-3" style={{minWidth: "300px"}}>
                                                {product}
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
                                        {this.state.products.map((item, key) => (
                                            <tr key={key}>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <img
                                                            src={imgUrl + item.product?.images[0].imageUrl}
                                                            className="img-fluid avatar avatar-small rounded shadow"
                                                            style={{height: "auto"}}
                                                            alt=""
                                                        />
                                                        <Link
                                                            to={"/shop-product-detail/" + item.productId + "?branchProduct=" + item.branchId}>
                                                            <h6 className="mb-0 ml-3">{item.product.name}</h6>
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <Price cost={item.price} currency={sum}/>
                                                </td>
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
                                                    {item.count * item.price + sum}
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} className="mt-4 pt-2">
                                <p className="h6 text-muted">
                                    {provinceName + " " }
                                    {regionName + " "}
                                    {street && ( street )}
                                </p>
                                {numberHome &&
                                    <p className="h6 text-muted">{lang.numberOfHome + ": " + numberHome}</p>}
                                {porch &&
                                    <p className="h6 text-muted">{lang.porch + ": " + porch}</p>}
                                {floor &&
                                    <p className="h6 text-muted">{lang.floor + ": " + floor}</p>}
                                {household &&
                                    <p className="h6 text-muted">{lang.household + ": " + household}</p>}
                                {postIndex &&
                                    <p className="h6 text-muted">{lang.post + ": " + postIndex}</p>}
                                {user.username &&
                                    <p className="h6 text-muted mb-0">{lang.phone + ": " + user.username}</p>}
                                {this.state.address?.phoneTwo &&
                                    <p className="h6 text-muted mb-0">{lang.phoneTwo + ": " + this.state.address?.phoneTwo}</p>}
                            </Col>
                            <Col lg={6} md={9} className="ml-auto mt-4 pt-2">
                                <div className="table-responsive bg-white rounded shadow">
                                    <Table className="table-center table-padding mb-0">
                                        <tbody>
                                        <tr>
                                            <td className="h6">{status}</td>
                                            <td className="text-center font-weight-bold">
                                                {
                                                    order.status === "DELIVERY" ?
                                                        <span className="text-success">{delivered}</span> : (
                                                            order.status === "FINISHED" ?
                                                                <span className="text-success">{finished}</span> : (
                                                                    order.status === "CANCELLED"||order.status === "CANCELLED_BY_BRANCH" ?
                                                                        <span className="text-error">{cancelled}</span> : (
                                                                            <span className="text-secondary">{processing}</span>
                                                                        )
                                                                )
                                                        )
                                                }

                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="h6">{subTotal}</td>
                                            <td className="text-center font-weight-bold">{order.totalPrice ? order.totalPrice : 0}{sum}</td>
                                        </tr>
                                        {/*<tr>*/}
                                        {/*    <td className="h6">{delivery}</td>*/}
                                        {/*    <td className="text-center font-weight-bold">{this.state.taxes}{" " + this.state.cur}</td>*/}
                                        {/*</tr>*/}
                                        <tr className="bg-light">
                                            <td className="h6">{total}</td>
                                            <td className="text-center font-weight-bold">{order.totalPrice ? order.totalPrice : 0}{sum}</td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </div>
                                <div className="mt-4 pt-2 text-right ">
                                    <Col md={6} col={12} className={"text-left"}>
                                        <div>
                                            {date}
                                            <span>{new Date(order.createdAt).toLocaleString().slice(0, 17)}</span>
                                        </div>
                                    </Col>
                                    <Row className={"d-flex  justify-content-around mt-2"}>
                                        <Col md={2}></Col>
                                        <Col md={10} col={12}>
                                            <Row>
                                                <Col>
                                                    {
                                                        order.status === "PROCESSING" ?
                                                            <Button type={"danger"} className={"btn btn-danger"}
                                                                    onClick={() => {
                                                                        editStatus(order.id, "CANCELLED").then(res=>{
                                                                            this.setState({
                                                                                order: {
                                                                                    ...this.state.order,
                                                                                    status: "CANCELLED"
                                                                                }
                                                                            }, ()=> toast.success(lang.finish))
                                                                        }).catch(err=>{

                                                                        })
                                                                    }
                                                                    }>
                                                                {lang.cancel}
                                                            </Button> : null
                                                    }

                                                </Col>
                                                <Col>
                                                    <Link to="shop-checkouts" className="btn btn-primary">
                                                        {printCheck}
                                                    </Link>
                                                </Col>
                                            </Row>
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

