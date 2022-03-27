import React, {Component} from "react";
import {Container, Row, Col, Card, CardBody} from "reactstrap";
import {Link} from "react-router-dom";

import {connect} from "react-redux";
import {getTopCategories} from "../../server/config/web-site/client";
import {imgUrl} from "../../server/host";

class TopCategories extends Component {
    state = {
        categories: [],
    }


    getList = () => {

        getTopCategories().then((res) => {
            if (res && res.data) {


                this.setState({categories: res.data})
            }
        }).catch(err => {

        })

    }

    componentDidMount() {
        this.getList();
    }

    render() {
        const {topCategories} = this.props.lang.lang;

        return (
            <React.Fragment className={"d-flex mt-0 pt-0 "}>
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
                                    <Link to={"/category-products/" + value.alias}>
                                        <CardBody>
                                            <div className="icon rounded-circle shadow-lg d-inline-block h2">
                                                <img
                                                    src={imgUrl + value.imageUrl}
                                                    className="avatar avatar-small "
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
export default connect(mstp, null)(TopCategories);

