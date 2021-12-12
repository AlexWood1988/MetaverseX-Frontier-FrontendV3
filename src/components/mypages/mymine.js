import React from "react";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import 'tachyons';
import PlanetWeb3 from "../mycomponents/Web3/planetWeb3";
import MineCard from "../mycomponents/MineCard";
import MineDetail from "./mineDetail";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #212428;
  }
`;

class MyMine extends React.Component {
    constructor(){
        super();
        this.state = {
            mineCount:0,
            mines:[],
            isDetail: false,
            detailMine: {}
        }
    }

    componentDidMount(){
        let that = this;
        PlanetWeb3.init().then(re=>{
            that.getMines();
        });
    }

    getMines(){
        let that = this;
        PlanetWeb3.allMines().then(minesId => {
            that.setState({mineCount: minesId.length})
            minesId.forEach(mineId => {
                PlanetWeb3.getMine(mineId).then(mine => {
                    let _mines = that.state.mines;
                    _mines.push(mine);
                    that.setState({mines:_mines});
                    PlanetWeb3.getMineShips(mineId).then((re)=>{});
                })
            })
        })
    }

    removeShip = (mineId, shipId, shipIndex) => {
        PlanetWeb3.removeShipOfMine(mineId, shipId, shipIndex).then(re=>{});
    }

    addShip = (mineId, shipId) => {
        PlanetWeb3.addShipOfMine(mineId, shipId).then(re=>{});
    }

    getProfit = (mineId) => {
        PlanetWeb3.getProfit(mineId).then(re=>{});
    }

    openDetailMine = (mine) => {
        this.setState({isDetail: true, detailMine: mine});
    }

    render(){
        if (this.state.isDetail){
            return(<div>
                <MineDetail mine={this.state.detailMine} removeShip={this.removeShip} addShip={this.addShip} getProfit={this.getProfit}/>
            </div>);
        } else {
            return(<div>
                <GlobalStyles/>
                <section className='mt3 container d_coll no-bottom mh4'>
                    <div className='row'>
                        <div className="col-md-12">
                            <div className="d_profile">
                                <div className="profile_name">
                                    <h4 className='tl'>
                                        Mine:                                             
                                        <div className="clearfix"></div>
                                        <span id="wallet" className='f6'>Number: {this.state.mineCount}</span>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className='row pa4'>
                    {
                        this.state.mines.map((mine, i) => {
                            return <MineCard className='col-md-3 pa3' mine={mine} key={i} openDetailMine={this.openDetailMine}/>;
                        })
                    }
                </div>

                <Footer />
            </div>)
        }
    }
}
export default MyMine;