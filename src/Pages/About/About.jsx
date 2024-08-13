/**
 * About page component.
 *
 * This component renders the about page of the application, including the banner, introduction, how it works, metrics, and FAQ sections.
 *
 * @returns {JSX.Element} The about page component.
 */
import React from "react";
import { Col, Collapse, Row, Skeleton } from "antd";
import "./About.scss";
import { customExpandIcon, faqData, howItWorksData } from "./about.helper";
import useAboutUs from "../../Hooks/useAboutUs";
import { msgs } from "../../utils/appConstants";

const About = () => {
  const { Panel } = Collapse;

  const { metrics } = useAboutUs();

  return (
    <div className="about">
      <div className="container">
        {/**
         * The about page banner section.
         */}
        <div className="about_banner">
          <h1>{msgs.about.forecasting}</h1>
          <p>Accessible Prediction Markets for All, Empowered by Web 3.0</p>
        </div>
        {/**
         * The about page introduction section.
         */}
        <div className="about_introduction">
          <div className="about_introduction_left">
            <div className="about_introduction_left_card">
              <h5>{msgs.about.problem}</h5>
              <p>
                Traditional betting platforms often lack transparency, leaving
                users uncertain about the fairness of odds and payouts. Many
                platforms also fall short in offering secure, traceable
                transactions and effective resolution of disputes, creating a
                gap in trust and reliability.
              </p>
            </div>
            <div className="about_introduction_left_card">
              <h5>{msgs.about.solution}</h5>
              <p>
                Aleph Foresight addresses these challenges head-on by
                integrating blockchain technology to provide full transparency
                and tamper-proof record-keeping. Additionally, we have
                implemented a decentralized arbitration system that allows the
                community to partake in fair and transparent dispute resolution,
                enhancing trust and user satisfaction.
              </p>
            </div>
          </div>
          <div className="about_introduction_right">
            <h3>{msgs.about.intro}</h3>
            <p>
              Aleph Foresight is an innovative crypto betting platform that
              revolutionizes participation in prediction markets. By harnessing
              the robust capabilities of blockchain technology, we provide a
              transparent and secure environment where users can confidently
              engage in betting on various events. Our platform is designed to
              facilitate easy access to betting markets, featuring intuitive
              navigation, real-time odds, and comprehensive user support to
              enhance the betting experience. With Aleph Foresight, enthusiasts
              across the globe can connect, predict, and win in a fully
              decentralized setting. <br />
              <br />
              Our mission is to democratize betting by providing a safe,
              transparent, and user-friendly platform. We aim to empower users
              with tools for informed decision-making, ensuring a fair betting
              experience for all participants. <br />
              <br />
              We envision a world where betting is free from manipulation and
              accessible to anyone, anywhere. Our goal is to become the leading
              platform for crypto betting, known for integrity, innovation, and
              community trust.
            </p>
          </div>
        </div>
        {/**
         * The about page how it works section.
         */}
        <div className="about_howWork">
          <h3>{msgs.about.keyFeatures}</h3>
          <p>
            Unlocking insights, fueling decisions: Discover our predictive power
            today
          </p>
          <div className="about_howWork_cards">
            <Row gutter={[15, 15]}>
              {howItWorksData?.map((item, index) => (
                <Col key={index} sm={24} md={12} lg={8} xl={6}>
                  <div className="aboutCommonCard">
                    {item?.icon || "-"}
                    <h5>{item?.title || "-"}</h5>
                    <p>{item?.description || "-"}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
        {/**
         * The about page metrics section.
         */}
        <div className="about_metrics">
          <h3>{msgs.about.metrics}</h3>
          <p>
            Tracking the Pulse of Digital Protocols: Insights for Tomorrow's
            Innovations
          </p>
          <div className="about_metrics_cards">
            <Row gutter={[15, 15]}>
              {metrics?.loading
                ? Array.from({ length: 3 }, (_, index) => index + 1).map(
                    (_, index) => (
                      <Col key={index} xs={24} md={12} lg={8} xl={6}>
                        <div className="recentSkeleton" key={index}>
                          <Skeleton.Input
                            active
                            paragraph={{ rows: 2 }}
                            className=" aboutCardSkelton"
                          />
                        </div>
                      </Col>
                    )
                  )
                : metrics?.data?.map((item, index) => {
                    return (
                      <Col key={index} xs={24} md={12} lg={8} xl={6}>
                        <div className="metricsCard">
                          <p>{item?.label || "-"}</p>
                          <h5>{item?.value || 0}</h5>
                        </div>
                      </Col>
                    );
                  })}
            </Row>
          </div>
        </div>
        {/**
         * The about page FAQ section.
         */}
        <div className="about_faq">
          <h3>{msgs.about.faq}</h3>
          <p>Explore Our Frequently Asked Questions Today</p>
          <div className="about_faq_collapse">
            <Collapse
              accordion
              defaultActiveKey={["1"]}
              expandIcon={customExpandIcon}
            >
              {faqData?.map((item) => (
                <Panel header={item?.title} key={item?.key}>
                  <p>{item?.text || "-"}</p>
                </Panel>
              ))}
            </Collapse>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
