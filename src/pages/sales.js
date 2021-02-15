import React, { Component } from "react";
import axios from "axios";
import moment from 'moment';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../App.css";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  Label
} from "reactstrap";
import Select from 'react-select';
import { HashLoader , ScaleLoader } from 'react-spinners';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import DatePicker from "react-datepicker";
import "../../node_modules/react-datepicker/dist/react-datepicker.css";
import '../../node_modules/react-datepicker/dist/react-datepicker-cssmodules.css';

class sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingParam:"none",
      pagination:true,
      highlight:true,
      striped:false,
      loading:false,
      noHeader:true,
      fixedHeader:false,
      prmModaledit:false,
      detailbuatpo:"",
      dataSalesH:[],
      dataSalesD:[],
      dataProduksiSisaD:[],
      dataProduksiHasilD:[],
      detailData:"",
      editNote:"",
      buttonEditPrm:false,
      buttonEditText:"Selesaikan proses ini",
      // state form add produksi
      prmModaladd:false,
      dateForm:"",
      addNote:"",
      prmPlanProduksi:true,
      // state button add produksi
      buttonAddPrm:false,
      buttonAddText:"Add",
      // state tambah barang pakai produksi
      prmBarangPakai:"",
      masterBarangPakaiList:[],
      inStok:"",
      tambahkodebarangpakai:"",
      tambahnamabarangpakai:"",
      tambahsatuanbarangpakai:"",
      tambahqtybarangpakai:"",
      listAddBarangPakai:[],
      // state tambah barang sisa produksi
      prmBarangSisa:"",
      masterBarangSisaList:[],
      tambahkodebarangsisa:"",
      tambahnamabarangsisa:"",
      tambahsatuanbarangsisa:"",
      tambahqtybarangsisa:"",
      listAddBarangSisa:[],
      // state tambah barang hasil produksi
      buttonAddBarangHasilPrm:false,
      buttonAddBarangHasilText:"Add",
      prmaddPLU:"",
      masterBarangHasilList:[],
      tambahidPLU:"",
      tambahnamaPLU:"",
      tambahsatuanbaranghasil:"",
      tambahqtyPLU:"",
      listAddBarangHasil:[],
      // sales new state
      tanggalSales:"",
      prmInventory:[],
      prmPLUD:[],
      tempPLUD:[],
      prmFormAddSales:[],
    };
  }
  componentDidMount = () =>  {
    let prmOUTLET = localStorage.getItem("outletID")
    this.setState({
      ...this.state,
      loading:true,
    });
    const dataToSend = {
      OUTLET: prmOUTLET
    };
    axios
    .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/getSalesH`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(result => {
      this.setState({
        ...this.state,
        dataSalesH: result.data.dataSalesH,
        loading:false,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  refreshPageData = () =>  {
    let prmOUTLET = localStorage.getItem("outletID")
    this.setState({
      ...this.state,
      loading:true,
    });
    const dataToSend = {
      OUTLET: prmOUTLET
    };
    axios
    .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/getSalesH`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(result => {
      this.setState({
        ...this.state,
        dataSalesH: result.data.dataSalesH,
        loading:false,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  modalAddOpen = async () =>  {
    let prmOUTLET = localStorage.getItem("outletID")
    await this.setState({
      ...this.state,
      loadingParam:"block",
    });
    const dataToSend = {
      OUTLET: prmOUTLET
    };
    await axios
    .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/getSalesForm`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then( result => {
      this.setState({
        ...this.state,
        masterBarangHasilList: result.data.dataMasterPLU,
        prmPLUD: result.data.dataPLUD,
        prmInventory: result.data.dataInventory
      });
    })
    .catch(error => {
      console.log(error);
    });
    const dateToForm = moment().format("YYYY-MM-DD HH:mm:ss")
    this.setState({
      ...this.state,
      loadingParam:"none",
      prmModaladd: true,
      dateForm:dateToForm,
      addNote:"",
      // state tambah barang pakai produksi
      prmBarangPakai:"",
      inStok:"",
      tambahkodebarangpakai:"",
      tambahnamabarangpakai:"",
      tambahsatuanbarangpakai:"",
      tambahqtybarangpakai:"",
      listAddBarangPakai:[],
      // state tambah barang sisa produksi
      prmBarangSisa:"",
      tambahkodebarangsisa:"",
      tambahnamabarangsisa:"",
      tambahsatuanbarangsisa:"",
      tambahqtybarangsisa:"",
      listAddBarangSisa:[],
      // state tambah barang hasil produksi
      prmaddPLU:"",
      tambahidPLU:"",
      tambahnamaPLU:"",
      tambahsatuanbaranghasil:"",
      tambahqtyPLU:"",
      listAddBarangHasil:[],
    });
  }
  modalAddClose = () =>  {
    this.setState({
      ...this.state,
      prmModaladd: false,
      buttonAddPrm:false,
      buttonAddText:"Save",
      dateForm:"",
      addNote:"",
      prmPlanProduksi:true,
      // state tambah barang pakai produksi
      masterBarangPakaiList:[],
      prmBarangPakai:"",
      inStok:"",
      tambahkodebarangpakai:"",
      tambahnamabarangpakai:"",
      tambahsatuanbarangpakai:"",
      tambahqtybarangpakai:"",
      listAddBarangPakai:[],
      // state tambah barang sisa produksi
      masterBarangSisaList:[],
      prmBarangSisa:"",
      tambahkodebarangsisa:"",
      tambahnamabarangsisa:"",
      tambahsatuanbarangsisa:"",
      tambahqtybarangsisa:"",
      listAddBarangSisa:[],
      // state tambah barang hasil produksi
      prmaddPLU:"",
      masterBarangHasilList:[],
      tambahidPLU:"",
      tambahnamaPLU:"",
      tambahsatuanbaranghasil:"",
      tambahqtyPLU:"",
      listAddBarangHasil:[],
      tanggalSales:"",
      prmInventory:[],
      prmPLUD:[],
      tempPLUD:[],
      prmFormAddSales:[],
    });
  }
  modalEditOpen = async (data) =>  {
    const dataToSend = {
      IDSALES: data.id_sales_h
    };
    await axios
    .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/getSalesD`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then( result => {
      this.setState({
        ...this.state,
        dataSalesD:result.data.result
      });
    })
    .catch(error => {
      console.log(error);
    });
    this.setState({
      ...this.state,
      prmModaledit: true,
      detailData:data
    });
  }
  modalEditClose = () =>  {
    this.setState({
      ...this.state,
      prmModaledit: false,
      dataSalesD:[],
      dataProduksiSisaD:[],
      dataProduksiHasilD:[],
      detailData:"",
      buttonEditPrm:false,
      buttonEditText:"Selesaikan proses ini",
      editNote:""
    });
  }
  updateData = () => {
    const dataToSend = {
      COST:this.state.dataSalesD[0].cost_satuan,
      IDRAWPROCESSH:this.state.detailData.kode_raw_processing_h,
      NOTE:this.state.editNote,
      FINISHEDGOODS:this.state.dataProduksiHasilD,
      USER:this.props.userinfo.id_user,
    };
    this.setState({
      ...this.state,
      buttonEditPrm:true,
      buttonEditText:""
    });
    axios
    .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/rawProcessCompletion`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(async result => {
      await this.setState({
        ...this.state,
        buttonEditPrm:false,
        buttonEditText:"Selesaikan proses ini",
      });
      alert("Raw process berhasil di tutup")
      await this.modalEditClose()
      this.refreshPageData()
    })
    .catch(error => {
      console.log(error);
      console.log(this.props);
    });
  }
  handleChange = event =>  {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }
  submitData = async () => {
    let prmOUTLET = localStorage.getItem("outletID")
    let salesDate = moment(this.state.tanggalSales).format("YYYY-MM-DD")
    let dataSalesEnd = this.rubahDataSales(this.state.tempPLUD)
    await this.setState({
      ...this.state,
      prmFormAddSales:[]
    });
    await this.cekKetersediaanStok()
    const dataToSend = {
        TANGGALSALES: salesDate,
        USER:this.props.userinfo.id_user,
        ADDDATAPLU: this.state.listAddBarangHasil,
        ADDDATASALES: dataSalesEnd,
        OUTLET: prmOUTLET
    };
    if (dataToSend.TANGGALSALES == ""){
      alert("Tanggal sales tidak boleh kosong")
    } else if (this.state.listAddBarangHasil.length < 1){
      alert("Data item sales tidak boleh kosong")
    } else {
      this.state.prmFormAddSales.length > 0 ?
      alert(`Stok ${this.state.prmFormAddSales.length > 0 && this.state.prmFormAddSales.map((prmStokAlert,index) =>`${prmStokAlert.nama_barang}`)} kurang`)
      :
      this.prosesSubmitData(dataToSend)
    }
  }
  prosesSubmitData = async (data) => {
    this.setState({
      ...this.state,
      buttonAddPrm:true,
      buttonAddText:""
    });
    axios
    .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/addSales`, data, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(async result => {
      await this.setState({
        ...this.state,
        buttonAddPrm:false,
        buttonAddText:"Save",
      });
      alert("Data sales berhasil Diproses")
      await this.modalAddClose()
      window.open(`http://localhost:3338/transferOutPrint?ID=${result.data.idSalesH}`, "_blank")
      this.refreshPageData()
    })
    .catch(error => {
      console.log(error);
      console.log(this.props);
    });
  }
  onSelectChangedMasterBarangHasil = async (value) => {
    await this.setState({
      ...this.state,
      prmaddPLU: value,
      tambahidPLU:value.value,
      tambahnamaPLU:value.label
    });
  }
  addDataHasil = async () => {
    if(this.state.tambahidPLU === ""){
      alert("Item tidak boleh kosong")
    } else if(this.state.tambahqtyPLU === ""){
      alert("Qty tidak boleh kosong")
    }  else {
        let daftarBarang = this.state.listAddBarangHasil
        let resultChecked = daftarBarang.find(o => o.id_plu === `${this.state.tambahidPLU}`);
        if(resultChecked===undefined){
          let dataTopush = {id_plu:`${this.state.prmaddPLU.id_plu}`,nomor_plu:`${this.state.prmaddPLU.nomor_plu}`,nama_plu:`${this.state.prmaddPLU.nama_plu}`,qty:`${this.state.tambahqtyPLU}`}
          await daftarBarang.push(dataTopush)
          await this.buatArrayPLUD(this.state.prmaddPLU.id_plu,this.state.tambahqtyPLU)
          this.setState({
              ...this.state,
              listAddBarangHasil: daftarBarang,
              tambahidPLU:"",
              tambahqtyPLU:"",
              prmaddPLU:""
          });
        } else {
          alert("Data PLU sudah ada di list item sales")
          // let indexArray = daftarBarang.findIndex(x => x.id_plu === `${this.state.tambahidPLU}`);
          // let qtyAwal = daftarBarang[indexArray].qty
          // let qtyAkhir = parseInt(qtyAwal)+parseInt(this.state.tambahqtyPLU)
          // daftarBarang[indexArray].qty=qtyAkhir
          this.setState({
            ...this.state,
            tambahidPLU:"",
            tambahqtyPLU:"",
            prmaddPLU:""
          });
        }
    }
  }
  buatArrayPLUD = (key,prmQty) =>  {
    let dataFiltered =  this.state.prmPLUD.filter(function(data) {
      return data.id_plu == key;
    });
    let dataTemp = this.state.tempPLUD
    for(let i1=0;i1<dataFiltered.length;i1++){
      dataTemp.push({
        id_plu:dataFiltered[i1].id_plu,
        id_plu_d:dataFiltered[i1].id_plu_d,
        kode_barang:dataFiltered[i1].kode_barang,
        nama_barang:dataFiltered[i1].nama_barang,
        qty:`${parseInt(dataFiltered[i1].qty)*parseInt(prmQty)}`
      })
    }
    this.setState({
      ...this.state,
      tempPLUD:dataTemp
    });
  }
  hapusArrayPLUD = (key) =>  {
    let dataTofilter = this.state.tempPLUD
    let dataFiltered =  dataTofilter.filter(function(data) {
      return data.id_plu != key.id_plu;
    });
    let dataTofilter2 = this.state.prmFormAddSales
    let dataFiltered2 =  dataTofilter2.filter(function(data) {
      return data.kode_barang != key.kode_barang;
    });
    this.setState({
      ...this.state,
      tempPLUD:dataFiltered,
      prmFormAddSales:dataFiltered2
    });
  }
  cekKetersediaanStok = async () =>  {
    let inventoryList = this.state.prmInventory
    let prmStokAlert = this.state.prmFormAddSales
    let dataFiltered=this.state.tempPLUD.filter((v,i,a)=>a.findIndex(t=>(t.kode_barang === v.kode_barang))===i)
    let dataCekTempPLUD = []
    for(let i1=0;i1<dataFiltered.length;i1++){
      let dataToshow =  this.state.tempPLUD.filter(function(dataFilter) {
          return dataFilter.kode_barang == dataFiltered[i1].kode_barang;
      });
      let qtyData = 0
      for(let i2=0;i2<dataToshow.length;i2++){
        let qtyAdd = qtyData+parseInt(dataToshow[i2].qty)
        qtyData = qtyAdd
      }
      dataCekTempPLUD.push({
        id_plu:dataFiltered[i1].id_plu,
        id_plu_d:dataFiltered[i1].id_plu_d,
        kode_barang:dataFiltered[i1].kode_barang,
        nama_barang:dataFiltered[i1].nama_barang,
        qty:qtyData
      })
      dataToshow = []
      qtyData = 0
    }
    for(let i3=0;i3<dataCekTempPLUD.length;i3++){
      let dataToshow =  inventoryList.filter(function(dataFilter) {
          return dataFilter.kode_barang == dataCekTempPLUD[i3].kode_barang;
      });
      dataToshow.length > 0 ?
        parseInt(dataToshow[0].totalQty) < parseInt(dataCekTempPLUD[i3].qty) &&
        prmStokAlert.push({
          id_plu:dataCekTempPLUD[i3].id_plu,
          id_plu_d:dataCekTempPLUD[i3].id_plu_d,
          kode_barang:dataCekTempPLUD[i3].kode_barang,
          nama_barang:dataFiltered[i3].nama_barang,
          minQty:parseInt(dataCekTempPLUD[i3].qty)-parseInt(dataToshow[0].totalQty)
        })
      :
        prmStokAlert.push({
          id_plu:dataCekTempPLUD[i3].id_plu,
          id_plu_d:dataCekTempPLUD[i3].id_plu_d,
          kode_barang:dataCekTempPLUD[i3].kode_barang,
          nama_barang:dataFiltered[i3].nama_barang,
          minQty:dataCekTempPLUD[i3].qty
        })
    }
    this.setState({
      ...this.state,
      prmFormAddSales:prmStokAlert
    });
    
  }
  rubahDataSales = (dataSalesRaw) =>  {
    let dataFiltered=dataSalesRaw.filter((v,i,a)=>a.findIndex(t=>(t.kode_barang === v.kode_barang))===i)
    let dataHasilConvert = []
    for(let i1=0;i1<dataFiltered.length;i1++){
      let dataToshow =  this.state.tempPLUD.filter(function(dataFilter) {
          return dataFilter.kode_barang == dataFiltered[i1].kode_barang;
      });
      let qtyData = 0
      for(let i2=0;i2<dataToshow.length;i2++){
        let qtyAdd = qtyData+parseInt(dataToshow[i2].qty)
        qtyData = qtyAdd
      }
      dataHasilConvert.push({
        id_plu:dataFiltered[i1].id_plu,
        id_plu_d:dataFiltered[i1].id_plu_d,
        kode_barang:dataFiltered[i1].kode_barang,
        nama_barang:dataFiltered[i1].nama_barang,
        qty:qtyData
      })
      dataToshow = []
      qtyData = 0
    }
    return dataHasilConvert
  }
  eraseAddDataHasil = async (keyArray) => {
    let daftarBarang = this.state.listAddBarangHasil
    await this.hapusArrayPLUD(daftarBarang[keyArray])
    await daftarBarang.splice(keyArray, 1)
    await this.setState({
      ...this.state,
      listAddBarangHasil: daftarBarang,
      listAddBarangPakai:[],
      listAddBarangSisa:[],
      prmPlanProduksi:true
    });
  }
  cekPlanProduksi = () =>  {
    let dataToCek = this.state.listAddBarangPakai
    let panjangData = this.state.listAddBarangPakai.length
    for(let i=0;i<panjangData;i++){
        let qtyReq=dataToCek[i].qty
        let qtyInStok=dataToCek[i].qty_in_stok
        if (parseInt(qtyInStok)<parseInt(qtyReq)){
            this.setState({
                ...this.state,
                prmPlanProduksi:false
            });
        }
    }
  }
  handleChangeDatapakaiD = event =>  {
    let IdData = event.target.id
    let daftarBarang = this.state.dataProduksiHasilD
    // let maxSend = daftarBarang[IdData].qty_in_inventory
    daftarBarang[IdData].qty=event.target.value
    this.setState({
      ...this.state,
      dataProduksiHasilD: daftarBarang
    });
  }
  handleChangeDataSisaD = event =>  {
    let IdData = event.target.id
    let daftarBarang = this.state.listAddBarangSisa
    daftarBarang[IdData].qty=event.target.value
    this.setState({
      ...this.state,
      listAddBarangSisa: daftarBarang
    });
  }
  datepickerHandleChange = date => {
    this.setState({
      ...this.state,
      tanggalSales: date
    });
  };
  render() {
    const DataButton = (data) => (
      <div>
        <button className="myBtn" onClick={()=> this.modalEditOpen(data)}><i className="fa fa-search fa-2x" aria-hidden="true"></i></button>
      </div>
    );
    const columns = [
      {
        name: 'Nomor Sales',
        selector: 'nomor_sales',
        sortable: true,
      },
      {
        name: 'Tanggal Sales',
        selector: 'tanggal_sales',
        sortable: true,
      },
      {
        name: 'Tool',
        button: true,
        cell: row => DataButton(row),
      },
    ];
    return (
      <div>
        <Modal isOpen={this.state.prmModaladd} backdrop={"static"} size="xl">
          <ModalHeader toggle={() => this.modalAddClose()}>Sales input form</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label for="detailbuatpo">Tanggal Sales</Label>
                  <br></br>
                  <DatePicker
                    selected={this.state.tanggalSales}
                    onChange={this.datepickerHandleChange}
                    dateFormat="dd-MMMM-yyyy"
                  />
                </FormGroup>
              </Col>
            </Row>
            {/* <Row>
              <Col xs="12" sm="12" md="12">
                <FormGroup>
                  <Label for="addNote">Note</Label>
                  <Input type="textarea" name="addNote" id="addNote" value={this.state.addNote} onChange={this.handleChange} placeholder="Note" />
                </FormGroup>
              </Col>
            </Row> */}
            {/* hasil produksi section */}
            <div>
                <Row style={{backgroundColor:"#f7f7f7",paddingTop:10}}>
                <Col xs="12" sm="12" md="12">
                    <h3>ITEM SALES</h3>
                </Col>
                </Row>
                <Row style={{backgroundColor:"#f7f7f7",paddingBottom:10}}>
                <Col xs="12" sm="12" md="10">
                    <FormGroup>
                        <Label for="prmaddPLU">Item List</Label>
                        <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isClearable={false}
                        isSearchable={true}
                        name="prmaddPLU"
                        value={this.state.prmaddPLU}
                        options={this.state.masterBarangHasilList}
                        onChange={this.onSelectChangedMasterBarangHasil.bind(this)}
                        placeholder="Select an item"
                        />
                    </FormGroup>
                </Col>
                <Col xs="12" sm="12" md="2">
                    <FormGroup>
                        <Label for="prmaddPLU">Qty Sales</Label>
                        <Input
                          type="number"
                          name="tambahqtyPLU"
                          id="tambahqtyPLU"
                          value={this.state.tambahqtyPLU}
                          onChange={this.handleChange}
                          placeholder="Qty"
                          min="1"
                        />
                    </FormGroup>
                </Col>
                <Col xs="12" sm="12" md="12" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <Button color="success" block={true} onClick={() => this.addDataHasil()}>
                    <ScaleLoader
                        height={18}
                        width={4}
                        radius={2}
                        margin={2}
                        color={'#FFFFFF'}
                        loading={this.state.buttonAddBarangHasilPrm}
                    />
                    {this.state.buttonAddBarangHasilText}
                    </Button>
                </Col>
                </Row>
                <Row style={{borderBottom:"1px solid #000000"}}>
                <Col>
                    <Row>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>NOMOR PLU</span></Col>
                    <Col xs="7"><span style={{fontWeight:"bold"}}>NAMA PLU</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>QTY</span></Col>
                    <Col xs="1"><span style={{fontWeight:"bold"}}>TOOL</span></Col>
                    </Row>
                </Col>
                </Row>
                <Row className="bodyData">
                <Col>
                    {this.state.listAddBarangHasil.length > 0 && this.state.listAddBarangHasil.map((listAddBarangHasil,index) =>
                    <Row key={index}>
                        <Col xs="2"><span style={{fontWeight:"bold"}}>{listAddBarangHasil.nomor_plu}</span></Col>
                        <Col xs="7"><span style={{fontWeight:"bold"}}>{listAddBarangHasil.nama_plu}</span></Col>
                        <Col xs="2"><span style={{fontWeight:"bold"}}>{listAddBarangHasil.qty}</span></Col>
                        <Col xs="1">
                        <button className="myBtn" onClick={() => this.eraseAddDataHasil(index)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                        </Col>
                    </Row>
                    )}
                </Col>
                </Row>
            </div>
            {/* hasil produksi section */}
          </ModalBody>
          <ModalFooter>
            <Button color="success" 
            onClick=
            {(e) => { if (window.confirm('Stok akan terpotong setelah sales di proses, apakah anda yakin akan memproses sales ini ?')) this.submitData(e) } }
            >
              <ScaleLoader
                height={18}
                width={4}
                radius={2}
                margin={2}
                color={'#FFFFFF'}
                loading={this.state.buttonAddPrm}
              />
              {this.state.buttonAddText}
            </Button>
            <Button color="danger" onClick={() => this.modalAddClose()}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.prmModaledit} backdrop={"static"} size="xl">
          <ModalHeader toggle={() => this.modalEditClose()}>Detail sales</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label for="detailbuatpo">Nomor Sales</Label>
                  <Input type="text" name="detailbuatpo" id="detailbuatpo" value={this.state.detailData.nomor_sales} onChange={this.handleChange} placeholder="Tanggal buat PO" disabled={true} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label for="detailbuatpo">Tanggal Sales</Label>
                  <Input type="text" name="detailbuatpo" id="detailbuatpo" value={this.state.detailData.tanggal_sales} onChange={this.handleChange} placeholder="Tanggal buat PO" disabled={true} />
                </FormGroup>
              </Col>
            </Row>
            {/* hasil produksi section */}
            <Row style={{backgroundColor:"#f7f7f7",paddingTop:10}}>
              <Col xs="12" sm="12" md="12">
                <h3>ITEM SALES LIST</h3>
              </Col>
            </Row>
            <Row style={{borderBottom:"1px solid #000000"}}>
              <Col>
                <Row>
                  <Col xs="3"><span style={{fontWeight:"bold"}}>NOMOR PLU</span></Col>
                  <Col xs="7"><span style={{fontWeight:"bold"}}>NAMA PLU</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>QTY</span></Col>
                </Row>
              </Col>
            </Row>
            <Row className="bodyData">
              <Col>
                {this.state.dataSalesD.length > 0 && this.state.dataSalesD.map((dataSalesD,index) =>
                  <Row key={index}>
                    <Col xs="3"><span style={{fontWeight:"bold"}}>{dataSalesD.nomor_plu}</span></Col>
                    <Col xs="7"><span style={{fontWeight:"bold"}}>{dataSalesD.nama_plu}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataSalesD.qty}</span></Col>
                  </Row>
                )}
              </Col>
            </Row>
          </ModalBody>
        </Modal>
        <Container fluid={true} style={{paddingBottom:30}}>
          <Row>
            <Col xs="12" sm="12" md="12">
              <div className="card" style={{marginTop:15}}>
                <div className="card-header">
                  <Row>
                    <Col xs="10" sm="10" md="10" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                      <span style={{fontWeight:"bold"}}>Sales</span>
                    </Col>
                    <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                      <button className="myBtn" onClick={() => this.modalAddOpen()}><i className="fa fa-plus-square fa-2x" aria-hidden="true"></i></button>
                    </Col>
                  </Row>
                </div>
                <div className="card-body">
                  <DataTableExtensions
                      columns={columns}
                      data={this.state.dataSalesH}
                      print={false}
                      exportHeaders={false}
                      export={false}
                  >
                    <DataTable
                      defaultSortField="title"
                      pagination={this.state.pagination}
                      highlightOnHover={this.state.highlight}
                      striped={this.state.striped}
                      progressPending={this.state.loading}
                      noHeader={this.state.noHeader}
                      fixedHeader={this.state.fixedHeader}
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
    userinfo: state.reducer.userinfo
  };
};

export default withRouter(connect(mapStateToProps)(sales));