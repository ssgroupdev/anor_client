import React, { Component } from "react";

//Import Components
import Section from "./Section";
import MostViewedProducts from "./MostViewedProducts";
import TopCategories from "./TopCategories";
import PopularProducts from "./PopularProducts";
import RecentProducts from "./RecentProducts";
import Recommend from "./Recommend";
import {getUser} from "../../server/config/web-site/user";
import {deleteCookie} from "../../utils/useCookies";
import {userAccessTokenName} from "../../constants/application";

class Index extends Component {

  state = {
    isLogin: false
  }

  // Make sure to remove the DOM listener when the component is unmounted.
  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollNavigation, true);
  }

  componentDidMount() {
    this.getMe();
    document.body.classList = "";
    window.addEventListener("scroll", this.scrollNavigation, true);
  }
  getMe = () => {

    getUser().then(res => {
      if (res && res.data) {
        this.setState({
          isLogin: true
        })
      } else {
        deleteCookie(userAccessTokenName)
        this.setState({
          isLogin: false
        })
      }
    }).catch(err => {
      deleteCookie(userAccessTokenName)
      this.setState({
        isLogin: false
      })
    })

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

  render() {
    return (
      <React.Fragment>
        {/* import Section */}
        <Section />

        {/* import Collection */}
        {/*<Collection />*/}

        <section className="section pt-0 mt-0">

          {/*popular*/}
          <PopularProducts isLogin={this.state?.isLogin} />

          <TopCategories />

          {/*recommend*/}
          <Recommend  isLogin={this.state?.isLogin} />

          {/*by rate*/}
          {/*<MostViewedProducts />*/}

          {/*  isNew*/}
          <RecentProducts  isLogin={this.state?.isLogin} />

        </section>
      </React.Fragment>
    );
  }
}

export default Index;
