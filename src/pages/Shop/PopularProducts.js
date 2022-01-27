import React, { Component } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

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

class PopularProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {
          id: 1,
          image: product9,
          imgOverlay: prodtctOverlay9,
          name: "Coffee Cup / Mug",
          price: "16.00",
          oldPrice: "21.00",
        },
        {
          id: 2,
          image: product10,
          imgOverlay: prodtctOverlay10,
          name: "Sunglasses",
          price: "21.00",
          oldPrice: "25.00",
        },
        {
          id: 3,
          image: product11,
          imgOverlay: prodtctOverlay11,
          name: "Loafer Shoes",
          price: "5.00",
          desc: "30% off",
        },
        {
          id: 4,
          image: product12,
          imgOverlay: prodtctOverlay12,
          name: "T-Shirts",
          price: "18.00",
          oldPrice: "22.00",
        },
      ],
    };
  }

  render() {  const {popularProducts} = this.props.lang.lang;

    return (
      <React.Fragment>
        <Container className="mt-100 mt-60">
          <Row>
            <Col xs={12}>
              <Link to={{
                pathname:"/products",
                search: "?sort=RATE",
                state: {
                  sort: "RATE"
                }
              }} >
                <h5 className="mb-0">{popularProducts}</h5>
              </Link>
            </Col>
          </Row>

          <Row>
            {this.state.products.map((product, key) => (
                <ProductGrid product={product}/>
            ))}
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
const mstp = state => state;
export default connect(mstp,null)( PopularProducts );
