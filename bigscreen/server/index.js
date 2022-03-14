const path = require('path')
// globalThis
// console.log(globalThis)
const fs = require('fs')
const iconsList = fs.readdirSync('../icons')
new Promise((resolve)=>{

})
let jsonPath = '../json'
const jsonArr = fs.readdirSync(jsonPath)
jsonArr.forEach(item=>{
    let file_path = `${jsonPath}/${item}`
    const values = fs.readFileSync(file_path)
    const jsonContent = values.toString()
    const contentO =  new Function(`return ${jsonContent}`)()
    // console.log(contentO)
    if(contentO.icons && contentO.icons.length){
        const list = iconsList.map(item=>({ icon: item.replace(/\.png$/, ''), name: null, type:'img' }))
        contentO.icons = list
        fs.writeFileSync(file_path, JSON.stringify(contentO))
    }
})