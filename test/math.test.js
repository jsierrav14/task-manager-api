import {calculateTip,farenheitToCelsius,add } from '../src/math'
import "babel-polyfill"


const calculateToFahrenheit = jest.fn((temp) =>{
  return (temp*1.8) +32
})

test('Should calculate total with tip', ()=>{
  const total = calculateTip(10,.3)
  expect(total).toBe(13)
})

test('Should calculate total wiht default tip',()=>{
  const total = calculateTip(10);
  expect(total).toBe(12)
})

test('Should be convert 32 f to 0 C',()=>{
  const result = farenheitToCelsius(32)
  expect(result).toBe(0)
})

test('Should be convert 0 to 32 F',()=>{
  const result = calculateToFahrenheit(0);

  expect(result).toBe(32);
})

test('Async function done',(done)=>{
  setTimeout(()=>{
    expect(1).toBe(1);
    done()
  },2000)
})

test('Add two 2 numbers',(done)=>{
    add(2,3).then(a =>{
      expect(a).toBe(5)
      done();
    })
})

test('Should add two numbers with async/await', async()=>{
   const sum = await add(11,23);
   expect(sum).toBe(34);
})