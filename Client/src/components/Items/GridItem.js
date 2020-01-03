import React, { useRef, useEffect, useState } from 'react';
import '../../App.css';
import { AgGridReact } from 'ag-grid-react';
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";
import 'ag-grid-enterprise';

import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Label,
  Button,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
} from 'reactstrap';

let a = [];
const CommonGrid = (props) => {
  const { gridItems } = props;
  let gridApi;
  let gridColumnApi;
  const [rowData, setRowData] = useState(null);
  const gridElem = useRef(null);

  const columnDefs = [
    {
      enableRowGroup: true,
      field: 'category',
      headerName: 'Category',
      hide: true,
      rowGroup: true,
    },
    {
      headerName: "Ship From VBU #",
      field: "ShipFromVBU",
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      editable: true
    },
    { headerName: "DC Number", field: "DCNumber" },
    { headerName: "Ship Unit", field: "ShipUnit" },
    { headerName: "FlowSetting", field: "FlowSetting", editable: true },
    { headerName: "SDC", field: "SDC", editable: true },
    { headerName: "Pallet Flag", field: "PalletFlag", editable: true },
    { headerName: "Max Stack Height", field: "MaxStackHeight", editable: true },
    { headerName: "Supply Chain Planner", field: "SupplyChainPlanner", editable: true },
    { headerName: "Comments", field: "Comments", editable: true },
    { headerName: "DC MOM", field: "DCMOM", editable: true },
    { headerName: "Priority", field: "Priority"},
    { headerName: "Order/ Req Create Date ", field: "OrderReqCreateDate" },
    { headerName: "Schedule Arrival Date ", field: "ScheduleArrivalDate" },
    { headerName: "Actual Arrival Date", field: "ActualArrivalDate" },
    { headerName: "Item Stocked", field: "ItemStocked" },
    { headerName: "Stock Effective Date", field: "StockEffectiveDate" },
    { headerName: "Non Stock Effective Date ", field: "NonStockEffectiveDate" },
    { headerName: "PO Number", field: "PONumber" },
    { headerName: "Item Number", field: "ItemNumber" },
    { headerName: "Item Description", field: "ItemDescription" },
    { headerName: "Vendor Name", field: "VendorName" },
    { headerName: "Add", field: "Add" },
    { headerName: "Item Weight (lbs)", field: "ItemWeight" },
    { headerName: "Item Depth (in)", field: "ItemDepth", editable: true },
    { headerName: "Item Width (in)", field: "ItemWidth", editable: true },
    { headerName: "Item Height (in)", field: "ItemHeight", editable: true },
    { headerName: "Innerpack Qty", field: "InnerpackQty", editable: true },
    { headerName: "Innerpack Weight (lbs)", field: "InnerpackWeight", editable: true },
    { headerName: "Innerpack Depth (in)", field: "InnerpackDepth", editable: true },
    { headerName: "Innerpack Width (in)", field: "InnerpackWidth", editable: true },
    { headerName: "Innerpack Height (in)", field: "InnerpackHeight", editable: true },
    { headerName: "Case Qty", field: "CaseQty", editable: true },
    { headerName: "Case Weight (lbs)", field: "CaseWeight", editable: true },
    { headerName: "Case Depth (in)", field: "CaseDepth", editable: true },
    { headerName: "Case Width (in)", field: "CaseWidth", editable: true },
    { headerName: "Case Height (in)", field: "CaseHeight", editable: true },
    { headerName: "Pallet Weight (lbs)", field: "PalletWeight", editable: true },
    { headerName: "Pallet Qty", field: "PalletQty", editable: true },
    { headerName: "Pallet Depth (in)", field: "PalletDepth", editable: true },
    { headerName: "Pallet Width (in)", field: "PalletWidth", editable: true },
    { headerName: "Pallet Height (in)", field: "PalletHeight", editable: true },
    { headerName: "Cases per Tier", field: "CasesperTier", editable: true },
    { headerName: "Tiers per Pallet", field: "TiersperPallet", editable: true },
    { headerName: "Innerpack Cube", field: "InnerpackCube", editable: true },
    { headerName: "Case Cube", field: "CaseCube", editable: true },
    { headerName: "Pallet Cube", field: "PalletCube", editable: true },
    { headerName: "Packaging Type", field: "PackagingType", editable: true },
    { headerName: "Hazmat Code", field: "HazmatCode", editable: true },
    { headerName: "Product Nested", field: "ProductNested", editable: true },
    { headerName: "Squeeze Clamp Safe", field: "SqueezeClampSafe", editable: true },
    { headerName: "Conveyable", field: "Conveyable", editable: true },
    { headerName: "Replaces Item Number", field: "ReplacesItemNumber", editable: true },
    { headerName: "PG#", field: "PG", editable: true },
    { headerName: "Liquid Content", field: "LiquidContent", editable: true }
  ]

  const defaultColDef = {
    resizable: true
  };
  const autoGroupColumnDef = {
    headerName: 'Group'
  }
  const getRowNodeId = (node) => {
    return node.id;
  }
  const onGridReady = (params) => {
    gridApi = params.api;
    gridColumnApi = params.columnApi;
    // params.api.sizeColumnsToFit();
  }

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    setRowData(gridItems);
  }, [props])

  const updateValue = () => {
    let confirmVal = window.confirm("Do you want to update the fields?");
    if (confirmVal) {
      const selectedRows = (gridElem.current && gridElem.current.gridOptions.api.getSelectedRows());
      for (let j = 0; j < rowData.length; j++) {
        for (let i = 0; i < selectedRows.length; i++) {
          if (rowData[j].id === selectedRows[i].id) {
            rowData[j]["ShipFromVBU"] = (document.querySelector("#ShipFromVBU").value !== '') ? document.querySelector("#ShipFromVBU").value : rowData[j]["ShipFromVBU"];
            rowData[j]["FlowSetting"] = (document.querySelector("#FlowSetting").value !== '') ? document.querySelector("#FlowSetting").value : rowData[j]["FlowSetting"];            
          }
        }
      }
      // setRowData(editedRowData)
      gridElem.current.gridOptions.api.setRowData(rowData)
      setUpdateDate(rowData);
      toggle();
    }
  }
  // var newCount = 1;
  function createNewRowData(category) {

    let newData  = {
      "id":100,
      "category": category,
      "ShipFromVBU": "ShipFromVBU",
      "DCNumber": "12345",
      "ShipUnit": "35000",
      "FlowSetting": "Glass",
      "SDC": "Home",
      "PalletFlag": "Inventory",
      "MaxStackHeight": "Yes",
      "SupplyChainPlanner": "12/20/2019",
      "Comments": "12/26/2019",
      "DCMOM": "12/26/2019",
      "Priority": "12/26/2019",
      "OrderReqCreateDate": "01/05/2020",
      "ScheduleArrivalDate": "02/05/2020",
      "ActualArrivalDate": "02/04/2020",
      "ItemStocked": "YES",
      "StockEffectiveDate": "02/03/2010",
      "NonStockEffectiveDate": "02/01/2020",
      "PONumber": "22222",
      "ItemNumber": "123",
      "ItemDescription": "Non Editable",
      "VendorName": "Non Editable",
      "Add": "yes",
      "ItemWeight": "2",
      "ItemDepth": "2",
      "ItemWidth": "1",
      "ItemHeight": "2",
      "InnerpackQty": "1",
      "InnerpackWeight": "13",
      "InnerpackDepth": "23",
      "InnerpackWidth": "12",
      "InnerpackHeight": "2",
      "CaseQty": "3",
      "CaseWeight": "2",
      "CaseDepth": "2",
      "CaseWidth": "3",
      "CaseHeight": "4",
      "PalletWeight": "4",
      "PalletQty": "4",
      "PalletDepth": "4",
      "PalletWidth": "3",
      "PalletHeight": "3",
      "CasesperTier": "2",
      "TiersperPallet": "3",
      "ItemCube": "3",
      "InnerpackCube": "3",
      "CaseCube": "4",
      "PalletCube": "4",
      "PackagingType": "4",
      "HazmatCode": "4",
      "ProductNested": "4",
      "SqueezeClampSafe": "4",
      "Conveyable": "yes",
      "ReplacesItemNumber": "3",
      "PG": "3",
      "LiquidContent": "no"
    }
    // newCount++;
    return newData;
  }
  const addItem = () => {
    let newItem = ""
    // console.log(document.querySelectorAll(".accordion-content input[type='checkbox']").length)
    // for(let i = 0; i < document.querySelectorAll(".accordion-content input[type='checkbox']").length;i++){
      // console.log(checked)
      if(document.querySelector("#pastdue-0").checked === true){
        newItem = createNewRowData("PAST DUE 1");
        gridElem.current.gridOptions.api.updateRowData({add: [newItem]});
      } 
      
      if(document.querySelector("#pastdue-1").checked === true){
        newItem = createNewRowData("PAST DUE 2");
        gridElem.current.gridOptions.api.updateRowData({add: [newItem]});
      } 
      
      if(document.querySelector("#pastdue-2").checked === true){
        newItem = createNewRowData("PAST DUE 3");
        gridElem.current.gridOptions.api.updateRowData({add: [newItem]});
      } 
      
      if(document.querySelector("#urgent-0").checked === true){
        newItem = createNewRowData("URGENT 1");
        gridElem.current.gridOptions.api.updateRowData({add: [newItem]});
      }
      
    // }
    
    
    
    // setUpdateDate()
  }

  const setUpdateDate = (data) => {
    let payload = {
      item: data
    }
    axios.post(`http://localhost:4000/apis/updateitems`, payload)
      .then(result => {
        alert("Data Updated Succesfully");
      })
  }

  return (
    <div>
      <div className="ag-theme-balham" style={{ height: '400px', width: '100%', marginTop: '50px' }}>
        <Button size="sm" className="singlebtn" color="danger" onClick={addItem}>Add</Button>
        <AgGridReact
          autoGroupColumnDef={ autoGroupColumnDef }
          columnDefs={ columnDefs }
          rowData={ rowData }
          defaultColDef={ defaultColDef }
          animateRows={ true }
          onGridReady={ onGridReady }
          rowSelection="multiple"
          getRowNodeId={ getRowNodeId }
          ref={ gridElem }
        />
        <Button size="sm" className="singlebtn" color="danger" onClick={toggle}>Edit</Button>
      </div>
      <Modal isOpen={modal} toggle={toggle} className='' size='xl'>
        <ModalHeader toggle={toggle}>Edit Items</ModalHeader>
        <ModalBody>
          <Container>
            <Row>
              {columnDefs.map((item) => {
                if (item.editable) {
                  return (
                    <Col className="xs-3">
                      <label>{item.headerName}</label>
                      <FormGroup>
                        <input type="text" name={item.field} id={item.field} />
                      </FormGroup>
                    </Col>
                  )
                }
              })}
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup >
            <Button className="updatebutton" onClick={(evt) => { updateValue(evt) }} >Update</Button>{' '}
            <Button onClick={toggle}>Cancel</Button>
          </ButtonGroup>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default CommonGrid;
