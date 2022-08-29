/* eslint-disable */
import { useDispatch, useSelector } from "react-redux";

import "./newProduct.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { styled } from "@mui/material/styles";
import { useState, useEffect, Fragment } from "react";
import { Publish } from "@material-ui/icons";
import IconButton from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Form, Label } from "semantic-ui-react";
import { toast } from "react-toastify";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Stack } from "@mui/material";
import { FieldArray, Formik, ErrorMessage } from "formik";
import { SchemaErrorCreateProduct } from "../../../service/Validations/ProductValidation";
import { listSize } from "../../../redux/actions/sizeAction";
import { listColor } from "../../../redux/actions/colorAction";
import { listCategory } from "../../../redux/actions/categoryAction";
import { createProduct } from "../../../redux/actions/productAction";
import { triggerReload } from "../../../redux/actions/userAction";
import Loading from "../../../components/Loading";
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
  const [testImg, setTestImg] = useState([]);

  const [flagSubmit, setFlagSubmit] = useState(false);
  // const [addToggle, setAddToggle] = useState(false);
  // const [price, setPrice] = useState(0);
  const { size } = useSelector((state) => state.getListSizeDropdown);
  const { colour } = useSelector((state) => state.getListColorDropdown);
  const { category } = useSelector((state) => state.getListCategoryDropdown);
  const response = useSelector((state) => state.createProductState);
  const { success, error, loading } = response;

  useEffect(() => {
    if (success) {
      toast.success("Tạo sản phẩm thành công");
      setFlagSubmit(true);
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
    Object.values(testImg).forEach(function (img, index) {
      formData.append("files", img);
    });
    dispatch(createProduct(data, formData));
  };

  const selectedImg = (e) => {
    let selectedFiles = e.target.files;
    // console.log(selectedFiles);
    setFileImg(selectedFiles);

    const selectedFilesArray = Array.from(selectedFiles);
    // console.log(selectedFilesArray);
    // console.log(fileImg);

    const getFileArray = selectedFilesArray.slice(0, 10);
    // console.log(getFileArray);
    setTestImg([...testImg, ...getFileArray]);

    const imgsArray = getFileArray.map((file) => URL.createObjectURL(file));
    // console.log(imgsArray);

    setSelectedImgs((prevImg) => prevImg.concat(imgsArray));
    // console.log(selectedImgs);
  };

  // console.log(testImg);

  const selectDelete = (image, index) => {
    setSelectedImgs(selectedImgs.filter((e) => e !== image));
    setTestImg(testImg.filter((e, ind) => ind !== index));
  };
  const handleReset = () => {
    setFlagSubmit(false);
    setSelectedImgs([]);
    setTestImg([]);
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
            price: 1000,
            colourWithSize: [{ colour: "", size: [] }],
          }}
          onSubmit={onSubmit}
          onReset={handleReset}
          validationSchema={SchemaErrorCreateProduct}
          validateOnBlur={true}
          validateOnChange={true}
        >
          {(formik) => {
            // console.log(formik);
            return (
              <div className="product">
                <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                  <div className="productTop">
                    <div className="productTopLeft">
                      <Form.Input
                        fluid
                        label="Tên sản phẩm"
                        placeholder="Tên sản phẩm"
                        name="productName"
                        onChange={formik.handleChange}
                        value={formik.values.productName}
                        error={
                          formik.touched.productName && formik.errors.productName
                            ? formik.errors.productName
                            : null
                        }
                        disabled={flagSubmit}
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
                          disabled={flagSubmit}
                        />
                        <Form.Input
                          fluid
                          label="Tên thương hiệu"
                          placeholder="Tên thương hiệu"
                          name="brandName"
                          onChange={formik.handleChange}
                          value={formik.values.brandName}
                          error={
                            formik.touched.brandName && formik.errors.brandName
                              ? formik.errors.brandName
                              : null
                          }
                          disabled={flagSubmit}
                        />
                      </Form.Group>
                      <Form.Group widths="equal">
                        <Form.Select
                          key={category.value}
                          search
                          fluid
                          label="Thể Loại"
                          options={category || []}
                          placeholder="Thể loại"
                          onChange={(e, v) => {
                            formik.setFieldValue("category", v.value);
                          }}
                          name="category"
                          value={formik.values.category}
                          error={
                            formik.touched.category && formik.errors.category
                              ? formik.errors.category
                              : null
                          }
                          disabled={flagSubmit}
                        />
                        <Form.Select
                          fluid
                          search
                          label="Dành cho"
                          options={options}
                          placeholder="Giới tính"
                          onChange={(e, v) => formik.setFieldValue("sex", v.value)}
                          name="sex"
                          value={formik.values.sex}
                          error={formik.touched.sex && formik.errors.sex ? formik.errors.sex : null}
                          disabled={flagSubmit}
                        />
                      </Form.Group>
                      <Form.TextArea
                        label="Miêu tả"
                        placeholder="Cho khách hàng thêm thông tin về sản phẩm..."
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        error={
                          formik.touched.description && formik.errors.description
                            ? formik.errors.description
                            : null
                        }
                        disabled={flagSubmit}
                      />

                      <FieldArray name="colourWithSize">
                        {({ remove, push }) => (
                          <Fragment>
                            {formik.values.colourWithSize.map((node, index) => (
                              <div className="detailProduct">
                                <Form.Group widths="equal" key={index}>
                                  <div className="field">
                                    <Form.Select
                                      className="form-control"
                                      name={`colourWithSize[${index}].colour`}
                                      fluid
                                      search
                                      label="Màu sắc"
                                      options={colour || []}
                                      onChange={(e, v) =>
                                        formik.setFieldValue(
                                          `colourWithSize[${index}].colour`,
                                          v.value
                                        )
                                      }
                                      // placeholder="Màu sắc"
                                      disabled={flagSubmit}
                                    />
                                    <div className="text-danger">
                                      <ErrorMessage
                                        color="red"
                                        name={`colourWithSize[${index}].colour`}
                                      />
                                    </div>
                                  </div>
                                  <div className="field">
                                    <Form.Select
                                      name={`colourWithSize[${index}].size`}
                                      multiple
                                      fluid
                                      label="Kích cỡ"
                                      search
                                      options={size || []}
                                      onChange={(e, v) =>
                                        formik.setFieldValue(
                                          `colourWithSize[${index}].size`,
                                          v.value
                                        )
                                      }
                                      // placeholder="Kích cỡ"
                                      disabled={flagSubmit}
                                    />
                                    <div className="text-danger">
                                      <ErrorMessage
                                        color="red"
                                        name={`colourWithSize[${index}].size`}
                                      />
                                    </div>
                                  </div>
                                  <Form.Button
                                    className="remove-category"
                                    label="."
                                    disabled={
                                      formik.values.colourWithSize.length == 1 || flagSubmit
                                    }
                                    color="red"
                                    onClick={() => remove(index)}
                                  >
                                    X
                                  </Form.Button>
                                </Form.Group>
                              </div>
                            ))}
                            <Form.Button
                              className="button-add-size-color"
                              color="green"
                              onClick={() => push({ colour: "", size: [] })}
                              disabled={flagSubmit}
                            >
                              Thêm màu, cỡ
                            </Form.Button>
                          </Fragment>
                        )}
                      </FieldArray>
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
                                      disabled={flagSubmit}
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
                                        onClick={() => selectDelete(item, index)}
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
                    {flagSubmit ? (
                      <Form.Button type="reset" color="blue">
                        Tạo thêm sản phẩm
                      </Form.Button>
                    ) : (
                      <div>
                        {!loading && (
                          <Form.Button type="submit" color="green">
                            Xác nhận
                          </Form.Button>
                        )}
                      </div>
                    )}
                    {loading && <Loading />}
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
