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





