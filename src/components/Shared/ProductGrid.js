import React, {useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardBody,
    Col,
    ListGroup,
    ListGroupItem,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader, Row
} from "reactstrap";
import {Link} from "react-router-dom";
import FeatherIcon from "feather-icons-react";

import {host, imgUrl, port, token} from "../../server/host";
import {addProductToBaskets} from "../../server/config/web-site/basket";
import {connect} from "react-redux";
import {toast} from "react-toastify";
import {setProduct} from "../../redux/actions/lang";
import {getBranchProductByProductId} from "../../server/config/web-site/brand/branches";

const ProductGrid = (props) => {

    const [isLogin, setLogin] = useState(false);
    const [isView, setView] = useState(false);
    const [branches, setBranches] = useState([]);
    const [active, setActive] = useState(null);

    const {product} = props;

    const addProductToBasket = () => {

        if (branches.length > 0) {
            if (active !== null) {
                const data = {productId: product.id, count: 1, branchProductId: active}

                addProductToBaskets(data).then(res => {
                    toast.success(props.lang.lang.finish)
                    setView(false)
                }).catch(err => {
                    toast.error(props.lang.lang.error)

                });
            } else {
                toast.info(props.lang.lang.pleaseSelect)
            }
        } else {
            toast.error(props.lang.lang.notProduct)
            setView(false)
        }

    }
    const handleLogOut = () => {
        setView(false);

    };

    const addProductToBasketNotLogin = (list, productId, count) => {

        props.setProduct(list, productId, count);
        toast.success(props.lang.lang.finish)

    }
    useEffect(() => {
        setLogin(props?.isLogin)
    })

    const {cancel, selectStore, ok, noResidue, error} = props.lang.lang;

    const {key, id, images, imgOverlay, name, desc, cost, saleCost, isSale, rate} = props.product;

    return (<Col key={key} lg={props.col ? props.col : 3} md={6} xs={12} className="mt-4 pt-2">
        <Card className="shop-list border-0 position-relative overflow-hidden">
            <div className="shop-image position-relative overflow-hidden rounded shadow">
                <Link to={"/shop-product-detail/" + product.id + "?branchProduct=" + product.branches?.at(0)?.id}>
                    <img
                        width={"100%"}
                        src={`${host}:${port}/api/file/preview/${product.images && product.images[0].imageUrl}`}
                        className="img-fluid"
                        alt="shop"
                        // height={"200px"}
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
                    {isLogin &&
                        <li className="mt-2">
                            <button
                                type={"button"}
                                // to="shop-cart"
                                onClick={() =>
                                    // !isLogin ?
                                    // addProductToBasketNotLogin(props?.basket?.basket, product.id, 1)
                                    //     :

                                    // addProductToBasket()
                                {
                                    getBranchProductByProductId(product.id).then(res => {
                                        setBranches(res.data)
                                    }).catch(err => {
                                        toast.error(error)
                                    })
                                    setView(true);
                                }
                                }
                                className="btn btn-icon btn-pills btn-soft-warning"
                            >
                                <i>
                                    <FeatherIcon
                                        icon="shopping-cart"
                                        className="icons"
                                    />
                                </i>
                            </button>
                        </li>
                    }
                </ul>
            </div>
            <CardBody className="content pt-4 p-2">
                <Link to={"/shop-product-detail/" + product?.id}
                      className="text-dark product-name h6"
                >
                    {product?.name}
                </Link>

                {
                    product.branches !== null && product.branches.length > 0 ? <>
                        <div className="d-flex justify-content-between mt-1">
                            <h6 className="text-muted small font-italic mb-0 mt-1">
                                {product.branches[0]?.price?.oldPrice === null ? (product.branches[0]?.price?.price + " UZS ") : (
                                    <>   {product.branches[0]?.price?.oldPrice > product.branches[0]?.price?.price ? product.branches[0]?.price?.price : product.branches[0]?.price?.oldPrice}{" "}UZS{" "}
                                        {product.branches[0]?.price?.oldPrice > product.branches[0]?.price?.price ? (
                                            <del className="text-danger ml-2">
                                                {product.branches[0]?.price?.oldPrice}{" "}UZS{" "}
                                            </del>) : null}</>)}
                            </h6>
                            {/*<ul className="list-unstyled text-warning mb-0">*/}
                            {/*    <ReactStars*/}
                            {/*        count={rate}*/}
                            {/*        edit={false}*/}
                            {/*        size={23}*/}
                            {/*        color1={"#f17425"}*/}
                            {/*    />*/}
                            {/*</ul>*/}

                        </div>
                        <h6 className={"h6 text-muted mt-1 text-right"}>{product?.branches[0]?.name}</h6>

                    </> : <p className={"text-danger text-right"}>{noResidue}</p>
                }
            </CardBody>
            <Modal isOpen={isView} toggle={() => setView(!isView)}
                   width={"600px"}
            >
                <ModalHeader toggle={() => setView(!isView)}>{selectStore}</ModalHeader>
                <ModalBody>

                    <ListGroup>
                        {
                            branches.length > 0 ?
                                branches.map(value => (
                                    <ListGroupItem
                                        key={value.id}
                                        href={"#"}
                                        // tag={"#"}
                                        className={active === value.id && "list-group-item-secondary"}
                                        onClick={() => setActive(value.id)}
                                        style={{cursor: "pointer"}}
                                    >
                                        <Row>
                                            <Col sm={"5"}>
                                                {value.name}
                                            </Col>
                                            <Col sm={"7"} className={"text-right"}>
                                                <h6 className="text-muted small font-italic mb-0 mt-1">
                                                    {value?.price?.oldPrice === null ? (value?.price?.price + " UZS ") : (
                                                        <>   {value?.price?.oldPrice > value.price?.price ? value?.price?.price : value?.price?.oldPrice}{" "}UZS{" "}
                                                            {value?.price?.oldPrice > value?.price?.price ? (
                                                                <del className="text-danger ml-2">
                                                                    {value?.price?.oldPrice}{" "}UZS{" "}
                                                                </del>) : null}</>)}
                                                </h6>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                )) : (<h4 className={"text-center text-danger"}>{noResidue}</h4>)

                        }
                    </ListGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="light" onClick={() => setView(false)}>{cancel}</Button>
                    <Button color="primary" onClick={() => addProductToBasket()}>{ok}</Button>{' '}
                </ModalFooter>
            </Modal>

        </Card>
    </Col>);
};
const mstp = state => state
export default connect(mstp, {setProduct})(ProductGrid);