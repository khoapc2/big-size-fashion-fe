/* eslint-disable */
import "./newProduct.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Publish } from "@material-ui/icons";
import IconButton from "@mui/material/IconButton";
import { Form, Label } from "semantic-ui-react";

const Input = styled("input")({
  display: "none",
});

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
              <div style={{margin:10}}>
                <Label as="a" color="teal" tag>
                  Product Image
                </Label>
              </div>
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
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
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
