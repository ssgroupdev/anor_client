import React, {Component} from "react";
import {Container, Row, Col, Card, CardBody} from "reactstrap";
import {Link} from "react-router-dom";

import FeatherIcon from "feather-icons-react";

//Import Images
import product9 from "../../assets/images/shop/product/s9.jpg";
import product10 from "../../assets/images/shop/product/s10.jpg";
import product11 from "../../assets/images/shop/product/s11.jpg";
import product12 from "../../assets/images/shop/product/s12.jpg";

import prodtctOverlay9 from "../../assets/images/shop/product/s-9.jpg";
import prodtctOverlay10 from "../../assets/images/shop/product/s-10.jpg";
import prodtctOverlay11 from "../../assets/images/shop/product/s-11.jpg";
import prodtctOverlay12 from "../../assets/images/shop/product/s-12.jpg";
import ProductGrid from "../../components/Shared/ProductGrid";
import {connect} from "react-redux";
import {getProducts} from "../../server/config/web-site/product";

class PopularProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        };
    }

    getList = () => {

        getProducts("POPULAR","", 0, 4).then((res) => {
            this.setState({products: res.data.content})
        }).catch(err => {

        })

    }

    componentDidMount() {
        this.getList();
    }


    render() {
        const {popularProducts} = this.props.lang.lang;

        return (
            <React.Fragment>
                <Container className=" mt-4">
                    <Row>
                        <Col xs={12}>
                            <Link to={{
                                pathname: "/products",
                                search: "?sort=RATE",
                                state: {
                                    sort: "RATE"
                                }
                            }}>
                                <h5 className="mb-0">{popularProducts}</h5>
                            </Link>
                        </Col>
                    </Row>

                    <Row>
                        {this.state.products.map((product, key) => (
                            <ProductGrid  isLogin={this.props.isLogin}  product={product}/>
                        ))}
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

const mstp = state => state;
export default connect(mstp, null)(PopularProducts);
