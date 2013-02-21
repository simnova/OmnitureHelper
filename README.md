OmnitureHelper
=====================

[![Build Status](https://travis-ci.org/simnova/OmnitureHelper.png?branch=master)](https://travis-ci.org/simnova/OmnitureHelper)


v0.0.2

#Installation
  `npm install omniture-helper`

#Test
  `npm test`

#Licence(MIT)

Copyright (C) 2013 Patrick Gidich


A micro library to aid with Omniture custom link tracking in javascript applications.

----------------------------------------

### Example 

Containter Class

```javascript
define(['jquery', 'underscore', 'omnitureHelper'], function ($, _, OmnitureHelper) {
  /**
  * MyOmnitureHelper - helper functionality for omniture tagging for a sample project.
  *
  * @class MyOmnitureHelper
  * @constructor
  */

  var oh;

  // Constructor
  function MyOmnitureHelper() {

    /// shows up as "events" in debugger
    var events = [
      { id: 1, name: "pagesViews" },
      { id: 2, name: "pageClick" },
      { id: 3, name: "internalSearch" },
      { id: 4, name: "itemClick" },
      { id: 6, name: "itemInteraction" },
      { id: 7, name: "enterExperience" }
      ];

    /// 1-100 eVars (v# in debugger)
    var commerceVariables = [
        { id: 1, name: "pagesViews" },
        { id: 2, name: "itemName" },
        { id: 3, name: "internalSearch" },
        { id: 6, name: "aliasId" },
        { id: 7, name: "emailId" },
        { id: 8, name: "mailId" },
      ];

    /// 1-100 sProp (c# in debugger)
    var insightVariables = [
        { id: 1, name: "aliasId" },
        { id: 4, name: "suiteId" },
        { id: 5, name: "linkName" },
        { id: 6, name: "visitor" },
        { id: 7, name: "emailId" },
        { id: 8, name: "mailId" },
      ];

    oh = new OmnitureHelper(events, commerceVariables, insightVariables);

  };

  MyOmnitureHelper.prototype = {

    /**
    * Track Item Click
    *
    * @method itemClick
    * @param item {string} The item that was viewed
    */
    itemClick: function (itemName) {
      oh.clearVariablesAndEvents();
      oh.fireEvent("itemClick");

      // track which item was viewed:
      oh.setCommerceVariable("itemName", itemName);
      oh.setPageName(itemName);

      oh.setChannel("bb module");
      oh.trackVirtualPageView();
    },

    /**
    * Track Interaction within each Item 
    *
    * @method itemInteraction
    * @param itemName {string} The item that was interacted with
    */
    itemInteraction: function (itemName) {
      oh.clearVariablesAndEvents();
      oh.fireEvent("itemInteraction");
      oh.setCommerceVariable("itemName", itemName);
      oh.saveValues(this);
    },

  };

  return (MyOmnitureHelper);
});
```

Logging of Item in Code

```javascript
    clickedItem: function () {
      var view = this;
      
      namespace.myOmnitureHelper.itemClick("login form show");
      return false;
    },
```

----------------------------------------


