import exDexApi from "./exdexapi";

export interface ProjectsPageConfig {
  page: number;
  per_page: number;
}

export const getPopularProjects = ({
  config,
  categoryId,
}: {
  config: ProjectsPageConfig & { searchKey?: string };
  categoryId: number;
}) => {
  let apiUrl = `project/user/popular?page=${config.page}&per_page=${config.per_page}&from=&to=&risk=&categoryId=${categoryId}`;
  if (config.searchKey) {
    apiUrl = apiUrl + `&search=${config.searchKey}`;
  }
  return exDexApi.get(apiUrl);
};

export const addProjectToWatchList = (data: {
  category_id: number;
  project_id: number;
  isOnWatchList: boolean;
}) => {
  if (data.isOnWatchList) {
    return exDexApi.delete(`project/watchlist/${data?.project_id}`);
  }
  return exDexApi.post("project/watchlist", data);
};

export const getOtherProjects = (
  data: { projectType: string; categoryId: number } & ProjectsPageConfig
) => {
  return exDexApi.get(
    `project/user?page=${data.page}&per_page=${data.per_page}&from=&to=&search=&risk=&categoryId=${data?.categoryId}&filter=${data.projectType}`
  );
};
export const getSimilarProjects = (
  data: { projectType: string; categoryId: number } & ProjectsPageConfig
) => {
  return exDexApi.get(
    `project/user/similar?page=${data.page}&per_page=${data.per_page}&from=&to=&search=&risk=&categoryId=${data?.categoryId}&filter=${data.projectType}`
  );
};
export const getTopViewProjects = (
  data: { projectType: string; categoryId: number } & ProjectsPageConfig
) => {
  return exDexApi.get(
    `project/user/topviewed?page=${data.page}&per_page=${data.per_page}&from=&to=&search=&risk=&categoryId=${data?.categoryId}&filter=${data.projectType}`
  );
};

export const getProjectSuggestions = (data: { categoryId: number } & ProjectsPageConfig) => {
  const apiUrl = `project/user/suggested?page=${data.page}&per_page=${data.per_page}&from=&to=&search=&risk=&categoryId=${data?.categoryId}`
  return exDexApi.get(apiUrl)
}

export const getProject = (id: number) => {
  return exDexApi.get(`project/${id}`)
}

export const getOtherProjectsForDetal = (
  data: { categoryId: number } & ProjectsPageConfig
) => {
  return exDexApi.get(
    `project/user?page=${data.page}&per_page=${data.per_page}&from=&to=&search=&risk=&categoryId=${data?.categoryId}`
  );
};

export const getProjectMenu = () => {
  return exDexApi.get(`project/categories`);
}

export const manageAppreciationData = (apiData: {
  appreciate_type: string;
  like: 1 | 2;
  project_id: number;
}) => {
  return exDexApi.post(`project/manage-appreciation`, apiData);
};
export const followCategoryCall = (data: any) => {
  return exDexApi.post(`project/categories/follow`, data);
}

export const unFollowCategoryCall = (id:any) => {
  return exDexApi.delete(`project/categories/unfollow/${id}`);
}


export const getExploreProjects = (filterString: string) => {
  return exDexApi.get(`/project/user/explore${filterString}`);
};

export const getExploreProjectsWithoutToken = () => {
  return exDexApi.get(`/project/user/top-projects`);
};