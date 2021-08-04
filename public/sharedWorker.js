const tasks = [
{
  id: "1",
  name: "ALEXANDR22",
  priority: '1',
  status: '1',
  time_start: "2021-07-22T19:18:43.929Z",
  time_end: "2021-07-22T22:39:43.929Z",
  fact_time_start: "2021-07-22T19:18:43.929Z",
  fact_time_end: "2021-07-22T22:39:43.929Z"
},
{
  id: "2",
  name: "f",
  priority: '1',
  status: '1',
  time_start: "2021-07-22T19:18:43.929Z",
  time_end: "2021-07-22T19:59:13.929Z",
  fact_time_start: "2021-07-22T19:18:43.929Z",
  fact_time_end: "2021-07-22T19:59:13.929Z"
},
{
  id: "3",
  name: "asd",
  priority: '1',
  status: '1',
  time_start: "2021-07-22T19:18:43.929Z",
  time_end: "2021-07-22T20:20:43.929Z",
  fact_time_start: "2021-07-22T19:18:43.929Z",
  fact_time_end: "2021-07-22T20:18:43.929Z"
},
{
  id: "4",
  name: "qwe",
  priority: '1',
  status: '1',
  time_start: "2021-07-22T19:18:43.929Z",
  time_end: "2021-07-22T23:20:13.929Z",
  fact_time_start: "2021-07-22T19:18:43.929Z",
  fact_time_end: "2021-07-22T23:20:13.929Z"
},
];
const users = [
  {
    id: "1",
    name: "Alex",
    email: "box-1@gmail.com",
    fullname: "Alex Aleksandrov_1",
    password: '123456',
    secretQuestion: "How old are you?",
    secretAnswer: "1"
  },
];
const TOKEN = 'asdpasdasmdqjdmcnjscklzcmzkdoasdal';

onconnect = function (e) {
  const port = e.ports[0];

  port.onmessage = function (e) {
    let [method, url, options] = e.data;

    if (method === 'get' && url === '/tasks') {
      if (!!options) {
        port.postMessage(tasks.filter((task) => task.name.match(options)));
      } else {
        port.postMessage(tasks);
      }
    }

    if (method === 'post' && url === '/tasks') {
      let errors = {};
      for (let key of [
        'name',
        'status',
        'priority',
        'time_start',
        'time_end',
      ]) {
        if(!options[key]) {
          errors[key] = `${key} is required`
        }
      }
      if (Object.keys(errors).length > 0) {
        port.postMessage([{errors}]);
      } else {
        let id = (tasks.length + 1).toString();
        tasks.push({id, ...options})
        port.postMessage([{tasks}]);
      }
    }

    if (method === 'put' && url === '/tasks') {
      let errors = {};
      for (let key of [
        'name',
        'status',
        'priority',
        'time_start',
        'time_end',
      ]) {
        if(!options[key]) {
          errors[key] = `${key} is required`
        }
      }
      if (Object.keys(errors).length > 0) {
        port.postMessage([{errors}]);
      } else {
        let newTask = {...options};
        tasks.splice(+options.id - 1, 1, newTask)
        port.postMessage([{tasks}]);
      }
    }

    if (method === 'delete' && url === '/tasks') {
      tasks = tasks.filter((task) => task.id !== options);
      port.postMessage([{tasks}]);
    }

    if (method === 'get' && url === '/profile') {
      port.postMessage(users.find((user) => user.id === options));
    }

    if (method === 'put' && url === '/profile') {
      let errors = {};
      for (let key of [
        'name',
        'email',
        'fullname',
        'password',
        'secretQuestion',
        'secretAnswer'
      ]) {
        if(!options[key]) {
          errors[key] = `${key} is required`
        }
      }
      if (Object.keys(errors).length > 0) {
        port.postMessage([{errors}]);
      } else {
        let newProfile = {...options};
        users.splice(+options.id - 1, 1, newProfile);
        currentUser = users.find((user) => user.id == options.id);
        port.postMessage([{currentUser}]);
      }
    }

    if (method === 'post' && url === '/login') {
      let {email, password} = options;
      if (!email || !password) {
        port.postMessage([{errors: 'require email and password'}]);
      }
      const currentUser = users.find((user) => user.email === email);

      if (currentUser === undefined) {
        port.postMessage([{errors: 'email not found'}]);
      }

      if (currentUser.password === password) {
        port.postMessage([{id: currentUser.id, token: TOKEN}]);
      } else {
        port.postMessage([{errors: 'password incorrect'}]);
      }
    }

    if (method === 'post' && url === '/register') {
      let attrs = options;
      let errors = {};
      for (let key of ['name','email','password','secretQuestion','secretAnswer']) {
        if(!attrs[key]) {
          errors[key] = `${key} is required`
        }
      }
      if (Object.keys(errors).length > 0) {
        port.postMessage([{errors}]);
      } else {
        let id = (tasks.length + 1).toString();
        let newProfile = {id, ...attrs};
        users.push(newProfile);
        port.postMessage([{id: newProfile.id, token: TOKEN}]);
      }
    }
  };
}