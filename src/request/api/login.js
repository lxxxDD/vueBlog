import api from "@/request/request"

export function login(data){
  
    return api({
        url:'/api/Users/Login',
        method:'post',
        data
    })
}

// 注册
export function Register(data){
    return api({
        url:'/api/Users/Register',
        method:'post',
        data
    })
}
//修改用户
export function PutUser(data){
    return api({
        url:'/api/Users/PutUser',
        method:'put',
        data
    })
}







