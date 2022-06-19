import "./newProduct.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const Input = styled("input")({
  display: "none",
});

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
        <form className="addProductForm">
          <div className="addProductItem">
            <div className="label">Image:</div>
            <TextField
              id="standard-read-only-input"
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={selectedImg}
              />
              <Button variant="contained" component="span" color="primary">
                Upload
              </Button>
            </label>
          </div>
          <div className="addProductItem">
            <div className="label">Name:</div>
            <TextField
              required
              id="standard-required"
              defaultValue="Hello World"
              variant="standard"
            />
            {/* <input type="text" placeholder="Apple Airpods" /> */}
          </div>
          <div className="addProductItem">
            Stock
            <TextField
              required
              id="standard-required"
              defaultValue="Hello World"
              variant="standard"
            />
          </div>
          <div className="addProductItem">
            <TextField
              required
              id="standard-required"
              // label="Required"
              defaultValue="Hello World"
              variant="standard"
            />
            <label>
              Active
              <select name="active" id="active">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </label>
          </div>
          <button type="submit" className="addProductButton">
            Create
          </button>
        </form>
        <div className="images">
          {selectedImgs &&
            selectedImgs.map((image, index) => (
              <div key={image} className="image">
                <img src={image} alt="" height="200" />
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
      </div>
    </DashboardLayout>
  );
}
