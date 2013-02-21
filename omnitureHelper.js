// omnitureHelper.js
// version : 0.0.1
// author : Patrick Gidich
// license : MIT
// https://github.com/simnova/OmnitureHelper

/*jslint indent:2, nomen: true, browser:true, plusplus:true, todo:true */
(function ($, _) {
  "use strict";

  var s, //alias to local variable name
    _events,
    _commerceVariables, //eVar
    _insightVariables, //sProp
    reservedEventNames = [ //TODO:check for the usage of these
      "prodView", // productViews
      "scOpen", // Open / Initialize a new shopping cart
      "scAdd", // Add item(s) to the shopping cart
      "scRemove", // Remove item(s) from the shopping cart
      "scView", // View shopping cart
      "scCheckout", // Beginning of the checkout process
      "purchase" // Completion of a purchase (order)
    ],
    reservedSpropNames = [ //TODO:check for the usage of these
      "campaign",
      "state",
      "zip",
      "events",
      ""
    ];

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
    _events = events;
    _commerceVariables = commerceVariables; //eVar
    _insightVariables = insightVariables; //sProp
    window.s = window.s || {};
    s = window.s;
    _ = window._ || {};
    $ = window.$ || {};
  }

  // Private Methods
  function findCommerceVariableId(commerceVariableName) {
    var id;
    try {
      id = _.find(_commerceVariables, function (variable) { return variable.name === commerceVariableName; }).id;
    } catch (e) {
      throw {
        name: "Invalid Argument Exception",
        message: "Parameter: 'commerceVariableName' with value :'" + commerceVariableName + "' not found in commerce variable array"
      };
    }
    return id;
  }

  function findInsightVariableId(insightVariableName) {
    var id;
    try {
      id = _.find(_insightVariables, function (variable) { return variable.name === insightVariableName; }).id;
    } catch (e) {
      throw {
        name: "Invalid Argument Exception",
        message: "Parameter: 'insightVariableName' with value :'" + insightVariableName + "' not found in insight variable array"
      };
    }
    return id;
  }

  function findEventId(eventName) {
    var id;
    try {
      id = _.find(_events, function (eventElement) { return eventElement.name === eventName; }).id;
    } catch (e) {
      throw {
        name: "Invalid Argument Exception",
        message: "Parameter: 'eventName' with value :'" + eventName + "' not found in event array"
      };
    }
    return id;
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
      var value,
        i;
      for (i = 1; i < 100; i++) {
        value = s["eVar" + i];
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
      var commerceVariableList = [],
        i,
        value;
      for (i = 1; i < 100; i++) {
        value = s["eVar" + i];
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
      var value,
        i;
      for (i = 1; i < 100; i++) {
        value = s["prop" + i];
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
      var commerceVariableList = [],
        i,
        value;
      for (i = 1; i < 100; i++) {
        value = s["prop" + i];
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
      s.pageName = pageName; //max 100 bytes
    },

    /**
    * Set Page Url
    *
    * @method setPageUrl
    * @param url {string} The Url To Set.
    */
    setPageUrl: function (url) {
      s.pageURL = url;
    },

    /**
    * Set Channel
    *
    * @method setChannel
    * @param channelName {string} The Channel Name.
    */
    setChannel: function (channelName) {
      s.channel = channelName;
    },

    /**
    * Used only to designate a 404 Page Not Found Error Page.
    *
    * @method setErrorPage
    */
    setErrorPage: function () {
      s.pageType = "errorPage";
    },

    /**
    * Fire Event (s.events) adds another event to the list of events.
    *
    * @method fireEvent
    * @param eventName {string} The key of the event to be added
    */
    fireEvent: function (eventName) {
      //s.events = _;
      //return;
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
      s["eVar" + eVarId] = isNaN(s["eVar" + eVarId]) ? 1 : s["eVar" + eVarId] + 1;
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
      var fn = s.t;
      fn.call(window.s);
    },

    /**
    * used to track evars / props WITHOUT associated page info.
    *
    * @method saveValues
    */
    saveValues: function (thisvar) {
      //make sure we handle null values
      s.linkTrackEvents = s.linkTrackEvents || "";
      s.linkTrackVars = s.linkTrackVars || "";
      s.events = s.events || "";

      var fn = s.tl,
        linkType = 'o', // Custom Link
        linkName = 'action',
        variableOverrides = null,
        doneAction = null, // we're not using
        //note all events and variables that have values
        activeCommerceVariables = this.commerceVariablesWithValues(), // evars
        activeInsightVariables = this.insightVariablesWithValues(), // props
        activeEvents = s.events.split(","), // events
        linkTrackEventArray = s.linkTrackEvents.split(","),
        linkTrackVarArray = s.linkTrackVars.split(",");

      // force omniture to save values we have set.
      // See #2 in link below:
      // http://blogs.adobe.com/digitalmarketing/analytics/top-five-javascript-implementation-gotchas/ 
      s.linkTrackEvents = _.chain(_.union(linkTrackEventArray, activeEvents)).uniq().without("").value().join();
      s.linkTrackVars = _.chain(_.union(linkTrackVarArray, activeCommerceVariables, activeInsightVariables, ["events"])).without("").value().join();

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
      var fn = s.tl,
        linkType = 'e', // Exit Link
        variableOverrides = null,
        doneAction = null; // we're not using
      fn.call(window.s, thisvar, linkType, linkName, variableOverrides);
    }

  };


    // AMD / RequireJS
  if (window !== undefined
      && window.define !== undefined
      && window.define.amd !== undefined) {
    window.define(['jquery', 'lodash', 'omniture'], function ($, _) {
      return OmnitureHelper;
    });
  } else { // included directly via <script> tag
    window.OmnitureHelper = OmnitureHelper;
  }

}());