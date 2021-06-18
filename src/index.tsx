import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {TaskType} from './types/types';
import { Response } from 'miragejs';

import {createServer, Model} from "miragejs";
import {tasks, users} from './db';
import {validateEmail, getRandomArg} from './utils/utils';
import isEmpty from 'lodash.isempty';

export const TOKEN = 'QpwL5tke4Pnpja7X4';

createServer({
  models: {
    user: Model,
    task: Model
  },
  seeds(server) {
    server.create('user', users[0]);
    server.create('task', tasks[0]);
    server.create('task', tasks[1]);
    server.create('task', tasks[2]);
    server.create('task', tasks[3]);
  },
  routes() {
    this.namespace = 'api';

    this.get("/tasks", (schema: any, request) => {
      const {name} = request.queryParams;
      let tasks = schema.tasks.all().models.filter((task: TaskType) => !!name ? task.name.match(name) : true);

      return getRandomArg({list: tasks}, new Response(500, { some: 'header' }, { errors: {error: 'server '} }));
    });

    this.post("/tasks", (schema: any, request) => {
      let attrs = JSON.parse(request.requestBody);
      let errors: {[key: string]: string} = {};
      for (let key of [
        'name',
        'type',
        'time_start',
        'time_end',
      ]) {
        if(!attrs[key]) {
          errors[key] = `${key} is required`
        }
      }
      if (!isEmpty(errors)) return {errors};
      const task = schema.tasks.create(attrs);
      return schema.tasks.all();
    })

    this.put("/tasks/:id", (schema: any, request) => {
      let id = request.params.id;
      let attrs = JSON.parse(request.requestBody);
      let errors: {[key: string]: string} = {};
      for (let key of [
        'name',
        'type',
        'time_start',
        'time_end',
      ]) {
        if(!attrs[key]) {
          errors[key] = `${key} is required`
        }
      }
      if (!isEmpty(errors)) return {errors};
      schema.db.tasks.update(id, attrs);
      return schema.tasks.all();
    });

    this.delete("/tasks/:id", (schema: any, request) => {
      let id = request.params.id;
      schema.db.tasks.remove(id);
      return schema.tasks.all();
    });

    this.get("/users", (schema: any) => {
      return schema.users.all();
    });

    this.get("/profile/:id", (schema: any, request) => {
      let id = request.params.id;
      let user = schema.users.find(id);
      return user;
    });

    this.put("/profile/:id", (schema: any, request) => {
      let id = request.params.id;
      let attrs = JSON.parse(request.requestBody);
      let errors: {[key: string]: string} = {};
      for (let key of [
        'name',
        'email',
        'fullname',
        'password',
        'secretQuestion',
        'secretAnswer'
      ]) {
        if(!attrs[key]) {
          errors[key] = `${key} is required`
        }
      }
      if (!isEmpty(errors)) return {errors};
      schema.db.users.update(id, attrs);
      let user =  schema.users.find(id);
      return user;
    });

    this.post("/login", (schema, request) => {
      let {email, password} = JSON.parse(request.requestBody)
      if (!email || !password) {
        return {error: 'require email and password'};
      }
      const currentUser = schema.db.users.findBy({email});
      if (currentUser === null) {
        return {error: 'email not found'};
      }

      if (currentUser.password !== password) {
        return {error: 'password incorrect'};
      }
      return {id: currentUser.id, token: TOKEN};
    })

    this.post("/register", (schema: any, request) => {
      let attrs = JSON.parse(request.requestBody);
      let errors: {[key: string]: string} = {};
      for (let key of ['name','email','password','secretQuestion','secretAnswer']) {
        if(!attrs[key]) {
          errors[key] = `${key} is required`
        }
      }
      if (!isEmpty(errors)) return {errors};

      if (!validateEmail(attrs['email'])) {
        return {errors: {email: 'incorrect email'}}
      }
      const user = schema.users.create(attrs);
      return {id: user.id, token: TOKEN};
    })

    this.post("/forgot", (schema: any, request) => {
      let email = JSON.parse(request.requestBody);
      let user = schema.db.users.findBy({email});
      if (user === null) {
        return {error: 'email not found'};
      }
      return {id: user.id, secretQuestion: user.secretQuestion, secretAnswer: user.secretAnswer};
    })
  
  },
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(console.log);
