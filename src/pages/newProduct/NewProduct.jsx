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
import Box from "@mui/material/Box";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
// import { height, width } from "@mui/system";
import { Stack, Checkbox } from "@mui/material";
import { FieldArray, Formik, Field } from "formik";
import { SchemaErrorCreateProduct } from "../../service/Validations/ProductValidation";
import { listSize } from "../../redux/actions/sizeAction";
import { listColor } from "../../redux/actions/colorAction";
import { listCategory } from "../../redux/actions/categoryAction";
const Input = styled("input")({
  display: "none",
});

// function srcset(image, width, height, rows = 1, cols = 1) {
//   return {
//     src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
//     srcSet: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format&dpr=2 2x`,
//     width: width * cols,
//     height: height * row,
//   };
// }
const options = [
  { key: "1", text: "Nam", value: "male" },
  { key: "0", text: "Nữ", value: "female" },
];

export default function NewProduct() {
  const dispatch = useDispatch();

  const [selectedImgs, setSelectedImgs] = useState([]);

  const [price, setPrice] = useState(0);
  const { size } = useSelector((state) => state.sizeList);
  const { colour } = useSelector((state) => state.colorList);
  const { category } = useSelector((state) => state.categoryList);
  const triggerReload = useSelector((state) => state.triggerReload);

  console.log(typeof colour);
  console.log(colour);
  console.log(typeof size);
  console.log(size);
  console.log(typeof category);
  console.log(category);
  console.log(typeof options);
  console.log(options);

  // const newColorArray = color.map((item) => {
  //   return {
  //     key: item.colour_id,
  //     text: item.colour_name,
  //     value: item.colour_name,
  //   };
  // });

  useEffect(() => {
    const status = true;
    dispatch(listSize());
    dispatch(listColor({ status }));
    dispatch(listCategory());
  }, [dispatch, triggerReload]);

  const onSubmit = (e) => {
    console.log(e);
  };
  // const [loading, setLoading] = useState(true);

  const selectedImg = (e) => {
    let selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    //still have //BUG
    const getFileArray = selectedFilesArray.slice(0, 10);
    const imgsArray = getFileArray.map((file) => URL.createObjectURL(file));
    // if (selectedImg) {
    // setSelectedImgs(selectedImgs.push(imgsArray));
    // } else {
    setSelectedImgs((prevImg) => prevImg.concat(imgsArray));
  };

  const selectDelete = (image) => {
    setSelectedImgs(selectedImgs.filter((e) => e !== image));
  };

  // const [inputFields, setInputFields] = useState([{ color: "", sizes: [] }]);

  // const handleChangeInput = (index, event) => {
  //   const values = [...inputFields];
  //   values[index][event.target.name] = event.target.value;
  //   setInputFields(values);
  // };

  // const handleAddFields = () => {
  //   setInputFields([...inputFields, { firstName: "", lastName: "" }]);
  // };

  // const handleRemoveFields = (index) => {
  //   const values = [...inputFields];
  //   values.splice(index, 1);
  //   setInputFields(values);
  // };

  // useEffect(() => {
  //   setSelectedImgs(pics);
  // }, [pics]);

  // console.log(selectedImgs);
  const getFieldValue = (e) => {
    setPrice(
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "VND",
      }).format(e.target.value)
    );
  };

  // const addCheckBox = (_, value, prob) => {
  //   console.log(prob);
  //   if (v.checked) {
  //     if (formik.values.size.includes(v.id)) {
  //       console.log(v);
  //       const nextValue = formik.values.size.filter((value) => value !== v.id);
  //       formik.setFieldValue("size", nextValue);
  //     } else {
  //       const nextValue = formik.values.size.concat(v.id);
  //       formik.setFieldValue("size", nextValue);
  //     }
  //   } else {
  //     if (formik.values.size.includes(v.id)) {
  //       console.log(v.id);
  //       let newArray = [...formik.values.size];
  //       const index = newArray.findIndex((size) => size === v.id);
  //       newArray.splice(index, 1);
  //       formik.setFieldValue("size", newArray);
  //     }
  //   }
  // };

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
            colourWithSize: [
              { id: 0, colour: "", size: [] },
              // { id: 1, colour: "A", size: [] },
            ],
          }}
          onSubmit={onSubmit}
          validationSchema={SchemaErrorCreateProduct}
          validateOnBlur
          validateOnChange
        >
          {(formik) => {
            console.log(formik);
            return (
              <div className="product">
                <Form>
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
                          label="Giới tính"
                          options={options}
                          placeholder="Giới tính"
                          onChange={(e, v) => formik.setFieldValue("sex", v.value)}
                          name="sex"
                          value={formik.values.sex}
                          error={formik.errors.sex}
                        />
                      </Form.Group>
                      {/* {inputFields.map((inputField, index) => ( */}
                      {/* <div key={index}> */}
                      {/* <div class="block-color-size"></div> */}
                      <FieldArray
                        name="colourWithSize"
                        render={({ remove, push }) => (
                          <>
                            {console.log(formik.values.colourWithSize)}
                            {/* {console.log(formik.values.colourWithSize[1].id)} */}
                            {formik.values.colourWithSize.length > 0 &&
                              formik.values.colourWithSize.map((node, index) => (
                                <>
                                  <div key={node.id}>
                                    <Form.Group widths="equal">
                                      <Form.Select
                                        key={index}
                                        name={`colourWithSize[${index}].colour`}
                                        fluid
                                        label="Màu sắc"
                                        options={options || []}
                                        onChange={(e, v) =>
                                          formik.setFieldValue(
                                            `colourWithSize[${index}].colour`,
                                            v.value
                                          )
                                        }
                                        placeholder="Màu sắc"
                                        // error={formik.errors.colourWithSize[index].colour}
                                      />
                                      <div className="sizeInput">
                                        <label
                                          htmlFor={`colourWithSize[${index}].label-size`}
                                          style={{
                                            fontSize: "13px",
                                            fontWeight: "700",
                                            color: "#000000DE",
                                          }}
                                        >
                                          Kích cỡ
                                        </label>
                                        <div className="checkboxSize">
                                          <Box
                                            sx={{
                                              display: "flex",
                                              flexWrap: "wrap",
                                              alignContent: "space-between",
                                              p: 1,
                                              m: 1,
                                              bgcolor: "background.paper",
                                              maxWidth: 300,
                                              borderRadius: 0,
                                              gap: 2,
                                            }}
                                          >
                                            <Field
                                            // name={`colourWithSize.${index}.size.${sizeIndex}`}
                                            >
                                              {({ field }) => {
                                                return size.map((sizeItem, sizeIndex) => {
                                                  return (
                                                    <Field
                                                      type="checkbox"
                                                      id={sizeIndex}
                                                      value={sizeItem.size_name}
                                                      label={sizeItem.size_name}
                                                      name={`colourWithSize[${index}].size`}
                                                      as={Checkbox}
                                                    />
                                                  );
                                                });
                                              }}
                                            </Field>
                                            {/* </Field>
                                          {size.map((item, sizeIndex) => (
                                              type="checkbox"
                                              id={item.size_name}
                                              value={item.size_name}
                                              label={item.size_name}
                                              onChange={(e, v) => {
                                                if (v.checked) {
                                                  if (
                                                    formik.values.colourWithSize[
                                                      index
                                                    ].size.includes(v.id)
                                                  ) {
                                                    const nextValue = formik.values.colourWithSize[
                                                      index
                                                    ].size.filter((value) => value !== v.id);
                                                    formik.setFieldValue(
                                                      `colourWithSize.${index}.size`,
                                                      nextValue
                                                    );
                                                  } else {
                                                    const nextValue = formik.values.colourWithSize[
                                                      index
                                                    ].size.concat(v.id);
                                                    formik.setFieldValue(
                                                      `colourWithSize.${index}.size`,
                                                      nextValue
                                                    );
                                                  }
                                                } else {
                                                  if (
                                                    formik.values.colourWithSize[
                                                      index
                                                    ].size.includes(v.id)
                                                  ) {
                                                    let newArray = [
                                                      ...formik.values.colourWithSize[index].size,
                                                    ];
                                                    const indexSize = newArray.findIndex(
                                                      (size) => size === v.id
                                                    );
                                                    newArray.splice(indexSize, 1);
                                                    formik.setFieldValue(
                                                      `colourWithSize.${index}.size`,
                                                      newArray
                                                    );
                                                  }
                                                }
                                              }}
                                            />
                                          ))} */}
                                            ;
                                          </Box>
                                          <Form.Input
                                            type="hidden"
                                            error={formik.errors.colourWithSize}
                                          />
                                        </div>
                                        <IconButton onClick={() => remove(index)}>
                                          <RemoveIcon />
                                        </IconButton>
                                      </div>
                                    </Form.Group>
                                  </div>
                                  <IconButton
                                    onClick={(e) => {
                                      useEffect(() => {
                                        formik.values.colourWithSize.push({
                                          id: index + 1,
                                          colour: "",
                                          size: [],
                                        });
                                      }, [formik.values.colourWithSize]);
                                    }}
                                  >
                                    <AddIcon />
                                  </IconButton>
                                </>
                              ))}
                          </>
                        )}
                      >
                        {/* {inputFields.length !== 1 ? (
                    
                  ) : (
                    <></>
                  )} */}
                      </FieldArray>
                      {/* </div>
            ))} */}

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
