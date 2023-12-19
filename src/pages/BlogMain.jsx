import React from "react";
import useGetApi from "../hook/useGetApi";
import { Link, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../assetss/style/BlogMain.css";
import BackToTop from "../component/BackToTop";

const BlogMain = () => {
  const { id } = useParams();
  console.log(id);
  const [data] = useGetApi(`http://localhost:3000/blog/${id}`);
  console.log(data);
  return (
    <>
      <div className="main-blog-detail">
        <Container>
          <Row>
            <Col sm={9}>
              <div className="title-main-blog">
                <Link to={"/blog"} className="post-categories-blog">
                  DESIGN TRENDS, FURNITURE
                </Link>
                <h1 className="name-title-blog">{data.title}</h1>
                <div className="info-user-blog">
                  <ul>
                    <li>Posted by</li>
                    <li>
                      <img
                        src={data.avatar}
                        alt=""
                        className="avatar-user-blog"
                      />
                    </li>
                    <li>S. Rogers</li>
                  </ul>
                </div>
              </div>
              <div className="image-main-blog">
                <div
                  className="blog-image-top"
                  style={{ backgroundImage: `url(${data?.image})` }}
                >
                  <div className="post-date">
                    <span className="post-day">{data.day}</span>
                    <br />
                    <span className="post-month">{data.month}</span>
                  </div>
                </div>
              </div>
              <div className="wraper-text abscoli">
                <span>{data?.description?.moreInformationHeader}</span>
              </div>
              <div className="content-blog-main">
                <div className="content-blog-main-left">
                  <h3>Felis scelerisque nunc</h3>
                  <p className="abscoli">
                    Ullamcorper tincidunt litora scelerisque id suspendisse in
                    curabitur ut massa natoque maecenas himenaeos quis.
                  </p>
                  <div className="info-event">
                    <h4>EVENT INFO</h4>
                    <div>
                      <p className="abscoli">
                        “Fringilla In Dui” @Vestibulum Viverra <br />
                        Via Suspendisse 24 – Metro: Praesent Vehicula <br />8 –
                        12 April / h 12 – 19
                      </p>
                    </div>
                  </div>
                </div>
                <div className="content-blog-main-right">
                  <img
                    src="https://a6n4d3q9.rocketcdn.me/wp-content/uploads/2016/07/blog-6-furnit-1-700x600.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div className="wpb_wrapper">
                <p className="abscoli">
                  Diam a aliquet a est nam lacus pulvinar rutrum tempus mus
                  lacus odio id fames sed facilisi at primis adipiscing
                  parturient ad varius sit tellus rutrum a nisi. Aenean
                  adipiscing sit scelerisque dictum ullamcorper fames ac
                  inceptos est risus auctor ac senectus volutpat viverra
                  ullamcorper a nec suscipit posuere sit dis. Enim elit duis.
                </p>
              </div>
              <h3>Scelerisque ullamcorper non</h3>
              <Row className="image-bl">
                <Col
                  xs={6}
                  sm={6}
                  md={3}
                  lg={3}
                  style={{
                    backgroundImage: `url(${data?.imageScelerisque?.imageScelerisque01})`,
                  }}
                ></Col>
                <Col
                  xs={6}
                  sm={6}
                  md={3}
                  lg={3}
                  style={{
                    backgroundImage: `url(${data?.imageScelerisque?.imageScelerisque02})`,
                  }}
                ></Col>
                <Col
                  xs={6}
                  sm={6}
                  md={3}
                  lg={3}
                  style={{
                    backgroundImage: `url(${data?.imageScelerisque?.imageScelerisque03})`,
                  }}
                ></Col>
                <Col
                  xs={6}
                  sm={6}
                  md={3}
                  lg={3}
                  style={{
                    backgroundImage: `url(${data?.imageScelerisque?.imageScelerisque04})`,
                  }}
                ></Col>
              </Row>
              <div className="content-user-review abscoli">
                <p>
                  A a sit a sociis dictumst velit vestibulum a id vestibulum
                  porta non parturient vestibulum magna ornare scelerisque
                  parturient in parturient. Nulla condimentum dolor adipiscing
                  blandit himenaeos interdum hac ultrices augue a lobortis
                  integer lacus hendrerit bibendum scelerisque duis nostra.
                  Suspendisse tempor adipiscing a vestibulum velit iaculis.
                </p>
              </div>

              <div className="review-user-content">
                <img
                  src="https://secure.gravatar.com/avatar/226d936abb812698ad55af91b0545dad?s=74&d=mm&r=g"
                  alt=""
                  className="avatar-review"
                />
                <h4>About S. Rogers</h4>
                <p className="abscoli">{data.contentReview}</p>
                <h6>Posts by S. Rogers </h6>
              </div>
            </Col>
            <Col sm={3}></Col>
          </Row>
        </Container>
      </div>
      <BackToTop />
    </>
  );
};

export default BlogMain;
