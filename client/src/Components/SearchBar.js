import { Container, InputAdornment, TextField, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TablePagination, TableRow, Box, InputLabel, MenuItem,
  FormControl, Select, IconButton } from "@mui/material";
import React, { useCallback, useState, useEffect } from 'react'; 
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Favourites from "./Favourites.js";
import { supabase } from "../Supabase";

export default function SearchBar() {
  const [data, setData] = useState([]); 
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchTerm, setSearchTerm] = React.useState('name'); // default to search by name
  const [searchedVal, setSearchedVal] = React.useState("");
  const [favourites, setFavourites] = React.useState([]);
  const [error, setError] = React.useState(null);

  // headers for table
  const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'postalcode', label: 'Postal\u00a0Code', minWidth: 80 },
    { id: 'category', label: 'Category', minWidth: 100},
    { id: 'type', label: 'Type', minWidth: 100},
    { id: 'website', label: 'Website', minWidth: 170, align: 'right'},
  ];

  // search field
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => { 
    fetch('https://testbackend-o05b.onrender.com/businesses') 
      .then(response => response.json()) 
      .then(data => setData(data))
      .then(err => {console.log(err);
      });
  }, []);

  const fetchFavourites = useCallback(async () => {
    const {data:{user}} = await supabase.auth.getUser();
    supabase
      .from("Favourites")
      .select()
      .eq("user_id", user.id)
      .order("id")
      .then(({data: favourites, error}) => {
        setFavourites(favourites);
        setError(error);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
      }, [setFavourites, setError]);

      useEffect(() => {
        fetchFavourites();
      }, [fetchFavourites]);

      const addToFavourite = async (favs, index) => { 
        const {data:{user}} = await supabase.auth.getUser();
        console.log(`Clicked favorite button with data-testid: favorite-button-${index}`);
        supabase 
          .from("Favourites") 
          .insert({id: favs.id, name: favs.name, postalcode: favs.postalcode, address: favs.address, website: favs.website, category: favs.category, type: favs.type, user_id: user.id})
          .then(({error}) => { 
            if (error) { 
              setError(error); 
              console.log(error) 
            } else { 
              fetchFavourites(); 
            } 
          }); 
          setError(null); 
      }

  return (
    <Container maxWidth="lg" align="center">
      <Favourites
      favourites = {favourites}
      changeFavourites = {fetchFavourites}
    />
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { sm: '1fr 1fr' },
        gap: 2,
        maxWidth: 700,
        mt: 5,
      }}
      >
        <TextField id="outlined-search" label="Search" type="search"
        onChange={(e) => {
          setSearchedVal(e.target.value);
          setPage(0);
        }
      } 
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }} /> 
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Search by</InputLabel>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={searchTerm}
          label="Search by"
          onChange={handleChange}
        >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="category">Category</MenuItem>
            <MenuItem value="type">Online/Physical Store</MenuItem>
          </Select>
        </FormControl>
      </Box>
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
          <TableBody>
            {data
            .filter((row) =>
                !searchedVal.length || row[searchTerm]
                  .toString()
                  .toLowerCase()
                  .includes(searchedVal.toString().toLowerCase()) 
              ) // filter results according to search
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // slicing data for pagination
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {row[column.id]}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                    <IconButton aria-label="favourite" color = "primary" onClick={() => addToFavourite(row, index)} data-testid={`favorite-button-${index}`}>
                      <FavoriteIcon/>
                    </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={data
          .filter((row) =>
              !searchedVal.length || row[searchTerm]
                .toString()
                .toLowerCase()
                .includes(searchedVal.toString().toLowerCase()) 
            ).length}
        rowsPerPage={5}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </Container>
  );
}

