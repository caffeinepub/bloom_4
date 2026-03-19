import Time "mo:core/Time";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Text "mo:core/Text";

actor {
  type BouquetRecord = {
    id : Text;
    flowers : [Text];
    greenery : [Text];
    message : Text;
    imageKey : Text;
    timestamp : Int;
  };

  module BouquetRecord {
    public func compareByTimestampDesc(a : BouquetRecord, b : BouquetRecord) : Order.Order {
      Int.compare(b.timestamp, a.timestamp);
    };
  };

  let bouquets = Map.empty<Text, BouquetRecord>();

  var nextId = 0;

  public shared ({ caller }) func createBouquet(flowers : [Text], greenery : [Text], message : Text, imageKey : Text) : async Text {
    let id = nextId.toText();
    nextId += 1;

    let bouquet : BouquetRecord = {
      id;
      flowers;
      greenery;
      message;
      imageKey;
      timestamp = Time.now();
    };

    bouquets.add(id, bouquet);
    id;
  };

  public query ({ caller }) func getBouquet(id : Text) : async ?BouquetRecord {
    bouquets.get(id);
  };

  public query ({ caller }) func getRecentBouquets(limit : Nat) : async [BouquetRecord] {
    if (limit == 0) { Runtime.trap("Limit must be greater than 0") };

    let sorted = bouquets.values().toArray().sort(BouquetRecord.compareByTimestampDesc);
    let takeLimit = if (limit > sorted.size()) { sorted.size() } else { limit };
    sorted.sliceToArray(0, takeLimit);
  };
};
