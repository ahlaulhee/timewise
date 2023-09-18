export type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  timeSpent: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export type TaskData = {
  title: string;
  description: string;
  status: string;
  timespent?: string;
  userId?: string;
};

export type Keyword = {
  userId: string;
  keyword: string;
  type: string;
  timesCopied: number;
};

export type PasswordItem = {
  keyword: string;
  timesCopied: number;
  genPassword: string | undefined;
  type: string;
  handleCopy: (keyword: string, genPassword: string) => void;
  handleDelete: (keyword: string, type: string) => void;
};
