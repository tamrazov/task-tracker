import {Profile, TaskType} from '../types/types';

export const loginRequest = async (params: {
  email: string;
  password: string;
}) => {
  try {
    const res = await fetch(`/api/login`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return await res.json();
  } catch (error) {
    console.log(error, 'hello from error');
    throw new Error(error);
  }
}

export const registerRequest = async (params: {
  name: string;
  fullname: string;
  email: string;
  password: string;
  secretQuestion: string;
  secretAnswer: string;
}) => {
  try {
    const res = await fetch(`/api/register`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return await res.json();
  } catch (error) {
    console.log(error, 'hello from error');
    throw new Error(error);
  }
}

export const forgotEmailRequest = async (email: string) => {
  try {
    const res = await fetch(`/api/forgot`, {
      method: 'POST',
      body: JSON.stringify(email),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return await res.json();
  } catch (error) {
    console.log(error, 'hello from error');
    throw new Error(error);
  }
}

export const getTasksListRequest = async () => {
  try {
    const res = await fetch(`/api/tasks`, {
      method: 'GET',
    })
    return await res.json();
  } catch (error) {
    console.log(error, 'hello from error');
    throw new Error(error);
  }
}

export const getProfileRequest = async (id: string) => {
  try {
    const res = await fetch(`/api/profile/${id}`, {
      method: 'GET',
    })
    return await res.json();
  } catch (error) {
    console.log(error, 'hello from error');
    throw new Error(error);
  }
}

export const editProfileRequest = async (profile: Profile) => {
  try {
    const res = await fetch(`/api/profile/${profile.id}`, {
      method: 'PUT',
      body: JSON.stringify(profile),
      headers: {
        'Content-type': 'application/json'
      }
    })
    return await res.json();
  } catch (error) {
    console.log(error, 'hello from error');
    throw new Error(error);
  }
}

export const addTaskRequest = async (task: TaskType) => {
  try {
    const res = await fetch(`/api/tasks`, {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-type': 'application/json'
      }
    })
    return await res.json();
  } catch (error) {
    console.log(error, 'hello from error');
    throw new Error(error);
  }
}

export const editTaskRequest = async (task: TaskType) => {
  try {
    const res = await fetch(`/api/tasks/${task.id}`, {
      method: 'PUT',
      body: JSON.stringify(task),
      headers: {
        'Content-type': 'application/json'
      }
    })
    return await res.json();
  } catch (error) {
    console.log(error, 'hello from error');
    throw new Error(error);
  }
}

export const removeTaskRequest = async (id: string) => {
  try {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    })
    return await res.json();
  } catch (error) {
    console.log(error, 'hello from error');
    throw new Error(error);
  }
}
