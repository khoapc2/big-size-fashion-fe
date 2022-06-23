/* eslint-disable */
import "./newProduct.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Publish } from "@material-ui/icons";
import IconButton from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Form, Label, Button, Icon } from "semantic-ui-react";

const Input = styled("input")({
  display: "none",
});

// const itemData = [
//   {
//     img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
//     title: "Breakfast",
//     author: "@bkristastucchio",
//     featured: true,
//   },
//   {
//     img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
//     title: "Burger",
//     author: "@rollelflex_graphy726",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
//     title: "Camera",
//     author: "@helloimnik",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
//     title: "Coffee",
//     author: "@nolanissac",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
//     title: "Hats",
//     author: "@hjrc33",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
//     title: "Honey",
//     author: "@arwinneil",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
//     title: "Basketball",
//     author: "@tjdragotta",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
//     title: "Fern",
//     author: "@katie_wasserman",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
//     title: "Mushrooms",
//     author: "@silverdalex",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
//     title: "Tomato basil",
//     author: "@shelleypauls",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
//     title: "Sea star",
//     author: "@peterlaster",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
//     title: "Bike",
//     author: "@southside_customs",
//   },
// ];

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

  const selectedImg = (e) => {
    const selectedFiles = e.target.files;
    console.log(selectedFiles);
    const selectedFilesArray = Array.from(selectedFiles);
    const imgsArray = selectedFilesArray.map((file) => URL.createObjectURL(file));

    setSelectedImgs(imgsArray);
  };

  console.log(selectedImgs);

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
                <Form.Checkbox label="I agree to the Terms and Conditions" />
                <Form.Button>Submit</Form.Button>
              </Form>
            </div>
            <div className="productTopRight">
              <div style={{ margin: 10 }}>
                <Label as="a" color="teal" tag>
                  Product Image
                </Label>
              </div>
              <div className="productUpload">
                {/* <img
                  src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                  className="productUploadImg"
                /> */}
                <div className="upload-image">
                  <section>
                    <label htmlFor="icon-button-file">
                      <div className="upload-img">
                        + Add Images <br />
                        <span>Up to 5 images</span>
                        <Input
                          accept="image/*"
                          id="icon-button-file"
                          type="file"
                          onChange={selectedImg}
                          multiple
                        />
                        <IconButton color="primary" aria-label="upload picture" component="span">
                          <Publish />
                        </IconButton>
                      </div>
                    </label>
                  </section>
                </div>
                <div className="images">
                  {/* {selectedImgs &&
                    selectedImgs.map((image, index) => (
                      <div key={image} className="image">
                        <img src={image} alt="" width="200" height="200" />
                        <button
                          type="button"
                          onClick={() => setSelectedImgs(selectedImgs.filter((e) => e !== image))}
                        >
                          Delete img
                        </button>
                        <p>{index}</p>
                      </div>
                    ))} */}
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
                            <ImageListItemBar
                              sx={{
                                background:
                                  "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                                  "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                              }}
                              position="top"
                              actionIcon={
                                <Button icon labelPosition='left' style={{margin:10}} inverted color="red" size="small">
                                  <Icon name='delete'/> Delete
                                </Button>
                              }
                              actionPosition="left"
                            />
                          </ImageListItem>
                        );
                      })}
                  </ImageList>
                </div>
                {/* <input type="file" id="file" style={{ display: "none" }} /> */}
              </div>
            </div>
          </div>
          {/* <div className="productBottom">
            <form className="productForm">
              <div className="productFormLeft">
                <label>
                  Product Name
                  <input type="text" />
                </label>
                <label>
                  Price
                  <input type="text" />
                </label>
                <label>
                  Category
                  <select name="inStock" id="idStock">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </label>
                <label>
                  Size
                  <select name="inStock" id="idStock">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </label>
                <label>
                  Colour
                  <select name="active" id="active">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </label>
                <label>
                  Gender
                  <select name="active" id="active">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </label>
                <label>
                  Supplier Name:
                  <input type="text" />
                </label>
              </div>
              <div className="productFormRight">
                <div className="productUpload">
                  <img
                    src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                    className="productUploadImg"
                  />
                  <label htmlFor="icon-button-file">
                    <Input
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      onChange={selectedImg}
                      multiple
                    />
                    <IconButton color="primary" aria-label="upload picture" component="span">
                      <Publish />
                    </IconButton>
                  </label>

                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <div className="images">
                  {selectedImgs &&
                    selectedImgs.map((image, index) => (
                      <div key={image} className="image">
                        <img src={image} alt="" width="200" height="200" />
                        <button
                          type="button"
                          onClick={() => setSelectedImgs(selectedImgs.filter((e) => e !== image))}
                        >
                          Delete img
                        </button>
                        <p>{index}</p>
                      </div>
                    ))}
                </div>
                <button type="button" className="productButton">
                  Update
                </button>
              </div>
            </form>
          </div> */}
        </div>
      </div>
    </DashboardLayout>
  );
}
