import React from "react";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import 'tachyons';
import ShipWeb3 from "../mycomponents/Web3/shipWeb3";
import AddShipPopup from "../mycomponents/Minepage/AddShipPopup";
import RemoveShipPopup from "../mycomponents/Minepage/RemoveShipPopup";
import PlanetWeb3 from "../mycomponents/Web3/planetWeb3";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #212428;
  }
`;

class MineDetail extends React.Component {
    constructor(props){
        super(props);
        this.state={
            ships:[],
            allships:[],
            planetMultiplier:'0'
        };
    }

    componentDidMount = () => {
        ShipWeb3.init().then(re=>{
            this.getShips();
            this.getAllShips();
        })
        PlanetWeb3.init().then(re=>{
            this.getPlanetMultiplier();
        })
    }

    getPlanetMultiplier=()=>{
        PlanetWeb3.getPlanetMultiplier(this.props.mine.id).then(result=>{
            this.setState({planetMultiplier: Number(result) / 10000.0});
        })
    }

    getShips=()=>{
        for(let i = 0, p = Promise.resolve(); i<this.props.mine.shipCount; i++){
            p = p.then(()=>ShipWeb3.getShip(this.props.mine.ships[i]))
                 .then((ship) => {
                     let _ships = this.state.ships;
                     _ships.push(ship);
                     this.setState({ships:_ships});
                 })
        }
    }

    getAllShips=()=>{
        let that = this;
        ShipWeb3.allShips().then(ships => {
            ships.forEach(shipid => {
                ShipWeb3.getShip(shipid).then(shipObj => {
                    let _ships = that.state.allships;
                    _ships.push(shipObj);
                    that.setState({allships: _ships});
                })
            })
        })
    }

    removeShip=(shipIndex)=>{
        this.props.removeShip(this.props.mine.id, this.props.mine.ships[shipIndex], shipIndex);
    }

    addShip=(shipId)=>{
        this.props.addShip(this.props.mine.id, shipId);
    }

    getProfit=()=>{
        this.props.getProfit(this.props.mine.id);
    }

    approveAllShip(){
        ShipWeb3.approveAllShipForMine().then(re=>{});
    }

    zhanwei(){
        console.log("zhanwei button clicked");
    }

    render(){
        return (<div>
            <GlobalStyles/>
    
            <section className='container'>
                <div className='row mt-md-5 pt-md-4'>
    
                    <div className="col-md-4 text-center">
                        <img src={this.props.mine.planet.img} className="img-fluid img-rounded mb-sm-30" alt=""/>
                    </div>
        
                    <div className="col-md-8">
                        <div className="item_info">
                            (x)Galaxy: Official Public 1
                            <h2>No.{this.props.mine.id} Mine in {this.props.mine.planet.name}</h2>
                            <p>(x)The SpaceX Dragon, also known as Dragon 1 or Cargo Dragon, was a class of partially reusable cargo spacecraft developed by SpaceX, an American private space transportation company. Dragon was launched into orbit by the company's Falcon 9 launch vehicle to resupply the International Space Station (ISS). It is now superseded by SpaceX Dragon 2. Click on the ship to remove it.</p>

                            <div className="spacer-10"></div>
                            <div className="row">
                                <div className="col-md-6">

                                    <h4>Mining Ships</h4>
                                    {
                                       this.state.ships[0] === undefined
                                       ? <div></div> 
                                       : <div>
                                            <div className="item_author">                                    
                                                <div className="author_list_pp">
                                                    <span>
                                                        <img className="lazy" src={this.state.ships[0].previewImg} alt=""/>
                                                    </span>
                                                </div>                                    
                                                <div className="author_list_info">
                                                    <span>Ship1: {this.state.ships[0].name}</span>
                                                </div>
                                            </div>
                                            <div className="spacer-30"></div>
                                       </div>
                                    }

                                    {
                                       this.state.ships[1] === undefined
                                       ? <div></div> 
                                       : <div>
                                            <div className="item_author">                                    
                                                <div className="author_list_pp">
                                                    <span>
                                                        <img className="lazy" src={this.state.ships[1].previewImg} alt=""/>
                                                    </span>
                                                </div>                                    
                                                <div className="author_list_info">
                                                    <span>Ship2: {this.state.ships[1].name}</span>
                                                </div>
                                            </div>
                                            <div className="spacer-30"></div>
                                       </div>
                                    }

                                    {
                                       this.state.ships[2] === undefined
                                       ? <div></div> 
                                       : <div>
                                            <div className="item_author">                                    
                                                <div className="author_list_pp">
                                                    <span>
                                                        <img className="lazy" src={this.state.ships[2].previewImg} alt=""/>
                                                    </span>
                                                </div>                                    
                                                <div className="author_list_info">
                                                    <span>Ship3: {this.state.ships[2] === undefined ? "" : this.state.ships[2].name}</span>
                                                </div>
                                            </div>
                                            <div className="spacer-20"></div>
                                       </div>
                                    }

                                    <ul className="de_nav">
                                        <li id='Mainbtn' className="pv2"><span onClick={this.approveAllShip}>Approve Ship</span></li>
                                        <AddShipPopup ships={this.state.allships} addShip={this.addShip}/>
                                        <RemoveShipPopup ships={this.state.ships} removeShip={this.removeShip}/>
                                    </ul>
                                </div>

                                <div className="col-md-5">
                                    <div className="p_list">
                                        <div className="p_list_pp">
                                            <span>
                                                <img className="lazy" src="./img/myicons/mineprofit.png" alt=""/>
                                            </span>
                                        </div>                                    
                                        <div className="p_list_info">
                                            Profit Last Time Refresh <b></b>
                                            <span><b>{(this.props.mine.profitLastTime).substring(0, this.props.mine.profitLastTime.length - 18)}</b> AU</span>
                                        </div>
                                    </div>

                                    <div className="p_list">
                                        <div className="p_list_pp">
                                            <span>
                                                <img className="lazy" src="./img/myicons/minerate.png" alt=""/>
                                            </span>
                                        </div>                                    
                                        <div className="p_list_info">
                                            Current Mining Rate
                                            <span><b>{this.props.mine.rateByDay} AU</b> each day</span>
                                        </div>
                                    </div>

                                    <div className="p_list">
                                        <div className="p_list_pp">
                                            <span>
                                                <img className="lazy" src="./img/myicons/minemultiplier.png" alt=""/>
                                            </span>
                                        </div>                                    
                                        <div className="p_list_info">
                                            Planet Multiplier
                                            <span><b>{this.state.planetMultiplier}X</b></span>
                                        </div>
                                    </div>

                                    <ul className="de_nav">
                                        <li id='Mainbtn' className="pv2 active"><span onClick={this.getProfit}>Get Profit</span></li>
                                    </ul>
                                    
                                </div>   
                            </div>   

                        </div>
                    </div>
        
                </div>
            </section>
    
            <Footer />
        </div>);
    }
}

export default MineDetail;