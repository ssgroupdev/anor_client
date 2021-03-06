import React, {Component} from "react";
import {
    Container,
    Row,
    Col,
    Table,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Form,
    FormGroup,
    Label, Button, Input,
} from "reactstrap";
import {AvForm, AvField, AvInput} from "availity-reactstrap-validation";
import {Link} from "react-router-dom";
import classnames from "classnames";

//Import Icons
import FeatherIcon from "feather-icons-react";

//Import Slick Slider CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//Import components
import PageBreadcrumb from "../../../components/Shared/PageBreadcrumb";

//Import Images
import client from "../../../assets/images/user.png";
import {connect} from "react-redux";
import {
    getAddressByUser,
    getUser,
    resetPassword,
    updateUser,
    updateUserAddress
} from "../../../server/config/web-site/user";
import {TOKEN} from "../../../utils/constants";
import {axiosInstance, imgUrl, token} from "../../../server/host";
import {deleteCookie, getCookie} from "../../../utils/useCookies";
import {userAccessTokenName} from "../../../constants/application";
import {getProvince, getRegionsByProvince, register} from "../../../server/config/web-site/client";
import {toast} from "react-toastify";
import {createFile} from "../../../server/config/web-site/file";
import {setCurrentUser} from "../../../redux/actions/lang";
import {getAllOrdersByUser} from "../../../server/config/user/order";
import {pageSize} from "../../../constants/all";
import {getOrders} from "../../../server/config/order";

class ShopMyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            size: pageSize,
            total: 0,
            orders: [],
            activeTab: "2",
            provinces: [],
            regionsList: [],
            data: {
                provinceId: null,
                regionId: null
            },
            pathItems: [
                //id must required
                {id: 1, name: props.lang.lang.index, link: "/"},
                {id: 3, name: props.lang.lang.myProfile},
            ],
            words: {
                table: {
                    number: "No.",
                    date: props.lang.lang.date,
                    status: props.lang.lang.status,
                    total: props.lang.lang.total,
                    action: props.lang.lang.actions,

                },
                hello: props.lang.lang.hello,
                order: props.lang.lang.orders,
                accDetails: props.lang.lang.accountDetails,
                address: props.lang.lang.address,
                shippingAddress: props.lang.lang.shipping,
                avatar: props.lang.lang.avatar,
                street: props.lang.lang.street,
                household: props.lang.lang.household,
                post: props.lang.lang.post,
                account: props.lang.lang.account,
                province: props.lang.lang.province,
                regions: props.lang.lang.regions,
                numberOfHome: props.lang.lang.numberOfHome,
                changeAddress: props.lang.lang.changeAddress,
                changePassword: props.lang.lang.changePassword,
                firstName: props.lang.lang.firstName,
                lastName: props.lang.lang.lastName,
                saveChanges: props.lang.lang.saveChanges,
                phone: props.lang.lang.phone,
                phoneTwo: props.lang.lang.phoneTwo,
                savePassword: props.lang.lang.savePassword,
                oldPassword: props.lang.lang.oldPassword,
                newPassword: props.lang.lang.newPassword,
                rePassword: props.lang.lang.rePassword,
                view: props.lang.lang.view,
                yourPhone: props.lang.lang.yourPhone,
                floor: props.lang.lang.floor,
                porch: props.lang.lang.porch


            },
            user: {
                fullName: "fullName",
                avatarUrl: null
            },
            address: {
                provinceId: null,
                provinceName: null,
                regionId: null,
                regionName: null,
                floor: null,
                household: null,
                id: null,
                numberHome: null,
                porch: null,
                postIndex: null,
                street: null,
            }
        };
        this.toggleTab = this.toggleTab.bind(this);
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }

    // form = React.createRef();

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

    componentDidMount() {
        this.getMe();
        this.getList();
    }

    handleValidSubmitAddress = (event, values) => {

        const sendData = {
            id: this.state.address.id,
            regionId: this.state.address.regionId,
            provinceId: this.state.address.provinceId,
            street: values.street,
            household: values.household,
            porch: values.porch,
            floor: values.floor,
            numberHome: values.numberHome,
            postIndex: values.post,
            phoneTwo: values.phoneTwo
        }

        updateUserAddress(sendData).then(res => {

            toast.success(this.props.lang.lang.finish)
            window.location.reload();
        }).catch(err => {
            this.error();
        })
    };

    getMe = () => {

        getUser().then(res => {
                if (res && res.data) {
                    this.setState({
                        user: {
                            ...res.data,
                            fullName: res.data?.firstName + " " + res.data?.lastName
                        },
                        address: {
                            ...res.data?.address
                        }
                    }, () => {

                        // this.form.current.resetFields();

                    })
                } else {

                    deleteCookie(userAccessTokenName)
                    this.props.props.history.push("/")

                }
            }
        ).catch(err => {

            deleteCookie(userAccessTokenName)
            this.props.props.history.push("/")

        })
        this.getUserOrders();

    }
    getUserOrders = () => {

        getAllOrdersByUser(this.state.current - 1, this.state.size).then(res => {
            this.setState({
                orders: res.data.content,
                total: res.data.totalItems,
                current: res.data.number
            })
        }).catch(err => {

        })
    }


    handleValidSubmitPassword = (event, values) => {

        resetPassword(values).then(res => {
            toast.success(this.props.lang.lang.finish)
            deleteCookie(userAccessTokenName)
            this.props.props.history.push("/login")
        }).catch(err => {
            this.error();
        })
    };

    handleValidSubmitPersonal = (event, values) => {

        const test = new FormData();
        test.append("file", this.state.file)
        // console.log(test.file)
        // console.log(this.state.file)
        if ((typeof this.state.file !== 'undefined') && this.state.file !== null) {
            createFile(test).then((res) => {
                if (res) {

                    const sendData = {
                        username: values.username,
                        firstName: values.firstName,
                        lastName: values.lastName,
                        avatarUrl: res.data
                    }

                    updateUser(sendData).then(res => {
                        toast.success(this.props.lang.lang.finish)

                        window.location.reload()
                    }).catch(err => {
                        this.error();
                    })
                }
            }).catch(err => () => toast.success(this.props.lang.lang.error))
        } else {

            const sendData = {
                username: values.username,
                firstName: values.firstName,
                lastName: values.lastName,
            }

            updateUser(sendData).then(res => {
                toast.success(this.props.lang.lang.finish)

                window.location.reload()
            }).catch(err => {
                this.error();
            })

        }
    };

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

    getRegions = () => {
        getRegionsByProvince(this.state.data && this.state.data.provinceId && this.state.data.provinceId).then(res => {
            if (res && res.data) {
                this.setState({
                    regionsList: res.data
                })
            }
        }).catch()
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

    error = () => toast(this.props.lang.lang.errorRegister);


    render() {
        const {words, user, provinces, regionsList} = this.state
        const {
            processing,
            cancelled,
            delivered,
            notFound,
            price,
            sum,
            deliveryDate,
            deliveryFinish,
            finished,
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
        const {
            provinceId,
            regionId,
            provinceName,
            regionName,
            floor,
            porch,
            household,
            numberHome,
            street,
            postIndex
        } = this.state.address
        return (
            <React.Fragment>
                {/* breadcrumb */}
                <PageBreadcrumb
                    title={words.account}
                    pathItems={this.state.pathItems}
                />
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
                        <Row>
                            <Col md={4} className="mt-4 pt-2">
                                <div className="media align-items-center">
                                    <img
                                        src={user.avatarUrl != null ? imgUrl + user.avatarUrl : client}
                                        className="avatar avatar-md-md rounded-circle"
                                        alt=""
                                    />
                                    <div className="ml-3">
                                        <h6 className="text-muted mb-0">{words.hello}</h6>
                                        <h5 className="mb-0">{user.fullName}</h5>
                                    </div>
                                </div>

                                <ul
                                    className="nav nav-pills nav-justified flex-column bg-white rounded mt-4 shadow p-3 mb-0"
                                    id="pills-tab"
                                    role="tablist"
                                >

                                    <NavItem className="mt-2">
                                        <NavLink
                                            className={classnames(
                                                {active: this.state.activeTab === "2"},
                                                "rounded"
                                            )}
                                            onClick={() => {
                                                this.toggleTab("2");
                                            }}
                                            to="#"
                                        >
                                            <div className="text-left py-1 px-3">
                                                <h6 className="mb-0">
                                                    <i className="uil uil-list-ul h5 align-middle mr-2 mb-0"></i>{" "}
                                                    {words.order}
                                                </h6>
                                            </div>
                                        </NavLink>
                                    </NavItem>


                                    <NavItem className="mt-2">
                                        <NavLink
                                            className={classnames(
                                                {active: this.state.activeTab === "4"},
                                                "rounded"
                                            )}
                                            onClick={() => {
                                                this.toggleTab("4");
                                            }}
                                            to="#"
                                        >
                                            <div className="text-left py-1 px-3">
                                                <h6 className="mb-0">
                                                    <i className="uil uil-map-marker h5 align-middle mr-2 mb-0"></i>{" "}
                                                    {words.address}

                                                </h6>
                                            </div>
                                        </NavLink>
                                    </NavItem>

                                    <NavItem className="mt-2">
                                        <NavLink
                                            className={classnames(
                                                {active: this.state.activeTab === "5"},
                                                "rounded"
                                            )}
                                            onClick={() => {
                                                this.toggleTab("5");
                                            }}
                                            to="#"
                                        >
                                            <div className="text-left py-1 px-3">
                                                <h6 className="mb-0">
                                                    <i className="uil uil-user h5 align-middle mr-2 mb-0"></i>{" "}
                                                    {words.accDetails}

                                                </h6>
                                            </div>
                                        </NavLink>
                                    </NavItem>
                                </ul>
                            </Col>

                            <Col md={8} xs={12} className="mt-4 pt-2">
                                <TabContent activeTab={this.state.activeTab}>


                                    <TabPane
                                        className="show fade bg-white shadow rounded p-4"
                                        tabId="2"
                                    >
                                        <div className="table-responsive bg-white shadow rounded">
                                            <Table className="mb-0 table-center table-nowrap">
                                                <thead>
                                                <tr>
                                                    <th scope="col">{words.table.number}</th>
                                                    <th scope="col">{words.table.date}</th>
                                                    <th scope="col">{words.table.status}</th>
                                                    <th scope="col">{price}</th>
                                                    {/*<th scope="col">{deliveryDate}</th>*/}
                                                    <th scope="col">{words.table.action}</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.state.orders.map((value, key) => (<tr>
                                                            <th scope="row">{++key}</th>
                                                            <td>{new Date(value.createdAt).toLocaleString().slice(0, 17)}</td>
                                                            {
                                                                value.status === "DELIVERY" ?
                                                                    <td className="text-success">{delivered}</td> : (
                                                                        value.status === "FINISHED" ?
                                                                            <td className="text-success">{finished}</td> : (
                                                                                value.status === "CANCELLED" || value.status === "CANCELLED_BY_BRANCH" ?
                                                                                    <td className="text-error">{cancelled}</td> : (
                                                                                        <td className="text-secondary">{processing}</td>
                                                                                    )
                                                                            )
                                                                    )
                                                            }

                                                            <td>
                                                                {value.totalPrice + " " + sum}
                                                            </td>
                                                            {/*<td>*/}
                                                            {/*    {value.status === "FINISHED" ? deliveryFinish : (value.status === "PROCESSING" ? notFound : new Date(value.deliveryDate).toLocaleString().slice(0, 17))}*/}
                                                            {/*</td>*/}
                                                            <td>
                                                                <Link to={"/my-checkouts/" + value.id}
                                                                      className="text-primary">
                                                                    {words.view} <i className="uil uil-arrow-right"></i>
                                                                </Link>
                                                            </td>
                                                        </tr>)
                                                    )
                                                }

                                                </tbody>
                                            </Table>
                                        </div>
                                    </TabPane>


                                    <TabPane
                                        className="show fade bg-white shadow rounded p-4"
                                        tabId="4"
                                    >

                                        <Row>

                                            <Col lg={8} className="pt-2">
                                                <div className="media align-items-center mb-4 justify-content-between">
                                                    <h5 className="mb-0">{words.shippingAddress}:</h5>
                                                </div>
                                                <div className="pt-4 border-top">
                                                    <p className="h6">{user.fullName}</p>
                                                    <p className="h6 text-muted">
                                                        {provinceName && (provinceName + " \n")}
                                                        {regionName && (regionName + ", ")}
                                                        {street && ("\n " + street)}
                                                    </p>
                                                    {numberHome &&
                                                        <p className="h6 text-muted">{words.numberOfHome + ": " + numberHome}</p>}
                                                    {porch &&
                                                        <p className="h6 text-muted">{words.porch + ": " + porch}</p>}
                                                    {floor &&
                                                        <p className="h6 text-muted">{words.floor + ": " + floor}</p>}
                                                    {household &&
                                                        <p className="h6 text-muted">{words.household + ": " + household}</p>}
                                                    {postIndex &&
                                                        <p className="h6 text-muted">{words.post + ": " + postIndex}</p>}
                                                    {user.username &&
                                                        <p className="h6 text-muted mb-0">{words.phone + ": " + user.username}</p>}
                                                    {this.state?.address?.phoneTwo &&
                                                        <p className="h6 text-muted mb-0">{words.phoneTwo + ": " + this.state?.address?.phoneTwo}</p>}
                                                </div>
                                            </Col>


                                        </Row>
                                        <h5 className="mt-4">{words.changeAddress}:</h5>
                                        {/*{*/}
                                        <AvForm className="login-form mt-4"
                                                onValidSubmit={this.handleValidSubmitAddress}
                                        >
                                            <Row>

                                                <Col md={6}>
                                                    <FormGroup className="position-relative"
                                                               disabled={true}>

                                                        <Label
                                                            for="exampleSelect"
                                                            // sm={2}
                                                            className={"text-bold"}
                                                            style={{fontWeight: "bold"}}
                                                        >
                                                            {words.province}
                                                        </Label>
                                                        <Input
                                                            required
                                                            id="exampleSelect"
                                                            name="provinceId"
                                                            type="select"
                                                            value={this.state.address.provinceId}
                                                            defaultValue={this.state.address.provinceId}
                                                            onChange={this.onProvinceChange}
                                                            validate={{
                                                                required: {
                                                                    value: true,
                                                                    errorMessage: errorField
                                                                },
                                                            }}
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
                                                    <FormGroup className="position-relative"
                                                               disabled={true}>
                                                        <Label
                                                            for="exampleSelect1"
                                                            className={"text-bold"}
                                                            style={{fontWeight: "bold"}}
                                                        >
                                                            {words.regions}
                                                        </Label>
                                                        <Input
                                                            required
                                                            id="exampleSelect1"
                                                            name="regionId"
                                                            type="select"
                                                            validate={{
                                                                required: {
                                                                    value: true,
                                                                    errorMessage: errorField
                                                                },
                                                            }}
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
                                                            {words.street} <span className="text-danger">*</span>
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
                                                            value={street}
                                                            placeholder={words.street}
                                                            name="street"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup className="position-relative">
                                                        <Label>
                                                            {words.numberOfHome}{" "}
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
                                                            name="numberHome"
                                                            placeholder={words.numberOfHome}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup className="position-relative">
                                                        <Label>
                                                            {words.porch}{" "}
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
                                                            value={porch}
                                                            name="porch"
                                                            placeholder={words.porch}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup className="position-relative">
                                                        <Label>
                                                            {words.floor}{" "}
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
                                                            value={floor}
                                                            name="floor"
                                                            placeholder={words.floor}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup className="position-relative">
                                                        <Label>
                                                            {words.household} <span className="text-danger">*</span>
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
                                                            value={household}
                                                            type="text"
                                                            className="form-control pl-5"
                                                            errorMessage={"Enter " + words.household}
                                                            validate={{
                                                                required: {
                                                                    value: true,
                                                                    errorMessage: errorNumberOfHome
                                                                }
                                                            }}
                                                            name={"household"}
                                                            placeholder={words.household}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup className="position-relative">
                                                        <Label>
                                                            {words.post}{" "}
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
                                                            value={postIndex}
                                                            name="post"
                                                            placeholder={words.post}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup className="position-relative">
                                                        <Label>
                                                            {words.phoneTwo}
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
                                                            validate={{
                                                                minLength: {
                                                                    value: 12,
                                                                    errorMessage: errorPhone
                                                                },
                                                                maxLength: {value: 12, errorMessage: errorPhone}
                                                            }}
                                                            name="phoneTwo"
                                                            value={this.state?.address?.phoneTwo ? this.state?.address?.phoneTwo : "998"}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <div className="col-lg-12 mt-2 mb-0">
                                                    <Button color={"primary"} className="btn btn-primary">
                                                        {words.saveChanges}
                                                    </Button>
                                                </div>
                                            </Row>
                                            {/*</Form>*/}
                                        </AvForm>

                                    </TabPane>

                                    <TabPane
                                        className="show fade bg-white shadow rounded p-4"
                                        tabId="5"
                                    >
                                        <AvForm className="login-form mt-4"
                                                onValidSubmit={this.handleValidSubmitPersonal}
                                                model={this.state.user}>
                                            {/*<Form>*/}
                                            <Row>
                                                <Col md={6}>
                                                    <FormGroup className="position-relative">
                                                        <Label>
                                                            {words.firstName} <span className="text-danger">*</span>
                                                        </Label>
                                                        <div className="position-relative">
                                                            <i>
                                                                <FeatherIcon
                                                                    icon="user"
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
                                                                    errorMessage: errorName
                                                                }
                                                            }}
                                                            placeholder={words.firstName}
                                                            name="firstName"
                                                            value={user.firstName}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup className="position-relative">
                                                        <Label>
                                                            {words.lastName} <span className="text-danger">*</span>
                                                        </Label>
                                                        <div className="position-relative">
                                                            <i>
                                                                <FeatherIcon
                                                                    icon="user-check"
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
                                                                    errorMessage: errorSurname
                                                                }
                                                            }}
                                                            placeholder={words.lastName}
                                                            name="lastName"
                                                            value={user.lastName}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup className="position-relative">
                                                        <Label>
                                                            {words.yourPhone} <span className="text-danger">*</span>
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
                                                            name="username"
                                                            value={user.username}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label>{words.avatar}</Label>
                                                        <div className="position-relative">
                                                            <FeatherIcon
                                                                icon="user"
                                                                className="fea icon-sm icons"
                                                            />
                                                            <input
                                                                name="name"
                                                                id="display-name"
                                                                type="file"
                                                                className="form-control pl-5"
                                                                onChange={(e) => {
                                                                    this.setState({
                                                                        file: e.target?.files[0]
                                                                    })
                                                                }}
                                                            />
                                                        </div>
                                                    </FormGroup>
                                                </Col>

                                                <div className="col-lg-12 mt-2 mb-0">
                                                    <Button color={"primary"} className="btn btn-primary">
                                                        {words.saveChanges}
                                                    </Button>
                                                </div>
                                            </Row>
                                            {/*</Form>*/}

                                        </AvForm>

                                        <h5 className="mt-3">{words.changePassword} :</h5>
                                        {/*<form>*/}

                                        <div className="row mt-3">
                                            <AvForm className="login-form mt-4"
                                                    onValidSubmit={this.handleValidSubmitPassword}
                                            >
                                                <div className="col-lg-12">
                                                    <FormGroup>
                                                        <Label>{words.oldPassword} :</Label>
                                                        <div className="position-relative">
                                                            <FeatherIcon
                                                                icon="lock"
                                                                className="fea icon-sm icons"
                                                            />
                                                            <AvField
                                                                type="password"
                                                                className="form-control pl-5"
                                                                validate={{
                                                                    required: {
                                                                        value: true,
                                                                        errorMessage: errorPassword
                                                                    },
                                                                    minLength: {
                                                                        value: 6,
                                                                        errorMessage: errorPassword
                                                                    }
                                                                }}
                                                                name="oldPassword"
                                                                placeholder={words.oldPassword}
                                                            />
                                                        </div>
                                                    </FormGroup>
                                                </div>

                                                <div className="col-lg-12">
                                                    <FormGroup>
                                                        <Label>{words.newPassword} :</Label>
                                                        <div className="position-relative">
                                                            <FeatherIcon
                                                                icon="lock"
                                                                className="fea icon-sm icons"
                                                            />
                                                            <AvField
                                                                type="password"
                                                                className="form-control pl-5"
                                                                validate={{
                                                                    required: {
                                                                        value: true,
                                                                        errorMessage: errorPassword
                                                                    },
                                                                    minLength: {
                                                                        value: 6,
                                                                        errorMessage: errorPassword
                                                                    }
                                                                }}
                                                                name="newPassword"
                                                                placeholder={words.newPassword}
                                                            />
                                                        </div>
                                                    </FormGroup>
                                                </div>

                                                <div className="col-lg-12">
                                                    <FormGroup>
                                                        <Label>{words.rePassword} :</Label>
                                                        <div className="position-relative">
                                                            <FeatherIcon
                                                                icon="lock"
                                                                className="fea icon-sm icons"
                                                            />
                                                            <AvField
                                                                type="password"
                                                                className="form-control pl-5"
                                                                validate={{
                                                                    required: {
                                                                        value: true,
                                                                        errorMessage: errorPassword
                                                                    },
                                                                    minLength: {
                                                                        value: 6,
                                                                        errorMessage: errorPassword
                                                                    },
                                                                    match: {
                                                                        value: "newPassword",
                                                                        errorMessage: errorConfirmPass
                                                                    },
                                                                }}
                                                                name="confirmPassword"
                                                                placeholder={words.rePassword}
                                                            />
                                                        </div>
                                                    </FormGroup>
                                                </div>

                                                <div className="col-lg-12 mt-2 mb-0">
                                                    <Button color={"primary"} className="btn btn-primary">
                                                        {words.savePassword}
                                                    </Button>
                                                </div>
                                            </AvForm>
                                        </div>
                                        {/*</form>*/}
                                    </TabPane>
                                </TabContent>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        )
            ;
    }
}

const mstp = state => state;
export default connect(mstp, {setCurrentUser})(ShopMyAccount);

