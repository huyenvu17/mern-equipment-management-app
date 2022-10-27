import { Box, Typography, Modal } from "@mui/material";
import React from "react";

const ModalComponent = ({ openModal, handleCloseModal, header, content }) => {
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
        <Typography
          component="h1"
          variant="h5"
          sx={{ textAlign: "center", fontWeight: 600 }}
        >
          {header}
        </Typography>
        <Box id="modal-modal-description" sx={{ mt: 2 }}>
          {content}
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
