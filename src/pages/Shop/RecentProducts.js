import React, {Component} from "react";
import {Container, Row, Col} from "reactstrap";
import {Link} from "react-router-dom";

import ProductGrid from "../../components/Shared/ProductGrid";
import {connect} from "react-redux";
import {getProducts} from "../../server/config/web-site/product";

class RecentProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        };
    }

    getList = () => {

        getProducts("LATEST", "", 0, 4).then((res) => {
            if (res && res.data && res.data.content) {
                this.setState({products: res.data.content})
            }
        }).catch(err => {

        })

    }

    componentDidMount() {
        this.getList();
    }


    render() {
        const {recentProducts} = this.props.lang.lang;

        return (
            <React.Fragment>
                <Container className="mt-4">
                    <Row>
                        <Col xs={12}>
                            <Link to={{
                                pathname: "/products",
                                search: "?sort=LATEST",
                                state: {
                                    sort: "LATEST"
                                }
                            }}>
                                <h5 className="mb-0">{recentProducts}</h5>
                            </Link>
                        </Col>
                    </Row>

                    <Row>
                        {this.state.products.map((product, key) => (
                            <ProductGrid isLogin={this.props.isLogin} product={product}/>
                        ))}
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

const mstp = state => state;
export default connect(mstp, null)(RecentProducts);

