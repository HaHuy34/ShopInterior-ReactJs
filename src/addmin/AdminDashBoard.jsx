import React from "react";

const AdminDashBoard = () => {
  return (
    <>
      {/* <main id="content" role="main" class="main">
        <div class="content container-fluid">
          <div class="card card-body mb-3 mb-lg-5">
            <div class="row gx-lg-4">
              <div class="col-sm-6 col-lg-3">
                <div class="media">
                  <div class="media-body">
                    <h6 class="card-subtitle">In-store Sales</h6>
                    <span class="card-title h3">$7,820.75</span>

                    <div class="d-flex align-items-center">
                      <span class="d-block font-size-sm">5k orders</span>
                      <span class="badge badge-soft-success ml-2">
                        <i class="tio-trending-up"></i> 4.3%
                      </span>
                    </div>
                  </div>

                  <span class="icon icon-sm icon-soft-secondary icon-circle ml-3">
                    <i class="tio-shop"></i>
                  </span>
                </div>

                <div class="d-lg-none">
                  <hr />
                </div>
              </div>

              <div class="col-sm-6 col-lg-3 column-divider-sm">
                <div class="media">
                  <div class="media-body">
                    <h6 class="card-subtitle">Website Sales</h6>
                    <span class="card-title h3">$985,937.45</span>

                    <div class="d-flex align-items-center">
                      <span class="d-block font-size-sm">21k orders</span>
                      <span class="badge badge-soft-success ml-2">
                        <i class="tio-trending-up"></i> 12.5%
                      </span>
                    </div>
                  </div>

                  <span class="icon icon-sm icon-soft-secondary icon-circle ml-3">
                    <i class="tio-website"></i>
                  </span>
                </div>

                <div class="d-lg-none">
                  <hr />
                </div>
              </div>

              <div class="col-sm-6 col-lg-3 column-divider-lg">
                <div class="media">
                  <div class="media-body">
                    <h6 class="card-subtitle">Discount</h6>
                    <span class="card-title h3">$15,503.00</span>

                    <div class="d-flex align-items-center">
                      <span class="d-block font-size-sm">6k orders</span>
                    </div>
                  </div>

                  <span class="icon icon-sm icon-soft-secondary icon-circle ml-3">
                    <i class="tio-label-off"></i>
                  </span>
                </div>

                <div class="d-sm-none">
                  <hr />
                </div>
              </div>

              <div class="col-sm-6 col-lg-3 column-divider-sm">
                <div class="media">
                  <div class="media-body">
                    <h6 class="card-subtitle">Affiliate</h6>
                    <span class="card-title h3">$3,982.53</span>

                    <div class="d-flex align-items-center">
                      <span class="d-block font-size-sm">150 orders</span>
                      <span class="badge badge-soft-danger ml-2">
                        <i class="tio-trending-down"></i> 4.4%
                      </span>
                    </div>
                  </div>

                  <span class="icon icon-sm icon-soft-secondary icon-circle ml-3">
                    <i class="tio-users-switch"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="card mb-3 mb-lg-5">
            <div class="card-header">
              <div class="row align-items-center flex-grow-1">
                <div class="col-sm mb-2 mb-sm-0">
                  <h4 class="card-header-title">
                    Sales{" "}
                    <i
                      class="tio-help-outlined text-body ml-1"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Net sales (gross sales minus discounts and returns) plus taxes and shipping. Includes orders from all sales channels."
                    ></i>
                  </h4>
                </div>

                <div class="col-sm-auto">
                  <select
                    class="js-select2-custom custom-select-sm"
                    size="1"
                    // style="opacity: 0;"
                    data-hs-select2-options='{
                          "minimumResultsForSearch": "Infinity",
                          "customClass": "custom-select custom-select-sm mb-2 mb-sm-0 mr-2",
                          "dropdownAutoWidth": true,
                          "width": true
                        }'
                  >
                    <option value="">Online store</option>
                    <option value="in-store">In-store</option>
                  </select>

                  <button
                    id="js-daterangepicker-predefined"
                    class="btn btn-sm btn-white dropdown-toggle mb-2 mb-sm-0"
                  >
                    <i class="tio-date-range"></i>
                    <span class="js-daterangepicker-predefined-preview ml-1"></span>
                  </button>
                </div>
              </div>
            </div>

            <div class="card-body">
              <div class="row">
                <div class="col-md-9 mb-5 mb-md-0">
                  <div class="chartjs-custom mb-4">
                    <canvas
                      class="js-chart"
                      style="height: 18rem;"
                      data-hs-chartjs-options='{
                            "type": "bar",
                            "data": {
                              "labels": ["1AM","2AM","3AM","4AM","5AM","6AM","7AM","8AM","9AM","10AM","11AM"],
                              "datasets": [{
                                "data": [200, 300, 290, 350, 150, 350, 300, 100, 125, 220, 200, 300, 290, 350, 150, 350, 300, 100, 125, 220, 225],
                                "backgroundColor": "#377dff",
                                "hoverBackgroundColor": "#377dff",
                                "borderColor": "#377dff"
                              },
                              {
                                "data": [150, 230, 382, 204, 169, 290, 300, 100, 300, 225, 120, 150, 230, 382, 204, 169, 290, 300, 100, 300, 140],
                                "backgroundColor": "#e7eaf3",
                                "borderColor": "#e7eaf3"
                              }]
                            },
                            "options": {
                              "scales": {
                                "yAxes": [{
                                  "gridLines": {
                                    "color": "#e7eaf3",
                                    "drawBorder": false,
                                    "zeroLineColor": "#e7eaf3"
                                  },
                                  "ticks": {
                                    "beginAtZero": true,
                                    "stepSize": 100,
                                    "fontSize": 12,
                                    "fontColor": "#97a4af",
                                    "fontFamily": "Open Sans, sans-serif",
                                    "padding": 10
                                  }
                                }],
                                "xAxes": [{
                                  "gridLines": {
                                    "display": false,
                                    "drawBorder": false
                                  },
                                  "ticks": {
                                    "fontSize": 12,
                                    "fontColor": "#97a4af",
                                    "fontFamily": "Open Sans, sans-serif",
                                    "padding": 5
                                  },
                                  "categoryPercentage": 0.5,
                                  "maxBarThickness": "10"
                                }]
                              },
                              "cornerRadius": 2,
                              "tooltips": {
                                "hasIndicator": true,
                                "mode": "index",
                                "intersect": false
                              },
                              "hover": {
                                "mode": "nearest",
                                "intersect": true
                              }
                            }
                          }'
                    ></canvas>
                  </div>

                  <div class="row justify-content-center">
                    <div class="col-auto">
                      <span class="legend-indicator"></span> Revenue
                    </div>
                    <div class="col-auto">
                      <span class="legend-indicator bg-primary"></span> Orders
                    </div>
                  </div>
                </div>

                <div class="col-md-3 column-divider-md">
                  <div class="row">
                    <div class="col-sm-6 col-md-12">
                      <div
                        class="d-flex justify-content-center flex-column"
                        style="min-height: 10.5rem;"
                      >
                        <h6 class="card-subtitle">Revenue</h6>
                        <span class="d-block display-4 text-dark mb-1 mr-3">
                          $97,458.20
                        </span>
                        <span class="d-block text-success">
                          <i class="tio-trending-up mr-1"></i> $2,401.02 (3.7%)
                        </span>
                      </div>

                      <div class="d-sm-none">
                        <hr class="my-0" />
                      </div>

                      <div class="d-none d-md-block">
                        <hr class="my-0" />
                      </div>
                    </div>

                    <div class="col-sm-6 col-md-12">
                      <div
                        class="d-flex justify-content-center flex-column"
                        style="min-height: 10.5rem;"
                      >
                        <h6 class="card-subtitle">Orders</h6>
                        <span class="d-block display-4 text-dark mb-1 mr-3">
                          67,893
                        </span>
                        <span class="d-block text-danger">
                          <i class="tio-trending-down mr-1"></i> +3,301 (1.2%)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-4 mb-3 mb-lg-5">
              <a class="card card-hover-shadow mb-4" href="#">
                <div class="card-body">
                  <div class="media align-items-center">
                    <img
                      class="avatar avatar-xl mr-4"
                      src="assets\svg\illustrations\create.svg"
                      alt="Image Description"
                    />

                    <div class="media-body">
                      <h3 class="text-hover-primary mb-1">Product</h3>
                      <span class="text-body">Create a new product</span>
                    </div>

                    <div class="ml-2 text-right">
                      <i class="tio-chevron-right tio-lg text-body text-hover-primary"></i>
                    </div>
                  </div>
                </div>
              </a>

              <a class="card card-hover-shadow mb-4" href="#">
                <div class="card-body">
                  <div class="media align-items-center">
                    <img
                      class="avatar avatar-xl mr-4"
                      src="assets\svg\illustrations\choice.svg"
                      alt="Image Description"
                    />

                    <div class="media-body">
                      <h3 class="text-hover-primary mb-1">Collection</h3>
                      <span class="text-body">Create a new collection</span>
                    </div>

                    <div class="ml-2 text-right">
                      <i class="tio-chevron-right tio-lg text-body text-hover-primary"></i>
                    </div>
                  </div>
                </div>
              </a>

              <a class="card card-hover-shadow" href="#">
                <div class="card-body">
                  <div class="media align-items-center">
                    <img
                      class="avatar avatar-xl mr-4"
                      src="assets\svg\illustrations\presenting.svg"
                      alt="Image Description"
                    />

                    <div class="media-body">
                      <h3 class="text-hover-primary mb-1">Discount</h3>
                      <span class="text-body">Create a new discount</span>
                    </div>

                    <div class="ml-2 text-right">
                      <i class="tio-chevron-right tio-lg text-body text-hover-primary"></i>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            <div class="col-lg-8 mb-3 mb-lg-5">
              <div class="card h-100">
                <div class="card-header">
                  <h4 class="card-header-title">Top products</h4>

                  <a class="btn btn-sm btn-ghost-secondary" href="#">
                    View all
                  </a>
                </div>

                <div class="card-body-height">
                  <div class="table-responsive">
                    <table class="table table-borderless table-thead-bordered table-nowrap table-align-middle card-table">
                      <thead class="thead-light">
                        <tr>
                          <th scope="col">Item</th>
                          <th scope="col">Change</th>
                          <th scope="col">Price</th>
                          <th scope="col">Sold</th>
                          <th scope="col">Sales</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>
                            <a
                              class="media align-items-center"
                              href="./ecommerce-product-description.html"
                            >
                              <img
                                class="avatar mr-3"
                                src="assets\img\400x400\img4.jpg"
                                alt="Image Description"
                              />

                              <div class="media-body">
                                <h5 class="text-hover-primary mb-0">
                                  Photive wireless speakers
                                </h5>
                              </div>
                            </a>
                          </td>
                          <td>
                            <i class="tio-trending-down text-danger mr-1"></i>{" "}
                            72%
                          </td>
                          <td>$65</td>
                          <td>7,545</td>
                          <td>
                            <h4 class="mb-0">$15,302.00</h4>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <a
                              class="media align-items-center"
                              href="./ecommerce-product-description.html"
                            >
                              <img
                                class="avatar mr-3"
                                src="assets\img\400x400\img26.jpg"
                                alt="Image Description"
                              />

                              <div class="media-body">
                                <h5 class="text-hover-primary mb-0">
                                  Topman shoe in green
                                </h5>
                              </div>
                            </a>
                          </td>
                          <td>
                            <i class="tio-trending-up text-success mr-1"></i>{" "}
                            69%
                          </td>
                          <td>$21</td>
                          <td>6,643</td>
                          <td>
                            <h4 class="mb-0">$12,492.21</h4>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <a
                              class="media align-items-center"
                              href="./ecommerce-product-description.html"
                            >
                              <img
                                class="avatar mr-3"
                                src="assets\img\400x400\img25.jpg"
                                alt="Image Description"
                              />

                              <div class="media-body">
                                <h5 class="text-hover-primary mb-0">
                                  RayBan black sunglasses
                                </h5>
                              </div>
                            </a>
                          </td>
                          <td>
                            <i class="tio-trending-down text-danger mr-1"></i>{" "}
                            65%
                          </td>
                          <td>$37</td>
                          <td>5,951</td>
                          <td>
                            <h4 class="mb-0">$10,351.71</h4>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <a
                              class="media align-items-center"
                              href="./ecommerce-product-description.html"
                            >
                              <img
                                class="avatar mr-3"
                                src="assets\img\400x400\img6.jpg"
                                alt="Image Description"
                              />

                              <div class="media-body">
                                <h5 class="text-hover-primary mb-0">
                                  Mango Women's shoe
                                </h5>
                              </div>
                            </a>
                          </td>
                          <td>
                            <i class="tio-trending-down text-danger mr-1"></i>{" "}
                            53%
                          </td>
                          <td>$65</td>
                          <td>5,002</td>
                          <td>
                            <h4 class="mb-0">$9,917.45</h4>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <a
                              class="media align-items-center"
                              href="./ecommerce-product-description.html"
                            >
                              <img
                                class="avatar mr-3"
                                src="assets\img\400x400\img3.jpg"
                                alt="Image Description"
                              />

                              <div class="media-body">
                                <h5 class="text-hover-primary mb-0">
                                  Calvin Klein t-shirts
                                </h5>
                              </div>
                            </a>
                          </td>
                          <td>
                            <i class="tio-trending-up text-success mr-1"></i>{" "}
                            50%
                          </td>
                          <td>$89</td>
                          <td>4,714</td>
                          <td>
                            <h4 class="mb-0">$8,466.02</h4>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <a
                              class="media align-items-center"
                              href="./ecommerce-product-description.html"
                            >
                              <img
                                class="avatar mr-3"
                                src="assets\img\400x400\img5.jpg"
                                alt="Image Description"
                              />

                              <div class="media-body">
                                <h5 class="text-hover-primary mb-0">
                                  Givenchy perfume
                                </h5>
                              </div>
                            </a>
                          </td>
                          <td>
                            <i class="tio-trending-up text-success mr-1"></i>{" "}
                            50%
                          </td>
                          <td>$99</td>
                          <td>4,155</td>
                          <td>
                            <h4 class="mb-0">$7,715.89</h4>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main> */}
    </>
  );
};

export default AdminDashBoard;
