import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBarMock from './SearchBarMock.js';

const insertMock = jest.fn((row, index) => {
  console.log("addToFavourite was called");
});

const fetchFavouritesMock = jest.fn(() => {
  console.log("fetchFavourites was called");
});

// re-testing for favourite button together with pagination

test('re-running favourite button test 1 after next page click', () => {
  const { getByTestId } = render(<SearchBarMock insert={insertMock} fetchFavourites={fetchFavouritesMock} />);
  const nextPageButton = getByTestId('next-page-button');
  fireEvent.click(nextPageButton);
  const favouriteButton = getByTestId('favourite-button-0');
  fireEvent.click(favouriteButton);
  expect(insertMock).toHaveBeenCalledTimes(1);
  expect(insertMock).toHaveBeenCalledWith({
    id :6,
    name :"Ah Hua Teochew Fishball Noodles",
    postalcode :"S600415",
    address :"415 Pandan Gardens, #01-117",
    website :"https://www.facebook.com/ahhuateochewfishballnoodle/",
    category :"Food & Drinks",
    type :"Physical Store"}, 0);
  expect(fetchFavouritesMock).toHaveBeenCalledTimes(1);
});

test('re-running favourite button test 2 after next page click', () => {
  const { getByTestId } = render(<SearchBarMock insert={insertMock} fetchFavourites={fetchFavouritesMock} />);
  const nextPageButton = getByTestId('next-page-button');
  fireEvent.click(nextPageButton);
  const favouriteButton = getByTestId('favourite-button-2');
  fireEvent.click(favouriteButton);
  expect(insertMock).toHaveBeenCalledTimes(1);
  expect(insertMock).toHaveBeenCalledWith({
    id :8,
    name :"Wow Wow West",
    postalcode :"S150006",
    address :"6 Jalan Bukit Merah, #01-133, ABC Brickworks Market & Food Centre",
    website :"https://www.facebook.com/wowwowwestgenuine/",
    category :"Food & Drinks",
    type :"Physical Store"}, 2);
  expect(fetchFavouritesMock).toHaveBeenCalledTimes(1);
});

test('re-running favourite button test 3 after next page click', () => {
  const { getByTestId } = render(<SearchBarMock insert={insertMock} fetchFavourites={fetchFavouritesMock} />);
  const nextPageButton = getByTestId('next-page-button');
  fireEvent.click(nextPageButton);
  const favouriteButton = getByTestId('favourite-button-4');
  fireEvent.click(favouriteButton);
  expect(insertMock).toHaveBeenCalledTimes(1);
  expect(insertMock).toHaveBeenCalledWith({
    id :10,
    name :"Butternut",
    postalcode :"S618499",
    address :"3 Yung Sheng Road, Taman Jurong Market & Food Centre, #02-108",
    website :"https://www.facebook.com/love.butternut/",
    category :"Food & Drinks",
    type :"Physical Store"}, 4);
  expect(fetchFavouritesMock).toHaveBeenCalledTimes(1);
});

test('re-running favourite button test 1 after prev page click', () => {
  const { getByTestId } = render(<SearchBarMock insert={insertMock} fetchFavourites={fetchFavouritesMock} />);
  const nextPageButton = getByTestId('next-page-button');
  const prevPageButton = getByTestId('previous-page-button');
  fireEvent.click(nextPageButton);
  fireEvent.click(prevPageButton);
  const favouriteButton = getByTestId('favourite-button-0');
  fireEvent.click(favouriteButton);
  expect(insertMock).toHaveBeenCalledTimes(1);
  expect(insertMock).toHaveBeenCalledWith({
  id: 1,
  name: "Homeground Coffee Roasters",
  postalcode :"S088328",
  address :"15 Teo Hong Road",
  website :"https://homegroundcoffeeroasters.com/",
  category :"Food & Drinks",
  type: "Physical Store"}, 0);
  expect(fetchFavouritesMock).toHaveBeenCalledTimes(1);
});

