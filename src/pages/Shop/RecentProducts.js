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
import {getProducts} from "../../server/config/web-site/product";

class RecentProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
      ],
    };
  }

  getList = () => {

    getProducts("LATEST","",0,4).then((res)=>{
      this.setState({products: res.data.content})
    }).catch(err=>{

    })

  }

  componentDidMount() {
    this.getList();
  }


  render() {  const {recentProducts} = this.props.lang.lang;

    return (
      <React.Fragment>
        <Container className="mt-4">
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

