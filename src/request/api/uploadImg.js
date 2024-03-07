import api from "@/request/request"
export function uploadImgs(imageFile) {
    const formData = new FormData();
    formData.append("file", imageFile);
    return api({
        url: '/api/Upload/UploadFile',
        method: 'post',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

// 更改用户头像路径
export function updateUrl(data) {
    return api({
        url: '/api/Users/updateUserImg',
        method: 'put',
        data,
      
    })
}







