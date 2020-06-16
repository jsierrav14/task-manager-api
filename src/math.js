export const calculateTip = (total,tipPercent=.2)=>{
    const tip = total * tipPercent
    return total+tip;
}

export const farenheitToCelsius= (temp)=>{
    return (temp-32)/1.8
 }

 export const add = (a,b)=>{
    return new Promise((resolved,rejected)=>{
      setTimeout(()=>{
        if(a<0 || b <0){
          return rejected('Numbers must be non-negative')
        }
  
        resolved(a+b)
      })
    })
  }