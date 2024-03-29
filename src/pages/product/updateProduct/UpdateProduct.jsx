/* eslint-disable */
import { useDispatch, useSelector } from "react-redux";

import "./updateProduct.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { Publish } from "@material-ui/icons";
import IconButton from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Form, Label } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Stack } from "@mui/material";
import { Formik } from "formik";
import { SchemaErrorUpdateProduct } from "../../../service/Validations/UpdateProductValidation";
import { listSize } from "../../../redux/actions/sizeAction";
import { listColor } from "../../../redux/actions/colorAction";
import { listCategory } from "../../../redux/actions/categoryAction";
import { listPromotion } from "../../../redux/actions/promotionAction";
import { viewDetailProduct, updateProduct } from "../../../redux/actions/productAction";
import { triggerReload } from "../../../redux/actions/userAction";
import Loading from "../../../components/Loading";
import {
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS,
} from "../../../service/Validations/VarConstant";

const Input = styled("input")({
  display: "none",
});

const options = [
  { key: "1", text: "Nam", value: true },
  { key: "0", text: "Nữ", value: false },
];

export default function NewProduct() {
  const dispatch = useDispatch();

  const { productId } = useParams();

  // const [addToggle, setAddToggle] = useState(false);

  // const [price, setPrice] = useState(0);
  // const { size } = useSelector((state) => state.sizeList);
  // const { colour } = useSelector((state) => state.colorList);
  const { category } = useSelector((state) => state.getListCategoryDropdown);
  const productDetail = useSelector((state) => state.viewProduct);
  const { loading, data } = productDetail;
  const updateStatus = useSelector((state) => state.updateProduct);
  const { success, error, loadingUpdate } = updateStatus;

  console.log(updateStatus);

  const [selectedImgs, setSelectedImgs] = useState([]);
  console.log(productDetail);
  useEffect(() => {
    const status = true;
    dispatch(listSize({ status }));
    dispatch(listColor({ status }));
    dispatch(listCategory({ status }));
    dispatch(listPromotion({ status }));
    dispatch(viewDetailProduct(productId));
    if (success) {
      toast.success("Cập nhật thông tin sản phẩm thành công");
      dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: false });
    }
    if (error) {
      toast.error("Cập nhật thông tin sản phẩm thất bại, vui lòng thử lại");
      dispatch({ type: UPDATE_PRODUCT_FAIL, payload: false });
    }
  }, [success, error, triggerReload, dispatch]);

  const onSubmit = (submitData) => {
    dispatch(updateProduct(submitData, productId));
  };

  const selectedImg = (e) => {
    let selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    const getFileArray = selectedFilesArray.slice(0, 10);
    const imgsArray = getFileArray.map((file) => URL.createObjectURL(file));

    setSelectedImgs((prevImg) => prevImg.concat(imgsArray));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="updateProduct">
        <h1 className="addProductTitle">Chỉnh sửa thông tin sản phẩm</h1>
        {loading ? (
          <Loading />
        ) : (
          <Formik
            initialValues={{
              productName: data.product_name,
              brandName: data.brand,
              category: data.category_id,
              sex: data.gender === "Nam" ? true : false,
              description: data.description,
              promotion: data.promotion_id,
              promotionText: data.promotion_name ? data.promotion_name : "Chưa có",
              price: data.price,
              image: data.images,
              categoryText: data.category,
              sexText: data.gender,
              promotion_backup: data.promotion_id,
              productId: data.product_id,
              // productDetailList: data.product_detail_list,
            }}
            onSubmit={onSubmit}
            validationSchema={SchemaErrorUpdateProduct}
            validateOnBlur
            validateOnChange
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
                          onChange={formik.handleChange}
                          value={formik.values.productName}
                          error={formik.errors.productName}
                        />
                        <Form.Group widths="equal">
                          <Form.Input
                            fluid
                            label="Giá"
                            placeholder="Giá"
                            type="number"
                            name="price"
                            onChange={formik.handleChange}
                            value={formik.values.price}
                            error={formik.errors.price}
                          />
                          <Form.Input
                            fluid
                            label="Tên thương hiệu"
                            placeholder="Tên thương hiệu"
                            name="brandName"
                            onChange={formik.handleChange}
                            value={formik.values.brandName}
                            error={formik.errors.brandName}
                          />
                        </Form.Group>
                        <Form.Group widths="equal">
                          <Form.Select
                            name="category"
                            key={category.value}
                            fluid
                            label="Thể Loại"
                            options={category || []}
                            placeholder="Thể loại"
                            onChange={(e, v) => {
                              formik.setFieldValue("category", v.value);
                              const { text } = category.find((o) => o.value === v.value);
                              formik.setFieldValue("categoryText", text);
                            }}
                            value={formik.values.category}
                            error={formik.errors.category}
                            text={formik.values.categoryText}
                          />
                          <Form.Select
                            fluid
                            label="Dành cho"
                            options={options}
                            placeholder="Giới tính"
                            onChange={(e, v) => {
                              formik.setFieldValue("sex", v.value);
                              const { text } = options.find((o) => o.value === v.value);
                              formik.setFieldValue("sexText", text);
                            }}
                            name="sex"
                            value={formik.values.sex}
                            error={formik.errors.sex}
                            text={formik.values.sexText}
                          />
                          {/* <Form.Select
                            key={promotion.value}
                            fluid
                            label="Khuyến mại"
                            options={promotion || []}
                            placeholder="Khuyến mại"
                            onChange={(e, v) => {
                              formik.setFieldValue("promotion", v.value);
                              const { text } = promotion.find((o) => o.value === v.value);
                              formik.setFieldValue("promotionText", text);
                            }}
                            name="promotion"
                            value={formik.values.promotion}
                            text={formik.values.promotionText}
                          /> */}
                        </Form.Group>
                        <Form.TextArea
                          label="Miêu tả"
                          placeholder="Cho khách hàng thêm thông tin về sản phẩm..."
                          name="description"
                          onChange={formik.handleChange}
                          value={formik.values.description}
                          error={formik.errors.description}
                        />
                        {/* {formik.values.productDetailList.map((item, index) => (
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
                                readOnly
                              />
                              <Form.Input
                                name={`productDetailList[${index}].quantity`}
                                fluid
                                label="Số lượng"
                                placeholder="Số lượng"
                                value={item.quantity}
                                readOnly
                              />
                            </Form.Group>
                          </div>
                        ))} */}
                      </div>
                      <div className="productTopRight">
                        <div style={{ margin: 10 }}>
                          <Label as="a" color="teal" tag>
                            Hình ảnh sản phẩm
                          </Label>
                        </div>
                        <div className="productUpload">
                          <div className="upload-image">
                            <section>
                              <label htmlFor="icon-button-file">
                                {selectedImgs.length >= 0 &&
                                  (selectedImgs.length > 10 ? (
                                    <p className="error">
                                      You can't upload more than 10 image! <br />
                                      <span>
                                        Please delete <b>{selectedImgs.length - 10}</b> of them
                                      </span>
                                    </p>
                                  ) : (
                                    <div className="upload-img">
                                      + Thêm hình <br />
                                      <span>Tối đa 10 hình nha!!!</span>
                                      <Input
                                        accept="image/*"
                                        id="icon-button-file"
                                        type="file"
                                        onChange={selectedImg}
                                        multiple
                                      />
                                      <IconButton
                                        color="primary"
                                        aria-label="upload picture"
                                        component="span"
                                      >
                                        <Publish />
                                      </IconButton>
                                    </div>
                                  ))}
                              </label>
                            </section>
                          </div>

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
                                      </ImageListItem>
                                    );
                                  })}
                              </ImageList>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {loadingUpdate ? (
                      <Loading />
                    ) : (
                      <div className="productBottom">
                        <Form.Button type="submit" color="green" disabled={loadingUpdate}>
                          Xác nhận
                        </Form.Button>
                      </div>
                    )}
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
