src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.3/jquery.min.js"
integrity="sha512-STof4xm1wgkfm7heWqFJVn58Hm3EtS31XFaagaa8VMReCXAkQnJZ+jEy8PCC/iT18dFy95WcExNHFTqLyp72eQ=="
crossorigin="anonymous"
(function () {
const second = 1000,
  minute = second * 60,
  hour = minute * 60,
  day = hour * 24;


let lastday = "02/27/2026";
//end

const countDown = new Date(lastday).getTime(),
x = setInterval(function() {    

  const now = new Date().getTime(),
        distance = countDown - now;
        if(distance<0){
          document.getElementById("days").innerText = 0,
          document.getElementById("hours").innerText = 0,
          document.getElementById("minutes").innerText = 0,
          document.getElementById("seconds").innerText = 0;

          clearInterval(x);
          return;
        }
    document.getElementById("days").innerText = Math.floor(distance / (day)),
    document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
    document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
    document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

  
}, 0)
}());
