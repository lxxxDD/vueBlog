import api from "@/request/request"

export function GetBlogPosts(params) {
    console.log(params);
    return api(
        {
            method: 'GET',
            url: 'BlogPosts/GetBlogPosts',
            params
        }
    )
}
export function GetBlogPostsTotal(params) {
    return api(
        {
            method: 'GET',
            url: 'BlogPosts/GetBlogPostsTotal/total',
            
        }
    )
}
