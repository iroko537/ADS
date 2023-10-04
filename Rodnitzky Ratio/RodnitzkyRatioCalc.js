function main() {
    // Fetch all campaigns
    var campaignIterator = AdsApp.campaigns().get();
    
    while (campaignIterator.hasNext()) {
      var campaign = campaignIterator.next();
      
      // Fetch all keywords in the campaign
      var keywordIterator = campaign.keywords().get();
      
      var totalCost = 0;
      var totalConversions = 0;
      var brandedCost = 0;
      var brandedConversions = 0;
      
      // Iterate through all keywords
      while (keywordIterator.hasNext()) {
        var keyword = keywordIterator.next();
        var keywordText = keyword.getText().toLowerCase();
        
        totalCost += keyword.getStatsFor("LAST_30_DAYS").getCost();
        totalConversions += keyword.getStatsFor("LAST_30_DAYS").getConversions();
        
        // Check if the keyword is branded
        if (keywordText.includes("yourBrandName")) { // Replace 'yourBrandName' with your actual brand name
          brandedCost += keyword.getStatsFor("LAST_30_DAYS").getCost();
          brandedConversions += keyword.getStatsFor("LAST_30_DAYS").getConversions();
        }
      }
      
      // Calculate CPAs and the Rodnitzky Ratio
      if (totalConversions > 0 && brandedConversions > 0) {
        var totalCPA = totalCost / totalConversions;
        var brandedCPA = brandedCost / brandedConversions;
        var rodnitzkyRatio = totalCPA / brandedCPA;
        
        // Log the Rodnitzky Ratio for the campaign
        Logger.log("Campaign: " + campaign.getName() + ", Rodnitzky Ratio: " + rodnitzkyRatio.toFixed(2));
      }
    }
  }
  