
const chai = require("chai");
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
chai.use(deepEqualInAnyOrder);


const { auction } = require('../auction');
const { expect } = chai;

describe("Generalized second - price auction mechanism", function() {

  describe("Corner cases with empty list", function() {

    it("Empty Bid List", function(done) {

        const response = [];

        const auctionsBids = auction(response);

        const expected = "No Winners";
        
        expect(auctionsBids).to.deep.equalInAnyOrder(expected);
        done();
    });

  });

  describe("One item only in the bid list", function() {

    it("One item with user and bid", function(done) {
        const response = [
          {
            user: "John Smith",
            bid: 500
          }
        ];
        const auctionsBids = auction(response);

        const expected = [
          {
            user: "John Smith",
            bid: 500
          }
        ];
        
        expect(auctionsBids).to.deep.equalInAnyOrder(expected);
        done();
    });

  });
  
  describe("Two items", function() {

    it("Two items with same name and same price", function(done) {
      const response = [
        {
          user: "John Smith",
          bid: 500
        },
        {
          user: "John Smith",
          bid: 500
        }
      ];
      const auctionsBids = auction(response);

      const expected = [
        {
          user: "John Smith",
          bid: 500
        },
        {
          user: "John Smith",
          bid: "Lost"
        }
      ];
      
      expect(auctionsBids).to.deep.equalInAnyOrder(expected);
      done();
    });

    it("Two items with same name and different price", function(done) {
      const response = [
        {
          user: "John Smith",
          bid: 800
        },
        {
          user: "John Smith",
          bid: 500
        },
      ];
      const auctionsBids = auction(response);
      const expected = [
        {
          user: "John Smith",
          bid: 500
        },
        {
          user: "John Smith",
          bid: "Lost"
        }
      ];
      
      expect(auctionsBids).to.deep.equalInAnyOrder(expected);
      done();
    });
  
    it("Two items different name and same price", function(done) {
      const response = [
        {
          user: "Hamo Smith",
          bid: 800
        },
        {
          user: "John Smith",
          bid: 800
        },
      ];
      const auctionsBids = auction(response);
      const expected = [
        {
          user: "Hamo Smith",
          bid: 800
        },
        {
          user: "John Smith",
          bid: "Lost"
        }
      ];
      
      expect(auctionsBids).to.deep.equalInAnyOrder(expected);
      done();
    });
  
    it("Two items different name and same price", function(done) {
      const response = [
        {
          user: "Hamo Smith",
          bid: 800
        },
        {
          user: "John Smith",
          bid: 800
        },
      ];
      const auctionsBids = auction(response);
      const expected = [
        {
          user: "Hamo Smith",
          bid: 800
        },
        {
          user: "John Smith",
          bid: "Lost"
        }
      ];
      
      expect(auctionsBids).to.deep.equalInAnyOrder(expected);
      done();
    });

  });

  describe("Three items", function() {

    it("One highest bid and two bids with same price and different names", function(done) {
      const response = [
        {
          user: "Omar Smith",
          bid: 1400
        },
        {
          user: "Zezo",
          bid: 600
        },
        {
          user: "Ezz",
          bid: 600
        }
      ];
      const auctionsBids = auction(response);

      const expected = [
        {
          user: "Omar Smith",
          bid: 600
        },
        {
          user: "Zezo",
          bid: "Lost"
        },
        {
          user: "Ezz",
          bid: 600
        }
      ];
      
      expect(auctionsBids).to.deep.equalInAnyOrder(expected);
      done();
    });

  });

});
