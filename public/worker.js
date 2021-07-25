onconnect = function (e) {
  let port = e.ports[0];
  let value = 0;

  port.onmessage = function (e) {
    for (let i = 1; i <= 100000000; i++) {
      value += i
    }
    port.postMessage(e.data);
  };
}