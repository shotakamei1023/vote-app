export type User = {
  id: string;
  auth_id: string;
  name: string;
  role?: 0;
  vote?: boolean;
};

export type Box = {
  id: string;
  name: string;
  user_id: string;
  count: string;
};

export type boxesSnapShot = {
  id: string;
  name: string;
  user_id: string;
};

export type TabList = {
  num: number;
  display: boolean;
};

export type Tab = {
  overview: TabList;
  boxes: TabList;
};

export type Error = {
  email: boolean;
  password: boolean;
};

export type checkInput = {
  value: string;
  isError: Error;
  setError: any;
};
