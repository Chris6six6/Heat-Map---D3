# Heat Map Visualization Project

This project is a heat map visualization displaying global temperature data. It fulfills the requirements set forth by FreeCodeCamp's Data Visualization curriculum.

## Project Description

The heat map displays global temperature data over time, using a color gradient to represent temperature variations. It incorporates features such as a title, description, axes, legend, and tooltip for interactive exploration of the data.

## User Stories

1. The heat map should have a title with the corresponding id="title".
2. The heat map should have a description with the corresponding id="description".
3. The heat map should have an x-axis with the corresponding id="x-axis".
4. The heat map should have a y-axis with the corresponding id="y-axis".
5. The heat map should have rect elements with a class="cell" representing the data.
6. There should be at least 4 different fill colors used for the cells.
7. Each cell will have properties data-month, data-year, data-temp containing their corresponding month, year, and temperature values.
8. The data-month and data-year of each cell should be within the range of the data.
9. The heat map should have cells that align with the corresponding month on the y-axis.
10. The heat map should have cells that align with the corresponding year on the x-axis.
11. The heat map should have multiple tick labels on the y-axis with the full month name.
12. The heat map should have multiple tick labels on the x-axis with the years between 1754 and 2015.
13. The heat map should have a legend with a corresponding id="legend".
14. The legend should contain rect elements.
15. The rect elements in the legend should use at least 4 different fill colors.
16. Users can mouse over an area and see a tooltip with a corresponding id="tooltip" displaying more information about the area.
17. The tooltip should have a data-year property that corresponds to the data-year of the active area.

## Technologies Used

- HTML
- CSS
- JavaScript
- D3.js (Data-Driven Documents)

## Dataset

The dataset required for this project can be found [here](https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json).

## Project Structure

The project includes HTML, CSS, and JavaScript files. The HTML file contains the structure of the webpage, including DOM elements for the visualization. The CSS file styles the webpage elements for better presentation. The JavaScript file contains the logic to fetch the dataset, process the data, and create the heat map visualization using D3.js.

## Usage

To view the heat map visualization, simply open the HTML file in a web browser.

## Acknowledgments

- [FreeCodeCamp](https://www.freecodecamp.org/) for providing the project requirements and dataset.
- D3.js community for the powerful data visualization library.
- Developers contributing to open datasets for educational purposes.
