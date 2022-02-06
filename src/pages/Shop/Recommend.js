import React, { Component } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

import ProductGrid from "../../components/Shared/ProductGrid";
import {connect} from "react-redux";
import {getProducts} from "../../server/config/web-site/product";

class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
      ],
    };
  }

  getList = () => {

    getProducts("RECOMMEND",0,8).then((res)=>{
      this.setState({products: res.data.content})
    }).catch(err=>{

    })

  }

  componentDidMount() {
    this.getList();
  }


  render() {
    const {recommend} = this.props.lang.lang;

    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={12}>
              <Link to={{
                pathname:"/products",
                search: "?sort=RECOMMEND",
                state: {
                  sort: "RATE"
                }
              }} >
                <h5 className="mb-0">{recommend}</h5>
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
export default connect(mstp,null)( Recommend );

