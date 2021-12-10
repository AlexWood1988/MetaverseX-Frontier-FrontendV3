import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'tachyons';

class UseItemButton extends React.Component {
    constructor(props){
        super(props);
        this.state={
            open: false,
            name: ""
        }
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
            <ul className="de_nav">
                <li id='Mainbtn' className="active"><span onClick={this.handleClickOpen}>Open Blindbox</span></li>
            </ul>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"><p className='f3 black'>Open Blindbox</p></DialogTitle>
                <DialogContent>
                <DialogContentText>
                You will get an item from rarities of {this.props.nft.ships},
                and you can go to the warehouse page to check it after opening it.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Your Item Name"
                    type="email"
                    fullWidth
                    onChange={this.onInputChange}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={()=>this.props.openBlindbox(this.props.nft.index,this.state.name)} color="primary">
                    Open
                </Button>
                </DialogActions>
            </Dialog>
            </div>
        );
    }
}

export default UseItemButton;