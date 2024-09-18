function align(json){

    let stack = []
    let ans = ''
    let nextLine = `
    `
    let spaceString = '``'
    let len = json.length
    let space = 0

    for(let i = 0; i<len; i++){

      if(json[i] === ','){
        ans += json[i] + nextLine + spaceString.repeat(space*2)
      }else if(json[i] === '{'){
        stack.push("{")
        space++
        ans += json[i] + nextLine + spaceString.repeat(space*2)
      }else if(stack.length && json[i] === "}"){
        space--
        stack.pop()
        ans += nextLine + spaceString.repeat(space*2) + json[i]
      }else if(json[i] === ":"){
        ans += " " + json[i] + " "
      }else{
        ans += json[i]
      }

    }
    // console.log(ans+'')
    return ans
  }

export default align