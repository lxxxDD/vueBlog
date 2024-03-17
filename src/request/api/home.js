import api from "@/request/request"

export function GetBlogPosts(params) {

    return api(
        {
            method: 'GET',
            url: '/api/BlogPosts/GetBlogPosts',
            params
        }
    )
}
export function GetBlogPostsTotal(params) {
    return api(
        {
            method: 'GET',
            url: '/api/BlogPosts/GetBlogPostsTotal/total',
            
        }
    )
}

// 获取用户的所有文章点赞浏览
export function GetUserBlogPostLikeAndViews(id) {

    return api(
        {
            method: 'GET',
            url: '/api/BlogPosts/GetUserBlogPostLikeAndViews?id='+id,
            
        }
    )
}

// 获取用户的文章
export function GetUserBlogPostlist(id,sort) {

    return api(
        {
            method: 'GET',
            url: '/api/BlogPosts/GetUserBlogPostlist',
            params:{
                uid:id,
                sort
            }
        }
    )
}

// 获取用户单篇文章
export function GetBlogPost(id) {

    return api(
        {
            method: 'GET',
            url: '/api/BlogPosts/GetBlogPost?id='+id,
            
        }
    )
}
// 获取用户单篇文章
export function setLike(id) {
   
    return api(
        {
            method: 'put',
            url: '/api/BlogPosts/setLike?postId='+id,
            
        }
    )
}
// 获取用户单篇文章
export function setView(id) {
   
    return api(
        {
            method: 'put',
            url: '/api/BlogPosts/setView?postId='+id,
            
        }
    )
}


