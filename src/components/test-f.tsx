// import React from "react";
// import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import ScreenshotCarousel from "./ScreenshotCarousel";

// // Mock images data
// const mockImages = [
//   "https://example.com/image1.jpg",
//   "https://example.com/image2.jpg",
//   "https://example.com/image3.jpg",
// ];

// describe("ScreenshotCarousel Component", () => {
//   test("renders the heading 'Скриншоты из фильма'", () => {
//     render(<ScreenshotCarousel images={mockImages} />);

//     // Check if the heading is present
//     const heading = screen.getByRole("heading", { name: /Скриншоты из фильма/i });
//     expect(heading).toBeInTheDocument();
//   });

//   test("renders images with correct alt text", () => {
//     render(<ScreenshotCarousel images={mockImages} />);

//     // Check if each image has the correct alt text
//     mockImages.forEach((_, index) => {
//       const img = screen.getByAltText(`Screenshot ${index + 1}`);
//       expect(img).toBeInTheDocument();
//     });
//   });
// });
