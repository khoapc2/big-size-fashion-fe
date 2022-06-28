/* eslint-disable */
import { Publish } from "@material-ui/icons";
import "./product.css";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Form, Label, Container } from "semantic-ui-react";
import Feedbacks from "../components/feedback/feedbackList";

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" },
];

export default function Product() {
  const [selectedImgs, setSelectedImgs] = useState([]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="product">
        <div className="productTitleContainer">
          <h1 className="productTitle">Product</h1>
        </div>
        <div className="productTop">
          <div className="productTopLeft">
            <Form>
              <Form.Input
                value="cc"
                fluid
                label="Tên sản phẩm"
                placeholder="Tên sản phẩm"
                readOnly
              />
              <Form.Group widths="equal">
                <Form.Input fluid value="cc" label="Chủng loại" placeholder="Chủng loại" readOnly />
                <Form.Input fluid value="cc" label="Giới tính" placeholder="Giới tính" readOnly />
              </Form.Group>
              <Form.Group widths="equal" style={{ backgroundColor: "#d9d9dc", padding: 10 }}>
                <Form.Input fluid value="Vang" label="Màu sắc" placeholder="Màu sắc" readOnly />
                <Form.Input
                  fluid
                  value="XX, XXL, XXXL"
                  label="Kích cỡ"
                  placeholder="Kích cỡ"
                  readOnly
                />
              </Form.Group>
              <Form.TextArea
                label="Miêu tả"
                placeholder="Cho khách hàng thêm thông tin về sản phẩm..."
                name="description"
                value="yeu em la dieu anh khong the ngo"
                readOnly
              />
            </Form>
          </div>
          <div className="productTopRight">
            <div style={{ margin: 10 }}>
              <Label as="a" color="teal" tag>
                Hình ảnh sản phẩm
              </Label>
            </div>
            <div className="productUpload">
              <div className="images">
                <ImageList
                  sx={{
                    width: 500,
                    height: 450,
                    // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                    transform: "translateZ(0)",
                  }}
                  rowHeight={200}
                  gap={1}
                >
                  {selectedImgs &&
                    selectedImgs.map((item, index) => {
                      console.log(item);
                      const cols = index === 0 ? 2 : 1;
                      const rows = index === 0 ? 2 : 1;
                      return (
                        <ImageListItem key={item} cols={cols} rows={rows}>
                          <img
                            src={item}
                            width="auto"
                            height="auto"
                            // {...srcset(item, 250, 200, rows, cols)}
                            loading="lazy"
                            alt={item}
                          />
                          {/* {loading} ? (
                            <Stack
                              width="100%"
                              height="100%"
                              direction="column"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <CircularProgress />
                            </Stack>
                            ) : (
                            
                            ) */}
                        </ImageListItem>
                      );
                    })}
                </ImageList>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Container>
        <Feedbacks mode="edit" />
      </Container>
    </DashboardLayout>
  );
}
