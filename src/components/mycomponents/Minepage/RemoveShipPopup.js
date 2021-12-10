import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'tachyons';

class RemoveShipPopup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }

    handleClickOpen = () => {
        this.setState({open: true});
    }

    handleClose = () => {
        this.setState({open: false});
    }

    render(){
        return(<div>
            <li id='Mainbtn' className="pv2"><span onClick={this.handleClickOpen}>Remove ship</span></li>                                        

            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle><p className='f3 black'>Remove ship</p></DialogTitle>
                <DialogContent>
                <DialogContentText>
                The cost of removing the ship is 10% DUR, which is 1200, 
                because the mining time is less than 3 days.
                </DialogContentText>
                </DialogContent>

                <List>
                    {this.props.ships.map((ship,index) => (
                    <ListItem button onClick={() => this.props.removeShip(index)} key={index}>
                        <ListItemText primary={ship.name} />
                    </ListItem>
                    ))}
                </List>

            </Dialog>
            
        </div>)
    }
}

export default RemoveShipPopup;