import React, { Component } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

import ProductGrid from "../../components/Shared/ProductGrid";
import {connect} from "react-redux";
import {getProducts} from "../../server/config/web-site/product";

class MostViewedProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
      ]
    };
  }

  getList = () => {

    getProducts("RATE","",0,4).then((res)=>{
      this.setState({products: res.data.content})
    }).catch(err=>{

    })

  }

  componentDidMount() {
    this.getList();
  }


  render() {
    const {topProducts} = this.props.lang.lang;

    return (
      <React.Fragment >
        <Container className={"mt-4"}>
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

