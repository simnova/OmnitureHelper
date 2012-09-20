define(['jquery', 'underscore', 'order!omniture'], function ($, _) {
  /**
  * OmnitureHelper - a microlibrary for omniture tagging.
  *
  * @class OmnitureHelper
  * @constructor
  * @param events {object} ID / String Key array of all events that will be used.
  * @param commerceVariables {object} ID / String Key array of all commerce variables that will be used.
  * @param insightVariables {object} ID / String Key array of all insight variables that will be used.
  */
  function OmnitureHelper(events, commerceVariables, insightVariables) {
    window.s = window.s || {};
    s = window.s; //alias to local variable name;

    _events = events;
    _commerceVariables = commerceVariables;
    _insightVariables = insightVariables;
  };

  var _commerceVariables, // eVar
    _insightVariables, //sProp
    _events, //sProp
    s;

  var reservedEventNames = [
    "prodView", // productViews
    "scOpen", // Open / Initialize a new shopping cart
    "scAdd", // Add item(s) to the shopping cart
    "scRemove", // Remove item(s) from the shopping cart
    "scView", // View shopping cart
    "scCheckout", // Beginning of the checkout process
    "purchase", // Completion of a purchase (order)
  ];


  var reservedSpropNames = [
    "campaign",
    "state",
    "zip",
    "events",
    ""
    ];



  // Private Methods
  function findCommerceVariableId(variableName) {
    return _.find(_commerceVariables, function (variable) { return variable.name === variableName; }).id
  }

  function findInsightVariableId(variableName) {
    return _.find(_insightVariables, function (variable) { return variable.name === variableName; }).id
  }

  function findEventId(eventName) {
    return _.find(_events, function (event) { return event.name === eventName; }).id
  }

  // Public Methods
  OmnitureHelper.prototype = {

    /**
    * Clears Variables, Page Name and Events. Useful to be used before setting values in a method
    *
    * @method clearVariablesAndEvents
    */
    clearVariablesAndEvents: function () {
      this.setPageName("");
      this.clearCommerceVariables();
      this.clearInsightVariables();
      this.clearEvents();
    },

    /**
    * Clears Every Commerce Variable.
    *
    * @method clearCommerceVariables
    */
    clearCommerceVariables: function () {
      for (var i = 1; i < 100; i++) {
        var value = s["eVar" + i];
        if (value !== undefined) {
          s["eVar" + i] = "";
        }
      }
    },

    /**
    * Lists Every Commerce Variable with a Value.
    *
    * @method commerceVariablesWithValues
    */
    commerceVariablesWithValues: function () {
      var commerceVariableList = [];
      for (var i = 1; i < 100; i++) {
        var value = s["eVar" + i];
        // using jquery trim since older browsers don't have trim built in (ie8 etc)
        if (value !== undefined && $.trim(value) !== "") {
          commerceVariableList.push("eVar" + i);
        }
      }
      return commerceVariableList;
    },

    /**
    * Clears Every Insight Variable
    *
    * @method clearInsightVariables
    */
    clearInsightVariables: function () {
      for (var i = 1; i < 100; i++) {
        var value = s["prop" + i];
        if (value !== undefined) {
          s["prop" + i] = "";
        }
      }
    },

    /**
    * Lists Every Insight Variable with a Value.
    *
    * @method insightVariablesWithValues
    */
    insightVariablesWithValues: function () {
      var commerceVariableList = [];
      for (var i = 1; i < 100; i++) {
        var value = s["prop" + i];
        // using jquery trim since older browsers don't have trim built in (ie8 etc)
        if (value !== undefined && $.trim(value) !== "") {
          commerceVariableList.push("prop" + i);
        }
      }
      return commerceVariableList;
    },

    /**
    * Set Page Name
    *
    * @method setPageName
    * @param pageName {string} The Name of the Page.
    */
    setPageName: function (pageName) {
      s["pageName"] = pageName; //max 100 bytes
    },

    /**
    * Set Page Url
    *
    * @method setPageUrl
    * @param url {string} The Url To Set.
    */
    setPageUrl: function (url) {
      s["pageURL"] = url;
    },

    /**
    * Set Channel
    *
    * @method setChannel
    * @param channelName {string} The Channel Name.
    */
    setChannel: function (channelName) {
      s["channel"] = channelName;
    },

    /**
    * Used only to designate a 404 Page Not Found Error Page.
    *
    * @method setErrorPage
    */
    setErrorPage: function () {
      s["pageType"] = "errorPage";
    },

    /**
    * Fire Event (s.events) adds another event to the list of events.
    *
    * @method fireEvent
    * @param eventName {string} The key of the event to be added
    */
    fireEvent: function (eventName) {
      var eventId = findEventId(eventName);
      if (s.events) { s.events += ",event" + eventId; } else { s.events = "event" + eventId; }
    },

    /**
    * Clear Events (s.events) removes all events.
    *
    * @method fireEvent
    */
    clearEvents: function () {
      s.events = "";
    },

    /**
    * Increment Commerce Variable (s.eVar)
    *
    * @method incrementCommerceCounterValue
    * @param variableName {string} The key associated with the eVar number that is to be incremented.
    */
    incrementCommerceCounterValue: function (eVarName) {
      var eVarId = findCommerceVariableId(eVarName);
      s["eVar" + eVarId] = +1;
    },

    /**
    * Set Commerce Variable (s.eVar)
    *
    * @method setCommerceVariable
    * @param variableName {string} The key associated with the eVar number that is to be set.
    * @param value {string} The value that is to be recorded.
    */
    setCommerceVariable: function (variableName, value) {
      var variableId = findCommerceVariableId(variableName);
      s["eVar" + variableId] = value;
    },

    /**
    * Set Insight Variable (s.prop)
    *
    * @method setInsightVariable
    * @param variableName {string} The key associated with the prop number that is to be set.
    * @param value {string} The value that is to be recorded.
    */
    setInsightVariable: function (variableName, value) {
      var variableId = findInsightVariableId(variableName);
      s["prop" + variableId] = value;
    },

    /**
    * used to track evars / props with associated page info.
    *
    * @method trackVirtualPageView
    */
    trackVirtualPageView: function () {
      fn = s["t"];
      fn.call(window.s);
    },

    /**
    * used to track evars / props WITHOUT associated page info.
    *
    * @method saveValues
    */
    saveValues: function (thisvar) {
      fn = s["tl"];
      var linkType = 'o'; // Custom Link
      var linkName = 'action';
      var variableOverrides = null;
      var doneAction = null; // we're not using

      //note all events and variables that have values
      var activeCommerceVariables = this.commerceVariablesWithValues(); // evars
      var activeInsightVariables = this.insightVariablesWithValues(); // props
      var activeEvents = s.events.split(","); // events

      var linkTrackEventArray = s.linkTrackEvents.split(",");
      var linkTrackVarArray = s.linkTrackVars.split(",");

      // force omniture to save values we have set.
      // See #2 in link below:
      // http://blogs.adobe.com/digitalmarketing/analytics/top-five-javascript-implementation-gotchas/ 
      s.linkTrackEvents = _.union(linkTrackEventArray, activeEvents).join();
      s.linkTrackVars = _.union(linkTrackVarArray, activeCommerceVariables, activeInsightVariables, ["events"]).join();

      //fn.call(window.s, thisvar, linkType, linkName, variableOverrides);
      fn.call(window.s, thisvar, linkType, linkName);
    },

    /**
    * used to track exit link.
    *
    * @method saveValues
    * @param {thisvar} foo Argument 1
    * @param {linkName} the url or some other decription of where the user is going..
    */
    saveExitLink: function (thisvar, linkName) {
      fn = s["tl"];
      var linkType = 'e'; // Exit Link
      var variableOverrides = null;
      var doneAction = null; // we're not using
      fn.call(window.s, thisvar, linkType, linkName, variableOverrides);
    }

  };

  return (OmnitureHelper);
});