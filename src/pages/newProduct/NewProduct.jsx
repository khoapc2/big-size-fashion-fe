import "./newProduct.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

export default function NewProduct() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="newProduct">
        <h1 className="addProductTitle">New Product</h1>
        <form className="addProductForm">
          <div className="addProductItem">
            <label>
              Image
              <input type="file" id="file" />
            </label>
          </div>
          <div className="addProductItem">
            <label>
              Name
              <input type="text" placeholder="Apple Airpods" />
            </label>
          </div>
          <div className="addProductItem">
            <label>
              Stock
              <input type="text" placeholder="123" />
            </label>
          </div>
          <div className="addProductItem">
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
      </div>
    </DashboardLayout>
  );
}
