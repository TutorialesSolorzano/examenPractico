import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  startLoadCategories,
  startSaveProduct,
  startUpdateProduct,
} from "../actions/action";
import { useForm } from "../hooks/useForm";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal({
  crear,
  openModal,
  handleOpenModal,
  producto
}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.getCategories);

  const { product, error, loading } = useSelector((state) => state.postProduct);

  const { productU, error2, loadingU } = useSelector(
    (state) => state.putProduct
  );

  const [values, handleInputChange, reset] = useForm({
    nameProduct: producto ? producto.nameProduct : null,
    descripcion: producto ? producto.descripcion : null,
    productQuantity: producto ? producto.productQuantity : null,
  });

  const { nameProduct, descripcion, productQuantity } = values;

  useEffect(() => {
    if (!categories) {
      dispatch(startLoadCategories());
    }
  }, [dispatch, producto]);

  const [category, setCategory] = useState(producto ? producto.category : {});

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  const handleClose = () => {
    handleOpenModal();
    setOpen(false);
  };

  const handleCrear = () => {
    const newProduct = {
      nameProduct,
      category,
      descripcion,
      productQuantity,
      status: true,
    };

    dispatch(startSaveProduct(newProduct));

    handleClose();
  };

  const handleActualizar = () => {
    const updatedProduct = {
      idProduct: producto.idProduct,
      nameProduct,
      category,
      descripcion,
      productQuantity,
      status: true,
    };

    dispatch(startUpdateProduct(updatedProduct));

    handleClose();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Producto</h2>
      <p id="simple-modal-description">
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            onChange={handleInputChange}
            name="nameProduct"
            value={nameProduct}
            id="standard-basic"
            label="Nombre Producto"
          />
          <TextField
            id="standard-select-currency"
            select
            label="Categoria"
            value={category}
            defaultValue={producto ? producto.category : null}
            onChange={handleChange}
            helperText="Por favor selecciona una categoria"
          >
            {categories &&
              categories.length > 0 &&
              categories.map((option) => (
                <MenuItem key={option.idCategory} value={option}>
                  {option.nameCategory}
                </MenuItem>
              ))}
          </TextField>
          <TextField
            onChange={handleInputChange}
            name="descripcion"
            value={descripcion}
            id="standard-basic"
            label="Descripcion"
          />
          <TextField
            onChange={handleInputChange}
            name="productQuantity"
            value={productQuantity}
            id="standard-number"
            type="number"
            label="Cantidad"
          />
          <br />
          {crear ? (
            <Button onClick={() => handleCrear()} variant="contained">
              Crear
            </Button>
          ) : (
            <Button onClick={() => handleActualizar()} variant="contained">
              Actualizar
            </Button>
          )}
        </form>
      </p>
      <SimpleModal />
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
