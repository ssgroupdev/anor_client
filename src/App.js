import React, {Component, Suspense} from "react";
import Layout from "./components/Layout/";
import {
    Route,
    Switch,
    BrowserRouter as Router,
    withRouter,
} from "react-router-dom";

// Import Css
import "./assets/css/materialdesignicons.min.css";
import "./Apps.scss";
import "./assets/index.less";
import "./assets/css/colors/default.css";
import 'rc-pagination/assets/index.css';

// Include Routes
import routes from "./routes";
import {bindActionCreators} from "redux";
import {changeLang, getCurrentUser, setCurrentUser} from "./redux/actions/lang";
import {connect} from "react-redux";
import {ToastContainer} from "react-toastify"
import {getCookie} from "./utils/useCookies";
import {token} from "./server/host";

function withLayout(WrappedComponent) {
    // ...and returns another component...
    return class extends React.Component {
        render() {
            return (
                <Layout>
                    <WrappedComponent props={this.props}></WrappedComponent>
                </Layout>
            );
        }
    };
}

class App extends Component {

    state = {

        isLang: localStorage.getItem("lang") === "uz",

    }

    componentDidMount() {

        this.props.changeLang(this.state.isLang ? "uz" : "ru")
        if (token!==null){
            this.props.setCurrentUser();
        }
    }


    Loader = () => {
        return (
            <div id="preloader">
                <div className={"d-none"}>{this.state.isLang+this.props?.lang?.lang?.answer}</div>
                <div id="status">
                    <div className="spinner">
                        <div className="double-bounce1"></div>
                        <div className="double-bounce2"></div>
                    </div>
                </div>
            </div>
        );
    };

    render() {
        return (
            <React.Fragment>
                <Router>
                    <Suspense fallback={this.Loader()}>
                        <Switch>
                            {routes.map((route, idx) =>
                                route.isWithoutLayout ? (
                                    <Route
                                        path={route.path}
                                        exact={route.exact}
                                        component={route.component}
                                        key={idx}
                                    />
                                ) : (
                                    <Route
                                        path={route.path}
                                        exact
                                        component={withLayout(route.component)}
                                        key={idx}
                                    />
                                )
                            )}
                        </Switch>
                    </Suspense>
                </Router>
                <ToastContainer/>
            </React.Fragment>
        );
    }
}

const mdtp = dispatch => bindActionCreators({changeLang, setCurrentUser}, dispatch);
const mstp = state => state
export default connect(mstp, mdtp)(withRouter(App));

