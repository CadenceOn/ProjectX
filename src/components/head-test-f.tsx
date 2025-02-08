// import React from "react";
// import { render, screen } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";
// import { Context } from "../store/context";
// import { Store } from "../store/store"; 
// import Header from "./Header";
// import "@testing-library/jest-dom";
// import { jest } from "@jest/globals"; 
// //import jest from "jest-mock";

// const mockedNav = jest.fn()

// jest.mock("react-router-dom", () => ({
//     useNavigate: mockedNav, 
//     useLocation: () => ({ pathname: "/project_x" }),
//   }));
  

// test("Отображает заголовок и логотип", () => {

//   const mockStore = new Store(); // 

//   render(
//     <Header onSearch={jest.fn()} />
//   );

//   expect(screen.getByText("Kinopoisk Clone")).toBeInTheDocument();
//   expect(screen.getByAltText("Logo")).toBeInTheDocument();
// });