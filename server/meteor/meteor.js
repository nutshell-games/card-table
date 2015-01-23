if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  // Template.hello.helpers({
  //   counter: function () {
  //     return Session.get("counter");
  //   }
  // });

  // Template.hello.events({
  //   'click button': function () {
  //     // increment the counter when button is clicked
  //     Session.set("counter", Session.get("counter") + 1);
  //   }
  // });
}

if (Meteor.isServer) {

  Meteor.methods({
    createNode: function(attributes){

      Nodes.insert(attributes);

    }
  });

  Nodes = new Mongo.Collection('nodes');

  Meteor.startup(function () {
    // code to run on server at startup
    Accounts.loginServiceConfiguration.remove({
      service: "facebook"
  });

  Accounts.loginServiceConfiguration.insert({
     service: "facebook",
     appId: 419197358235978,
     secret: "eceeba0ef5addb8e880a1a1ac2aee956"
  });

  Accounts.loginServiceConfiguration.remove({
      service: "google"
  });

  Accounts.loginServiceConfiguration.insert({
      "service": "google",
      "clientId" : "39034933982-ojub3kjkutek35nbeffl9lkcpajpg3d8.apps.googleusercontent.com",
      "secret" : "ruaEjy2FA2bsd48b-Mvqw-qL"
  });

  Accounts.onCreateUser(function(options, user) {

    console.log('onCreateUser', options, user);

    return user;
  });

  Accounts.validateLoginAttempt(function( request ){

    console.log('validateLoginAttempt',request);

    return true;
  });

  Accounts.onLogin(function( request ){

    console.log('onLogin',request);
  });

});



}
