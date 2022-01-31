import React, { Component } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

//Import Images
import health from "../../../assets/images/insurance/health.svg";
import termLife from "../../../assets/images/insurance/term-life.svg";
import familyHealth from "../../../assets/images/insurance/family-health.svg";
import investment from "../../../assets/images/insurance/investment.svg";
import car from "../../../assets/images/insurance/car.svg";
import bike from "../../../assets/images/insurance/bike.svg";

import bg from "../../../assets/images/insurance/bg.png";
import {getCategoriesByMenu} from "../../../server/config/web-site/client";
import {imgUrl} from "../../../server/host";

class CategorySection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      name:"Laptops, Printers, Computers",
      categories: [
        { id:1,img: health, name: "Health Insurance"}
      ],
    };
  }

  getData = () => {
    getCategoriesByMenu(this.state.id).then(res=>{
      this.setState({
        name: res.data.name,
        categories: res.data.child
      })
    }).catch(err=> console.log(err))
  }

  componentDidMount() {
    this.getData();
  }


  render() {
    return (
      <React.Fragment>
        <section
          className="bg-half-170 bg-skyblue d-table w-100"
          style={{ background: `url(${bg}) center center` , backgroundColor:"#F6FCFC"}}
        >
          <Container>
            <Row className="mt-5 justify-content-center">
              <Col lg={12}>
                <div className="name-heading text-center">
                  <h1 className="heading name-dark text-dark mb-3">
                    {this.state.name}
                  </h1>

                  <Row className="mt-4 pt-2">
                    {this.state.categories.map((category, key) => (
                      <Col key={key} lg={3} md={4} xs={6} className="mt-4 pt-2">
                        <Card className="explore-feature border-0 rounded text-center bg-white">
                          <Link
                              to={"/category-products/"+category.id}
                              className="name text-dark"
                          >  <CardBody>
                            <div className="icon rounded-circle shadow-lg d-inline-block">
                              <img
                                src={imgUrl + category.imageUrl}
                                className="avatar avatar-md-sm"
                                alt="Landrick"
                              />
                            </div>
                            <div className="content mt-3">
                              <h6 className="mb-0">

                                  {category.name}

                              </h6>
                            </div>
                          </CardBody>  </Link>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
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
      </React.Fragment>
    );
  }
}

export default CategorySection;
