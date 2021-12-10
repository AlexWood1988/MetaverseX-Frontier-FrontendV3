import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'tachyons';

class AddShipPopup extends React.Component {
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
            <li id='Mainbtn' className="pv2 active"><span onClick={this.handleClickOpen}>Add Ship</span></li>                                        

            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle><p className='f3 black'>Choose ship</p></DialogTitle>
                <DialogContent>
                <DialogContentText>
                When the ship is dispatched to the planet for mining, 
                the ship will be locked and you can no longer assign the ship to other tasks.
                </DialogContentText>
                </DialogContent>

                <List style={{maxHeight: 200, overflow: 'auto'}}>
                    {this.props.ships.map((ship,index) => (
                    <ListItem button onClick={() => this.props.addShip(ship.id)} key={index}>
                        <ListItemText primary={'['+ship.id+'] '+ship.name} />
                    </ListItem>
                    ))}
                </List>

            </Dialog>
            
        </div>)
    }
}

export default AddShipPopup;