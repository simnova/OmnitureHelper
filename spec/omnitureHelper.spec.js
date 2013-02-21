/*jslint indent:2, nomen: true, browser:true, plusplus:true, todo:true */
/*global beforeEach : false, describe : false, expect : false, spyOn: false, it : false, $ : false */
(function ($, _) {
  "use strict";

  describe("OmnitureHelper", function () {

    describe("A suite", function () {

      var omnitureHelper,
        s,
        sPageName,
        events,
        commerceVariables,
        insightVariables,
        testValue,
        expectedValue,
        testValue2,
        expectedValue2;

      beforeEach(function () {
        window.console.log("helloWorld");
        s = {
          pageName : null,
          pageURL : null,
          channel : null,
          pageType : null,
          events : null,
          t : function () {},
          tl : function () {}
        };
        window.s = s;
        events = null;
        commerceVariables = null;
        insightVariables = null;
        testValue = "testData";
        expectedValue = "testData";
        testValue2 = "testData2";
        expectedValue2 = "testData2";
        events = [
          { id: 1, name: "pagesViews" },
          { id: 2, name: "pageClick" },
          { id: 3, name: "internalSearch" },
          { id: 4, name: "itemClick" },
          { id: 6, name: "itemInteraction" },
          { id: 7, name: "enterExperience" }
        ];
        commerceVariables = [
          { id: 1, name: "pagesViews" },
          { id: 2, name: "itemName" },
          { id: 3, name: "internalSearch" },
          { id: 6, name: "aliasId" },
          { id: 7, name: "emailId" },
          { id: 8, name: "mailId" }
        ];
        insightVariables = [
          { id: 1, name: "aliasId" },
          { id: 4, name: "suiteId" },
          { id: 5, name: "linkName" },
          { id: 6, name: "visitor" },
          { id: 7, name: "emailId" },
          { id: 8, name: "mailId" }
        ];
      });

      it("Clear Variables and Events", function () {
        omnitureHelper = new window.OmnitureHelper(events, commerceVariables, insightVariables);
        omnitureHelper.setPageName(testValue);
        omnitureHelper.fireEvent("pagesViews");
        omnitureHelper.setCommerceVariable("itemName", testValue);
        omnitureHelper.setInsightVariable("suiteId", testValue);
        omnitureHelper.clearVariablesAndEvents();

        expect(s.pageName).toEqual("");
        expect(s.events).toEqual("");
        expect(s.eVar2).toEqual("");
        expect(s.prop4).toEqual("");
      });

      it("Setting Page Name", function () {
        omnitureHelper = new window.OmnitureHelper(events, commerceVariables, insightVariables);
        omnitureHelper.setPageName(testValue);
        expect(s.pageName).toEqual(expectedValue);
      });

      it("Setting Page URL", function () {
        omnitureHelper = new window.OmnitureHelper(events, commerceVariables, insightVariables);
        omnitureHelper.setPageUrl(testValue);
        expect(s.pageURL).toEqual(expectedValue);
      });

      it("Setting Channel", function () {
        omnitureHelper = new window.OmnitureHelper(events, commerceVariables, insightVariables);
        omnitureHelper.setChannel(testValue);
        expect(s.channel).toEqual(expectedValue);
      });

      it("Setting Error Page", function () {
        omnitureHelper = new window.OmnitureHelper(events, commerceVariables, insightVariables);
        omnitureHelper.setErrorPage();
        expect(s.pageType).toEqual("errorPage");
      });

      it("Setting Single Event", function () {
        omnitureHelper = new window.OmnitureHelper(events, commerceVariables, insightVariables);
        omnitureHelper.fireEvent("pagesViews");
        expect(s.events).toEqual("event1");
      });

      it("Setting Multiple Events", function () {
        omnitureHelper = new window.OmnitureHelper(events, commerceVariables, insightVariables);
        omnitureHelper.fireEvent("pageClick");
        omnitureHelper.fireEvent("internalSearch");
        expect(s.events).toEqual("event2,event3");
      });

      it("Clearing Events", function () {
        omnitureHelper = new window.OmnitureHelper(events, commerceVariables, insightVariables);
        omnitureHelper.fireEvent("pageClick");
        omnitureHelper.fireEvent("internalSearch");
        omnitureHelper.clearEvents();
        expect(s.events).toEqual("");
      });

      it("Incrementing Commerce Counter Value", function () {
        omnitureHelper = new window.OmnitureHelper(events, commerceVariables, insightVariables);
        omnitureHelper.incrementCommerceCounterValue("internalSearch");
        expect(s.eVar3).toEqual(1);
        omnitureHelper.incrementCommerceCounterValue("internalSearch");
        omnitureHelper.incrementCommerceCounterValue("internalSearch");
        expect(s.eVar3).toEqual(3);
      });

      it("Setting Commerce Variable", function () {
        omnitureHelper = new window.OmnitureHelper(events, commerceVariables, insightVariables);
        omnitureHelper.setCommerceVariable("itemName", testValue);
        expect(s.eVar2).toEqual(expectedValue);
      });

      it("Setting Insight Variable", function () {
        omnitureHelper = new window.OmnitureHelper(events, commerceVariables, insightVariables);
        omnitureHelper.setInsightVariable("suiteId", testValue);
        expect(s.prop4).toEqual(expectedValue);
      });

      it("TrackVirtualPageView", function () {
        spyOn(s, "t");
        omnitureHelper = new window.OmnitureHelper(events, commerceVariables, insightVariables);
        omnitureHelper.trackVirtualPageView();
        expect(s.t).toHaveBeenCalled();
      });

      it("Save Values", function () {
        spyOn(s, "tl");
        omnitureHelper = new window.OmnitureHelper(events, commerceVariables, insightVariables);
        omnitureHelper.fireEvent("pagesViews");
        omnitureHelper.setCommerceVariable("itemName", testValue);
        omnitureHelper.setInsightVariable("suiteId", testValue);
        omnitureHelper.saveValues(testValue);
        expect(s.linkTrackEvents).toEqual("event1");
        expect(s.linkTrackVars).toEqual("eVar2,prop4,events");
        expect(s.tl).toHaveBeenCalledWith(expectedValue, 'o', 'action');
      });

      it("Save Exit Link", function () {
        spyOn(s, "tl");
        omnitureHelper = new window.OmnitureHelper(events, commerceVariables, insightVariables);
        omnitureHelper.saveExitLink(testValue, testValue2);
        expect(s.tl).toHaveBeenCalledWith(expectedValue, 'e', expectedValue2, null);
      });

    });
  });

}());