import React from "react";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import UseItemButton from "../mycomponents/Item/UseItemButton";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #212428;
  }
`;

class ItemDetail extends React.Component {

    render(){
        return (<div>
            <GlobalStyles/>
    
            <section className='container'>
                <div className='row mt-md-5 pt-md-4'>
    
                    <div className="col-md-4 text-center">
                        <img src={this.props.nft.img} className="img-fluid img-rounded mb-sm-30" alt=""/>
                    </div>
        
                    <div className="col-md-8">
                        <div className="item_info">
                            TokenId: {this.props.nft.tokenId}
                            <h2>{this.props.nft.name}</h2>
                            <div className="spacer-20"></div>
                            <p>Gold is a chemical element with the symbol Au (from Latin: aurum) and atomic number 79, making it one of the higher atomic number elements that occur naturally. In a pure form, it is a bright, slightly reddish yellow, dense, soft, malleable, and ductile metal. Chemically, gold is a transition metal and a group 11 element. It is one of the least reactive chemical elements and is solid under standard conditions.</p>
                            <div className="spacer-20"></div>
                            <div className="item_author">                                    
                                <div className="author_list_pp">
                                    <span>
                                        <img className="lazy" src="./img/carousel/crs-3.jpg" alt=""/>
                                    </span>
                                </div>                                    
                                <div className="author_list_info">
                                    <span>You will get 200 AU</span>
                                </div>
                            </div>

                            <div className="spacer-40"></div>
                            {
                                this.props.nft.category === 'blindbox' ?
                                <UseItemButton nft={this.props.nft} openBlindbox={this.props.useItem}/> :
                                <ul className="de_nav">
                                    <li id='Mainbtn' className="active"><span onClick={this.props.useItem}>Use Item</span></li>
                                </ul>
                            }

                        </div>
                    </div>
        
                </div>
            </section>
    
            <Footer />
        </div>);
    }
}

export default ItemDetail;