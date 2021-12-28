import React from "react";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { AiFillDashboard, AiOutlineSketch, AiFillThunderbolt } from "react-icons/ai";
import 'tachyons';
import PlanetInfo from '../mycomponents/constants/planetInfo.json';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #212428;
  }
`;

class PlanetDetail extends React.Component {

    zhanwei(){

    }

    render(){
        return (<div>
            <GlobalStyles/>
    
            <section className='container'>
                <div className='row mt-md-5 pt-md-4'>
    
                    <div className="col-md-4 text-center">
                        <img src={this.props.planet.img} className="img-fluid img-rounded mb-sm-30" alt=""/>
                    </div>
        
                    <div className="col-md-8">
                        <div className="item_info">
                            Public Territory: Pacificus
                            <h2>{this.props.planet.name}</h2>
                            <div className="item_info_counts">
                                <div className="item_info_type"><AiFillDashboard size={20} className='pr1'/>ID: {this.props.planet.id}</div>
                                <div className="item_info_views"><AiOutlineSketch size={20} className='pr1'/>{this.props.planet.rarity}</div>
                                <div className="item_info_like"><AiFillThunderbolt size={20} className='pr1'/>In Peace</div>
                            </div>
                            <div className="spacer-10"></div>
                            <div className="item_author">                                    
                                <div className="p_list_pp">
                                    <span>
                                        <img className="lazy" src="./img/myicons/status.png" alt=""/>
                                    </span>
                                </div>                                    
                                <div className="author_list_info">
                                    <span>Au Amount: {this.props.planet.auAmount} AU</span>
                                </div>
                            </div>
                            <div className="spacer-40"></div>

                            <div className="p_list">
                                <div className="p_list_pp">
                                    <span>
                                        <img className="lazy" src="./img/myicons/planetlivability.png" alt=""/>
                                    </span>
                                </div>                                    
                                <div className="p_list_info">
                                    Planet Livability : Lv.<b> {this.props.planet.dna.substring(this.props.planet.dna.length-1,this.props.planet.dna.length)}</b>
                                    <span>Mining Rate <b>{PlanetInfo.livability[Number(this.props.planet.dna.substring(this.props.planet.dna.length-1,this.props.planet.dna.length))]}</b></span>
                                </div>
                            </div>

                            <div className="p_list">
                                <div className="p_list_pp">
                                    <span>
                                        <img className="lazy" src="./img/myicons/planetcivilization.png" alt=""/>
                                    </span>
                                </div>                                    
                                <div className="p_list_info">
                                    Civilization Level : Lv.<b> {this.props.planet.dna.substring(this.props.planet.dna.length-2,this.props.planet.dna.length-1)}</b>
                                    <span>Mining Rate <b>{PlanetInfo.civil[Number(this.props.planet.dna.substring(this.props.planet.dna.length-2,this.props.planet.dna.length-1))]}</b></span>
                                </div>
                            </div>

                            <div className="p_list">
                                <div className="p_list_pp">
                                    <span>
                                        <img className="lazy" src="./img/myicons/planetconcen.png" alt=""/>
                                    </span>
                                </div>                                    
                                <div className="p_list_info">
                                    AU Concentration : Lv.<b> {this.props.planet.dna.substring(this.props.planet.dna.length-3,this.props.planet.dna.length-2)}</b>
                                    <span>Mining Rate <b>{PlanetInfo.concen[Number(this.props.planet.dna.substring(this.props.planet.dna.length-3,this.props.planet.dna.length-2))]}</b></span>
                                </div>
                            </div> 

                            <div className="spacer-20"></div>

                            {
                                this.props.approve ?
                                <div>
                                    <ul className="de_nav">
                                        <li id='Mainbtn1' className='pv2 active'><span onClick={()=>this.props.createMine(this.props.planet.id)}>Create Mine</span></li>
                                    </ul>  
                                </div> :
                                <div>
                                    <p><b>WARNING:</b> Your planet NFTs have not approved for mine contract. 
                                    You must first click the button below to approve, and then create a mine.</p>
                                    <ul className="de_nav">
                                        <li id='Mainbtn1' className='pv2 active'><span onClick={this.props.setApproval}>Approve</span></li>
                                    </ul>  
                                    <div className="spacer-20"></div>
                                </div>
                            } 

                        </div>
                    </div>
        
                </div>
            </section>
    
            <Footer />
        </div>);
    }
}

export default PlanetDetail;