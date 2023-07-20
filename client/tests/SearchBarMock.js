import React, { useState } from 'react';

export default function SearchBarMock({ insert, fetchFavourites }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchTerm, setSearchTerm] = React.useState('name');
  const [searchedVal, setSearchedVal] = React.useState("");

  const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'postalcode', label: 'Postal\u00a0Code', minWidth: 80 },
    { id: 'category', label: 'Category', minWidth: 100},
    { id: 'type', label: 'Type', minWidth: 100},
    { id: 'website', label: 'Website', minWidth: 170, align: 'right'},
  ];

    const data = [
        {"id":1,
        "name":"Homeground Coffee Roasters",
        "postalcode":"S088328",
        "address":"15 Teo Hong Road",
        "website":"https://homegroundcoffeeroasters.com/",
        "category":"Food & Drinks",
        "type":"Physical Store"}, 
        {"id":2,
        "name":"Nothing But Cheese Burger",
        "postalcode":"S238896",
        "address":"181 Orchard Rd, #04-23, Orchard Central",
        "website":"https://nbcb.com.sg/",
        "category":"Food & Drinks",
        "type":"Physical Store"},
        {"id":3,
        "name":"Nothing But Cheese Burger",
        "postalcode":"S428802",
        "address":"112 East Coast Road, #01-17, Katong I12",
        "website":"https://nbcb.com.sg/",
        "category":"Food & Drinks",
        "type":"Physical Store"},
        {"id":4,
        "name":"Candlenut",
        "postalcode":"S249676",
        "address":"Block 17A Dempsey Road",
        "website":"https://www.comodempsey.sg/restaurant/candlenut",
        "category":"Food & Drinks",
        "type":"Physical Store"},
        {"id":5,
        "name":"The Masses",
        "postalcode":"S189694",
        "address":"85 Beach Road, #01-02",
        "website":"https://www.facebook.com/themassessg/",
        "category":"Food & Drinks",
        "type":"Physical Store"},
        {"id":6,
        "name":"Ah Hua Teochew Fishball Noodles",
        "postalcode":"S600415",
        "address":"415 Pandan Gardens, #01-117",
        "website":"https://www.facebook.com/ahhuateochewfishballnoodle/",
        "category":"Food & Drinks",
        "type":"Physical Store"},
        {"id":7,
        "name":"Coffee Break",
        "postalcode":"S069111",
        "address":"7 Maxwell Road, Amoy Street Food Centre, #02-78",
        "website":"https://www.facebook.com/coffeebreakamoystreet/",
        "category":"Food & Drinks",
        "type":"Physical Store"},
        {"id":8,
        "name":"Wow Wow West",
        "postalcode":"S150006",
        "address":"6 Jalan Bukit Merah, #01-133, ABC Brickworks Market & Food Centre",
        "website":"https://www.facebook.com/wowwowwestgenuine/",
        "category":"Food & Drinks",
        "type":"Physical Store"},
        {"id":9,
        "name":"Shashlik Restaurant",
        "postalcode":"S238882",
        "address":"545 Orchard Road, Far East Shopping Centre, #06-19",
        "website":"https://shashlik.sg/",
        "category":"Food & Drinks",
        "type":"Physical Store"},
        {"id":10,
        "name":"Butternut",
        "postalcode":"S618499",
        "address":"3 Yung Sheng Road, Taman Jurong Market & Food Centre, #02-108",
        "website":"https://www.facebook.com/love.butternut/",
        "category":"Food & Drinks",
        "type":"Physical Store"},
        {"id":11,
        "name":"White House Teochew Porridge",
        "postalcode":"S328193",
        "address":"1096 Serangoon Road",
        "website":"https://www.facebook.com/whitehousetp/",
        "category":"Food & Drinks",
        "type":"Physical Store"}
      ];
    
    const handleChangePage = (event, newPage) => {
      const maxPage = data.length/rowsPerPage;
      if (newPage < 0) {
        console.log("first page");
      } else if (newPage > maxPage) {
        console.log("last page");
      } else {
        setPage(newPage);
      }
    };

    const addToFavourite = (fav, index) => {
        console.log(`Clicked favourite button with testid: ${index}`)
        console.log(`${fav.name} inserted into supabase`);
        insert(fav, index);
        fetchFavourites();
      }
      
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
            <tbody>
              {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <tr key={row.id}>
                  {columns.map((column) => (
                    <td key={column.id} data-testid={`${column.id}-row-number-${index}`}>
                      {row[column.id]}
                    </td>
                  ))}
                  <td>
                    {" "}
                    <button onClick={() => addToFavourite(row, index)} data-testid={`favourite-button-${index}`}>{"Add to Favourite"}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button onClick={() => handleChangePage(event, page - 1)} data-testid={`previous-page-button`}>{"Previous Page"}</button>
            <button onClick={() => handleChangePage(event, page + 1)} data-testid={`next-page-button`}>{"Next Page"}</button>
          </div>
        </>
      )
    }