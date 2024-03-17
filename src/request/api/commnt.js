
import api from "@/request/request"

export function PostComment(data) {
    return api(
        {
            url: '/api/Commit/PostComment',
            data,
            method: 'post',
        }
    )
}
export function GetComments(id) {
    return api(
        {
            url: '/api/Commit/GetComments?id='+id,
         
            method: 'get',
        }
    )
}

