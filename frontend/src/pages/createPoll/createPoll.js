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
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addPoll } from "./../../redux/actions/poll";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { setAlert } from "../../redux/actions/alert";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});

export const CreatePoll = ({ addPoll }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [optionName, setOptionName] = useState("");
  const [options, setOption] = useState([]);
  const [errorOption, setErrorOption] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddOption = () => {
    if (!optionName) {
      setErrorOption('Option name is required')
      return 
    }

      setOption([...options, { name: optionName }]);
      setOptionName("");
  };

  useEffect(() => {
    if (optionName) {
      setErrorOption('')
    }
  }, [optionName])

  const handleRemoveOption = (indexToRemove) => {
    const newOption = options.filter((_, index) => index !== indexToRemove);
    setOption(newOption);
  };

  const onChange = (e) => {
    if (e.target.name === "optionName") {
      setOptionName(e.target.value);
    }
  };

  const afterAddPoll = () => {
    navigate("/");
  };

  const onSubmit = ({ name, description }) => {
    if (options.length < 2 || options.length > 5) {
     dispatch(setAlert('Poll must have at least 2 option and max 5 options', "error"));
    return
    }

    addPoll(
      {
        name,
        description,
        options,
      },
      afterAddPoll
    );
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

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            {...register("name")}
            name="name"
            label={errors.name ? errors.name?.message : "Name"}
            error={!!errors.name}
            type="text"
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <TextField
            {...register("description")}
            name="description"
            label={
              errors.description ? errors.description?.message : "Description"
            }
            error={!!errors.description}
            type="text"
            variant="outlined"
            margin="normal"
            fullWidth
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
          <Button fullWidth variant="contained" color="primary" type="submit">
            Create Poll
          </Button>
        </form>
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
              type="text"
              label={errorOption ? errorOption : "Option name"}
              error={!!errorOption}
              value={optionName}
              name="optionName"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              onChange={onChange}
            />
            <Button variant="outlined" sx={{ mt: 1 }} onClick={handleAddOption}>
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
