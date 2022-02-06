import React, {useEffect, useRef, useState} from "react";
import {
    Container,
    Row,
    Col
} from "reactstrap";

import PageBreadcrumb from "../../../components/Shared/PageBreadcrumb";

import {getNewsById} from "../../../server/config/web-site/client";
import {imgUrl} from "../../../server/host";
import {connect} from "react-redux";

const PageWorkDetail = (props) => {

    const [news, setNews] = useState(null)
    const isMounted = useIsMounted();

    const [state, setState] = useState([
        {id: 1, name:   props.lang.lang.index, link: "/"},
        {id: 2, name: props.lang.lang.news, link: "/news"}
    ])
    useEffect(() => {
        isMounted.current = true;

        window.addEventListener("scroll", scrollNavigation, true);
        return function cleanup() {
            window.removeEventListener("scroll", scrollNavigation, true);
            isMounted.current = false
        };
    })

    useEffect(() => {
        getNewsById(props.props.match.params.id).then(res => {
            if (isMounted.current) {
                setNews(res.data);

            }
            setState([
                ...state,
                    {id: res.data.id, name: res.data.title}
                ]
            )
        }).catch(err => {
        })
    }, [props.props.match.params.id])


    const scrollNavigation = () => {
        var doc = document.documentElement;
        var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        if (top > 80) {
            document.getElementById("topnav").classList.add("nav-sticky");
        } else {
            document.getElementById("topnav").classList.remove("nav-sticky");
        }
    };

    return (
        <React.Fragment>
            {/* breadcrumb */}
            {news && <PageBreadcrumb pathItems={state}>
                <h4 className="title"> {news && news.title} </h4>
                <ul className="list-unstyled mt-4">
                    <li className="list-inline-item h6 date text-muted ml-1">
                        {" "}
                        <span
                            className="text-dark">{props.lang?.lang?.date}</span> {news && new Date(news.createdAt).toLocaleString().substr(0, 17)}
                    </li>
                </ul>
            </PageBreadcrumb>}

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
                    <Row className="justify-content-center">
                        <Col xs={12} className="text-center">
                            {news && <img src={imgUrl + news.imageUrl} className="img-fluid rounded" alt=""/>
                            }</Col>

                        <Col md={10} className="mt-4 pt-2">
                            <div className="bg-light rounded p-4">
                                <p className="text-muted font-italic mb-0">
                                    {news && <p dangerouslySetInnerHTML={{__html: news.content}}/>}
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    );
}

export function useIsMounted() {
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
        return () => isMounted.current = false;
    }, []);

    return isMounted;
}

const mstp = (state) => state
export default connect(mstp, null)(PageWorkDetail);
