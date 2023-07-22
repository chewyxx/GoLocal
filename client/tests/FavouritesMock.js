import React, { useState } from 'react';

export default function FavouritesMock({ favourites, changeFavourites, deleteFav }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'postalcode', label: 'Postal\u00a0Code', minWidth: 80 },
    { id: 'category', label: 'Category', minWidth: 100},
    { id: 'type', label: 'Type', minWidth: 100},
    { id: 'website', label: 'Website', minWidth: 170, align: 'right'},
  ];
    
    const handleChangePage = (event, newPage) => {
      const maxPage = favourites.length/rowsPerPage;
      if (newPage < 0) {
        console.log("first page");
      } else if (newPage > maxPage) {
        console.log("last page");
      } else {
        setPage(newPage);
      }
    };

    const handleDelete = (id, index) => {
        console.log(`Clicked delete button with testid: ${index}`);
        console.log(`row with business id ${id} deleted from supabase`);
        deleteFav(id);
        changeFavourites();
      };
      
      return (
        <>
          <table>
            <thead>
              <tr>
                {columns.map((column) => (
                <td key={column.id}>
                  {column.label}
                </td>
                ))}
              </tr>
            </thead>
            {!(favourites.length === 0) ?
            <tbody>
              {favourites
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <tr key={row.id}>
                  {columns.map((column) => (
                    <td key={column.id} data-testid={`fav-${column.id}-row-number-${index}`}>
                      {row[column.id]}
                    </td>
                  ))}
                  <td>
                    {" "}
                    <button onClick={() => handleDelete(row.id)} data-testid={`delete-button-${index}`}>{"Delete"}</button>
                  </td>
                </tr>
              ))}
            </tbody>
            :
            <tbody>
                <tr>
                    <td>
                    "No favourites yet!"
                    </td>
                </tr>
            </tbody>
            }
          </table>
          <div>
            <button onClick={() => handleChangePage(event, page - 1)} data-testid={`fav-previous-page-button`}>{"Previous Page"}</button>
            <button onClick={() => handleChangePage(event, page + 1)} data-testid={`fav-next-page-button`}>{"Next Page"}</button>
          </div>
        </>
      )
    }