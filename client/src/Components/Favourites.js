import { Delete as DeleteIcon } from "@mui/icons-material";
import { Container, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TablePagination, TableRow, IconButton, Typography } from "@mui/material";
import React from 'react'; 
import { supabase } from "../Supabase";

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'postalcode', label: 'Postal\u00a0Code', minWidth: 80 },
  { id: 'category', label: 'Category', minWidth: 100},
  { id: 'type', label: 'Type', minWidth: 100},
  { id: 'website', label: 'Website', minWidth: 170, align: 'right'},
];

export default function Favourites({favourites, changeFavourites}) {
//Buttons: view details, delete,
//display the name, postal, website
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => {
    supabase
      .from("Favourites")
      .delete()
      .eq("id", id)
      .then(({ error }) => {
        if (error) {
          alert("Failed to delete favourites!");
        } else {
          changeFavourites();
        }
      });
  };
  
  const favouritesLength = favourites.length === 0; 

  return (
    <Container maxWidth="lg" align="center" sx={{ mt: 3 }}>
      <Typography variant="h4" component="h2" align="center" sx={{fontFamily: "Helvetica"}}>
        Favourites
      </Typography>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {!favouritesLength ? (
          <TableBody>
            {favourites
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {row[column.id]}
                        </TableCell>
                      );
                    })}
                    <IconButton aria-label="favourite" onClick={() => handleDelete(row.id)}>
                      <DeleteIcon/>
                    </IconButton>
                  </TableRow>
                );
              })}
          </TableBody>
           ) : (
            <Typography variant="h4" component="" align="" 
            sx={{fontFamily: "Helvetica", fontSize: 20, mt: 2, ml: 2}}>
              No favourites yet!
            </Typography>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={favourites.length}
        rowsPerPage={5}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </Container>
  );
}