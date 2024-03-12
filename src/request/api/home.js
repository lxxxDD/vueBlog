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
    console.log(id);
    return api(
        {
            method: 'GET',
            url: '/api/BlogPosts/GetUserBlogPostLikeAndViews?id='+id,
            
        }
    )
}

// 获取用户的文章
export function GetUserBlogPostlist(id) {
    console.log(id);
    return api(
        {
            method: 'GET',
            url: '/api/BlogPosts/GetUserBlogPostlist?uid='+id,
            
        }
    )
}

