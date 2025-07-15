interface IOwner {
  avatar_url: string;
  login: string;
}

export interface IRepos {
  id: number;
  topics: string[];
  language: string;
  name: string;
  updated_at: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  owner: IOwner;
}

export type Params = {
  lang: string;
  order: string;
  page?: string;
};
