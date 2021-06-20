import React, { Component } from 'react';
import axios from "axios";
import './App.css';
import "./assets/font-awesome/css/font-awesome.min.css";
import 'react-data-table-component-extensions/dist/index.css';
import { Provider } from "react-redux";
import store from "./redux/store";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from './route/PrivateRoute';
import Mainpage from "./pages/dashboardPage";
import Loginpage from "./pages/loginPage";
import Navbarpage from "./pages/navbar";
import MasterBarang from "./pages/masterBarangPage";
import MasterVendor from "./pages/masterVendorPage";
import MasterOutlet from "./pages/masterOutletPage";
import InventoryPage from "./pages/inventory";
import MasterProduksiPage from "./pages/masterProduksiPage";
import MasterRawProcessingPage from "./pages/masterRawProcessingPage";
import ProduksiPage from "./pages/produksiPage";
import RawProsessingPage from "./pages/rawProsessingPlanPage";
import PlanproduksiPage from "./pages/planproduksiPage";
import CompletionplanproduksiPage from "./pages/completionplanproduksiPage";
import ProductinPage from "./pages/purchaseOrderPage";
import ReceivepoPage from "./pages/receivePoPage";
import ProductoutPage from "./pages/deliveryOrderPage";
import orderPage from "./pages/orderPage";
import pembelianPage from "./pages/pembelianPage";
import SalesPage from "./pages/salesPage";
import userPage from "./pages/userPage";
import reportPage from "./pages/reportPage";
import TransferInPage from "./pages/transferInPage";
import TransferOutPage from "./pages/transferOutPage";
import TestReport from "./pages/testReport";
import purchaseOrderPrint from "./pages/purchaseOrderPrint";
import ProductionPlanPrint from "./pages/productionPlanPrint";
import RawProsessingPlanPrint from "./pages/rawProsessingPlanPrint";
import TransferOutPrint from "./pages/transferOutPrint";
import LoadingRoutes from './LoadingRoutes';


class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        // base state
        prmLoading:true
        // base state --
      };
    }
    componentDidMount = async () =>  {
        await localStorage.removeItem("APIROUTE");
        // localStorage.setItem("APIROUTE","https://3ef97221024d.ngrok.io")
        // // localStorage.setItem("APIROUTE","http://localhost:3009")
        // this.setState({
        //     ...this.state,
        //     prmLoading: false
        // });
        axios
        .get(`${process.env.REACT_APP_LINK}`)
        .then(async result => {
            await localStorage.setItem("APIROUTE",result.data.APIROUTE)
            this.setState({
                ...this.state,
                prmLoading: false
            });
        })
        .catch(error => {
          console.log(error);
        });
    }
    render() {
        if(this.state.prmLoading === true){
            return(
                <Router>
                    <LoadingRoutes />
                </Router>
            )
        } else {
            return (
                <div>
                <Provider store={store}>
                  <Router>
                    <Switch>
                      <Route exact path="/">
                        <Loginpage />
                      </Route>
                      <PrivateRoute component={Mainpage} path="/home" exact />
                      <PrivateRoute component={orderPage} path="/order" exact />
                      <PrivateRoute component={pembelianPage} path="/pembelian" exact />
                      <PrivateRoute component={SalesPage} path="/sales" exact />
                      <PrivateRoute component={TransferInPage} path="/transferin" exact />
                      <PrivateRoute component={TransferOutPage} path="/transferout" exact />
                      <PrivateRoute component={TransferOutPrint} path="/transferOutPrint" exact />
                    </Switch>
                  </Router>
                </Provider>
                </div>
            );
        }
    }
}

export default App;