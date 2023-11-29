# To think about

## Transactional updates

Let's say you have a button that is updating two states: A and B, when clicked. Then somewhere else in code you combined signals of these states with resulting signal C.
If you click button, then signal C will be emitted twice since first A is updated, then B. In most cases when C is combined from A and B, and A,B are updated in same event callback, you would want to C be emiited once. To solve this you must wrap both A,B updates in `updateMany(...)` function, but sometimes it can be challanging since A and B update call can be "far" from each other in logic.

Potential solution to this problem are transactions. Transaction is a wrapper of DOM event callback, or `observe(...)` callback, that will first update all states, and only at the end will trigger "notify" to observers about changes. It will do it in fashion thath if A,B changed, then C will be only executed once.