test('re-running favourite button test 2 after prev page click', () => {
  const { getByTestId } = render(<SearchBarMock insert={insertMock} fetchFavourites={fetchFavouritesMock} />);
  const nextPageButton = getByTestId('next-page-button');
  const prevPageButton = getByTestId('previous-page-button');
  fireEvent.click(nextPageButton);
  fireEvent.click(prevPageButton);
  const favouriteButton = getByTestId('favourite-button-2');
  fireEvent.click(favouriteButton);
  expect(insertMock).toHaveBeenCalledTimes(1);
  expect(insertMock).toHaveBeenCalledWith({
  id :3,
  name: "Nothing But Cheese Burger",
  postalcode: "S428802",
  address: "112 East Coast Road, #01-17, Katong I12",
  website: "https://nbcb.com.sg/",
  category: "Food & Drinks",
  type: "Physical Store"}, 2);
  expect(fetchFavouritesMock).toHaveBeenCalledTimes(1);
});

test('re-running favourite button test 3 after prev page click', () => {
  const { getByTestId } = render(<SearchBarMock insert={insertMock} fetchFavourites={fetchFavouritesMock} />);
  const nextPageButton = getByTestId('next-page-button');
  const prevPageButton = getByTestId('previous-page-button');
  fireEvent.click(nextPageButton);
  fireEvent.click(prevPageButton);
  const favouriteButton = getByTestId('favourite-button-4');
  fireEvent.click(favouriteButton);
  expect(insertMock).toHaveBeenCalledTimes(1);
  expect(insertMock).toHaveBeenCalledWith({
    id: 5,
    name: "The Masses",
    postalcode: "S189694",
    address: "85 Beach Road, #01-02",
    website: "https://www.facebook.com/themassessg/",
    category: "Food & Drinks",
    type: "Physical Store"}, 4);
    expect(fetchFavouritesMock).toHaveBeenCalledTimes(1);
});

test('favourite button works with consecutive page changes', () => {
  const { getByTestId } = render(<SearchBarMock insert={insertMock} fetchFavourites={fetchFavouritesMock} />);
  const favouriteButton = getByTestId('favourite-button-0');
  const nextPageButton = getByTestId('next-page-button');
  const prevPageButton = getByTestId('previous-page-button');
  fireEvent.click(prevPageButton); // testing pagination when clicking prev page button on first page
  fireEvent.click(favouriteButton);
  expect(insertMock).toHaveBeenCalledWith({
  id: 1,
  name: "Homeground Coffee Roasters",
  postalcode :"S088328",
  address :"15 Teo Hong Road",
  website :"https://homegroundcoffeeroasters.com/",
  category :"Food & Drinks",
  type: "Physical Store"}, 0);
  fireEvent.click(nextPageButton);
  fireEvent.click(nextPageButton);
  fireEvent.click(nextPageButton); // testing pagination when clicking next page button on last page
  fireEvent.click(prevPageButton);
  const favouriteButton2 = getByTestId('favourite-button-0');
  fireEvent.click(favouriteButton2);
  expect(insertMock).toHaveBeenCalledWith({
    id :6,
    name :"Ah Hua Teochew Fishball Noodles",
    postalcode :"S600415",
    address :"415 Pandan Gardens, #01-117",
    website :"https://www.facebook.com/ahhuateochewfishballnoodle/",
    category :"Food & Drinks",
    type :"Physical Store"}, 0);
  fireEvent.click(prevPageButton);
  const favouriteButton3 = getByTestId('favourite-button-1');
  fireEvent.click(favouriteButton3);
  expect(insertMock).toHaveBeenCalledWith({
    id :2,
    name :"Nothing But Cheese Burger",
    postalcode :"S238896",
    address :"181 Orchard Rd, #04-23, Orchard Central",
    website :"https://nbcb.com.sg/",
    category :"Food & Drinks",
    type :"Physical Store"}, 1);
  expect(insertMock).toHaveBeenCalledTimes(3);
  expect(fetchFavouritesMock).toHaveBeenCalledTimes(3);
});

// tests for pagination

