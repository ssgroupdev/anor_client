import React, {Component} from "react";
import {Link} from "react-router-dom";
import {
    Container,
    Row,
    Col
} from "reactstrap";

//Import Icons
import FeatherIcon from "feather-icons-react";

//Import Images
import imgbg from "../../../assets/images/job/company.jpg";
import profile from "../../../assets/images/job/Circleci.svg";

//Import Images
import logolight from "../../../assets/images/logo-light.png";
import logodark from "../../../assets/images/logo-dark.png";
import {connect} from "react-redux";
import {getBranchId} from "../../../server/config/web-site/brand/branches";
import {imgUrl} from "../../../server/host";

class PageJobCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            branch: {
                imageUrl: null,
                id: null,
                description: null,
                name: null,
                locationUrl: null,
                phone: null
            }
        };
        this.togglemodal.bind(this);
    }


    getData = () => {
        getBranchId(this.props.props?.match?.params?.id).then(res => {
            this.setState({
                branch: res.data,
                id: res.data.id
            })

        }).catch(err => {

        })
    }

    componentDidMount() {
        this.getData();
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
            document.getElementById("buyButton").className = "btn btn-primary";
            document.getElementById("brandLogo").src = logodark;
        } else {
            document.getElementById("topnav").classList.remove("nav-sticky");
            document.getElementById("buyButton").className = "btn btn-light";
            document.getElementById("brandLogo").src = logolight;
        }
    };

    togglemodal = () => {
        this.setState((prevState) => ({
            modal: !prevState.modal,
        }));
    };

    render() {
        const {location, aboutUs, phone, storeDetails, store, seeAllPro} = this.props.lang.lang
        const {branch} = this.state
        return (
            <React.Fragment>
                <section
                    className="bg-half-260 d-table w-100"
                    style={{background: `url(${imgbg}) center center`}}
                >
                    <div className="bg-overlay"></div>
                </section>
                <section className="section">
                    <Container>
                        <Row>
                            <Col lg="4" md="5" xs="12">
                                <div className="job-profile position-relative">
                                    <div className="rounded shadow bg-white">
                                        <div className="text-center py-5 border-bottom">
                                            {branch.imageUrl && <img
                                                src={imgUrl + branch.imageUrl}
                                                className="avatar img-cover avatar-medium mx-auto rounded-circle d-block"
                                                alt=""
                                            />}
                                            <h5 className="mt-3 mb-0">{branch.name}</h5>
                                            {/*<p className="text-muted mb-0">Internet Services</p>*/}
                                        </div>

                                        <div className="p-4">
                                            {( branch.phone) &&
                                                <h5>{storeDetails}:</h5>
                                            }
                                            <ul className="list-unstyled feature-list mb-4">
                                                {branch.phone && <li className="h6">
                                                    <i>
                                                        <FeatherIcon
                                                            icon="link"
                                                            className="fea icon-sm text-warning mr-2"
                                                        />
                                                    </i><span
                                                    className="text-muted">{phone} : </span> {branch.phone}
                                                </li>}
                                            </ul>
                                            <Link
                                                to={"/stores/" + this.state.id + "/products"}
                                                onClick={this.togglemodal}
                                                className="btn btn-block btn-primary"
                                            >
                                                {seeAllPro}
                                            </Link>
                                        </div>
                                    </div>

                                    {branch.locationUrl && <div className="map mt-2 pt-2">
                                        <div style={{width: "100%"}}>
                                          <p dangerouslySetInnerHTML={{__html: branch.locationUrl}}>
                                          </p></div>
                                    </div>}
                                </div>
                            </Col>

                            <Col lg="8" md="7" xs="12" className="mt-0 mt-sm-0 pt-0 pt-sm-0">
                                <div className="ml-md-4">
                                    <h4>{aboutUs}:</h4>
                                    <p className="text-muted" dangerouslySetInnerHTML={{__html: branch.description}}/>

                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

            </React.Fragment>
        );
    }
}

const mstp = state => state

export default connect(mstp, null)(PageJobCompany);