import React, { Component } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

import FeatherIcon from "feather-icons-react";

//Import Images
import product1 from "../../assets/images/shop/product/s1.jpg";
import product2 from "../../assets/images/shop/product/s2.jpg";
import product3 from "../../assets/images/shop/product/s3.jpg";
import product4 from "../../assets/images/shop/product/s4.jpg";
import product5 from "../../assets/images/shop/product/s5.jpg";
import product6 from "../../assets/images/shop/product/s6.jpg";
import product7 from "../../assets/images/shop/product/s7.jpg";
import product8 from "../../assets/images/shop/product/s8.jpg";

import prodtctOverlay1 from "../../assets/images/shop/product/s-1.jpg";
import prodtctOverlay2 from "../../assets/images/shop/product/s-2.jpg";
import prodtctOverlay3 from "../../assets/images/shop/product/s-3.jpg";
import prodtctOverlay4 from "../../assets/images/shop/product/s-4.jpg";
import prodtctOverlay5 from "../../assets/images/shop/product/s-5.jpg";
import prodtctOverlay6 from "../../assets/images/shop/product/s-6.jpg";
import prodtctOverlay7 from "../../assets/images/shop/product/s-7.jpg";
import prodtctOverlay8 from "../../assets/images/shop/product/s-8.jpg";
import ProductGrid from "../../components/Shared/ProductGrid";
import {connect} from "react-redux";

class MostViewedProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {
          id: 1,
          image: product1,
          imgOverlay: prodtctOverlay1,
          name: "Branded T-Shirt",
          price: "16.00",
          oldPrice: "21.00",
          rate: 2
        },
        {
          id: 2,
          image: product2,
          imgOverlay: prodtctOverlay2,
          name: "Shopping Bag",
          price: "21.00",
          oldPrice: "25.00",
          rate: 2
        },
        {
          id: 3,
          image: product3,
          imgOverlay: prodtctOverlay3,
          name: "Elegent Watch",
          price: "5.00",
          desc: "30% off",
          rate: 2
        },
        {
          id: 4,
          image: product4,
          imgOverlay: prodtctOverlay4,
          name: "Casual Shoes",
          price: "18.00",
          oldPrice: "22.00",
          rate: 0
        },
        {
          id: 5,
          image: product5,
          imgOverlay: prodtctOverlay5,
          name: "Earphones",
          price: "3.00",
          rate: 1
        },
        {
          id: 6,
          image: product6,
          imgOverlay: prodtctOverlay6,
          name: "Elegent Mug",
          price: "4.50",
          oldPrice: "6.50",
          rate: 4
        },
        {
          id: 7,
          image: product7,
          imgOverlay: prodtctOverlay7,
          name: "Sony Headphones",
          price: "9.99",
          desc: "20% off",
          rate: 3
        },
        {
          id: 8,
          image: product8,
          imgOverlay: prodtctOverlay8,
          name: "Wooden Stools",
          price: "22.00",
          oldPrice: "25.00",
          rate: 5
        },
      ],
    };
  }

  render() {
    const {topProducts} = this.props.lang.lang;

    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={12}>
              <Link to={{
                pathname:"/products",
                search: "?sort=RATE",
                state: {
                  sort: "RATE"
                }
              }} >
                <h5 className="mb-0">{topProducts}</h5>
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
export default connect(mstp,null)( MostViewedProducts );

