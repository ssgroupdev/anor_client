import React from 'react';
import {Card, CardBody, Col} from "reactstrap";
import {Link} from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import ReactStars from 'react-stars'

const ProductGrid = (props) => {
    const {product} = props;
    const {key, id, image, imgOverlay, name, desc, price, oldPrice, rate} = props.product;
    return (
        <Col key={key} lg={props.col ? props.col : 3} md={6} xs={12} className="mt-4 pt-2">
            <Card className="shop-list border-0 position-relative overflow-hidden">
                <div className="shop-image position-relative overflow-hidden rounded shadow">
                    <Link to={"/shop-product-detail/" + product.id}>
                        <img
                            src={product.image}
                            className="img-fluid"
                            alt="shop"
                        />
                    </Link>
                    <Link to={"/shop-product-detail/" + product.id} className="overlay-work">
                        <img
                            src={product.imgOverlay}
                            className="img-fluid"
                            alt="shop"
                        />
                    </Link>
                    <ul className="list-unstyled shop-icons">
                        <li className="mt-2">
                            <Link
                                to={"/shop-product-detail/" + product.id}
                                className="btn btn-icon btn-pills btn-soft-primary"
                            >
                                <i>
                                    <FeatherIcon icon="eye" className="icons"/>
                                </i>
                            </Link>
                        </li>
                        <li className="mt-2">
                            <Link
                                to="shop-cart"
                                className="btn btn-icon btn-pills btn-soft-warning"
                            >
                                <i>
                                    <FeatherIcon
                                        icon="shopping-cart"
                                        className="icons"
                                    />
                                </i>
                            </Link>
                        </li>
                    </ul>
                </div>
                <CardBody className="content pt-4 p-2">
                    <Link
                        to={"/shop-product-detail/" + product.id}
                        className="text-dark product-name h6"
                    >
                        {product.name}
                    </Link>
                    <div className="d-flex justify-content-between mt-1">
                        <h6 className="text-muted small font-italic mb-0 mt-1">
                            ${product.price}{" "}
                            {product.oldPrice ? (
                                <del className="text-danger ml-2">
                                    ${product.oldPrice}
                                </del>
                            ) : null}
                            {product.desc ? (
                                <span className="text-success ml-1">
                            {product.desc}
                          </span>
                            ) : null}
                        </h6>
                        <ul className="list-unstyled text-warning mb-0">
                            <ReactStars
                                count={rate}
                                edit={false}
                                size={23}
                                color1={"#f17425"}
                            />

                        </ul>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default ProductGrid;