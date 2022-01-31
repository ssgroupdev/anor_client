import React, {Component} from "react";

//Import Components
import CategorySection from "./CategorySection";
//Import Images
import logolight from "../../../assets/images/logo-light.png";
import logodark from "../../../assets/images/logo-dark.png";

class Categories extends Component {
    componentDidMount() {
        document.body.classList = "";
        document.getElementById("topnav").classList.add("nav-light");
        // document.getElementById("brandLogo").src = logolight;
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
            // document.getElementById("brandLogo")?document.getElementById("brandLogo").src = logodark:"";
        } else {
            document.getElementById("topnav").classList.remove("nav-sticky");
            // document.getElementById("brandLogo")?document.getElementById("brandLogo").src = logolight:"";
        }
    };

    render() {
        return (
            <React.Fragment>
                <CategorySection id={this.props?.props?.match?.params?.id}/>
            </React.Fragment>
        );
    }
}

export default Categories;
