## Documentation for the user 

This piece of software can be used to create, edit and upload simple documents, directly from the web.

The application consists of two modules:  

    * Compose
    * Upload

### Upload

Features:
    
    * Upload PDFs
    * Lists the uploaded documents
    * Stores copy of documents in localStorage
    * Intuitive UI here as well

### Compose 
You will be redirected to this module when you edit an uploaded document

Features:

    * Text and Image insertion on a document
    * Dragging the canvas elements anywhere within the canvas
    * Values and coordinates retention on refresh
    * Document printing/downloading as PDFs
    * Document preview
    * Zoom in and out anywhere in the canvas 
    * Coordinates display on any given element in the canvas
    * Intuitive UI

## Documentation for the developer 

### Third party packages:

    * Neodrag
    * Lodash
    * React-PDF
    * UUID
    * vue-tsc


##### But what arey they for?  

* ##### Neodrag
    To drag elements around in the canvas and keeping track of their coordinates  
* ##### Lodash
    To truncate and debounce different strings and functions respectively

* ##### React-dropzone
    To receive file input from the user

* ##### React-PDF
    To render PDFs in the canvas

* ##### UUID
    To generate unique identifiers for canvas elements and/or documents

* ##### Vue-tsc
    To check for typescript errors throughout the app

### Setup

Just

```
npm install
npm run dev
```
and you should be good to go


<!-- * Write some good documentation this time -->
<!---->
<!-- -- no drag and drop -->
<!-- -- file limit is 5MB -->
