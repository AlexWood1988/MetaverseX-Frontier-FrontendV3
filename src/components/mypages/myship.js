import React from "react";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import ShipCard from "../mycomponents/ShipCard";
import 'tachyons';
import ShipWeb3 from "../mycomponents/Web3/shipWeb3";
import ShipDetail from "./shipDetail.js";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #212428;
  }
`;

class MyShip extends React.Component {
    constructor(){
        super();
        this.state = {
            shipCount: 0,
            ships: [],
            isDetail: false,
            detailShip: {}
        }
    }

    componentDidMount(){
        let that = this;
        ShipWeb3.init().then(re => {
            that.getShipCount();
            that.getShips();
        })
    }

    getShipCount(){
        let that = this;
        ShipWeb3.shipCount().then(shipCount => {
            that.setState({shipCount: shipCount});
        })
    }

    getShips(){
        let that = this;
        ShipWeb3.allShips().then(ships => {
            ships.forEach(shipid => {
                ShipWeb3.getShip(shipid).then(shipObj => {
                    let _ships = that.state.ships;
                    _ships.push(shipObj);
                    that.setState({ships: _ships});
                })
            })
        })
    }

    openDetailShip = (ship) => {
        this.setState({isDetail: true, detailShip: ship});
    }

    render(){
        if(this.state.isDetail) {
            return(<div>
                <ShipDetail ship={this.state.detailShip}/>
            </div>);
        } else {
            return (<div>
                <GlobalStyles/>
                <section className='mt3 container d_coll no-bottom mh4'>
                    <div className='row'>
                        <div className="col-md-12">
                            <div className="d_profile">
                                <div className="profile_name">
                                    <h4 className='tl'>
                                        Ship                                             
                                        <div className="clearfix"></div>
                                        <span id="wallet" className='f6'>Number: {this.state.shipCount}</span>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
    
                <div className='row pa4'>
                    {
                        this.state.ships.map((ship, i) => {
                            return <ShipCard className='col-md-3 pa3' ship={ship} key={i} openDetailShip={this.openDetailShip}/>;
                        })
                    }
                </div>
    
                <Footer />
            </div>);
        }
    }
}
export default MyShip;