// test('mock data mapped into table in correct order with pagination', () => {
//   const { getAllByTestId, getByTestId } = render(<SearchBarMock/>);
//   const nextPageButton = getByTestId('next-page-button');
//   const prevPageButton = getByTestId('previous-page-button');
//   fireEvent.click(nextPageButton);
//   const nameRows = getAllByTestId('name-row-number',
//   {
//     exact: false,
//   });
//   expect(nameRows.length).toBe(5);
//   expect(nameRows[0].textContent).toBe("Ah Hua Teochew Fishball Noodles");
//   expect(nameRows[1].textContent).toBe("Coffee Break");
//   expect(nameRows[2].textContent).toBe("Wow Wow West");
//   expect(nameRows[3].textContent).toBe("Shashlik Restaurant");
//   expect(nameRows[4].textContent).toBe("Butternut");
//   fireEvent.click(prevPageButton);
//   const nameRows2 = getAllByTestId('name-row-number',
//   {
//     exact: false,
//   });
//   expect(nameRows2.length).toBe(5);
//   expect(nameRows2[0].textContent).toBe("Homeground Coffee Roasters");
//   expect(nameRows2[1].textContent).toBe("Nothing But Cheese Burger");
//   expect(nameRows2[2].textContent).toBe("Nothing But Cheese Burger");
//   expect(nameRows2[3].textContent).toBe("Candlenut");
//   expect(nameRows2[4].textContent).toBe("The Masses");
// });

// test('next page button working', () => {
//   const { getByTestId } = render(<SearchBarMock/>);
//   const nextPageButton = getByTestId('next-page-button'); // start testing from page 0
//   const firstRow0 = getByTestId('name-row-number-0');
//   expect(firstRow0.textContent).toBe("Homeground Coffee Roasters");
//   fireEvent.click(nextPageButton);
//   const firstRow1 = getByTestId('name-row-number-0');
//   expect(firstRow1.textContent).toBe("Ah Hua Teochew Fishball Noodles");
//   fireEvent.click(nextPageButton);
//   const firstRow2 = getByTestId('name-row-number-0');
//   expect(firstRow2.textContent).toBe("White House Teochew Porridge");
// });

// test('clicking next page button should stay on last page when clicked on last page', () => {
//   const { getByTestId } = render(<SearchBarMock/>);
//   const prevPageButton = getByTestId('previous-page-button');
//   const nextPageButton = getByTestId('next-page-button');
//   fireEvent.click(nextPageButton);
//   fireEvent.click(nextPageButton); // start testing from page 2 
//   const firstRow0 = getByTestId('name-row-number-0');
//   expect(firstRow0.textContent).toBe("White House Teochew Porridge");
//   fireEvent.click(prevPageButton);
//   const firstRow1 = getByTestId('name-row-number-0');
//   expect(firstRow1.textContent).toBe("Ah Hua Teochew Fishball Noodles");
//   fireEvent.click(prevPageButton);
//   const firstRow2 = getByTestId('name-row-number-0');
//   expect(firstRow2.textContent).toBe("Homeground Coffee Roasters");
// });

// test('clicking previous page button should stay on first page when clicked on first page', () => {
//   const { getByTestId } = render(<SearchBarMock/>);
//   const prevPageButton = getByTestId('previous-page-button');
//   const firstRow0 = getByTestId('name-row-number-0');
//   expect(firstRow0.textContent).toBe("Homeground Coffee Roasters");
//   fireEvent.click(prevPageButton);
//   const firstRow1 = getByTestId('name-row-number-0');
//   expect(firstRow1.textContent).toBe("Homeground Coffee Roasters"); // should still remain on page 0
// });

// test('next page button working on last page', () => {
//   const { getByTestId } = render(<SearchBarMock/>);
//   const nextPageButton = getByTestId('next-page-button');
//   fireEvent.click(nextPageButton);
//   fireEvent.click(nextPageButton); // navigating to page 2
//   const firstRow0 = getByTestId('name-row-number-0');
//   expect(firstRow0.textContent).toBe("White House Teochew Porridge");
//   fireEvent.click(nextPageButton);
//   const firstRow1 = getByTestId('name-row-number-0');
//   expect(firstRow1.textContent).toBe("White House Teochew Porridge"); // should still remain on page 2
// });

