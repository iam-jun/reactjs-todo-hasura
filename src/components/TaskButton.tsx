import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import { SubmitHandler, useForm } from "react-hook-form";
import { ITask } from "../interfaces/Task";
import { useMutation } from "@apollo/client";
import { CREATE_TASK } from "../graphql/mutations";

interface ITaskButtonProps {
  type: string;
  task?: ITask;
}

const TaskButton: React.FC<ITaskButtonProps> = (props) => {
  const { type, task } = props;
  const [open, setOpen] = useState<boolean>(false);

  const [createTask, { data, loading, error }] = useMutation(CREATE_TASK);

  const { register, formState, handleSubmit } = useForm<ITask>({
    defaultValues: {
      title: task?.title,
      description: task?.description,
    },
  });

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSubmit: SubmitHandler<ITask> = async (formData) => {
    console.log(formData);
    await createTask({
      variables: { title: formData.title, description: formData.description },
    });
  };

  return (
    <>
      <IconButton onClick={onOpen}>
        {type === "create" ? <AddCircleOutlineIcon /> : <EditIcon />}
      </IconButton>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth={"sm"}>
        <DialogTitle>
          {type === "create" ? "Add a new task" : "Edit task"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                fullWidth
                {...register("title", {
                  required: "Title is required",
                })}
                error={!!formState.errors.title}
                helperText={formState.errors.title?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                {...register("description", {
                  required: "Description is required",
                })}
                error={!!formState.errors.title}
                helperText={formState.errors.title?.message}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Add
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskButton;
