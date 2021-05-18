import React, { Component } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import scrollToComponent from 'react-scroll-to-component';
import "../App.css";
import {
  Container,
  Row,
  Col
} from "reactstrap";
import Navbarpage from "./navbar";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';


class mainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data table recent purchase
      dataRecentPurchase: [],
      loadingRecentPurchase:false,
      // data table open order
      dataOpenOrder: [],
      loadingOpenOrder:false,
      // data table raw material
      dataInventory: [],
      loadingInventory:false,
      // data table finished goods
      dataInventory2: [],
      loadingInventory2:false,
    };
  }
  componentDidMount = () =>  {
    let PRMOUTLET = localStorage.getItem("outletID")
    const dataToSend = {
      PRMOUTLET:PRMOUTLET
    };
    this.setState({
      ...this.state,
      loadingOpenOrder:true,
      loadingInventory2:true,
    });
    axios
    .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/dataDashboardOutlet`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(result => {
      this.setState({
        ...this.state,
        dataOpenOrder: result.data.dataOrderH,
        dataInventory2: result.data.dataInventoryFinshedGoods,
        loadingOpenOrder:false,
        loadingInventory2:false,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  refreshPageData = () =>  {
    let PRMOUTLET = localStorage.getItem("outletID")
    const dataToSend = {
      PRMOUTLET:PRMOUTLET
    };
    this.setState({
      ...this.state,
      loadingOpenOrder:true,
      loadingInventory2:true,
    });
    axios
    .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/dataDashboardOutlet`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(result => {
      this.setState({
        ...this.state,
        dataOpenOrder: result.data.dataOrderH,
        dataInventory2: result.data.dataInventoryFinshedGoods,
        loadingOpenOrder:false,
        loadingInventory2:false,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  navToggle = () =>  {
    this.setState({
      ...this.state,
      navCollapse: !this.state.navCollapse
    });
  }
  render() {
    const openOrderColumns = [
      {
        name: 'Nomor order',
        selector: 'nomor_order',
        sortable: true,
      },
      {
        name: 'Tanggal buat',
        selector: 'tanggal_buat',
        sortable: true,
      },
      {
        name: 'Outlet',
        selector: 'nama_outlet',
        sortable: true,
      },
      {
        name: 'Status order',
        selector: 'status_order',
        sortable: true,
      },
    ];
    // data table finished goods
    const inventory2Columns = [
      {
        name: 'Kode Barang',
        selector: 'kode_barang',
        sortable: true,
      },
      {
        name: 'Nama Barang',
        selector: 'nama_barang',
        sortable: true,
      },
      {
        name: 'OnHand Qty',
        selector: 'onhand_qty',
        sortable: true,
      },
      {
        name: 'Satuan Barang',
        selector: 'satuan_barang',
        sortable: true,
      },
    ];
    const conditionalInventory2RowStyles = [
      {
        when: row => row.onhand_qty == 0,
        style: {
          color: 'red',
          '&:hover': {
            color: 'red',
            cursor: 'pointer',
          },
        },
      },
    ];
    return (
      <div>
        <Container fluid={true} style={{paddingBottom:30}}>
            <Row>
              <Col xs="12" sm="12" md="12" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                <span style={{fontWeight:"bold"}}>Hello {this.props.userinfo.nama_user}</span>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="12" md="12">
                <div className="card" style={{height:"100%"}}>
                  <div className="card-header">
                    <Row>
                      <Col xs="12" sm="12" md="12" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                        <span style={{fontWeight:"bold"}}>Finished Goods</span>
                      </Col>
                      {/* <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                        <button className="myBtn" onClick={() => this.exportPDF()}><i className="fa fa-plus-square fa-2x" aria-hidden="true"></i></button>
                      </Col> */}
                    </Row>
                  </div>
                  <div className="card-body">
                    <DataTableExtensions
                        columns={inventory2Columns}
                        data={this.state.dataInventory2}
                        print={false}
                        exportHeaders={false}
                        export={false}
                    >
                      <DataTable
                        defaultSortField="title"
                        pagination={true}
                        highlightOnHover={true}
                        striped={false}
                        progressPending={this.state.loadingInventory2}
                        noHeader={true}
                        fixedHeader={false}
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5]}
                        fixedHeaderScrollHeight="300px"
                        conditionalRowStyles={conditionalInventory2RowStyles}
                      />
                    </DataTableExtensions>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="12" md="12">
                <div className="card" style={{marginTop:15}}>
                  <div className="card-header">
                    <Row>
                      <Col xs="12" sm="12" md="12" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                        <span style={{fontWeight:"bold"}}>Open Order</span>
                      </Col>
                    </Row>
                  </div>
                  <div className="card-body">
                    <DataTableExtensions
                        columns={openOrderColumns}
                        data={this.state.dataOpenOrder}
                        print={false}
                        exportHeaders={false}
                        export={false}
                    >
                      <DataTable
                        defaultSortField="title"
                        pagination={true}
                        highlightOnHover={true}
                        striped={false}
                        progressPending={this.state.loadingOpenOrder}
                        noHeader={true}
                        fixedHeader={false}
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5,10]}
                        fixedHeaderScrollHeight="300px"
                      />
                    </DataTableExtensions>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    aksespage: state.reducer.aksespage,
    userinfo: state.reducer.userinfo
  };
};

export default withRouter(connect(mapStateToProps)(mainPage));