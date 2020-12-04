import React, { Component,useState } from 'react';
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

class navbar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        navCollapse:false,
        fixedNav:"",
        dropdownState:false,
        testState:true,
        testArray:[1,2,5,6]
      };
    }
    componentDidMount = async () =>  {
      let aksesPage = this.props.aksespage
      if(aksesPage == ""){
        let prmNIK = localStorage.getItem("authToken")
        let prmOUTLET = localStorage.getItem("outletID")
        const dataToSend = {
          NIK: prmNIK,
          OUTLET: prmOUTLET
        };
        axios
        .post(`https://api.jaygeegroupapp.com/centralkitchen/getAksesOutlet`, dataToSend, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then( result => {
          this.props.dispatch({ type: "SETAKSES", payload: result.data.akses });
          this.props.dispatch({ type: "SETUSERINFO", payload: result.data.userinfo });
          this.props.dispatch({ type: "SETOUTLETNAME", payload: result.data.namaOutlet });
        })
        .catch(error => {
          console.log(error);
          console.log(this.props);
        });
      }
    }
    navToggle = () =>  {
      this.setState({
        ...this.state,
        navCollapse: !this.state.navCollapse
      });
    }
    dropdownToggle = () =>  {
      this.setState({
        ...this.state,
        dropdownState: !this.state.dropdownState
      });
    }
    logout = async () =>{
      await this.props.history.push({ pathname: "/"})
      await this.props.dispatch({ type: "SETAKSES", payload: "" });
      localStorage.removeItem("authToken");
      localStorage.removeItem("outletID");
    }
    render() {
        return (
              <Navbar color="light" light expand="md" style={{position:"sticky",top:0,zIndex:1}}>
                <NavbarBrand href="/home" style={{width:"150px"}}>
                  JAYGEEGROUP - {this.props.OutletName}
                </NavbarBrand>
                <NavbarToggler onClick={() => this.navToggle()} />
                <Collapse isOpen={this.state.navCollapse} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem style={{cursor:"pointer",borderBottom:this.props.navState == ""?"1px solid #000":"1px solid rgb(247, 247, 247)"}}>
                      <NavLink
                      onClick={() =>  {this.props.history.push({pathname: "/home"});this.props.dispatch({ type: "SETNAVSTATE", payload: "" })}}
                      >
                        Dashboard
                      </NavLink>
                    </NavItem>
                    <NavItem style={{cursor:"pointer",borderBottom:this.props.navState == "pembelian"?"1px solid #000":"1px solid rgb(247, 247, 247)"}}>
                      <NavLink
                      onClick={() =>  {this.props.history.push({pathname: "/pembelian"});this.props.dispatch({ type: "SETNAVSTATE", payload: "pembelian" })}}
                      >
                        Modul Pembelian
                      </NavLink>
                    </NavItem>
                    <NavItem style={{cursor:"pointer",borderBottom:this.props.navState == "order"?"1px solid #000":"1px solid rgb(247, 247, 247)"}}>
                      <NavLink
                      onClick={() =>  {this.props.history.push({pathname: "/order"});this.props.dispatch({ type: "SETNAVSTATE", payload: "order" })}}
                      >
                        Modul Order
                      </NavLink>
                    </NavItem>
                    <NavItem style={{cursor:"pointer",borderBottom:this.props.navState == "sales"?"1px solid #000":"1px solid rgb(247, 247, 247)"}}>
                      <NavLink
                      onClick={() =>  {this.props.history.push({pathname: "/sales"});this.props.dispatch({ type: "SETNAVSTATE", payload: "sales" })}}
                      >
                        Modul Sales
                      </NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar style={{cursor:"pointer",borderBottom:this.props.navState == "betweentransfer"?"1px solid #000":"1px solid rgb(247, 247, 247)"}}>
                      <DropdownToggle nav caret>
                        Between Transfer
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem onClick={() =>  {this.props.history.push({pathname: "/transferin"});this.props.dispatch({ type: "SETNAVSTATE", payload: "betweentransfer" })}}>
                          Transfer In
                        </DropdownItem>
                        <DropdownItem onClick={() =>  {this.props.history.push({pathname: "/transferout"});this.props.dispatch({ type: "SETNAVSTATE", payload: "betweentransfer" })}}>
                          Transfer Out
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                    <NavItem style={{cursor:"pointer"}}>
                      <NavLink onClick={() =>  this.logout()}>Log Out</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
        );
    }
}

// export default withRouter(navbar);
const mapStateToProps = (state) => {
  return {
    aksespage: state.reducer.aksespage,
    userinfo: state.reducer.userinfo,
    navState: state.reducer.navState,
    OutletName: state.reducer.OutletName
  };
};

export default withRouter(connect(mapStateToProps)(navbar));