import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import Button from "@material-ui/core/Button";
import SimpleModal from "./SimpleModal";
import { useDispatch, useSelector } from "react-redux";
import { startLoadProducts, startUpdateProduct } from "../actions/action";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function CustomPaginationActionsTable() {
  const dispatch = useDispatch();

  const { products, } = useSelector(
    (state) => state.getProducts
  );

  const { product, error, loadingU } = useSelector((state) => state.putProduct);

  useEffect(() => {
    if(!loadingU){
       load();
    }
  }, [loadingU]);

  const load = useCallback(() => {
    dispatch(startLoadProducts());
  }, [dispatch]);

  useEffect(() => {
    if (!products) {
      load();
    }
  }, [dispatch]);

  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, products ? products.length - page * rowsPerPage : 0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [openModal, setOpenModal] = useState(false);

  const [producto, setProducto] = useState(null);

  const [crear, setCrear] = useState(true);

  const handleOpenModal = (isCrear, producto) => {
    load();
    setOpenModal(!openModal);
    setCrear(isCrear);
    if (!isCrear) {
      setProducto(producto);
    } else {
      setProducto(null);
    }
  };

  const handleDelete = (product) => {
    product.status = false;
    dispatch(startUpdateProduct(product));
  };

  return (
    <>
      <Button
        onClick={() => handleOpenModal(true, null)}
        variant="contained"
        color="primary"
      >
        Crear
      </Button>
      {products && products.length > 0 && (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="custom pagination table">
            <TableBody>
              {(rowsPerPage > 0
                ? products.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : products
              ).map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.nameProduct}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.category.nameCategory}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.descripcion}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.productQuantity}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    <Button
                      onClick={() => handleOpenModal(false, row)}
                      variant="contained"
                      color="primary"
                    >
                      Editar
                    </Button>
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    <Button
                      onClick={() => handleDelete(row)}
                      variant="contained"
                      color="secondary"
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={products.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "products per page" },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
      {openModal && (
        <SimpleModal
          crear={crear}
          openModal={openModal}
          handleOpenModal={handleOpenModal}
          producto={producto}
        />
      )}
    </>
  );
}
