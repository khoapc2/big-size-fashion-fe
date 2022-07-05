/* eslint-disable */
import { useDispatch, useSelector } from "react-redux";

import "./newProduct.css";
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

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Stack } from "@mui/material";
import { Formik } from "formik";
import { SchemaErrorCreateProduct } from "../../../service/Validations/ProductValidation";
import { listSize } from "../../../redux/actions/sizeAction";
import { listColor } from "../../../redux/actions/colorAction";
import { listCategory } from "../../../redux/actions/categoryAction";
import { createProduct } from "../../../redux/actions/productAction";
import { triggerReload } from "../../../redux/actions/userAction";
import {
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_SUCCESS,
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

  const [selectedImgs, setSelectedImgs] = useState([]);
  const [fileImg, setFileImg] = useState();
  // const [addToggle, setAddToggle] = useState(false);

  // const [price, setPrice] = useState(0);
  // const { size } = useSelector((state) => state.sizeList);
  // const { colour } = useSelector((state) => state.getListColorDropdown);
  const { category } = useSelector((state) => state.getListCategoryDropdown);
  const response = useSelector((state) => state.createProductState);

  const { success, error } = response;
  useEffect(() => {
    if (success) {
      toast.success("Tạo sản phẩm thành công");
      dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: false });
    }
    if (error) {
      toast.error("Tạo sản phẩm thất bại, vui lòng thử lại");
      dispatch({ type: CREATE_PRODUCT_FAIL, payload: false });
    }
  }, [success, error, triggerReload]);

  useEffect(() => {
    const status = true;
    dispatch(listSize({ status }));
    dispatch(listColor({ status }));
    dispatch(listCategory({ status }));
  }, [dispatch, triggerReload]);

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.values(fileImg).forEach(function (img, index) {
      console.log(img);
      formData.append(img.name, img, img.name);
    });
    // console.log(fileImg);
    // console.log(formData);
    dispatch(createProduct(data, formData));
  };

  const selectedImg = (e) => {
    let selectedFiles = e.target.files;
    console.log(selectedFiles);
    // console.log(selectedFiles);
    setFileImg(selectedFiles);

    const selectedFilesArray = Array.from(selectedFiles);
    // console.log(selectedFilesArray);

    const getFileArray = selectedFilesArray.slice(0, 10);
    const imgsArray = getFileArray.map((file) => URL.createObjectURL(file));

    setSelectedImgs((prevImg) => prevImg.concat(imgsArray));
  };

  const selectDelete = (image) => {
    setSelectedImgs(selectedImgs.filter((e) => e !== image));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="newProduct">
        <h1 className="addProductTitle">Tạo sản phẩm</h1>
        <Formik
          initialValues={{
            productName: "",
            brandName: "",
            category: "",
            sex: "",
            description: "",
            price: 0,
          }}
          onSubmit={onSubmit}
          validationSchema={SchemaErrorCreateProduct}
          validateOnBlur
          validateOnChange
        >
          {(formik) => {
            // console.log(formik);
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
                          key={category.value}
                          fluid
                          label="Thể Loại"
                          options={category || []}
                          placeholder="Thể loại"
                          onChange={(e, v) => {
                            formik.setFieldValue("category", v.value);
                          }}
                          name="category"
                          value={formik.values.category}
                          error={formik.errors.category}
                        />
                        <Form.Select
                          fluid
                          label="Sản phẩm dành cho"
                          options={options}
                          placeholder="Giới tính"
                          onChange={(e, v) => formik.setFieldValue("sex", v.value)}
                          name="sex"
                          value={formik.values.sex}
                          error={formik.errors.sex}
                        />
                      </Form.Group>
                      <Form.TextArea
                        label="Miêu tả"
                        placeholder="Cho khách hàng thêm thông tin về sản phẩm..."
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        error={formik.errors.description}
                      />
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
                          {selectedImgs.length === 0 ? (
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
                              {selectedImgs &&
                                selectedImgs.map((item, index) => {
                                  // console.log(item);
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
                                      <ImageListItemBar
                                        sx={{
                                          background:
                                            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                                            "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                                        }}
                                        position="top"
                                        onClick={() => selectDelete(item)}
                                        actionIcon={
                                          <IconButton
                                            sx={{ color: "white !important" }}
                                            aria-label="Delete"
                                            style={{ margin: 10 }}
                                            size="large"
                                          >
                                            <DeleteForeverIcon /> Delete
                                          </IconButton>
                                        }
                                        actionPosition="left"
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
                  <div className="productBottom">
                    <Form.Button type="submit" color="green">
                      Xác nhận
                    </Form.Button>
                  </div>
                </Form>
              </div>
            );
          }}
        </Formik>
      </div>
    </DashboardLayout>
  );
}
