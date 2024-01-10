import React, { useEffect } from "react";
import ApexCharts from "apexcharts";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import "../assetss/style/addmin/StatisticalAdmin.css";

const StatisticalAdmin = () => {
  useEffect(() => {
    const dt = {
      series: [
        {
          name: "Desktops",
          data: [10, 421, 352, 521, 949, 262, 693, 291, 148],
        },
      ],
      chart: {
        height: 70,
        // width: 150,
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false, // Hide the toolbar
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
        curve: "straight",
      },
      title: {
        text: "",
        // align: "left",
      },

      grid: {
        show: false,
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0,
        },
      },
      xaxis: {
        axisBorder: {
          show: false, // Hide x-axis line
        },
        labels: {
          show: false, // Hide x-axis labels
        },
      },
      yaxis: {
        show: false, // Hide y-axis
      },
    };
    const sale = {
      series: [
        {
          name: "Desktops",
          data: [10, 922, 521, 949, 262, 693, 291, 236, 48],
        },
      ],
      chart: {
        height: 70,
        // width: 150,
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false, // Hide the toolbar
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
        curve: "straight",
      },
      title: {
        text: "",
        // align: "left",
      },

      grid: {
        show: false,
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0,
        },
      },
      xaxis: {
        axisBorder: {
          show: false, // Hide x-axis line
        },
        labels: {
          show: false, // Hide x-axis labels
        },
      },
      yaxis: {
        show: false, // Hide y-axis
      },
    };
    const st = {
      series: [
        {
          name: "Desktops",
          data: [10, 322, 21, 549, 962, 693, 291, 236, 48],
        },
      ],
      chart: {
        height: 70,
        // width: 150,
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false, // Hide the toolbar
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
        curve: "straight",
      },
      title: {
        text: "",
        // align: "left",
      },

      grid: {
        show: false,
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0,
        },
      },
      xaxis: {
        axisBorder: {
          show: false, // Hide x-axis line
        },
        labels: {
          show: false, // Hide x-axis labels
        },
      },
      yaxis: {
        show: false, // Hide y-axis
      },
    };
    const us = {
      series: [
        {
          name: "Desktops",
          data: [10, 122, 421, 949, 962, 393, 891, 336, 948],
        },
      ],
      chart: {
        height: 70,
        // width: 150,
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false, // Hide the toolbar
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
        curve: "straight",
      },
      title: {
        text: "",
        // align: "left",
      },

      grid: {
        show: false,
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0,
        },
      },
      xaxis: {
        axisBorder: {
          show: false, // Hide x-axis line
        },
        labels: {
          show: false, // Hide x-axis labels
        },
      },
      yaxis: {
        show: false, // Hide y-axis
      },
    };

    const growth = {
      series: [
        {
          name: "Inflation",
          data: [23, 31, 40, 31, 40, 36, 42, 63, 64, 78, 55, 82],
        },
      ],
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: false, // Hide the toolbar
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        position: "top",
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        labels: {
          //   show: false,
          formatter: function (val) {
            return val + "%";
          },
        },
        max: 100,
      },
      title: {
        text: "Danh số tăng trưởng khách hàng",

        floating: true,
        offsetY: 330,
        align: "center",
        style: {
          color: "#000",
          fontSize: "16px", // Adjust the font size as needed
          fontFamily: "Arial, sans-serif", // Specify the desired font family
          fontWeight: "bold",
        },
      },
    };

    const chartDt = new ApexCharts(document.querySelector("#chartDt"), dt);
    chartDt.render();
    const chartSale = new ApexCharts(
      document.querySelector("#chartSale"),
      sale
    );
    chartSale.render();
    const chartSt = new ApexCharts(document.querySelector("#chartSt"), st);
    chartSt.render();
    const chartUs = new ApexCharts(document.querySelector("#chartUs"), us);
    chartUs.render();
    const chartGrowth = new ApexCharts(
      document.querySelector("#chartGrowth"),
      growth
    );
    chartGrowth.render();

    // Cleanup when the component unmounts
    return () => {
      chartDt.destroy();
      chartSale.destroy();
      chartSt.destroy();
      chartUs.destroy();
      chartGrowth.destroy();
    };
  }, []);

  return (
    <>
      <div className="statis">
        <Container>
          <Row>
            <Col sm={6} lg={3} className="mb-3 mb-lg-5">
              <Link to="#">
                <div className="cart-statistical">
                  <h6 className="card-subtitle">Doanh thu</h6>
                  <div className="row align-items-center gx-2 mb-1">
                    <div className="col-6">
                      <h2 class="card-title text-inherit">72,540</h2>
                    </div>
                    <div className="col-6">
                      <div id="chartDt"></div>
                    </div>
                  </div>
                  <span class="text-body fs-6 ms-1">từ 70,104</span>
                </div>
              </Link>
            </Col>
            <Col sm={6} lg={3} className="mb-3 mb-lg-5">
              <Link to="#">
                <div className="cart-statistical">
                  <h6 className="card-subtitle">Giảm giá</h6>
                  <div className="row align-items-center gx-2 mb-1">
                    <div className="col-6">
                      <h2 class="card-title text-inherit">29.4%</h2>
                    </div>
                    <div className="col-6">
                      <div id="chartSale"></div>
                    </div>
                  </div>
                  <span class="text-body fs-6 ms-1">từ 29.1%</span>
                </div>
              </Link>
            </Col>
            <Col sm={6} lg={3} className="mb-3 mb-lg-5">
              <Link to="#">
                <div className="cart-statistical">
                  <h6 className="card-subtitle">Lợi nhuận</h6>
                  <div className="row align-items-center gx-2 mb-1">
                    <div className="col-6">
                      <h2 class="card-title text-inherit">22,540</h2>
                    </div>
                    <div className="col-6">
                      <div id="chartSt"></div>
                    </div>
                  </div>
                  <span class="text-body fs-6 ms-1">từ 17,104</span>
                </div>
              </Link>
            </Col>
            <Col sm={6} lg={3} className="mb-3 mb-lg-5">
              <Link to="#">
                <div className="cart-statistical">
                  <h6 className="card-subtitle">Người dùng</h6>
                  <div className="row align-items-center gx-2 mb-1">
                    <div className="col-6">
                      <h2 class="card-title text-inherit">2,320</h2>
                    </div>
                    <div className="col-6">
                      <div id="chartUs"></div>
                    </div>
                  </div>
                  <span class="text-body fs-6 ms-1">từ 1,154</span>
                </div>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col sm={6} lg={7} className="mb-3 mb-lg-5">
              <div id="chartGrowth"></div>
            </Col>
            <Col sm={6} lg={5} className="mb-3 mb-lg-5"></Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default StatisticalAdmin;
