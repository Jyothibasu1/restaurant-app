import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurantById, getRestaurantsCategory } from '../../State/Customers/Restaurant/restaurant.action';
import { Box, Card, CardHeader, IconButton, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Create } from '@mui/icons-material';
import CreateCategory from './CreateCategory';
import './Category.css';

// modal box styling
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // center lo pettadaniki
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    outline:"none",
    p: 4,
  };

const Category = () => {
    const dispatch=useDispatch();
    // getting auth and restaurant data from redux store
    const {auth,restaurant}=useSelector(store=>store)
      // getting token from local storage
    const jwt = localStorage.getItem("jwt")
    // state for opening/closing modal
    const [openCreateCategory, setOpenCreateCategory] = React.useState(false);
     // open modal function
    const handleOpenCreateCategory = () => setOpenCreateCategory(true);
    // close modal function
    const handleCloseCreateCategory = () => setOpenCreateCategory(false);

    
  return (
    <div className='Category-Con'>
       {/* main card */}
         <Card className="categoryCard">

           {/* header with add button */}
        <CardHeader
          title={"Categories"}
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}

          // add icon click -> open modal
          action={<IconButton onClick={handleOpenCreateCategory}> <Create/></IconButton> }
        />
        <TableContainer>
           {/* table for categories */}
          <Table sx={{}} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
              <TableCell>Id</TableCell>
                
             
                <TableCell>Name</TableCell>
             
               
              
              </TableRow>
            </TableHead>
            <TableBody>
              {/* looping categories */}
              {restaurant.categories.map((item, index) => (
                  <TableRow
                    className="cursor-pointer"
                    hover
                    key={item.id}
                    sx={{
                      "&:last-of-type td, &:last-of-type th": { border: 0 },
                    }}
                  >
                    <TableCell>{item?.id}</TableCell>
                
                    
                    <TableCell className="">
                      {item.name}
                    </TableCell>
          
                    
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* modal for creating new category */}
      <Modal
        open={openCreateCategory}
        onClose={handleCloseCreateCategory}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          {/* create category form */}
          <CreateCategory handleClose={handleCloseCreateCategory}/>
        </Box>
      </Modal>
    </div>
  )
}

export default Category