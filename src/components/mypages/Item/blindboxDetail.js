import React from "react";
import Footer from '../../components/footer';
import { createGlobalStyle } from 'styled-components';
import UseItemButton from "../../mycomponents/Item/UseItemButton";
import BlindboxWeb3 from "../../mycomponents/Web3/blindboxWeb3";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #212428;
  }
`;

class BlindboxDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allowance: false
        }
    }

    componentDidMount = () => {
        BlindboxWeb3.init().then(re => {
            BlindboxWeb3.getApprovedToBlindboxManager(this.props.blindbox.index).then(re2 => {
                this.setState({allowance: re2});
            })
        })
    }

    approveToManager = () => {
        console.log("index",this.props.blindbox.index)
        BlindboxWeb3.setApprovalToBlindboxManager(this.props.blindbox.index).then(re=>{});
    }

    render(){
        return (<div>
            <GlobalStyles/>
    
            <section className='container'>
                <div className='row mt-md-5 pt-md-4'>
    
                    <div className="col-md-4 text-center">
                        <img src={this.props.blindbox.img} className="img-fluid img-rounded mb-sm-30" alt=""/>
                    </div>
        
                    <div className="col-md-8">
                        <div className="item_info">
                            Amount: {this.props.blindbox.balance}
                            <h2>{this.props.blindbox.name}</h2>
                            <div className="spacer-20"></div>
                            <p>Gold is a chemical element with the symbol Au (from Latin: aurum) and atomic number 79, making it one of the higher atomic number elements that occur naturally. In a pure form, it is a bright, slightly reddish yellow, dense, soft, malleable, and ductile metal. Chemically, gold is a transition metal and a group 11 element. It is one of the least reactive chemical elements and is solid under standard conditions.</p>
                            <div className="spacer-20"></div>
                            <div className="item_author">                                    
                                <div className="author_list_pp">
                                    <span>
                                        <img className="lazy" src="./img/myicons/blindboxgift.png" alt=""/>
                                    </span>
                                </div>                                    
                                <div className="author_list_info">
                                    <span>{this.props.blindbox.possibility}</span>
                                </div>
                            </div>

                            <div className="spacer-40"></div>
                            <div> 
                                {
                                    this.state.allowance 
                                    ?
                                    <UseItemButton nft={this.props.blindbox} openBlindbox={this.props.useItem}/>
                                    :
                                    <div>
                                        <p> WARNING: You need to approve your blind box(es) first.</p>
                                        <ul className="de_nav">
                                            <li id='Mainbtn' className="active"><span onClick={this.approveToManager}>Approve</span></li>
                                        </ul>
                                    </div>
                                }
                            </div>

                        </div>
                    </div>
        
                </div>
            </section>
    
            <Footer />
        </div>);
    }
}

export default BlindboxDetail;