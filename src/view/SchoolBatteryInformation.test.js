import { render, screen } from "@testing-library/react";
import SchoolBatteryInformation from "./SchoolBatteryInformation";
import { mockedData } from "../mocks/weeklyReport2019"
import userEvent from "@testing-library/user-event";


test("Mock file for file upload testing", () => {
  const file = mockedData;
  expect(file).not.toBeNull();
});

test("find 30021 academy", () => {
  render(<SchoolBatteryInformation props={mockedData} />);
  const findAcademy = screen.getByText('30021');
  expect(findAcademy).toBeTruthy();
});

test("find how many unknown consumption battries has 30015 academy", () => {
  render(<SchoolBatteryInformation props={mockedData} />);
  const tdDefRow = screen.getByText('30015');
  userEvent.click(tdDefRow);
  expect(screen.getAllByText('unknown').length).toBe(1);
});


test("how many KeyArrowIcon on the page", () => {
  render(<SchoolBatteryInformation props={mockedData} />);
  const KeyArrowIconAmount = screen.getAllByTestId("KeyboardArrowDownIcon").length;
  expect(KeyArrowIconAmount).toBe(6);
});
