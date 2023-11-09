import {
  Backdrop,
  Box,
  Button,
  Container,
  Fade,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { PropTypes } from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addPoll } from "./../../redux/actions/poll";

export const CreatePoll = ({ addPoll }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [optionName, setOptionName] = useState("");
  const [options, setOption] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const { name, description } = formData;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddOption = () => {
    if (optionName !== "") {
      setOption([...options, { name: optionName }]);
      setOptionName("");
    }
  };

  const handleRemoveOption = (indexToRemove) => {
    const newOption = options.filter((item, index) => index !== indexToRemove);
    setOption(newOption);
  };

  const onChange = (e) => {
    if (e.target.name === "optionName") {
      setOptionName(e.target.value);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addPoll({
      name: formData.name,
      description: formData.description,
      options,
    });
    navigate("/");
  };

  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          //   alignItems: "center",
          //   justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Link to="/">Back</Link>
        <Typography variant="h4" component="h2" gutterBottom>
          Create Poll
        </Typography>
        <TextField
          label="Name"
          type="text"
          variant="outlined"
          value={name}
          onChange={onChange}
          margin="normal"
          fullWidth
          name="name"
          required
        />
        <TextField
          label="Description"
          type="text"
          variant="outlined"
          value={description}
          onChange={onChange}
          margin="normal"
          fullWidth
          name="description"
          required
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <Typography>Options</Typography>
          <Button variant="outlined" onClick={handleOpen}>
            Add option
          </Button>
        </div>

        {options &&
          options.map((item, index) => (
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              key={index}
            >
              <Typography>{item.name}</Typography>
              <Button onClick={() => handleRemoveOption(index)}>X</Button>
            </div>
          ))}
        <Button variant="contained" color="primary" onClick={onSubmit}>
          Create Poll
        </Button>
      </div>

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              background: "white",
              boxShadow: 24,
              padding: "15px",
            }}
          >
            <Typography id="spring-modal-title" variant="h6" component="h2">
              Create option
            </Typography>
            <TextField
              label="Option name"
              type="text"
              value={optionName}
              name="optionName"
              variant="outlined"
              margin="normal"
              fullWidth
              onChange={onChange}
              required
            />
            <Button variant="outlined" onClick={handleAddOption}>
              Add option
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

CreatePoll.propTypes = {
  addPoll: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addPoll })(CreatePoll);
