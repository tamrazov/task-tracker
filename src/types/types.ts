export type RegisterType = Partial<{
  id: number;
  token: string;
  errors: Partial<{
    email: string;
    name: string;
    password: string
    secretQuestion: string;
    secretAnswer: string;
  }>;
}>;

export type LoginType = Partial<{
  id: string;
  token: string;
  error: string;
}>;

export type ForgotType = Partial<{
  error: string;
  id: string;
  secretQuestion: string;
  secretAnswer: string;
}>;

export type TaskType = {
  id: string;
  name: string;
  priority: string;
  status: '0' | '1' | '2' | '3';
  time_start: string;
  time_end: string;
  fact_time_start: string;
  fact_time_end: string;
};

export type TasksListType = {
  list: TaskType[];
  errors?: any;
};

export type Profile = {
  id: string;
  email: string;
  name: string;
  fullname: string;
  secretQuestion: string;
  secretAnswer: string;
  password: string;
};

export type UserModel = {
  id: number;
  email: string;
  name: string;
  fullname: string;
  secretQuestion: string;
  secretAnswer: string;
};
