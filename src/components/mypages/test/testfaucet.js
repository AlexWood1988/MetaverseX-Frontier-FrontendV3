import React from 'react';
import Footer from '../../components/footer';
import { createGlobalStyle } from 'styled-components';
import testweb3 from './testweb3';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #212428;
  }
`;

class TestFaucet extends React.Component {
  componentDidMount(){
    testweb3.init().then(re=>{});
  }

  getmxc = () => {
    testweb3.getmxc().then(re=>{});
  }

  getau = () => {
    testweb3.getau().then(re=>{});
  }

  render(){
    return (<div>
    <GlobalStyles/>
    
      <section className='jumbotron breadcumb no-bg'>
        <div className='mainbreadcumb'>
          <div className='container'>
                <h4 className='tc'>
                    <b>Test Faucet</b>                                             
                    <div className="clearfix"></div>
                    <span id="wallet" className='f6'>Test bnb can get from bsc testnet faucet.</span>
                </h4>

                <ul className="de_nav">
                  <li id='Mainbtn1' className=''><span onClick={this.getmxc}>Get 1000 MXC</span></li>
                  {/*<li id='Mainbtn1' className=''><span onClick={this.getau}>Get 1000000 AU</span></li>*/}
              </ul>
          </div>
        </div>
      </section>
    
      <Footer />
    </div>)
  }
}

export default TestFaucet;