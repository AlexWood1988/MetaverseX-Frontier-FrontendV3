import React from "react";
import Footer from '../../components/footer';
import { createGlobalStyle } from 'styled-components';
import NoticePopup from "../../mycomponents/tools/NoticePopup";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #212428;
  }
`;

class ItemDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            noticeOpen : false
        }
    }

    handleUse = () => {
        if (this.props.nft.category === 'nft_convertible'){
            this.setState({noticeOpen: true});
            //this.props.useItem(this.props.nft);
        } else if (this.props.nft.category === 'token_convertible'){
            this.props.useItem(this.props.nft);
        }
    }

    handleNoticeClose = () => {
        this.setState({noticeOpen: false});
    }

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
                            <div className="spacer-20"></div>
                            <div className="item_author">                                    
                                <div className="author_list_pp">
                                    <span>
                                        <img className="lazy" src="./img/myicons/blindboxgift.png" alt=""/>
                                    </span>
                                </div>                                    
                                <div className="author_list_info">
                                    <span>You will get {this.props.nft.reward}</span>
                                </div>
                            </div>

                            <div className="spacer-40"></div>
                            <ul className="de_nav">
                                <li id='Mainbtn' className="active"><span onClick={()=>this.handleUse()}>Redeem Item</span></li>
                            </ul>
                            {
                                this.state.noticeOpen
                                ? <NoticePopup notice={"Sorry, this type of NFT cannot be redeemed yet, please wait for the official notification"} handleNoticeClose={this.handleNoticeClose}/>
                                : "" 
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