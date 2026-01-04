import axios from 'axios';

const GITHUB_RAW_FILE_BASE_URL = 'https://raw.githubusercontent.com';

let GITHUB_API_BASE_URL = 'https://github-api-server.vercel.app/api/repos';
if (import.meta.env.MODE === 'DEV') {
  GITHUB_API_BASE_URL = 'http://localhost:8000';
}

export type Repo = {
  id: number;
  name: string;
  full_name: string;
  description: null | string;
  language: string;
  default_branch: string;
  html_url: string;
  topics: string[];
  homepage: string | null;
};

export const getFile = async (
  user: string,
  project: string,
  branch: string,
  file: string
): Promise<string | null> => {
  try {
    const res = await axios.get<string>(
      `${GITHUB_RAW_FILE_BASE_URL}/${user}/${project}/${branch}/${file}`
    );

    return res.data;
  } catch (_error) {
    return null;
  }
};

export const getUserRepos = async (params: {
  user: string;
  sortBy?: 'created' | 'updated' | 'pushed' | 'full_name';
  sortDirection?: 'asc' | 'desc';
  pageLength?: number;
  pageNumber?: number;
}): Promise<Repo[] | null> => {
  const {
    user,
    sortBy = 'created',
    sortDirection = 'desc',
    pageLength = 30,
    pageNumber = 1,
  } = params;

  if (pageLength > 100) {
    console.error('pageLength cannot exceed 100');
    return null;
  }

  try {
    const res = await axios.get<Repo[]>(
      `${GITHUB_API_BASE_URL}?user=${user}&sort=${sortBy}&direction=${sortDirection}&pageLength=${pageLength}&pageNumber=${pageNumber}`
    );

    return res.data;
  } catch (_error) {
    return null;
  }
};
