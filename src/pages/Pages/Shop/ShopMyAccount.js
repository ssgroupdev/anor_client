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
    Label,
} from "reactstrap";
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
import client from "../../../assets/images/client/05.jpg";
import {connect} from "react-redux";
import {getAddressByUser, getUser} from "../../../server/config/web-site/user";
import {TOKEN} from "../../../utils/constants";
import {axiosInstance, imgUrl} from "../../../server/host";
import {getCookie} from "../../../utils/useCookies";
import {userAccessTokenName} from "../../../constants/application";

class ShopMyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "2",
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
                shippingAddress: props.lang.lang.shippingAddress,
                avatar: props.lang.lang.avatar,
                street: props.lang.lang.street,
                account: props.lang.lang.account,
                province: props.lang.lang.province,
                regions: props.lang.lang.regions,
                numberOfHome: props.lang.lang.numberOfHome,
                changeAddress: props.lang.lang.changeAddress,
                changePassword: props.lang.lang.changePassword,
                firstName: props.lang.lang.firstName,
                lastName: props.lang.lang.lastName,
                saveChanges: props.lang.lang.saveChanges,
                savePassword: props.lang.lang.savePassword,
                oldPassword: props.lang.lang.oldPassword,
                newPassword: props.lang.lang.newPassword,
                rePassword: props.lang.lang.rePassword,
                view: props.lang.lang.view,
                yourPhone: props.lang.lang.yourPhone


            },
            user: {
                fullName: "fullName",
                avatarUrl: null
            },
            address: {
                provinceId:null,
                provinceName:null,
                regionId:null,
                regionName:null,
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

    getMe = () => {

        getUser().then(res => {
            this.setState({
                user: {
                    ...res.data,
                    fullName: res.data.firstName +" "+ res.data.lastName
                }
            })
        }).catch(err => {
            console.log(err)
          })
    }

    componentDidMount() {
        if (getCookie(userAccessTokenName) != null) {
            this.getMe();

        } else {

            this.props.props.history.push("/login")

        }
    }


    render() {
        const {words, user} = this.state
        const {provinceId, regionId, provinceName, regionName, floor, porch, household, numberHome, street, postIndex} = this.state.address
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
                                        src={user.avatarUrl!=null?imgUrl+user.avatarUrl:client}
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
                                                    <th scope="col">{words.table.total}</th>
                                                    <th scope="col">{words.table.action}</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <th scope="row">7107</th>
                                                    <td>1st November 2020</td>
                                                    <td className="text-success">Delivered</td>
                                                    <td>
                                                        $ 320{" "}
                                                        <span className="text-muted">for 2items</span>
                                                    </td>
                                                    <td>
                                                        <Link to="/my-checkouts/1" className="text-primary">
                                                            {} <i className="uil uil-arrow-right"></i>
                                                        </Link>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <th scope="row">8007</th>
                                                    <td>4th November 2020</td>
                                                    <td className="text-muted">Processing</td>
                                                    <td>
                                                        $ 800{" "}
                                                        <span className="text-muted">for 1item</span>
                                                    </td>
                                                    <td>
                                                        <Link to="/my-checkouts/1" className="text-primary">
                                                            {words.view} <i className="uil uil-arrow-right"></i>
                                                        </Link>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <th scope="row">8008</th>
                                                    <td>4th November 2020</td>
                                                    <td className="text-danger">Canceled</td>
                                                    <td>
                                                        $ 800{" "}
                                                        <span className="text-muted">for 1item</span>
                                                    </td>
                                                    <td>
                                                        <Link to="/my-checkouts/1" className="text-primary">
                                                            {words.view} <i className="uil uil-arrow-right"></i>
                                                        </Link>
                                                    </td>
                                                </tr>

                                                </tbody>
                                            </Table>
                                        </div>
                                    </TabPane>


                                    <TabPane
                                        className="show fade bg-white shadow rounded p-4"
                                        tabId="4"
                                    >

                                        <Row>

                                            <Col lg={6} className="mt-4 pt-2">
                                                <div className="media align-items-center mb-4 justify-content-between">
                                                    <h5 className="mb-0">{words.shippingAddress}:</h5>
                                                    <Link to="#" className="text-primary h5 mb-0">
                                                        <i className="uil uil-edit align-middle"></i>
                                                    </Link>
                                                </div>
                                                <div className="pt-4 border-top">
                                                    <p className="h6">{user.fullName}</p>
                                                    <p className="h6 text-muted">
            {provinceName}{" "}{words.province},{" "}{regionName}{" "}{words.regions},{"\n "}{street}{" "}{words.street}
                                                    </p>
                                                    <p className="h6 text-muted">{numberHome}</p>
                                                    <p className="h6 text-muted">{household}</p>
                                                    <p className="h6 text-muted">{porch}</p>
                                                    <p className="h6 text-muted">{floor}</p>
                                                    <p className="h6 text-muted">{numberHome}</p>
                                                    <p className="h6 text-muted mb-0">{user.username}</p>
                                                </div>
                                            </Col>


                                        </Row>
                                        <h5 className="mt-4">{words.changeAddress}:</h5>

                                        <Form>
                                            <Row>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label>{words.firstName}</Label>
                                                        <div className="position-relative">
                                                            <FeatherIcon
                                                                icon="user"
                                                                className="fea icon-sm icons"
                                                            />
                                                            <input
                                                                name="name"
                                                                id="first-name"
                                                                type="text"
                                                                className="form-control pl-5"
                                                                defaultValue="Temur"
                                                            />
                                                        </div>
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label>{words.lastName}</Label>
                                                        <div className="position-relative">
                                                            <FeatherIcon
                                                                icon="user-check"
                                                                className="fea icon-sm icons"
                                                            />
                                                            <input
                                                                name="name"
                                                                id="last-name"
                                                                type="text"
                                                                className="form-control pl-5"
                                                                defaultValue="Hikmatov"
                                                            />
                                                        </div>
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label>{words.yourPhone}</Label>
                                                        <div className="position-relative">
                                                            <FeatherIcon
                                                                icon="mail"
                                                                className="fea icon-sm icons"
                                                            />
                                                            <input
                                                                name="email"
                                                                id="email"
                                                                type="email"
                                                                className="form-control pl-5"
                                                                defaultValue="callyjoseph@gmail.com"
                                                            />
                                                        </div>
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label>{words.street}</Label>
                                                        <div className="position-relative">
                                                            <FeatherIcon
                                                                icon="user-check"
                                                                className="fea icon-sm icons"
                                                            />
                                                            <input
                                                                name="name"
                                                                id="display-name"
                                                                type="text"
                                                                className="form-control pl-5"
                                                                defaultValue="cally_joseph"
                                                            />
                                                        </div>
                                                    </FormGroup>
                                                </Col>

                                                <div className="col-lg-12 mt-2 mb-0">
                                                    <button className="btn btn-primary">
                                                        {words.saveChanges}
                                                    </button>
                                                </div>
                                            </Row>
                                        </Form>

                                    </TabPane>

                                    <TabPane
                                        className="show fade bg-white shadow rounded p-4"
                                        tabId="5"
                                    >
                                        <Form>
                                            <Row>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label>First Name</Label>
                                                        <div className="position-relative">
                                                            <FeatherIcon
                                                                icon="user"
                                                                className="fea icon-sm icons"
                                                            />
                                                            <input
                                                                name="name"
                                                                id="first-name"
                                                                type="text"
                                                                className="form-control pl-5"
                                                                defaultValue="Cally"
                                                            />
                                                        </div>
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label>Last Name</Label>
                                                        <div className="position-relative">
                                                            <FeatherIcon
                                                                icon="user-check"
                                                                className="fea icon-sm icons"
                                                            />
                                                            <input
                                                                name="name"
                                                                id="last-name"
                                                                type="text"
                                                                className="form-control pl-5"
                                                                defaultValue="Joseph"
                                                            />
                                                        </div>
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label>Your Email</Label>
                                                        <div className="position-relative">
                                                            <FeatherIcon
                                                                icon="mail"
                                                                className="fea icon-sm icons"
                                                            />
                                                            <input
                                                                name="email"
                                                                id="email"
                                                                type="email"
                                                                className="form-control pl-5"
                                                                defaultValue="callyjoseph@gmail.com"
                                                            />
                                                        </div>
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label>Display Name</Label>
                                                        <div className="position-relative">
                                                            <FeatherIcon
                                                                icon="user-check"
                                                                className="fea icon-sm icons"
                                                            />
                                                            <input
                                                                name="name"
                                                                id="display-name"
                                                                type="text"
                                                                className="form-control pl-5"
                                                                defaultValue="cally_joseph"
                                                            />
                                                        </div>
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
                                                            />
                                                        </div>
                                                    </FormGroup>
                                                </Col>

                                                <div className="col-lg-12 mt-2 mb-0">
                                                    <button className="btn btn-primary">
                                                        {words.saveChanges}
                                                    </button>
                                                </div>
                                            </Row>
                                        </Form>

                                        <h5 className="mt-4">{words.changePassword} :</h5>
                                        <form>
                                            <div className="row mt-3">
                                                <div className="col-lg-12">
                                                    <FormGroup>
                                                        <Label>{words.oldPassword} :</Label>
                                                        <div className="position-relative">
                                                            <FeatherIcon
                                                                icon="lock"
                                                                className="fea icon-sm icons"
                                                            />
                                                            <input
                                                                type="password"
                                                                className="form-control pl-5"
                                                                placeholder="Old password"
                                                                required=""
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
                                                            <input
                                                                type="password"
                                                                className="form-control pl-5"
                                                                placeholder="New password"
                                                                required=""
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
                                                            <input
                                                                type="password"
                                                                className="form-control pl-5"
                                                                placeholder="Re-type New password"
                                                                required=""
                                                            />
                                                        </div>
                                                    </FormGroup>
                                                </div>

                                                <div className="col-lg-12 mt-2 mb-0">
                                                    <button className="btn btn-primary">
                                                        {words.savePassword}
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </TabPane>
                                </TabContent>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        );
    }
}

const mstp = state => state;
export default connect(mstp, null)(ShopMyAccount);

