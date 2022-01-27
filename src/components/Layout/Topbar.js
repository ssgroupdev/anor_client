import React, {Component} from "react";
import {Link, NavLink} from "react-router-dom";
import {withRouter} from "react-router";
import {
    Container,
    Form,
    Modal,
    ModalBody,
    Dropdown,
    DropdownMenu,
    DropdownToggle, Button, ModalHeader, ModalFooter, FormGroup,
} from "reactstrap";

//Import images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";
import shop1 from "../../assets/images/shop/product/s-1.jpg";
import shop2 from "../../assets/images/shop/product/s-2.jpg";
import shop3 from "../../assets/images/shop/product/s-3.jpg";
import NavbarButtons from "../Shared/NavbarButtons";
import {bindActionCreators} from "redux";
import {changeLang} from "../../redux/actions/lang";
import {connect} from "react-redux";

class Topbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            dropdownOpenShop: false,
            isLogin: true,
            catLinks: [
                //Note : each child and nested child must have unique id
                {
                    id: 1,
                    title: "Laptops, Printers",
                    link: "/category/" + this.id,
                    isOpenSubMenu: false,
                    child: [
                        {
                            id: 7,
                            title: "Laptop",
                            link: "/category-products/" + this.id,
                            isOpenNestedSubMenu: false,
                            nestedChild: [
                                {
                                    title: "HP",
                                    link: "/category-products/" + this.id,
                                }, {
                                    title: "DY",
                                    link: "/category-products/" + this.id,
                                }, {
                                    title: "TEST",
                                    link: "/category-products/" + this.id,
                                }
                            ],
                        },

                    ],
                }, {
                    id: 2,
                    title: "Family",
                    link: "/category/" + this.id,
                    isOpenSubMenu: false,
                    child: [
                        {
                            id: 7,
                            title: "Laptop",
                            link: "/category-products/" + this.id,
                            isOpenNestedSubMenu: false,
                            nestedChild: [
                                {
                                    title: "HP",
                                    link: "/category-products/" + this.id,
                                }, {
                                    title: "DY",
                                    link: "/category-products/" + this.id,
                                }, {
                                    title: "TEST",
                                    link: "/category-products/" + this.id,
                                }
                            ],
                        },

                    ],
                }, {
                    id: 3,
                    title: "Auto",
                    link: "/category/" + this.id,
                    isOpenSubMenu: false,
                    child: [
                        {
                            id: 7,
                            title: "Laptop",
                            link: "/category-products/" + this.id,
                            isOpenNestedSubMenu: false,
                            nestedChild: [
                                {
                                    title: "HP",
                                    link: "/category-products/" + this.id,
                                }, {
                                    title: "DY",
                                    link: "/category-products/" + this.id,
                                }, {
                                    title: "TEST",
                                    link: "/category-products/" + this.id,
                                }
                            ],
                        },

                    ],
                }, {
                    id: 4,
                    title: "Mobile, Accessuars",
                    link: "/category/" + this.id,
                    isOpenSubMenu: false,
                    child: [
                        {
                            id: 7,
                            title: "Laptop",
                            link: "/category-products/" + this.id,
                            isOpenNestedSubMenu: false,
                            nestedChild: [
                                {
                                    title: "HP",
                                    link: "/category-products/" + this.id,
                                }, {
                                    title: "DY",
                                    link: "/category-products/" + this.id,
                                }, {
                                    title: "TEST",
                                    link: "/category-products/" + this.id,
                                }
                            ],
                        },

                    ],
                }, {
                    id: 5,
                    title: "GAMING",
                    link: "/category/" + this.id,
                    isOpenSubMenu: false,
                    child: [
                        {
                            id: 7,
                            title: "Laptop",
                            link: "/category-products/" + this.id,
                            isOpenNestedSubMenu: false,
                        },
                        {
                            id: 7,
                            title: "Laptop",
                            link: "/category-products/" + this.id,
                            isOpenNestedSubMenu: false,
                        },
                        {
                            id: 7,
                            title: "Laptop",
                            link: "/category-products/" + this.id,
                            isOpenNestedSubMenu: false,
                        },

                    ],
                }
            ],
            wishlistModal: false,
            dropdownIsOpen: false,
            isScrollNav: true,
            modalLogout: false,
            isLang: localStorage.getItem("lang") === "uz",
            isMinimize: window.innerWidth < 500
        };
        this.toggleLine = this.toggleLine.bind(this);
        this.openBlock.bind(this);
        this.openNestedBlock.bind(this);
        this.toggleDropdownShop.bind(this);
        this.toggleWishlistModal.bind(this);
        this.toggleDropdownIsOpen.bind(this);
    }

    onLanguageChange = () => {
        localStorage.setItem("lang", this.state.isLang ? "ru" : "uz")
        this.props.changeLang(localStorage.getItem("lang"))
        this.setState({isLang: localStorage.getItem("lang") === "uz"})

    };

    toggleWishlistModal = () => {
        this.setState((prevState) => ({
            wishlistModal: !prevState.wishlistModal,
        }));
    };

    toggleDropdownShop = () => {
        this.setState({
            dropdownOpenShop: !this.state.dropdownOpenShop,
        });
    };
    toggleDropdownIsOpen = () => {
        this.setState({
            dropdownIsOpen: !this.state.dropdownIsOpen,
        });
    };

    toggleLine() {
        this.setState((prevState) => ({isOpen: !prevState.isOpen}));
    }

    toggleLog = () => {
        this.setState({
            modalLogout: !this.state.modalLogout
        })
    }
    handleLogOut = () => {

        this.setState({
            isLogin: false,
            modalLogout: false
        })

    };

    componentDidMount() {

        var matchingMenuItem = null;
        var ul = document.getElementById("top-menu");
        var items = ul.getElementsByTagName("a");
        for (var i = 0; i < items.length; ++i) {
            if (this.props.location.pathname === items[i].pathname) {
                matchingMenuItem = items[i];
                break;
            }
        }

        window.addEventListener("scroll", () => {
            if (window.scrollY === 0) {
                this.setState({isScrollNav: true})
            } else {
                this.setState({isScrollNav: false})
            }
        })
        if (matchingMenuItem) {
            this.activateParentDropdown(matchingMenuItem);
        }

    }

    activateParentDropdown = (item) => {
        const parent = item.parentElement;
        if (parent) {
            parent.classList.add("active"); // li
            const parent1 = parent.parentElement;
            parent1.classList.add("active"); // li
            if (parent1) {
                const parent2 = parent1.parentElement;
                parent2.classList.add("active"); // li
                if (parent2) {
                    const parent3 = parent2.parentElement;
                    parent3.classList.add("active"); // li
                    if (parent3) {
                        const parent4 = parent3.parentElement;
                        parent4.classList.add("active"); // li
                    }
                }
            }
        }
    };

    openBlock = (level2_id) => {
        var tmpLinks = this.state.catLinks;
        tmpLinks.map((tmpLink) =>
            //Match level 2 id
            tmpLink.id === level2_id
                ? (tmpLink.isOpenSubMenu = !tmpLink.isOpenSubMenu)
                : false
        );
        this.setState({catLinks: tmpLinks});
    };

    openNestedBlock = (level2_id, level3_id) => {
        var tmpLinks = this.state.catLinks;
        tmpLinks.map((tmpLink) =>
            //Match level 2 id
            tmpLink.id === level2_id
                ? tmpLink.child.map((tmpchild) =>
                    //if level1 id is matched then match level 3 id
                    tmpchild.id === level3_id
                        ? //if id is matched then update status(level 3 sub menu will be open)
                        (tmpchild.isOpenNestedSubMenu = !tmpchild.isOpenNestedSubMenu)
                        : (tmpchild.isOpenNestedSubMenu = false)
                )
                : false
        );
        this.setState({catLinks: tmpLinks});
    };

    render() {
        const {search, account, searchDesc, logOut, ok, cancel, logOutDesc} = this.props.lang.lang;
        return (
            <React.Fragment>
                {
                    (this.state.isScrollNav && window.innerWidth > 992) &&
                    <header id="topnav" className="defaultscroll sticky mb-5  for-btns" style={{zIndex: "1050"}}>
                        <Container>

                            <div>
                                <Link className="logo" to="/">
                                    <img src={logodark} id="brandLogo" height="24" alt=""/>
                                </Link>
                            </div>
                            <div className="subcribe-form pt-2 d-inline-block">
                                <Form>
                                    <FormGroup className="mb-0">
                                        <input
                                            type="text"
                                            id="help"
                                            name="name"
                                            className="border bg-white rounded-pill shadow"
                                            required
                                            placeholder={searchDesc}
                                        />
                                        <Button type="submit" color="primary" className="btn-pills">
                                            {search}
                                        </Button>
                                    </FormGroup>
                                </Form>
                            </div>
                            <NavbarButtons/>

                            {window.innerWidth > 992 && <ul className="buy-button list-inline mb-0">
                                <li className="list-inline-item mb-0 pr-1">
                                    <Button
                                        type="button"
                                        className="btn btn-icon btn-soft-danger text-bold
                                        "
                                        onClick={this.onLanguageChange}
                                    >
                                        {this.state.isLang ? "РУ" : "UZ"}
                                    </Button>

                                </li>
                                <li className="list-inline-item mb-0 pr-1">
                                    <Dropdown
                                        isOpen={this.state.dropdownOpenShop}
                                        toggle={this.toggleDropdownShop}
                                    >
                                        <Link to={"/shop-cart"}>
                                            <DropdownToggle
                                                type="button"
                                                className="btn btn-icon btn-soft-primary "
                                            >
                                                <i className="uil uil-shopping-cart align-middle icons"></i>
                                            </DropdownToggle>
                                        </Link>
                                    </Dropdown>
                                </li>

                                <li className="list-inline-item mb-0" style={{zIndex: "500"}}>

                                    {
                                        this.state.isLogin ? <Dropdown
                                            color="primary"
                                            isOpen={this.state.dropdownIsOpen}
                                            toggle={this.toggleDropdownIsOpen}
                                        >
                                            <DropdownToggle
                                                type="button"
                                                className="btn btn-icon btn-soft-primary"
                                            >
                                                <i className="uil uil-user align-middle icons"></i>
                                            </DropdownToggle>
                                            <DropdownMenu
                                                direction="left"
                                                className="dd-menu bg-white shadow rounded border-0 mt-3 py-3 "
                                                style={{width: "200px", zIndex: "200000000"}}
                                            >


                                                <Link className="dropdown-item text-dark" to="/shop-myaccount"
                                                      style={{zIndex: "1050"}}>
                                                    <i className="uil uil-user align-middle mr-1"/>{" "}
                                                    {account}
                                                </Link>

                                                <div className="dropdown-divider my-3 border-top"></div>
                                                <div className=" dropdown-item text-dark" onClick={this.toggleLog}>
                                                    <i className="uil uil-sign-out-alt align-middle mr-1"></i>{" "}
                                                    {logOut}
                                                </div>
                                            </DropdownMenu>
                                        </Dropdown> : <>

                                            <NavLink to={"/login"} activeStyle={{color: "white!important"}}>
                                                <button
                                                    type="button"
                                                    className="btn btn-icon btn-soft-primary"
                                                >
                                                    <i className="uil uil-sign-in-alt align-middle icons"/>
                                                </button>
                                            </NavLink>
                                            <NavLink to={"/register"} activeStyle={{color: "white!important"}}>

                                                <button
                                                    type="button"
                                                    className="btn btn-icon btn-soft-primary"
                                                >
                                                    <i className="uil uil-sign-out-alt align-middle icons"/>
                                                </button>
                                            </NavLink>
                                        </>}
                                </li>

                            </ul>
                            }


                        </Container>
                    </header>
                }

                {/*<div style={{marginTop: "400px"}}>*/}
                <header id="topnav"
                        className={(this.state.isScrollNav && window.innerWidth > 992) && " mt-5  for-margin-70"}>
                    <Container>
                        {
                            !(this.state.isScrollNav && window.innerWidth > 992) && <div className="menu-extras1">
                                <div className="menu-item1">
                                    <div>
                                        <Link className="logo" to="/">
                                            <img src={logodark} height="24" alt=""/>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="menu-extras">
                            <div className="menu-item">

                                <Link
                                    to="#"
                                    onClick={this.toggleLine}
                                    className={
                                        this.state.isOpen ? "navbar-toggle open" : "navbar-toggle"
                                    }
                                >
                                    <div className="lines">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        {window.innerWidth < 992 && this.state.isOpen && <div className={"for-icons pr-2"}>
                            <div className="subcribe-form pt-2 d-inline-block">
                                <Form>
                                    <FormGroup className="mb-0">
                                        <input
                                            type="text"
                                            id="help"
                                            name="name"
                                            className="border bg-white rounded-pill shadow"
                                            required
                                            placeholder={searchDesc}
                                        />
                                        <Button type="submit" color="primary" className="btn-pills">
                                            {search}
                                        </Button>
                                    </FormGroup>
                                </Form>
                            </div>
                            <ul className="buy-button list-inline mb-0">
                                <li className="list-inline-item mb-0 pr-1">
                                    <Button
                                        type="button"
                                        className="btn btn-icon btn-soft-danger text-bold
                                        "
                                        onClick={this.onLanguageChange}
                                    >
                                        {this.state.isLang ? "РУ" : "UZ"}
                                    </Button>


                                </li>
                                <li className="list-inline-item mb-0 pr-1">
                                    <Dropdown
                                        isOpen={this.state.dropdownOpenShop}
                                        toggle={this.toggleDropdownShop}
                                    >
                                        <Link to={"/shop-cart"}>
                                            <DropdownToggle
                                                type="button"
                                                className="btn btn-icon btn-soft-primary "
                                            >
                                                <i className="uil uil-shopping-cart align-middle icons"></i>
                                            </DropdownToggle>
                                        </Link>
                                    </Dropdown>
                                </li>

                                <li className="list-inline-item mb-0" style={{zIndex: "1050000"}}>
                                    <Dropdown
                                        color="primary"
                                        isOpen={this.state.dropdownIsOpen}
                                        toggle={this.toggleDropdownIsOpen}
                                    >
                                        <DropdownToggle
                                            type="button"
                                            className="btn btn-icon btn-soft-primary"
                                        >
                                            <i className="uil uil-user align-middle icons"></i>
                                        </DropdownToggle>
                                        <DropdownMenu
                                            direction="left"
                                            className="dd-menu bg-white shadow rounded border-0 mt-3 py-3"
                                            style={{width: "200px"}}
                                        >
                                            <Link className="dropdown-item text-dark" to="/shop-myaccount">
                                                <i className="uil uil-user align-middle mr-1"></i>{" "}
                                                {account}
                                            </Link>

                                            <div className="dropdown-divider my-3 border-top"></div>
                                            <div className=" dropdown-item text-dark" onClick={this.toggleLog}>
                                                <i className="uil uil-sign-out-alt align-middle mr-1"></i>{" "}
                                                {logOut}
                                            </div>

                                        </DropdownMenu>
                                    </Dropdown>
                                </li>

                            </ul>
                        </div>}
                        <div id="navigation"
                             style={{display: this.state.isOpen ? "block" : "none"}}
                        >

                            <ul className="navigation-menu text-center" style={{fontSize: "13px"}} id="top-menu">
                                {this.state.catLinks.map((navLink, key) =>
                                    navLink.child ? (
                                        <li className="has-submenu" key={key}>
                                            {/* child item(menu Item) - Level 1 */}
                                            <Link
                                                to={navLink.link}
                                                onMouseOver={(event) => {
                                                    event.preventDefault();
                                                    this.openBlock(navLink.id);
                                                }} style={{fontSize: "13px!important"}}

                                            >
                                                {navLink.title}
                                            </Link>
                                            {/* <i className="mdi mdi-chevron-right mr-1"></i> */}
                                            <div className={"pl-4 h-100"}  onClick={(event) => {
                                                event.preventDefault();
                                                this.openBlock(navLink.id);
                                            }}>
                                            <span className="menu-arrow "></span>

                                            </div>
                                            {navLink.isMegaMenu ? (
                                                // if menu is mega menu(2 columns grid)
                                                <ul
                                                    className={
                                                        navLink.isOpenSubMenu
                                                            ? "submenu megamenu open"
                                                            : "submenu megamenu"
                                                    }
                                                >
                                                    <li>
                                                        <ul>
                                                            {navLink.child.map((item, childKey) =>
                                                                    item.id < 18 ? (
                                                                        <li key={childKey}>
                                                                            <Link to={item.link}>
                                                                                {item.title}
                                                                                {item.isNew ? (
                                                                                    <span
                                                                                        className="badge badge-danger rounded ml-2">
                                          new
                                        </span>
                                                                                ) : null}
                                                                            </Link>
                                                                        </li>
                                                                    ) : null
                                                            )}
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <ul>
                                                            {navLink.child.map((item, childKey) =>
                                                                    item.id < 33 && item.id > 17 ? (
                                                                        <li key={childKey}>
                                                                            <Link to={item.link}>
                                                                                {item.title}
                                                                                {item.isNew ? (
                                                                                    <span
                                                                                        className="badge badge-danger rounded ml-2">
                                          new
                                        </span>
                                                                                ) : null}
                                                                            </Link>
                                                                        </li>
                                                                    ) : null
                                                            )}
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <ul>
                                                            {navLink.child.map((item, childKey) =>
                                                                    item.id > 32 ? (
                                                                        <li key={childKey}>
                                                                            <Link to={item.link}>
                                                                                {item.title}
                                                                                {item.isOnePage ? (
                                                                                    <span
                                                                                        className="badge badge-warning rounded ml-2">
                                          Onepage
                                        </span>
                                                                                ) : null}
                                                                                {item.isupdatePage ? (
                                                                                    <span
                                                                                        className="badge badge-pill badge-info">
                                          Updated
                                        </span>
                                                                                ) : null}
                                                                            </Link>
                                                                        </li>
                                                                    ) : null
                                                            )}
                                                        </ul>
                                                    </li>
                                                </ul>
                                            ) : (
                                                // if menu is not mega menu(1grid)
                                                <ul
                                                    className={
                                                        navLink.isOpenSubMenu ? "submenu open" : "submenu"
                                                    }
                                                >
                                                    {navLink.child.map((childArray, childKey) =>
                                                            childArray.nestedChild ? (
                                                                // sub menu item - Level 2
                                                                <li className="has-submenu" key={childKey}>
                                                                    <Link
                                                                        to={childArray.link}
                                                                        onMouseOver={(event) => {
                                                                            event.preventDefault();
                                                                            this.openNestedBlock(
                                                                                navLink.id,
                                                                                childArray.id
                                                                            );
                                                                        }}
                                                                    >
                                                                        {childArray.title}{" "}
                                                                        {childArray.isNew ? (
                                                                            <span
                                                                                className="badge badge-pill badge-success">
                                      Added
                                    </span>
                                                                        ) : null}
                                                                    </Link>
                                                                    <div className={"pl-4  h-100"}  onClick={(event) => {
                                                                        event.preventDefault();
                                                                        this.openNestedBlock(navLink.id, childArray.id);
                                                                    }}>

                                                                    <span className="submenu-arrow"></span>

                                                                    </div>

                                                                    <ul
                                                                        className={
                                                                            childArray.isOpenNestedSubMenu
                                                                                ? "submenu open"
                                                                                : "submenu"
                                                                        }
                                                                    >
                                                                        {childArray.nestedChild.map(
                                                                            (nestedChildArray, nestedKey) => (
                                                                                // nested sub menu item - Level 3
                                                                                <li key={nestedKey}>
                                                                                    <Link to={nestedChildArray.link}>
                                                                                        {nestedChildArray.title}{" "}
                                                                                        {nestedChildArray.isNewPage ? (
                                                                                            <span
                                                                                                className="badge badge-danger rounded">
                                              NEW
                                            </span>
                                                                                        ) : null}
                                                                                        {nestedChildArray.isupdatePage ? (
                                                                                            <span
                                                                                                className="badge badge-pill badge-info">
                                              Updated
                                            </span>
                                                                                        ) : null}
                                                                                    </Link>
                                                                                </li>
                                                                            )
                                                                        )}
                                                                    </ul>
                                                                </li>
                                                            ) : (
                                                                <li key={childKey}>
                                                                    <Link to={childArray.link}>
                                                                        {childArray.title}
                                                                    </Link>
                                                                </li>
                                                            )
                                                    )}
                                                </ul>
                                            )}
                                        </li>
                                    ) : (
                                        <li key={key}>
                                            <Link to={navLink.link}>{navLink.title}</Link>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>

                    </Container>
                </header>
                {/*</div>*/}
                <Modal isOpen={this.state.modalLogout} toggle={this.toggleLog} className={this.props.className}>
                    <ModalHeader toggle={this.toggleLog}>{logOut}</ModalHeader>
                    <ModalBody>
                        {logOutDesc}</ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleLog}>{cancel}</Button>
                        <Button color="primary" onClick={this.handleLogOut}>{ok}</Button>{' '}
                    </ModalFooter>
                </Modal>


            </React.Fragment>
        )
            ;
    }
}

const mdtp = dispatch => bindActionCreators({changeLang}, dispatch);
const mstp = state => state;
export default connect(mstp, mdtp)(withRouter(Topbar));
