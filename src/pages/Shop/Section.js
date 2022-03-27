import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Container, Row, Col} from "reactstrap";

//Import Slick Slider
import Slider from "react-slick";

//Import Slick Slider CSS
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";

import {connect} from "react-redux";
import {getBanners} from "../../server/config/web-site/client";
import {imgUrl} from "../../server/host";

class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        getBanners().then(res => {
            console.log(res)
            this.setState({
                items: res.data.content
            }, () => {
                var e1 = document.getElementsByClassName("slick-slide");
                for (var i = 0; i < this.state.items.length; i++) {
                    e1[i].style.background = `url(${imgUrl + this.state.items[i].imageUrl}) no-repeat center center`;
                    e1[i].style.backgroundSize = `cover`;
                }
            })
        }).catch(err => {
            console.log(err)
        })
    }


    render() {
        var settings = {
            autoplay: true,
            infinite: true,
            autoplaySpeed: 1500,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            draggable: true,
            pauseOnHover: true,
            variableWidth: false
        };
        const {getShop, saw} = this.props.lang.lang;
        return (
            <React.Fragment>
                <section className="main-slider">
                    <Slider className="slides" {...settings}>
                        {this.state.items.map((item, key) => (
                            <li
                                key={key}
                                className={"bg-slider d-flex align-items-center " + item.class}
                                style={{
                                    background: `url(${imgUrl + item.imageUrl}) no-repeat center center`,
                                    backgroundSize: "cover"
                                }}
                            >
                                <Container>
                                    <Row className="align-items-center mt-5">
                                        <Col lg={7} md={7} className="slider-desc">
                                            <div className="title-heading mt-4">
                                                <h1 className="display-4 title-white font-weight-bold mb-3">
                                                    {item.title}
                                                </h1>
                                                <p className="para-desc text-muted para-dark">
                                                    {item.description}
                                                </p>
                                                <div className="mt-4">
                                                    <Link to={item.productId}
                                                          className="btn btn-soft-primary">
                                                        {saw}
                                                    </Link>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </li>
                        ))}
                    </Slider>
                </section>
            </React.Fragment>
        );
    }
}

const mstp = state => state;
export default connect(mstp, null)(Section);
