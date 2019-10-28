export function jump(el,anchor){
    let jump = el.querySelector(anchor)
    let total = jump.offsetTop + 220

    // 平滑滚动，时长500ms，每10ms一跳，共50跳
    // 获取当前滚动条与窗体顶部的距离
    let distance = document.documentElement.scrollTop || document.body.scrollTop
    //计算每一小段的距离
    let step = total / 50
    if(total > distance){
        smoothDown()
    }else{
        let newTotal = distance - total
        step = newTotal / 50
        smoothUp()
    }
    function smoothDown(){
        if(distance < total){
            distance += step
            document.body.scrollTop = distance
            document.documentElement.scrollTop = distance
            setTimeout(smoothDown, 15)
        }else{
            document.body.scrollTop = total
            document.documentElement.scrollTop = total
        }
    }
    function smoothUp(){
        if(distance > total){
            distance -= step
            document.body.scrollTop = distance
            document.documentElement.scrollTop = distance
            setTimeout(smoothUp, 15)
        }else{
            document.body.scrollTop = total
            document.documentElement.scrollTop = total
        }
    }
}