const tf = require('@tensorflow/tfjs')
const toxicity = require('@tensorflow-models/toxicity')



let preload = document.querySelector('.preload')
let text = document.querySelector('.text')
let test = document.querySelector('.test')
let nodes = document.querySelectorAll('.nodes')
let model 

const threshold = 0.9
let f = false
toxicity.load(threshold)
.then(m=>{
  model = m
  console.log(model)
  preload.style.display = 'none'
})

test.onclick = () => {
  preload.style.display = 'block'
  model.classify(text.value)
  .then(predict=>{
    preload.style.display = 'none'
    nodes.forEach((node, i)=>{
      if (predict[i].results[0].match != false){
        node.style.width = `${predict[i].results[0].probabilities[0]*100}%`
      }else{
        node.style.width = '0%'
      }
    })
  })
}
// text.onkeyup = () => {
//   model.classify(text.value)
//   .then(predict => {
//     nodes.forEach((node, i) => {
//       if (predict[i].results[0].match != false) {
//         node.style.width = `${predict[i].results[0].probabilities[0]*100}%`
//       }else{
//         node.style.width = '0%'
//       }
//     })
//   })
// }


