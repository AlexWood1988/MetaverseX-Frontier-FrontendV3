import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'tachyons';
import TokenWeb3 from '../Web3/tokenWeb3';

class ApprovePopupButton extends React.Component {
    constructor(props){
        super(props);
        this.state={
            open: false,
            name: "",
            mxcBalance: "Loading",
            allowance: false
        }
    }

    componentDidMount = () => {
        TokenWeb3.init().then(re => {
            this.getMxcBalance();
            this.getMxcAllowance();
        })
    }

    getMxcBalance = () => {
        TokenWeb3.getMxcBalance().then(re => {
            this.setState({mxcBalance: re});
        })
    }

    getMxcAllowance = () => {
        TokenWeb3.getMxcAllowanceForBlindboxManager(1000000).then(re => {
            this.setState({allowance: re});
        })
    }

    ApproveMxc = () => {
        TokenWeb3.approveAllMxcForBlindboxManager().then(re => {});
    }

    setOpen = (b) => {
        this.setState({open:b});
    }

    handleClickOpen = () => {
        this.setOpen(true);
    };
    
    handleClose = () => {
        this.setOpen(false);
    };

    onInputChange = (event) => {
        this.setState({name:event.target.value});
    }

    render(){
        return (
            <div>
            <div className="nft__item_action">
                <span onClick={()=> this.handleClickOpen()}>Buy Now</span>
            </div>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"><p className='f3 black'>Buy Blind Box</p></DialogTitle>
                <DialogContent>
                <DialogContentText>
                Your current balance is {this.state.mxcBalance} MXC, this blind box will cost {this.props.blindbox.price}.
                </DialogContentText>
                <DialogContentText>
                {
                    this.state.allowance ? "" : "Warning: You need to approve your MXC first."
                }
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    Cancel
                </Button>
                {
                    this.state.allowance 
                    ?
                    <div>
                        <Button onClick={()=>this.props.buyBlindbox(this.props.blindbox.index)} color="primary">
                            Buy
                        </Button>
                    </div>
                    :
                    <div>
                        <Button onClick={()=>this.ApproveMxc()} color="primary">
                            Approve
                        </Button>
                    </div>
                }
                </DialogActions>
            </Dialog>
            </div>
        );
    }
}

export default ApprovePopupButton;