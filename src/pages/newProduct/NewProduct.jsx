/* eslint-disable */
import "./newProduct.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Publish } from "@material-ui/icons";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Form, Label, Button, Icon } from "semantic-ui-react";
// import { CircularProgress, Stack } from "@mui/material";

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
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" },
  { key: "o", text: "Other", value: "other" },
];

export default function NewProduct() {
  const [selectedImgs, setSelectedImgs] = useState([]);
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
    // setLoading(false);
  };

  const selectDelete = (image) => {
    setSelectedImgs(selectedImgs.filter((e) => e !== image));
  };

  // useEffect(() => {
  //   setSelectedImgs(pics);
  // }, [pics]);

  // console.log(selectedImgs);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="newProduct">
        <h1 className="addProductTitle">New Product</h1>
        <div className="product">
          <div className="productTop">
            <div className="productTopLeft">
              <Form>
                <Form.Input fluid label="Product name" placeholder="Product name" />
                <Form.Group widths="equal">
                  <Form.Select fluid label="Category" options={options} placeholder="Category" />
                  <Form.Select fluid label="Gender" options={options} placeholder="Gender" />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Select fluid label="Size" options={options} placeholder="Size" />
                  <Form.Select fluid label="Color" options={options} placeholder="Color" />
                </Form.Group>
                <Form.TextArea label="About" placeholder="Tell us more about you..." />
              </Form>
            </div>
            <div className="productTopRight">
              <div style={{ margin: 10 }}>
                <Label as="a" color="teal" tag>
                  Product Image
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
                            + Add Images <br />
                            <span>Max is 10 images</span>
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
                                <Button
                                  icon
                                  labelPosition="left"
                                  style={{ margin: 10 }}
                                  inverted
                                  color="red"
                                  size="small"
                                >
                                  <Icon name="delete" /> Delete
                                </Button>
                              }
                              actionPosition="left"
                            />
                          </ImageListItem>
                        );
                      })}
                  </ImageList>
                </div>
              </div>
            </div>
          </div>
          <div className="productBottom">
            <Form.Button>Submit</Form.Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
