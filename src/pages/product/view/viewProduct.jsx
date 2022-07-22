/* eslint-disable */
import { useDispatch, useSelector } from "react-redux";

import "./viewProduct.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState, useEffect } from "react";
import { Publish } from "@material-ui/icons";
import IconButton from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Form, Label } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Stack } from "@mui/material";
import { Formik } from "formik";
import { viewDetailProduct } from "../../../redux/actions/productAction";
import { triggerReload } from "../../../redux/actions/userAction";
import Loading from "../../../components/Loading";

const options = [
  { key: "1", text: "Nam", value: true },
  { key: "0", text: "Nữ", value: false },
];

export default function ViewProduct() {
  const dispatch = useDispatch();
  const [role, setRole] = useState("");

  const { productId } = useParams();
  const productDetail = useSelector((state) => state.viewProduct);
  const { loading, data } = productDetail;

  console.log(data);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    setRole(currentUser.role);
  }, []);

  useEffect(() => {
    dispatch(viewDetailProduct(productId, role));
  }, [dispatch, triggerReload]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="updateProduct">
        <h1 className="addProductTitle">Thông tin sản phẩm</h1>
        {loading ? (
          <Loading />
        ) : (
          <Formik
            initialValues={{
              productName: data.product_name,
              brandName: data.brand,
              category: data.category,
              sex: data.gender,
              description: data.description,
              price: data.price,
              promotion: data.promotion_name ? data.promotion_name : "Chưa có",
              image: data.images,
              productDetailList: data.product_detail_list,
              // quantity
            }}
            validateOnBlur
          >
            {(formik) => {
              console.log(formik);
              return (
                <div className="product">
                  <Form onSubmit={formik.handleSubmit}>
                    <div className="productTop">
                      <div className="productTopLeft">
                        <Form.Input
                          fluid
                          label="Tên sản phẩm"
                          placeholder="Tên sản phẩm"
                          name="productName"
                          value={formik.values.productName}
                          error={formik.errors.productName}
                          readOnly
                        />
                        <Form.Group widths="equal">
                          <Form.Input
                            fluid
                            label="Giá"
                            placeholder="Giá"
                            type="number"
                            name="price"
                            value={formik.values.price}
                            readOnly
                          />
                          <Form.Input
                            fluid
                            label="Tên thương hiệu"
                            placeholder="Tên thương hiệu"
                            name="brandName"
                            value={formik.values.brandName}
                            readOnly
                          />
                        </Form.Group>
                        <Form.Group widths="equal">
                          <Form.Input
                            name="category"
                            fluid
                            label="Thể Loại"
                            placeholder="Thể loại"
                            value={formik.values.category}
                            readOnly
                          />
                          <Form.Input
                            fluid
                            label="Dành cho"
                            placeholder="Giới tính"
                            name="sex"
                            value={formik.values.sex}
                            readOnly
                          />
                          <Form.Input
                            fluid
                            label="Khuyến mại"
                            placeholder="Giới tính"
                            name="promotion"
                            value={formik.values.promotion}
                            readOnly
                          />
                        </Form.Group>
                        <Form.TextArea
                          label="Miêu tả"
                          placeholder="Cho khách hàng thêm thông tin về sản phẩm..."
                          name="description"
                          onChange={formik.handleChange}
                          value={formik.values.description}
                          readOnly
                        />
                        {formik.values.productDetailList.map((item, index) => (
                          <div className="detailProduct">
                            <Form.Group widths="equal" key={index}>
                              <Form.Input
                                className="form-control"
                                name={`productDetailList[${index}].colour`}
                                fluid
                                label="Màu sắc"
                                placeholder="Màu sắc"
                                value={item.colour.colour_name}
                                readOnly
                              />
                              <Form.Input
                                name={`productDetailList[${index}].size`}
                                fluid
                                label="Kích cỡ"
                                placeholder="Kích cỡ"
                                value={item.size.size_name}
                                // value={item.size.size_name}
                                readOnly
                              />
                              {console.log(item.quantity)}
                              {role !== "Owner" ? (
                                <Form.Input
                                  name={`productDetailList[${index}].quantity`}
                                  fluid
                                  label="Số lượng"
                                  placeholder="Số lượng"
                                  value={item.quantity}
                                  // value={item.size.size_name}
                                  readOnly
                                />
                              ) : (
                                ""
                              )}
                            </Form.Group>
                          </div>
                        ))}
                      </div>
                      <div className="productTopRight">
                        <div style={{ margin: 10 }}>
                          <Label as="a" color="teal" tag>
                            Hình ảnh sản phẩm
                          </Label>
                        </div>
                        <div className="productUpload">
                          <div className="images">
                            {formik.values.image.length === 0 ? (
                              <Stack
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                                sx={{
                                  width: 500,
                                  height: 450,
                                }}
                              >
                                <Label>Hiện tại chưa có hình ảnh nào</Label>
                              </Stack>
                            ) : (
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
                                {formik.values.image &&
                                  formik.values.image.map((item, index) => {
                                    const cols = index === 0 ? 2 : 1;
                                    const rows = index === 0 ? 2 : 1;
                                    return (
                                      <ImageListItem key={item.image_url} cols={cols} rows={rows}>
                                        <img
                                          src={item.image_url}
                                          width="auto"
                                          height="auto"
                                          // {...srcset(item, 250, 200, rows, cols)}
                                          loading="lazy"
                                          alt={item.image_url}
                                        />
                                        <ImageListItemBar
                                          sx={{
                                            background:
                                              "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                                              "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                                          }}
                                          position="top"
                                        />
                                      </ImageListItem>
                                    );
                                  })}
                              </ImageList>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                </div>
              );
            }}
          </Formik>
        )}
      </div>
    </DashboardLayout>
  );
}
