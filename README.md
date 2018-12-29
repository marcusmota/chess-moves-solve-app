# Chess Moves Solver APP

It`s the APP to use the [Backend built in Node.js](https://github.com/marcusmota/chess-moves-solver-api)

### Installing

Follow these steps to install the APP


```
git clone git@github.com:marcusmota/chess-moves-solver-app.git
```

And then, these following instructions to install the project dependencies

```
cd chess-moves-solver-app && npm install && npm run run:sass && npm start
```

If everthing works fine the APP will open in your browser and the terminal will output this

```
Compiled successfully!

You can now view front in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://192.168.0.34:3000/

Note that the development build is not optimized.
To create a production build, use npm run build
```

If you want to develop instead of type npm run run:sass, type npm run compile:sass it has the watch flag on npm script

## Running the tests

To run the tests just type npm run test

### Project Structure Explain

src/index.js

```
the application boostrap
```

src/App.js

```
the main application component
```


src/scss
```
it has the sass files
```

src/components
```
it has the components and its tests files
```

src/pieces
```
it has the pieces of chess images
```

src/repository
```
it has the repository files to write the API requests
```

src/params.json
```
it has the global variables like apiUrl, you want to change it, just change in the params.json file
```

## Contributing

Feel free to join us on the Frontend App or in [Backend built in Node.js](https://github.com/marcusmota/chess-moves-solver-api)

## Authors

* **Marcus Mota** -  [MarcusMota](https://github.com/marcusmota)


## License

This project is licensed under the MIT License
