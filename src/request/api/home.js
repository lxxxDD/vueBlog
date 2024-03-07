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
