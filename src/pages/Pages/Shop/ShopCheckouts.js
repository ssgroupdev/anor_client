import React, {Component} from "react";
import {
    Container,
    Row,
    Col,
    Table,
    Input,
    FormGroup,
    Form,
    Label,
    CustomInput, Button,
} from "reactstrap";
import {Link} from "react-router-dom";

//Import components
import PageBreadcrumb from "../../../components/Shared/PageBreadcrumb";
import {connect} from "react-redux";
import {getUser} from "../../../server/config/web-site/user";
import {deleteCookie, getCookie} from "../../../utils/useCookies";
import {userAccessTokenName} from "../../../constants/application";
import {AvField, AvForm} from "availity-reactstrap-validation";
import FeatherIcon from "feather-icons-react";
import {getProvince, getRegionsByProvince} from "../../../server/config/web-site/client";
import {bindActionCreators} from "redux";
import {setBasketsItem} from "../../../redux/actions/lang";
import {addOrder} from "../../../server/config/user/order";
import {toast} from "react-toastify";

class ShopCheckouts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pathItems: [
                //id must required
                {id: 1, name: props.lang.lang.index, link: "/"},
                {id: 2, name: props.lang.lang.cart, link: "/shop-cart"},
                {id: 3, name: props.lang.lang.getShop},
            ],
            user: {},
            address: {}

        };
    }

    getList = () => {
        getProvince().then(res => {
            this.setState({
                provinces: res?.data,
                data: {
                    provinceId: this.state.address.provinceId
                }
            }, () => this.getRegions())
        })

    }
    onProvinceChange = (e) => {
        this.setState({
            address: {
                ...this.state.address,
                provinceId: e.target.value
            },
            data: {
                ...this.state.data,
                provinceId: e.target.value
            }
        }, () => this.getRegions())
    }
    onRegionChange = (e) => {
        this.setState({
            address: {
                ...this.state.address,
                regionId: e.target.value
            },
            data: {
                ...this.state.data,
                regionId: e.target.value
            }
        }, () => this.getRegions())
    }

    getRegions = () => {
        getRegionsByProvince(this.state.data && this.state.data.provinceId && this.state.data.provinceId).then(res => {
            if (res && res.data) {

                this.setState({
                    regionsList: res.data
                })
            }
        }).catch()
    }

    getMe = () => {

        getUser().then(res => {
                if (res && res.data) {
                    this.setState({
                        user: {
                            ...res.data
                        },
                        address: {
                            ...res.data?.address
                        }
                    })
                } else {

                    console.log(getCookie(userAccessTokenName))
                    deleteCookie(userAccessTokenName)
                    this.props.props.history.push("/")

                }
            }
        ).catch(err => {

            console.log(getCookie(userAccessTokenName))
            deleteCookie(userAccessTokenName)
            this.props.props.history.push("/")

        })

    }

    componentDidMount() {
        if (Object.keys(this.props?.basketOrder).length === 0 || !(this.props?.basketOrder?.products?.list?.length >= 0)) {
            this.props?.props?.history?.push("/shop-cart")
        }
        this.getMe();
        this.getList();
        window.addEventListener("scroll", this.scrollNavigation, true);
    }

    // Make sure to remove the DOM listener when the component is unmounted.
    componentWillUnmount() {
        window.removeEventListener("scroll", this.scrollNavigation, true);
    }

    scrollNavigation = () => {
        var doc = document.documentElement;
        var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        if (top > 80) {
            document.getElementById("topnav").classList.add("nav-sticky");
        } else {
            document.getElementById("topnav").classList.remove("nav-sticky");
        }
    };

    onSubmit = (e, v) => {
        console.log(e, v)
        const data = {
            "addressPayload": {
                "regionId": this.state.address.regionId,
                "phoneTwo": v.phoneTwo,
                "street": v.street,
                "household": v.household,
                "floor": v.floor,
                "numberHome": v.numberHome,
                "porch": v.porch,
                "postIndex": v.postIndex
            },
            "basketIds": this.props?.basketOrder?.products?.list,
            "info": v.info
        }

        addOrder(data).then(res => {
            if (res && res.data) {
                toast.success(this.props.lang.lang.finish)
                this.props.props.history.push("/shop-myaccount")
            } else {
                toast.error(this.props.lang.lang.error)
            }
        }).catch(err => {
            toast.error(this.props.lang.lang.error)
        })

    }

    render() {
        const {
            getShop,
            shipping,
            firstName,
            lastName,
            street,
            regions,
            province,
            buildingName,
            household,
            porch,
            floor,
            phone,
            phoneTwo,
            post,
            numberOfHome,
            yourPhone,
            comments,
            commentYourOrder,
            payment,
            total,
            subTotal,
            delivery,
            errorPassword,
            errorField,
            errorPhone,
            errorConfirmPass,
            errorConfirmPassword,
            errorStreet,
            errorNumberOfHome,
            errorName,
            errorSurname,
            errorPost,
            selectItem
        } = this.props.lang.lang
        const {user, address, provinces, regionsList} = this.state
        return (
            <React.Fragment>
                {/* breadcrumb */}
                <PageBreadcrumb title={getShop} pathItems={this.state.pathItems}/>
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

                <section className="section">
                    <Container>
                        <AvForm className="login-form mx-3"
                                onValidSubmit={this.onSubmit}
                                model={this.state.address}>

                            <Row>
                                <Col lg={7} md={6}>
                                    <div className="rounded shadow-lg p-4">
                                        <h5 className="mb-0">{shipping}</h5>

                                        {/*<Form>*/}
                                        <Row>
                                            <Col xs={6}>
                                                <FormGroup className="position-relative"
                                                           disabled={true}>
                                                    <Label>
                                                        {firstName}<span className="text-danger">*</span>
                                                    </Label>
                                                    <Input
                                                        name="name"
                                                        id="firstName"
                                                        type="text"
                                                        className="form-control"
                                                        placeholder={firstName}
                                                        value={user?.firstName}
                                                        disabled
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col xs={6}>
                                                <FormGroup className="position-relative"
                                                           disabled={true}>
                                                    <Label>
                                                        {lastName}<span className="text-danger">*</span>
                                                    </Label>
                                                    <Input
                                                        name="name"
                                                        id="lastName"
                                                        type="text"
                                                        className="form-control"
                                                        value={user?.lastName}
                                                        placeholder={lastName}
                                                        disabled={true}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup className="position-relative">
                                                    <Label>
                                                        {yourPhone}
                                                        {/*<span className="text-danger">*</span>*/}
                                                    </Label>
                                                    <div className="position-relative">
                                                        <i>
                                                            <FeatherIcon
                                                                icon="phone"
                                                                className="fea icon-sm icons"
                                                            />
                                                        </i>
                                                    </div>
                                                    <AvField
                                                        type="number"
                                                        className="form-control pl-5"
                                                        errorMessage="Invalid PhoneNumber"
                                                        placeholder={"998*********"}
                                                        name="phone"
                                                        disabled
                                                        value={user?.username}
                                                    />

                                                </FormGroup>
                                            </Col>

                                            <Col md={6}>
                                                <FormGroup className="position-relative">
                                                    <Label>
                                                        {phoneTwo}
                                                        {/*<span className="text-danger">*</span>*/}
                                                    </Label>
                                                    <div className="position-relative">
                                                        <i>
                                                            <FeatherIcon
                                                                icon="phone"
                                                                className="fea icon-sm icons"
                                                            />
                                                        </i>
                                                    </div>
                                                    <AvField
                                                        type="number"
                                                        className="form-control pl-5"
                                                        validate={{
                                                            required: {
                                                                value: true,
                                                                errorMessage: errorPhone
                                                            },
                                                            minLength: {
                                                                value: 12,
                                                                errorMessage: errorPhone
                                                            },
                                                            maxLength: {value: 12, errorMessage: errorPhone}
                                                        }}
                                                        placeholder={"998*********"}
                                                        name="phoneTwo"
                                                        value={user?.phone}
                                                        required={true}
                                                    />

                                                </FormGroup>
                                            </Col>


                                            <Col md={6}>
                                                <FormGroup className="position-relative">
                                                    <Label
                                                        for="exampleSelect"
                                                        // sm={2}
                                                        className={"text-bold"}
                                                        style={{fontWeight: "bold"}}
                                                    >
                                                        {province}
                                                    </Label>
                                                    <Input
                                                        required
                                                        id="exampleSelect"
                                                        name="provinceId"
                                                        validate={{
                                                            required: {
                                                                value: true,
                                                                errorMessage: errorField
                                                            },
                                                        }}
                                                        type="select"
                                                        value={this.state.address.provinceId}
                                                        defaultValue={this.state.address.provinceId}
                                                        onChange={this.onProvinceChange}

                                                    >
                                                        {
                                                            provinces?.map(item => (
                                                                <option value={item.id}>{item.name}</option>
                                                            ))
                                                        }
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup className="position-relative">
                                                    <Label
                                                        for="exampleSelect1"
                                                        className={"text-bold"}
                                                        style={{fontWeight: "bold"}}
                                                    >
                                                        {regions}
                                                    </Label>
                                                    <Input
                                                        required
                                                        id="exampleSelect1"
                                                        name="regionId"
                                                        validate={{
                                                            required: {
                                                                value: true,
                                                                errorMessage: errorField
                                                            },
                                                        }}
                                                        type="select"
                                                        value={this.state.address.regionId}
                                                        defaultValue={this.state.address.regionId}
                                                        onChange={this.onRegionChange}
                                                    >
                                                        {
                                                            regionsList?.map(item => (
                                                                <option value={item.id}>{item.name}</option>
                                                            ))
                                                        }
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup className="position-relative">
                                                    <Label>
                                                        {street} <span className="text-danger">*</span>
                                                    </Label>
                                                    <div className="position-relative">
                                                        <i>
                                                            <FeatherIcon
                                                                icon="git-merge"
                                                                className="fea icon-sm icons"
                                                            />
                                                        </i>
                                                    </div>
                                                    <AvField
                                                        type="text"
                                                        className="form-control pl-5"
                                                        validate={{
                                                            required: {
                                                                value: true,
                                                                errorMessage: errorStreet
                                                            }
                                                        }}
                                                        value={address?.street}
                                                        placeholder={street}
                                                        name="street"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup className="position-relative">
                                                    <Label>
                                                        {numberOfHome}{" "}
                                                        {/*<span className="text-danger">*</span>*/}
                                                    </Label>
                                                    <div className="position-relative">
                                                        <i>
                                                            <FeatherIcon
                                                                icon="inbox"
                                                                className="fea icon-sm icons"
                                                            />
                                                        </i>
                                                    </div>
                                                    <AvField
                                                        type="text"
                                                        className="form-control pl-5"
                                                        value={address?.numberHome}
                                                        name="numberHome"
                                                        placeholder={numberOfHome}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup className="position-relative">
                                                    <Label>
                                                        {porch}{" "}
                                                        {/*<span className="text-danger">*</span>*/}
                                                    </Label>
                                                    <div className="position-relative">
                                                        <i>
                                                            <FeatherIcon
                                                                icon="inbox"
                                                                className="fea icon-sm icons"
                                                            />
                                                        </i>
                                                    </div>
                                                    <AvField
                                                        type="text"
                                                        className="form-control pl-5"
                                                        value={address?.porch}
                                                        name="porch"
                                                        placeholder={porch}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup className="position-relative">
                                                    <Label>
                                                        {floor}{" "}
                                                        {/*<span className="text-danger">*</span>*/}
                                                    </Label>
                                                    <div className="position-relative">
                                                        <i>
                                                            <FeatherIcon
                                                                icon="inbox"
                                                                className="fea icon-sm icons"
                                                            />
                                                        </i>
                                                    </div>
                                                    <AvField
                                                        type="text"
                                                        value={address?.floor}
                                                        className="form-control pl-5"
                                                        name="floor"
                                                        placeholder={floor}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup className="position-relative">
                                                    <Label>
                                                        {household} <span className="text-danger">*</span>
                                                    </Label>
                                                    <div className="position-relative">
                                                        <i>
                                                            <FeatherIcon
                                                                icon="home"
                                                                className="fea icon-sm icons"
                                                            />
                                                        </i>
                                                    </div>
                                                    <AvField
                                                        value={address?.household}
                                                        type="text"
                                                        className="form-control pl-5"
                                                        validate={{
                                                            required: {
                                                                value: true,
                                                                errorMessage: errorNumberOfHome
                                                            }
                                                        }}
                                                        name={"household"}
                                                        placeholder={household}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup className="position-relative">
                                                    <Label>
                                                        {post}{" "}
                                                        <span className="text-danger">*</span>
                                                    </Label>
                                                    <div className="position-relative">
                                                        <i>
                                                            <FeatherIcon
                                                                icon="inbox"
                                                                className="fea icon-sm icons"
                                                            />
                                                        </i>
                                                    </div>
                                                    <AvField
                                                        type="number"
                                                        className="form-control pl-5"
                                                        validate={{
                                                            required: {
                                                                value: true,
                                                                errorMessage: errorPost
                                                            },
                                                            minLength: {value: 6, errorMessage: errorPost},
                                                            maxLength: {value: 6, errorMessage: errorPost}
                                                        }}
                                                        value={address?.postIndex}
                                                        name="postIndex"
                                                        placeholder={post}
                                                    />
                                                </FormGroup>
                                            </Col>

                                        </Row>
                                        {/*</Form>*/}
                                    </div>

                                    <div className="rounded shadow-lg p-4">

                                        <FormGroup className="position-relative">
                                            <Label>{commentYourOrder}</Label>
                                            <AvField
                                                name="info"
                                                type="textarea"
                                                rows="4"
                                                className="form-control"
                                                placeholder={commentYourOrder}
                                                validate={{
                                                    required: {
                                                        value: true,
                                                        errorMessage: errorField
                                                    }
                                                }}
                                                // value={address?.postIndex}
                                                required={true}
                                            />
                                        </FormGroup>
                                    </div>
                                </Col>

                                <Col lg={5} md={6} className=" mt-4 mt-sm-0 pt-2 pt-sm-0">
                                    <div className="rounded shadow-lg p-4">
                                        {/*<div className="d-flex mb-4 justify-content-between">*/}
                                        {/*  <h5>4 Items</h5>*/}
                                        {/*  <Link to="shop-cart" className="text-muted h6">*/}
                                        {/*    Show Details*/}
                                        {/*  </Link>*/}
                                        {/*</div>*/}
                                        <div className="table-responsive">
                                            <Table className="table-center table-padding mb-0">
                                                <tbody>
                                                <tr>
                                                    <td className="h6 border-0">{subTotal}</td>
                                                    <td className="text-center font-weight-bold border-0">
                                                        {this.props?.basketOrder?.products?.price}
                                                    </td>
                                                </tr>
                                                {/*<tr>*/}
                                                {/*    <td className="h6">{delivery}</td>*/}
                                                {/*    <td className="text-center font-weight-bold">*/}
                                                {/*        $ 0.00*/}
                                                {/*    </td>*/}
                                                {/*</tr>*/}
                                                <tr className="bg-light">
                                                    <td className="h5 font-weight-bold">{total}</td>
                                                    <td className="text-center text-primary h4 font-weight-bold">
                                                        {this.props?.basketOrder?.products?.price}
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </Table>

                                            <ul className="list-unstyled mt-4 mb-0">
                                                <li>
                                                    <FormGroup className="mb-0">
                                                        <CustomInput
                                                            inline={true}
                                                            type="radio"
                                                            label="Bank Transfer"
                                                            id="banktransfer"
                                                            defaultChecked
                                                            name="customRadio"
                                                        />
                                                    </FormGroup>
                                                </li>

                                            </ul>

                                            <div className="mt-4 pt-2">
                                                <Button
                                                    // type={"button"}
                                                    // onClick={this.onSubmit}
                                                    className="btn btn-block btn-primary"
                                                >
                                                    {payment}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </AvForm>

                    </Container>
                </section>
            </React.Fragment>
        );
    }
}

const mstp = state => state
const mdtp = dispatch => bindActionCreators({setBasketsItem}, dispatch)
export default connect(mstp, mdtp)(ShopCheckouts);
