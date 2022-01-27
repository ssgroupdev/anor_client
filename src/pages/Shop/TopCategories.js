import React, {Component} from "react";
import {Container, Row, Col, Card, CardBody} from "reactstrap";
import {Link} from "react-router-dom";

import fashion from "../../assets/images/shop/categories/fashion.jpg";
import sports from "../../assets/images/shop/categories/sports.jpg";
import music from "../../assets/images/shop/categories/music.jpg";
import furniture from "../../assets/images/shop/categories/furniture.jpg";
import electronics from "../../assets/images/shop/categories/electronics.jpg";
import mobile from "../../assets/images/shop/categories/mobile.jpg";
import {connect} from "react-redux";

class TopCategories extends Component {
    state = {
        categories: [
            {
                img: fashion,
                name: "Fashion",
                id: 1
            },
            {
                img: sports,
                name: "Sport",
                id: 1
            },
            {
                img: electronics,
                name: "Elektro",
                id: 1
            }, {
                img: furniture,
                name: "Furniture",
                id: 1
            },
            {
                img: mobile,
                name: "Mobile",
                id: 1
            },
            {
                img: music,
                name: "Music",
                id: 2
            },

        ],
    }

    render() {
        const {topCategories} = this.props.lang.lang;

        return (
            <React.Fragment className={"d-flex"}>
                <Container className="mt-100 mt-60">
                    <Row>
                        <Col xs={12}>
                            <h5 className="mb-0">{topCategories}</h5>
                        </Col>
                    </Row>

                    <Row className={"justify-content-center"}>

                        {this.state.categories.map((value, index) => (
                            <Col lg={2} md={4} xs={6} className="mt-4 pt-2">
                                <Card className="explore-feature border-0 rounded text-center bg-white">
                                    <Link to={"/category-products/"+value.id}>
                                        <CardBody>
                                            <div className="icon rounded-circle shadow-lg d-inline-block h2">
                                                <img
                                                    src={value.img}
                                                    className="avatar avatar-small rounded-circle shadow-md"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="content mt-3">
                                                <h6 className="mb-0">
                                                    <Link to="#" className="title text-dark">
                                                        {value.name}
                                                    </Link>
                                                </h6>
                                            </div>
                                        </CardBody>
                                    </Link>
                                </Card>
                            </Col>

                        ))
                        }

                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

const mstp = state => state;
export default connect(mstp,null)( TopCategories );

