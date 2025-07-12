interface IOwner {
  avatar_url: string;
}

export interface IRepos {
  id: number;
  topics: string[];
  language: string;
  full_name: string;
  updated_at: string;
  description: string;
  stargazers_count: number;
  owner: IOwner;
}

export type Params = {
  lang: string;
  sort: string;
  perPage: string;
  page?: string;
};
