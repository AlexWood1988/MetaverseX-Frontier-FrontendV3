import React from 'react';
import { Link } from '@reach/router';
import TokenWeb3 from '../Web3/tokenWeb3';

const NavLink = props => (
    <Link 
      {...props}
      getProps={({ isCurrent }) => {
        // the object returned here is passed to the
        // anchor element's props
        return {
          className: isCurrent ? 'active' : 'non-active',
        };
      }}
    />
  );

class MxcBalanceButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mxcBalance : "0"
        }
    }

    componentDidMount = () => {
        TokenWeb3.init().then(re => {
            TokenWeb3.getMxcBalance().then(re2 => {
                this.setState({mxcBalance: re2});
            })
        })
    }

    render(){
        return <div>
            <NavLink to="/home" className="btn-main">{this.state.mxcBalance} MXC</NavLink>
        </div>
    }
}

export default MxcBalanceButton;