import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import FavouritesMock from "./FavouritesMock.js";

const deleteMock = jest.fn((row, index) => {
    console.log("handleDelete was called");
  });
  
const changeFavouritesMock = jest.fn(() => {
    console.log("fetchFavourites was called");
});

const mockFavourites = [
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
    "type":"Physical Store"}
];

test('favourites render in the correct order', () => {
  const { getAllByTestId } = render(<FavouritesMock favourites={mockFavourites} changeFavourites={changeFavouritesMock} 
  deleteFav={deleteMock}/>);
  const nameRows = getAllByTestId('fav-name-row-number',
  {
    exact: false,
  });
  expect(nameRows.length).toBe(5);
  expect(nameRows[0].textContent).toBe("Homeground Coffee Roasters");
  expect(nameRows[1].textContent).toBe("Nothing But Cheese Burger");
  expect(nameRows[2].textContent).toBe("Nothing But Cheese Burger");
  expect(nameRows[3].textContent).toBe("Candlenut");
  expect(nameRows[4].textContent).toBe("The Masses");
});

test('pagination works for favourites', () => {
    const { getAllByTestId, getByTestId } = render(<FavouritesMock favourites={mockFavourites} changeFavourites={changeFavouritesMock} 
    deleteFav={deleteMock}/>);
    const nextPageButton = getByTestId('fav-next-page-button');
    const prevPageButton = getByTestId('fav-previous-page-button');
    fireEvent.click(nextPageButton);
    const nameRows = getAllByTestId('fav-name-row-number',
    {
      exact: false,
    });
    expect(nameRows.length).toBe(1);
    expect(nameRows[0].textContent).toBe("Ah Hua Teochew Fishball Noodles");
    fireEvent.click(prevPageButton);
    const nameRows2 = getAllByTestId('fav-name-row-number',
    {
      exact: false,
    });
    expect(nameRows2.length).toBe(5);
    expect(nameRows2[0].textContent).toBe("Homeground Coffee Roasters");
    expect(nameRows2[1].textContent).toBe("Nothing But Cheese Burger");
    expect(nameRows2[2].textContent).toBe("Nothing But Cheese Burger");
    expect(nameRows2[3].textContent).toBe("Candlenut");
    expect(nameRows2[4].textContent).toBe("The Masses");
});

test('delete button correctly deletes favourite 1', () => {
  const { getByTestId } = render(<FavouritesMock favourites={mockFavourites} changeFavourites={changeFavouritesMock} 
    deleteFav={deleteMock}/>);
  const deleteButton = getByTestId('delete-button-0');
  fireEvent.click(deleteButton);
  expect(changeFavouritesMock).toHaveBeenCalledTimes(1);
  expect(deleteMock).toHaveBeenCalledWith(1);
  expect(changeFavouritesMock).toHaveBeenCalledTimes(1);
});

test('delete button correctly deletes favourite 2', () => {
    const { getByTestId } = render(<FavouritesMock favourites={mockFavourites} changeFavourites={changeFavouritesMock} 
      deleteFav={deleteMock}/>);
    const deleteButton = getByTestId('delete-button-4');
    fireEvent.click(deleteButton);
    expect(changeFavouritesMock).toHaveBeenCalledTimes(1);
    expect(deleteMock).toHaveBeenCalledWith(5);
    expect(changeFavouritesMock).toHaveBeenCalledTimes(1);
});

test('delete button works with pagination', () => {
    const { getByTestId } = render(<FavouritesMock favourites={mockFavourites} changeFavourites={changeFavouritesMock} 
      deleteFav={deleteMock}/>);
    const nextPageButton = getByTestId('fav-next-page-button');
    fireEvent.click(nextPageButton);
    const deleteButton = getByTestId('delete-button-0');
    fireEvent.click(deleteButton);
    expect(changeFavouritesMock).toHaveBeenCalledTimes(1);
    expect(deleteMock).toHaveBeenCalledWith(6);
    expect(changeFavouritesMock).toHaveBeenCalledTimes(1);
});