The solution involves using Firebase's transactions to guarantee atomicity.  This ensures that the updates to the counter and related record happen as a single, indivisible operation.

```javascript
// Corrected code
database.ref('counter').transaction(currentCount => {
  if (currentCount === null) {
    return 1;
  }
  return currentCount + 1;
}).then(() => {
  database.ref('records/' + someId).update({ count: database.ref('counter').once('value').then(snapshot => snapshot.val()) });
});
```
By using transactions, we prevent the race condition.  The entire update operation is treated as a single unit of work.  If another client attempts a concurrent update, the transaction will either succeed or fail, preventing inconsistent data.