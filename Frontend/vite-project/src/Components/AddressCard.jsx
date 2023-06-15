import React from 'react';
import {
    Card,
    CardContent,
    CardActions,
    IconButton,
    Menu,
    MenuItem,
    Typography,

} from '@material-ui/core';
import { FiMoreVertical } from 'react-icons/fi';

const AddressCard = ({ address, handleEdit, handleDelete }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    const handleEditClick = () => {
        handleEdit(address, handleMenuClose);
        // setAnchorEl(null);
    };

    const handleDeleteClick = () => {
        handleDelete(address, handleMenuClose);
        setAnchorEl(null);
    };


    return (
        <Card className="relative w-full" style={{ marginTop: 4 }}>
            <CardContent>
                {/* Render address information */}
                <Typography variant="body2" className='text-white border border-r border-white-500 border-solid rounded-lg w-[10%] bg-black p-[5px]'>{address.addressType}</Typography>
                <Typography variant="h6">{address.country}</Typography>
                <Typography variant="body2">
                    {address.city}, {address.state}, {address.zipCode}
                    <br />
                    {address.address1},{address.address2}
                </Typography>

            </CardContent>
            <CardActions className="flex justify-end absolute top-0 right-0">
                <div>
                    <IconButton aria-label="More options" onClick={handleMenuOpen}>
                        <FiMoreVertical size={24} />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                        <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
                    </Menu>
                </div>
            </CardActions>
        </Card>
    );
};

export default AddressCard;
