import React from "react";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import 'tachyons';
import PlanetWeb3 from "../mycomponents/Web3/planetWeb3";
import PlanetCard from "../mycomponents/Planet/PlanetCard";
import PlanetDetail from "./planetDetail";
import constants from "../mycomponents/constants/contracts.json";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #212428;
  }
`;

class MyPlanet extends React.Component {
    constructor(){
        super();
        this.state = {
            planetCount:0,
            planets:[],
            isDetail: false,
            detailPlanet: {},
            isApprovedForMine: false
        }
    }

    componentDidMount(){
        let that = this;
        PlanetWeb3.init().then(re=>{
            that.getPlanets();
            that.getIsApprovedForMine();
        });
    }

    getPlanets(){
        let that = this;
        PlanetWeb3.allPlanets().then(planetsId => {
            that.setState({planetCount: planetsId.length})
            planetsId.forEach(planetId => {
                PlanetWeb3.getPlanet(planetId).then(planet => {
                    let _planets = that.state.planets;
                    _planets.push(planet);
                    that.setState({planets:_planets});
                })
            })
        })
    }

    getIsApprovedForMine=()=>{
        PlanetWeb3.getIsApprovedForAll(window.defaultAccount, constants.mineFactoryContract).then(re=>{
            this.setState({isApprovedForMine: re});
        })
    }

    setApprovalForMine=()=>{
        PlanetWeb3.setApprovalForAll(constants.mineFactoryContract,true).then(re=>{})
    }

    createMine=(planetId)=>{
        PlanetWeb3.createMine(planetId).then(re=>{});
    }

    openDetailPlanet = (planet) => {
        this.setState({isDetail: true, detailPlanet: planet});
    }

    render(){
        if (this.state.isDetail){
            return(<div>
                <PlanetDetail planet={this.state.detailPlanet} 
                 approve = {this.state.isApprovedForMine} setApproval = {this.setApprovalForMine}
                 createMine = {this.createMine}/>
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
                                        Planet                                         
                                        <div className="clearfix"></div>
                                        <span id="wallet" className='f6'>Number: {this.state.planetCount}</span>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className='row pa4'>
                    {
                        this.state.planets.map((planet, i) => {
                            return <PlanetCard className='col-md-3 pa3' planet={planet} key={i} openDetailPlanet={this.openDetailPlanet}/>;
                        })
                    }
                </div>

                <Footer />
            </div>)
        }
    }
}
export default MyPlanet;