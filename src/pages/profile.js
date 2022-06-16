import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { Input, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { toggleVisibleProfile, updateProfile } from "../store/profile";
import styles from "./profile.module.scss";

export const ProfilePage = () => {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
  });

  const [formNotSave, setFormNotSave] = useState({
    firstName: form.firstName,
    lastName: form.lastName,
  });

  const handleChangeForm = (event) => {
    const dataName = event.target.getAttribute("data-name");
    if (!!dataName) {
      setForm({
        ...form,
        [dataName]: event.target.value,
      });
    }
  };

  return (
    <div>
      <h1>
        {profile.firstName} {profile.lastName}
      </h1>
      <Button
        variant="outlined"
        onClick={() => {
          setFormNotSave(form);
          dispatch(toggleVisibleProfile());
        }}
      >
        Edit Profile
      </Button>
      <Dialog open={profile.isVisibleEditProfile}>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogContent className={styles.content}>
          <Input
            placeholder="First Name..."
            value={form.firstName}
            onChange={handleChangeForm}
            inputProps={{
              "data-name": "firstName",
            }}
          />
          <Input
            placeholder="Last Name..."
            value={form.lastName}
            onChange={handleChangeForm}
            inputProps={{
              "data-name": "lastName",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setForm(formNotSave);
              dispatch(toggleVisibleProfile());
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setFormNotSave(form);
              dispatch(updateProfile(form));
              dispatch(toggleVisibleProfile());
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
