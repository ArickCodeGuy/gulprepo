# gulprepo
That's my custom gulp repository that builds projects.
## Usage
in cmd:
 - `gulp` to compile and run local server
 - `gulp build` to compile everything
### Scss
every .scss file get's compiled and concatinated in dist/css/style.csss file in order:
 - src/css/default-style.scss
 - src/components/**
 - src/css/additional-styles.scss

### Js
Every js file in src/** dir get's concatinated in dist/js/main.js (except src/libs/**)

### Img
every img (.jpg, .png, .svg) put in src/img/** dir gets optimized and put in dist/img/** dir

### Html
To include some html code or inline .svg use `@@include('components/my-component/index.html')`