// tests for rendering table

// test('mock data mapped into table in correct order', () => {
//   const { getAllByTestId } = render(<SearchBarMock/>);
//   const nameRows = getAllByTestId('name-row-number',
//   {
//     exact: false,
//   });
//   expect(nameRows.length).toBe(5);
//   expect(nameRows[0].textContent).toBe("Homeground Coffee Roasters");
//   expect(nameRows[1].textContent).toBe("Nothing But Cheese Burger");
//   expect(nameRows[2].textContent).toBe("Nothing But Cheese Burger");
//   expect(nameRows[3].textContent).toBe("Candlenut");
//   expect(nameRows[4].textContent).toBe("The Masses");
// });

// tests for favourite button

// test('adds item to favourites on button click 1', () => {
//   const { getByTestId } = render(<SearchBarMock insert={insertMock} fetchFavourites={fetchFavouritesMock} />);
//   const favouriteButton = getByTestId('favourite-button-0');
//   fireEvent.click(favouriteButton);
//   expect(insertMock).toHaveBeenCalledTimes(1);
//   expect(insertMock).toHaveBeenCalledWith({
//   id: 1,
//   name: "Homeground Coffee Roasters",
//   postalcode :"S088328",
//   address :"15 Teo Hong Road",
//   website :"https://homegroundcoffeeroasters.com/",
//   category :"Food & Drinks",
//   type: "Physical Store"}, 0);
//   expect(fetchFavouritesMock).toHaveBeenCalledTimes(1);
// });

// test('adds item to favourites on button click 2', () => {
//   const { getByTestId } = render(<SearchBarMock insert={insertMock} fetchFavourites={fetchFavouritesMock} />);
//   const favouriteButton = getByTestId('favourite-button-2');
//   fireEvent.click(favouriteButton);
//   expect(insertMock).toHaveBeenCalledTimes(1);
//   expect(insertMock).toHaveBeenCalledWith({
//   id :3,
//   name: "Nothing But Cheese Burger",
//   postalcode: "S428802",
//   address: "112 East Coast Road, #01-17, Katong I12",
//   website: "https://nbcb.com.sg/",
//   category: "Food & Drinks",
//   type: "Physical Store"}, 2);
//   expect(fetchFavouritesMock).toHaveBeenCalledTimes(1);
// });

// test('adds item to favourites on button click 3', () => {
//   const { getByTestId } = render(<SearchBarMock insert={insertMock} fetchFavourites={fetchFavouritesMock} />);
//   const favouriteButton = getByTestId('favourite-button-4');
//   fireEvent.click(favouriteButton);
//   expect(insertMock).toHaveBeenCalledTimes(1);
//   expect(insertMock).toHaveBeenCalledWith({
//     id: 5,
//     name: "The Masses",
//     postalcode: "S189694",
//     address: "85 Beach Road, #01-02",
//     website: "https://www.facebook.com/themassessg/",
//     category: "Food & Drinks",
//     type: "Physical Store"}, 4);
//     expect(fetchFavouritesMock).toHaveBeenCalledTimes(1);
// });



// tests for fetch call, working but inconsistent because the database goes to sleep

// test('test database call 1', async () => {
//   const res = await fetch('https://testbackend-o05b.onrender.com/businesses');
//   const result = await res.json();
//   expect(result[0].name).toBe('Homeground Coffee Roasters');
// });

// test('test database call 2', async () => {
//   const res = await fetch('https://testbackend-o05b.onrender.com/businesses');
//   const result = await res.json();
//   expect(result[45].name).toBe('Minimakers');
// });

// test('test database call 3', async () => {
//   const res = await fetch('https://testbackend-o05b.onrender.com/businesses');
//   const result = await res.json();
//   expect(result[46]).toBeUndefined();
// });