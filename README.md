# Setup Dependencies
    <!-- - Install tailwind -->
    <!-- - Install neodrag -->
    <!-- - Install react-router -->
    <!-- - Install react-feather -->

# Layout
    <!-- - Create the left sidebar that has the two links -->
    <!-- - Create the two routes that are linked in the sidebar -->
    <!-- - Design the CanvasControl component with all the elements -->
    - Design the document canvas which is just a blank div

# CanvasContext
    - Create a context that stores the n of elements in the document 
    - The context should keep track of every component's coords and dimensions
    - The context should link with localStorage

# Text
    - Create a text field component with just hard coded text that can be dragged around in the document
    - Make the text field something that can be interacted with using inputs
    - Implement the same logic but with the dimensions of the component
    - User should be able to click and create this component as many times as they want all over the document  
    - Retain the component and its state in the document on refresh

# Image
    - Create and image component takes in an image as user input
    - Show the uploaded image in the document
    - Store this image in localstorage
    - Retain the image component and its state in the document on refresh
    - User should be able to click and create this component as many times as they want all over the document  

# Canvas
    - Display the coords of the seleted component in CanvasControl
    - User should be able to edit the coords directly from CanvasControl
    - User should be able to edit the dimensions directly from CanvasControl
    - User should be able to delete any component on delete keypress 
    - User should be able to zoom in and out anywhere in the document
    - Show the name of the document in the navbar
    - Show the coords of the selected component in the right sidebar
    - Retain the state of the canvas on refresh
    - Hide the sidebar and canvas control on preview click
    - Print the document when user clicks download
    - Clear everything when user presses the clear button
    - Add a confirmation for clearing
