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

// 获取用户的文章点赞浏览
export function GetUserBlogPost(id) {
    console.log(id);
    return api(
        {
            method: 'GET',
            url: '/api/BlogPosts/GetUserBlogPost?id='+id,
            
        }
    )
}
