
function sortAuction(firstBid, secondBid) {
  if(firstBid.bid === secondBid.bid) {
    if (firstBid.user < secondBid.user)
      return -1;
    if ( firstBid.user > secondBid.user)
      return 1;
    return 0;
  }
  return secondBid.bid - firstBid.bid;
}

module.exports.auction = function(bids) {
  if(bids.length === 0)
    return "No Winners";

  if(bids.length === 1)
    return bids;

  bids.sort(sortAuction);
  for (let i = 1; i < bids.length; i++) {
    const previousBid = bids[i - 1];
    const bid = bids[i];
    previousBid.bid = bid.bid
  }
  bids[bids.length - 1].bid = "Lost";
  
  return bids;
}