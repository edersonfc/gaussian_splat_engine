var myVar;

function myFunction() {
  myVar = setInterval(every2sec, 2000);

  console.log(myVar)
}

function every2sec() { 
//   alert("Alert Text!"); 

  return 1 + 2;
}
myFunction();