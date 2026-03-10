actor {
  var visitors = 0;

  public shared ({ caller }) func trackVisitor() : async () {
    visitors += 1;
  };

  public query ({ caller }) func getVisitors() : async Nat {
    visitors;
  };
};
