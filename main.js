const getTodos = (resource, callback) => {
  const request = new XMLHttpRequest();

  request.addEventListener("readystatechange", () => {
    if (request.readyState === 4 && request.status === 200) {
      const data = JSON.parse(request.responseText);
      callback(undefined, data);
    } else if (request.readyState === 4) {
      callback("could not fetch data", undefined);
    }
  });

  request.open("GET", resource);
  request.send();
};

// Callback example with callback hell
getTodos("json/todo1.json", (err, data) => {
    console.log("callback fired");
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        getTodos("json/todo2.json", (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                getTodos("json/todo3.json", (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(data);
                    }
                });
            }
        });
    }
});

// Promise example
const getTodosPromise = (resource) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4 && request.status === 200) {
        const data = JSON.parse(request.responseText);
        resolve({ error: undefined, data: data });
      } else if (request.readyState === 4) {
        reject({ message: "something went wrong" });
      }
    });
    request.open("GET", resource);
    request.send();
  });
};

// Fetch api
const getTodosFetch = () => {
  return fetch("json/todo1.json");
};


// // Calling Fetch API
// getTodosFetch().then((res) => {
//     console.log("Resolve")
//     if (res.status === 200) {
//         return res.json()
//     } else {
//         console.log(res);
//     }
// })
// .then((res) => {
//     console.log(res)})
// .catch((err) => {
//     console.log(err);
// })


// Promise chaining
// getTodosPromise("json/todo1.json")
//     .then((res) => {
//         console.log("promise 1 resolved")
//         console.log(res.data);
//         return getTodosPromise("json/todo2.json");
//     })
//     .then((res) => {
//         console.log("promise 2 resolved")
//         console.log(res.data);
//         return getTodosPromise("json/todo3.json");
//     })
//     .then((res) => {
//         console.log("promise 3 resolved")
//         console.log(res.data);
//     })
//     .catch((err) => { console.log(err.message); });


class Error404 extends Error {}

// Async / await Example
const getTodosAsync = async () => {
  let response = await fetch("json/todo2.json");
  if (response.status === 200) {
    return await response.json();
  } else if (response.status === 404) {
    throw new Error404("Couldn't reach the server");
  }
};


// let result = getTodosAsync()
// console.log(result);
// result
//     .then((res) => {
//         console.log(res)
//     })
//     .catch((err) => {
//         console.log(err)
//     });

