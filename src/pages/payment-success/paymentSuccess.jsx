import * as React from "react";
import "./paymentSuccess.css";
// import MDBox from "components/MDBox";
import bgImage from "assets/images/payment-success.png";
import PageLayout from "../../examples/LayoutContainers/PageLayout";

export default function Layout() {
  return (
    <PageLayout>
      <div className="cart-payment-success-container">
        <img
          src={`${bgImage}`}
          alt={`${bgImage}`}
          width="50%"
          height="50%"
          className="img-payment-sucess"
        />
        <h1>Thanh toán thành công</h1>
        <h1>Cảm ơn quý khách đã mua hàng tại Big Size Fashion</h1>
      </div>
    </PageLayout>
  );
}
