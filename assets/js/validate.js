import { Message } from 'element-ui'
/**
 * 验证值是否为空
 */
export const validateLinks = (links) => {
    if(links.name == ""){
        Message.error("网站名称不能为空");
        return false;
    }
    if(links.logo == ""){
        Message.error("网站logo不能为空");
        return false;
    }
    if(links.url == ""){
        Message.error("网站url不能为空");
        return false;
    }
    if(links.email == ""){
        Message.error("联系邮箱不能为空");
        return false;
    }

    //验证url logo格式
    const regex = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/
    if(!regex.test(links.url)){
        Message.error("网站url格式错误");
        return false;
    }
    if(!regex.test(links.logo)){
        Message.error("网站logo格式错误");
        return false;
    }
    //验证邮箱格式
    const emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if(!emailRegex.test(links.email)){
        Message.error("邮箱格式错误");
        return false;
    }
    return true
}


