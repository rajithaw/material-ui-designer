<div align="center">
  <img src="https://raw.githubusercontent.com/rajithaw/blob/master/material-ui-designer-wiki/mui-designer-logo.png" />
</div>

# User interface designer form Material UI
Material UI Designer is a tool that designers and developers can use to quickly put together user interfaces using Material UI components. The design can be previewed any time and once completed the code for the designed pages can be exported as a ready to run react project.

![designer](https://raw.githubusercontent.com/rajithaw/blob/master/material-ui-designer-wiki/hello-world-designer.png)

## Setup
Clone the repository and run the npm commands.
```
git clone https://github.com/rajithaw/material-ui-designer.git
npm install
npm build
npm start
```

## Live Demo
A live demo can be found [here](https://material-ui-designer.herokuapp.com)

## Quick Start
### Create Page
Material UI Designer pages are created under a project. To create page, first open the projects dialog by clicking on the Project List menu item in the main menu. Create a new project or open an existing project. Current project name will be displayed in the AppBar. Click Select Page on the AppBar to bring up the pages dialog. Create a new page by clicking the Add button in the pages dialog. Once the page is created select the page from the page list and click OK. Now you can start adding components to the page.

![create page](https://raw.githubusercontent.com/rajithaw/blob/master/material-ui-designer-wiki/create-page.gif)

### Open Page
Open the projects dialog by clicking Project List from the main menu. Select the project you want and click OK. Click Select Page on the AppBar to bring up the pages dialog. Select the page to open and click OK. The selected page will load in the designer. Now you can start modifying the page and click on the Preview icon to preview the page.

![open page](https://raw.githubusercontent.com/rajithaw/blob/master/material-ui-designer-wiki/open-page.gif)

### Export Project
Current project can be exported by clicking on Export Project in the main menu. Code will be generated for all the pages in the project and downloaded as a zip file. Extract the zip file and run the following commands to see the generated code in action.
```
npm install
npm start
```
![export project](https://raw.githubusercontent.com/rajithaw/blob/master/material-ui-designer-wiki/export-project.gif)

## Browser Compatibility
Currently only Chrome is supported.

## License
The files included in this repository are licensed under the [MIT License](https://github.com/rajithaw/material-ui-designer/blob/master/LICENSE)
