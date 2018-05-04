import axios from 'axios';

axios.interceptors.request.use(
   config => {
      if(window.localStorage.getItem('token')){
         config.headers.token = window.localStorage.getItem('token');
      }
     return config;
   },
   err => {
      return Promise.reject(err);
});
// user
export const requestLogin = params => { 
   return axios.post(`/public/login`, params).then((res)=>{
      let token = res.headers.refresh
      window.localStorage.setItem('token',token);
      // window.localStorage.setItem('user',JSON.stringify(res.data.result))
      window.localStorage.setItem('user',res.data.result.userId)
      return res
   }); 
};


export const getIp = () => { return axios.post(`/public/getIp`).then(res => res);};

export const requestRegister = params => { return axios.post(`/public/user/register`, params).then(res => res.data);};

export const activate = code => { return axios.post(`/public/user/activate/${code}`).then(res => res.data)};

export const updateUser = params => { return axios.post(`/api/user/updataUserInfo`, params)};

export const addUser = params => { return axios.post(`/api/user/addUser`, params)};

export const getUserInfoById = id => { 
  return axios.get(`/api/user/getUserInfoById/${id}`).then(res => res.data)};

export const findPassword = params => { return axios.post(`/public/user/findPassword`, params)};

//头像上传
export const uploadAvatar = params => { return axios.post(`/api/user/userImageUpload`, params).then(res => res.data).catch(function (error) {alert(error)});};

/* information */
export const getInfoByInfoId = id => { return axios.post(`/public/information/getInfoByInfoId/${id}`).then(res => res.data); };

/* 文章推送 */
export const getPushInfo = param => { return axios.post(`/public/pushInfo`,param).then(res => res.data); };

export const pushUserByLogInfo = (param) => { 
  axios.defaults.headers.common['page'] = param.page;
  return axios.post(`/api/push/pushUserByLogInfo`).then(res => res.data); 
};

export const pushInfoByTypeId = (typeId) => { return axios.get(`/public/push/pushInfoByTypeId/${typeId}`).then(res => res.data); };

export const pushInfoByKeyword = (param) => { return axios.post(`/api/push/pushInfoByKeyword`,param).then(res => res.data); };

export const likeArticle = (param) => { return axios.post(`/public/pushInfo`,param).then(res => res.data); };

export const pushInfoByUserGroup = () => { return axios.post(`/api/push/pushInfoByUserGroup`).then(res => res.data); };

//根据资讯发布时间获取资讯（ 20 条）
export const getInfoByDate = page => { return axios.get(`/public/information/findInfoByDate/${page}`).then(res => res.data); };

//根据id修改资讯
export const updateInfo = param => { return axios.post(`/public/information/updateInfo`, param).then(res => res.data); };

//根据searchContent返回资讯列表
export const getInfoBySearchBar = param => { return axios.post(`/public/search/getInfoBySearchBar`, param).then(res => res.data); };

export const getHotWords = () => { return axios.get(`/public/information/getHotWords`).then(res => res.data); };

/* comment */
export const getCommentsByInfoId = id => { return axios.get(`/public/information/${id}/comment`).then(res => res.data); };

export const getHotComments = () => { return axios.get(`/public/information/hotComments`).then(res => res.data); };

export const addComment = param => { return axios.post(`/public/information/${param.infoId}/comment`, param).then(res => res.data); };

export const updateComment = param => { return axios.put(`/public/information/comment`, param).then(res => res.data); };

/* 点赞记录 */
export const addUserLike = param => { return axios.post(`/public/userLike`, param).then(res => res.data); };

export const updateUserLike = param => { return axios.put(`/public/userLike`, param).then(res => res.data); };

export const getAllUserLike = () => { return axios.get(`/public/userLike/all`).then(res => res.data); };

export const deleteUserLike = (userLikeId) => { return axios.delete(`/public/userLike/${userLikeId}`).then(res => res.data); };

/* 用户模型 */
export const getUserMod = () => {return axios.get(`/api/userMod/getUserMod`).then(res => res.data); };

export const updateUserModForRead = (param) => {return axios.post(`/api/userMod/updateUserModForRead`, param).then(res => res.data); };

//插入用户仔细阅读记录
export const makeUserRead = (param) => {return axios.post(`/api/userRead/makeUserRead`, param).then(res => res.data); };

export const getUserReadTime = () => {return axios.post(`/api/user/getUserReadTime`).then(res => res.data); };


/* 用户浏览记录 */
export const getLogInfos = () => {return axios.get(`/api/logInfo/getLogInfos`).then(res => res.data); };
//获取用户最近浏览新闻
export const getLogInfoNowadays = () => {return axios.post(`/api/logInfo/getLogInfoNowadays`).then(res => res.data); };
//获取用户最近浏览新闻
export const getNewEndTime = (param) => {return axios.post(`/api/logInfo/getNewEndTime`,param).then(res => res.data); };


/* type */
export const getAllType = () => { return axios.get(`/public/type/getAllType`).then(res => res.data); };

export const getTypeById = id => { return axios.get(`/public/type/getTypeById/${id}`).then(res => res.data); };

//获取搜索热词
export const getSearchWords = () => { return axios.post(`/public/searchLog/getSearchWords`).then(res => res.data); };

export const addSearchLog = (param) => { return axios.post(`/public/searchLog/addSearchLog`, param).then(res => res.data); };
