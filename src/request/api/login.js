import api from "@/request/request"

export function login(data){
  
    return api({
        url:'/Users/Login',
        method:'post',
        data
    })
}

// 注册
export function Register(data){
    return api({
        url:'/Users/Register',
        method:'post',
        data
    })
}



