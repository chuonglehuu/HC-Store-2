import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import { Button, Dialog } from "@mui/material";
import classNames from "classnames/bind";
import { useState } from "react";
import AddCategory from "./AddCategory";
import styles from "./AdminCategory.module.scss";

const cx = classNames.bind(styles);

function AdminCategory() {
  const [open, setOpen] = useState(false);

  function handleOpenAdd() {
    setOpen(true);
  }
  
  function handleCloseAdd() {
    setOpen(false);
  }

  return (
    <div className={cx("main")}>
      <div className={cx("content")}>
        <h2 className={cx("title")}>List of Categories</h2>
        <div className={cx("add-btn")}>
          <Button
            variant="contained"
            startIcon={<ControlPointOutlinedIcon />}
            onClick={() => {
              handleOpenAdd();
            }}
          >
            Add Category
          </Button>
          <Dialog
            open={open}
            onClose={() => {
              handleCloseAdd();
            }}
          >
            <AddCategory />
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default AdminCategory;