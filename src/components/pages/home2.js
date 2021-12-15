import React from 'react';
import SliderMainParticle from '../components/SliderMainParticle';
import FeatureBox from '../components/FeatureBox';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import BlindboxInSell from '../mycomponents/Homepage/BlindboxInSell';
import HomeEventsSlider from '../mycomponents/Homepage/HomeEventsSlider';

const GlobalStyles = createGlobalStyle`
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  .navbar .mainside a{
    background: #3665ff;
    &:hover{
      box-shadow: 2px 2px 20px 0px #3665ff;
    }
  }
  .item-dropdown{
    .dropdown{
      a{
        &:hover{
          background: #3665ff;
        }
      }
    }
  }
  .btn-main{
    background: #3665ff;
    &:hover{
      box-shadow: 2px 2px 20px 0px #3665ff;
    }
  }
  p.lead{
    color: #a2a2a2;
  }
  .navbar .navbar-item .lines{
    border-bottom: 2px solid #3665ff;
  }
  .jumbotron.no-bg{
    height: 100vh;
    overflow: hidden;
    background-repeat: repeat;
    background-size: cover;
    background-position: bottom;
    background-repeat: no-repeat;
  }
  #tsparticles{
    top: 0;
  }
  .text-uppercase.color{
    color: #3665ff;
  }
  .de_count h3 {
    font-size: 36px;
    margin-bottom: 0px;
  }
  .de_count h5{
    font-size: 14px;
    font-weight: 500;
  }
  h2 {
    font-size: 30px;
  }
  .box-url{
    text-align: center;
    h4{
      font-size: 16px;
    }
  }
  .de_countdown{
    border: solid 2px #3665ff;
  }
  .author_list_pp, .author_list_pp i, 
  .nft_coll_pp i, .feature-box.style-3 i, 
  footer.footer-light #form_subscribe #btn-subscribe i, 
  #scroll-to-top div{
    background: #3665ff;
  }
  footer.footer-light .subfooter .social-icons span i{
    background: #403f83;
  }
  .author_list_pp:hover img{
    box-shadow: 0px 0px 0px 2px #3665ff;
  }
  .nft__item_action span{
    color: #3665ff;
  }
  .feature-box.style-3 i.wm{
    color: rgba(131,100,226, .1);
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;


const homeone= () => (
  <div>
  <GlobalStyles />
      <section className="jumbotron no-bg" style={{backgroundImage: `url(${'./img/background/8.jpg'})`}}>
         <SliderMainParticle/>
      </section>

      <section className='container no-bottom'>
        <div className="row">
            <div className="col-lg-2 col-sm-4 col-6 mb30">
                <span className="box-url">
                    <img src="./img/wallet/1.png" alt="" className="mb20"/>
                    <h4>Metamask</h4>
                </span>
            </div>

            <div className="col-lg-2 col-sm-4 col-6 mb30">
                <span className="box-url">
                    <img src="./img/wallet/2.png" alt="" className="mb20"/>
                    <h4>Bitski</h4>
                </span>
            </div>       

            <div className="col-lg-2 col-sm-4 col-6 mb30">
                <span className="box-url">
                    <img src="./img/wallet/3.png" alt="" className="mb20"/>
                    <h4>Fortmatic</h4>
                </span>
            </div>    

            <div className="col-lg-2 col-sm-4 col-6 mb30">
                <span className="box-url">
                    <img src="./img/wallet/4.png" alt="" className="mb20"/>
                    <h4>WalletConnect</h4>
                </span>
            </div>

            <div className="col-lg-2 col-sm-4 col-6 mb30">
                <span className="box-url">
                    <img src="./img/wallet/5.png" alt="" className="mb20"/>
                    <h4>Coinbase Wallet</h4>
                </span>
            </div>

            <div className="col-lg-2 col-sm-4 col-6 mb30">
                <span className="box-url">
                    <img src="./img/wallet/6.png" alt="" className="mb20"/>
                    <h4>Arkane</h4>
                </span>
            </div>                                       
        </div>
      </section>

      <section className='container no-top no-bottom'>
        <div className='row'>
          <div className="spacer-double"></div>
          <div className='col-lg-12 mb-2'>
              <h2>Blind Boxes in Sale</h2>
          </div>
        </div> 
        <BlindboxInSell/>
      </section>

      <section className='container no-top no-bottom'>
        <div className='row'>
          <div className="spacer-double"></div>
          <div className='col-lg-12 mb-2'>
              <h2>Recent Events</h2>
          </div>
            <div className='col-lg-12'>
              <HomeEventsSlider/>
            </div>
          </div>
      </section>

      <section className='container no-top'>
        <div className='row'>
            <div className="spacer-double"></div>
            <div className='col-lg-12 mb-3'>
              <h2>Create and Sell Now</h2>
            </div>
            <FeatureBox/>
        </div>
      </section>

    <Footer />

  </div>
);
export default homeone;