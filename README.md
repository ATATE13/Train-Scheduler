# Train-Scheduler
A train schedule application that incorporates Firebase to host arrival and departure data.

This project is a train schedule application that incorporates Firebase to host arrival and departure data. The app includes a form where users can enter information about a train, such as name, destination, first train time, and frequency. After a user submits the form, the app retrieves and manipulates this information with Moment.js to calculate the estimated next train time and number of minutes away. Moment.js is also used to display the times in a user friendly format (that is, hh:mm). When a user submits the information for a train, the train informaton is added to the Current schedule table to provide up-to-date information about various trains, such as their arrival times and how many minutes remain until they arrive at their stations. Not only is the train information added to the table, but the data is also pushed to a database that is hosted on Firebase. 

