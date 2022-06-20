/* eslint-disable */
import React from "react";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Icon, Button } from "semantic-ui-react";

function ExportToExcel({ apiData, fileName }) {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    delete apiData.image_url;
    console.log(apiData);
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return <Button size='tiny' animated color="blue" onClick={(e) => exportToCSV(apiData, fileName)}>
            <Button.Content visible>Export to excel</Button.Content>
            <Button.Content hidden>
              <Icon name="download" />
            </Button.Content>
          </Button>;
}

export default ExportToExcel;
