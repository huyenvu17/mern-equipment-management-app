import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";

function Confirmation({
  openModal,
  handleCloseModal,
  header,
  content,
  handleOK,
}) {
  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography component="h1" variant="h5" sx={{ fontWeight: 600 }}>
          {header}
        </Typography>
        <Box id="modal-modal-description" sx={{ my: 5 }}>
          {content}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginRight: 5,
            marginLeft: 5,
          }}
        >
          <Button
            className="btn-default"
            variant="contained"
            fullWidth
            sx={{ marginRight: 2 }}
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button
            className="btn-disabled"
            variant="contained"
            fullWidth
            sx={{ marginLeft: 2 }}
            onClick={handleOK}
          >
            OK
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default Confirmation;
