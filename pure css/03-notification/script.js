const btns = document.querySelectorAll(".btn");
const output = document.querySelector(".notifications");
const closeBtn = document.querySelector(".close-btn");

const message = document.createElement("div");
const success = document.createElement("div");
const danger = document.createElement("div");

notifications = [message, success, danger];

notifications.forEach((n) => {
  n.classList.add("notification");
});

message.classList.add("info");
success.classList.add("success");
danger.classList.add("danger");

message.innerHTML = `

    <div>
    <ion-icon name="chatbubble-ellipses" class="icon"></ion-icon>
      <div>
        <h3>John Doe</h3>
        <p>Great thanks a lot for the quick reply!</p>
      </div>
      <ion-icon name="close-circle" class="close-btn"></ion-icon>
    </div>


`;
success.innerHTML = `

    <div>
    <ion-icon name="checkmark-done-circle" class="icon"></ion-icon>
      <div>
        <h3>Done thanks</h3>
        <p>You saved your changes</p>
      </div>
      <ion-icon name="close-circle" class="close-btn"></ion-icon>
    </div>


`;
danger.innerHTML = `

    <div>
      <ion-icon name="alert-circle" class="icon"></ion-icon>
      <div>
        <h3>Docs deleted</h3>
        <p>Documents deleted successfully!</p>
      </div>
      <ion-icon name="close-circle" class="close-btn"></ion-icon>
    </div>


`;

btns.forEach(btn => {
  btn.addEventListener("click",()=>{
    const id = btn.dataset.alert;
    const n = notifications[id].cloneNode(true)
    output.appendChild(n)
  })
});

window.addEventListener("animationend",e=>{
  if(e.target.classList.contains("notification")){
    e.target.remove()
  }
})

window.addEventListener("click",e=>{
  if(e.target.classList.contains("close-btn")){
    e.target.parentElement.parentElement.remove()
  }
})
