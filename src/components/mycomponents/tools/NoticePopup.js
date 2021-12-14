import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'tachyons';

class NoticePopup extends React.Component {
    constructor(props){
        super(props);
        this.state={
            open: true
        }
    }

    setOpen = (b) => {
        this.setState({open:b});
    }
    
    handleClose = () => {
        this.setOpen(false);
        this.props.handleNoticeClose();
    };


    render(){
        return (
            <div>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"><p className='f3 black'>Notice</p></DialogTitle>
                <DialogContent>
                <DialogContentText>
                {this.props.notice}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    Confirm
                </Button>
                </DialogActions>
            </Dialog>
            </div>
        );
    }
}

export default NoticePopup;