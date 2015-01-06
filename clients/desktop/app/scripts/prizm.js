// Connect to a Meteor backend
ceres = new Asteroid("localhost:3000");

// Use real-time collections
tasks = ceres.getCollection("tasks");
subscription = ceres.subscribe("tasks");



// Get the task
var laundryTaskRQ = tasks.reactiveQuery({});
// Log the array of results
console.log(laundryTaskRQ.result);
// Listen for changes
laundryTaskRQ.on("change", function () {
  console.log(laundryTaskRQ.result);
});

tasks.insert({
  description: "Do the laundry"
});