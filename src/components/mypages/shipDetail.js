import React from "react";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { AiFillDashboard, AiOutlineSketch, AiFillThunderbolt } from "react-icons/ai";
import ShipWeb3 from "../mycomponents/Web3/shipWeb3";
import shipInfo from "../mycomponents/constants/shipInfo.json";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #212428;
  }
`;

class ShipDetail extends React.Component {
    constructor(props){
        super(props);
        this.state={
            attribute:{}
        }
    }

    componentDidMount(){
        const that = this
        ShipWeb3.init().then(re=>{
            that.getAttribute();
        });
    }

    getAttribute(){
        const that = this;
        for (let i = 0, p = Promise.resolve(); i < 7; i++) {
            p = p.then(() => ShipWeb3.getShipAttribute(that.props.ship.id, i))
                 .then((result) => {
                     const _att = Object.assign({}, that.state.attribute);
                     _att[`${i}`]=result;
                     console.log(_att);
                     that.setState({attribute:_att});
                 });
        }
    }

    approveAu(){
        ShipWeb3.approveAllAuForShipHelper().then(re=>{});
    }

    levelUp= () => {
        ShipWeb3.payToLevelUp(this.props.ship.id).then(re=>{});
    }

    render(){
        return (<div>
            <GlobalStyles/>
    
            <section className='container'>
                <div className='row mt-md-5 pt-md-4'>
    
                    <div className="col-md-4 text-center">
                        <img src={this.props.ship.img} className="img-fluid img-rounded mb-sm-30" alt=""/>
                    </div>
        
                    <div className="col-md-8">
                        <div className="item_info">
                            {this.props.ship.model} [{this.props.ship.id}]
                            <h2>{this.props.ship.name}</h2>
                            <div className="item_info_counts">
                                <div className="item_info_type"><AiFillDashboard size={20} className='pr1'/>{this.props.ship.category}</div>
                                <div className="item_info_views"><AiOutlineSketch size={20} className='pr1'/>{this.props.ship.rarity}</div>
                                <div className="item_info_like"><AiFillThunderbolt size={20} className='pr1'/>Lv.{this.props.ship.level}</div>
                            </div>
                            <p>The SpaceX Dragon, also known as Dragon 1 or Cargo Dragon, was a class of partially reusable cargo spacecraft developed by SpaceX, an American private space transportation company. Dragon was launched into orbit by the company's Falcon 9 launch vehicle to resupply the International Space Station (ISS). It is now superseded by SpaceX Dragon 2.</p>
        
                            <h6>Current Status</h6>
                            <div className="item_author">                                    
                                <div className="author_list_pp">
                                    <span>
                                        <img className="lazy" src="./img/carousel/crs-1.jpg" alt=""/>
                                    </span>
                                </div>                                    
                                <div className="author_list_info">
                                    <span>Mining in Planet 013</span>
                                </div>
                            </div>
        
                            <div className="spacer-40"></div>

                            <div className="row">
                                <div className="col-md-6">

                                    <ul className="de_nav">
                                        <li id='Mainbtn1' className=''><span onClick={this.approveAu}>Approve AU</span></li>
                                        <li id='Mainbtn' className="active"><span onClick={this.levelUp}>Level UP</span></li>
                                        <li id='Mainbtn1' className=''><span onClick={this.approveAu}>Repair</span></li>
                                    </ul>

                                    <div className="p_list">
                                        <div className="p_list_pp">
                                            <span>
                                                <img className="lazy" src="./img/myicons/levelup.png" alt=""/>
                                            </span>
                                        </div>                                    
                                        <div className="p_list_info">
                                            Next level costs <b>{shipInfo.levelUpFee[Number(`${this.props.ship.level}`)+1]} AU</b>
                                            <span>To get <b>X{shipInfo.levelUpMultiplier[Number(`${this.props.ship.level}`)+1]}</b> mining multiplier</span>
                                        </div>
                                    </div>

                                    <div className="p_list">
                                        <div className="p_list_pp">
                                            <span>
                                                <img className="lazy" src="./img/myicons/repair.png" alt=""/>
                                            </span>
                                        </div>                                    
                                        <div className="p_list_info">
                                            Durability: <b>{this.props.ship.dur}/{this.state.attribute[6]}</b>
                                            <span>Repair needs <b>8000 AU</b></span>
                                        </div>
                                    </div>

                                    <div className="p_list">
                                        <div className="p_list_pp">
                                            <span>
                                                <img className="lazy" src="./img/myicons/hp.png" alt=""/>
                                            </span>
                                        </div>                                    
                                        <div className="p_list_info">
                                            HP: <b>{this.props.ship.hp}/{this.state.attribute[5]}</b>
                                            <span>Repair needs <b>98000 AU</b></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-5">
                                    <span className="filter__l">Attribute</span>
                                    <span className="filter__r">{shipInfo.mainAttribute[`${this.props.ship.category}`]}/{shipInfo.secondAttribute[`${this.props.ship.category}`]}</span>
                                    <div className="spacer-half"></div>
                                    <div className="clearfix"></div>
                                    <ul className="activity-filter">
                                        <li><img className="mh2" alt="fire" width="25" src="./img/myicons/fire.png"/>FIRE: {this.state.attribute[0]}</li>
                                        <li><img className="mh2" alt="en" width="23" src="./img/myicons/en.png"/>EN: {this.state.attribute[1]}</li>
                                        <li><img className="mh2" alt="hack" width="25" src="./img/myicons/hack.png"/>HACK: {this.state.attribute[2]}</li>
                                        <li><img className="mh2" alt="def" width="25" src="./img/myicons/def.png"/>DEF: {this.state.attribute[3]}</li>
                                        <li><img className="mh2" alt="agl" width="25" src="./img/myicons/agl.png"/>AGL: {this.state.attribute[4]}</li>
                                        <li><img className="mh2" alt="mining" width="25" src="./img/myicons/multiplier.png"/>Mining: X{shipInfo.levelUpMultiplier[`${this.props.ship.level}`]}</li>
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

export default ShipDetail;