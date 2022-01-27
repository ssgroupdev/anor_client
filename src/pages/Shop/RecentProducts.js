import React, { Component } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

import FeatherIcon from "feather-icons-react";

//Import Images
import product13 from "../../assets/images/shop/product/s13.jpg";
import product14 from "../../assets/images/shop/product/s14.jpg";
import product15 from "../../assets/images/shop/product/s15.jpg";
import product16 from "../../assets/images/shop/product/s16.jpg";

import prodtctOverlay13 from "../../assets/images/shop/product/s-13.jpg";
import prodtctOverlay14 from "../../assets/images/shop/product/s-14.jpg";
import prodtctOverlay15 from "../../assets/images/shop/product/s-15.jpg";
import prodtctOverlay16 from "../../assets/images/shop/product/s-16.jpg";
import ProductGrid from "../../components/Shared/ProductGrid";
import {connect} from "react-redux";

class RecentProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {
          id: 1,
          image: product13,
          imgOverlay: prodtctOverlay13,
          name: "Wooden Chair",
          price: "16.00",
          oldPrice: "21.00",
        },
        {
          id: 2,
          image: product14,
          imgOverlay: prodtctOverlay14,
          name: "Women Block Heels",
          price: "21.00",
          oldPrice: "25.00",
        },
        {
          id: 3,
          image: product15,
          imgOverlay: prodtctOverlay15,
          name: "T-Shirts",
          price: "5.00",
          desc: "30% off",
        },
        {
          id: 4,
          image: product16,
          imgOverlay: prodtctOverlay16,
          name: "Clock",
          price: "18.00",
          oldPrice: "22.00",
        },
      ],
    };
  }
  render() {  const {recentProducts} = this.props.lang.lang;

    return (
      <React.Fragment>
        <Container className="mt-100 mt-60">
          <Row>
            <Col xs={12}>
              <Link to={{
                pathname:"/products",
                search: "?sort=LATEST",
                state: {
                  sort: "LATEST"
                }
              }} >
               <h5 className="mb-0">{recentProducts}</h5>
              </Link>
            </Col>
          </Row>

          <Row>
            {this.state.products.map((product, key) => (
                <ProductGrid product={product} />
             ))}
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
const mstp = state => state;
export default connect(mstp,null)( RecentProducts );

