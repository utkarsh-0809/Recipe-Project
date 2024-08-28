import { TIME_OUT } from "./config";
const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };
   
   let state={
    recipe:{}
};
export async function dataJson(url){
    try{
       // console.log(url);
        let res=await Promise.race([fetch(url),timeout(TIME_OUT)]);
        if(!res.ok) throw new Error(`${data.message}`);
        let data=await res.json();
//    console.log(res);
 //   console.log(data);
 
    
   
    return data;
    }
    catch(err){
        throw new Error(`${err.message}`);
    }
}


export async function sendJson(url,uploaddata){
  try{

    let fetchPro=  fetch(url,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(uploaddata)
    })
     // console.log(url);
      let res=await Promise.race([fetchPro,timeout(TIME_OUT)]);
      
      let data=await res.json();
      if(!res.ok) throw new Error(`${data.message}`);
//    console.log(res);
//   console.log(data);

  
 
  return data;
  }
  catch(err){
      throw new Error(`${err.message}`);
  }
}