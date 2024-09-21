
// let controller = new AbortController()

// let signal = controller.signal
// let test = async(url,cache) => {
//   controller.abort() 
//   try{
//     let res = await fetch(url, { signal })
//     let data = await res.json()
//     cache.name = `data.length`
//     console.log('fetched')
//   }catch(err){
//     console.log(err)
//   }

// };

// cache = {count:0}
// test(`https://jsonplaceholder.typicode.com/posts`,cache,false,signal)

// // test(`https://jsonplaceholder.typicode.com/posts`,cache,false,signal)
// // test(`https://jsonplaceholder.typicode.com/posts`,cache,true,signal)

// frame it as bussiness solution not an coding exerciece
// show it solves real problem
// prove it value with data, quatify the potential impact