This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

I took two attempts at the gist becuase the first time I did it, I took the contracts and deployed them locally and I think I miss read the guidelines.
You can see my first attempt in the other branch on this github.

For the main attempt i used react and web3 to query the events from the contracts that were linked and created a UI that holds the information in a table.
I was able to implement most of the requirements and i used hooks like useEffect and useState.

you'll notice that only one response is displayed in the table as i ran into an issue when trying to render all of the objects in the table.
You can see that in the Posts.jsx page if you change the return() to render() within the if statements, and uncomment the return() with fragments at the bottom you will see that all the objects are listed and displyed to the screen.

The Pagination would work if i was able to display all the information in the table which is the part that i had issues with.

Thanks so much for the opportuinty and i really look forward to you feedback.



## To run the project 

In the project directory, you can run:
npm install 
then :
### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


