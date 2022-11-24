$(document).ready(() => {
  const generate = () => {
    $.ajax({
      url: atob(
        "aHR0cHM6Ly9sYWJzLmJpYmxlLm9yZy9hcGkvP3Bhc3NhZ2U9cmFuZG9tJnR5cGU9anNvbiZjYWxsYmFjaz1teUNhbGxiYWNr"
      ),
      crossDomain: true,
      dataType: "jsonp",
      success: function (res) {
        let { bookname, chapter, text, verse } = res[0];
        let template = `<h2 style=" font-family: 'Tangerine', serif; text-shadow: 1px 1px 0 #000;">${bookname} ${chapter}: ${verse}<br><span id="text" style=" font-family: 'Tangerine', serif; text-shadow: 1px 1px 0 #000;"></span></h2>`;
        $("#verse_con").html(template);
        var i = 0;
        var txt = ` - ${text}`;
        var speed = 30;

        function typeWriter() {
          if (i < txt.length) {
            document.getElementById("text").innerHTML += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
          }
        }
        typeWriter();
      },
    });
  };
  //Generate random bible verses
  generate();
  setInterval(() => {
    generate();
  }, 15000);

  // auto scroll to bottom
  const scroll = () => {
    let msg_con = document.getElementById("msg-con");
    msg_con.scrollTop = msg_con.scrollHeight;
  };
  scroll();

  // When submit button was clicked
  $("form").submit((e) => {
    e.preventDefault();
    //message
    let msg = $("textarea").val().trim();

    //message template
    let div = document.createElement("div");
    let img = document.createElement("img");
    img.setAttribute("src", "img/149071.png");
    img.setAttribute("class", "rounded-circle shadow");
    img.setAttribute("style", "height: 50px; width: 50px;");
    let p = document.createElement("p");
    p.innerHTML = msg;
    div.setAttribute("class", "user-msg");

    //append message
    div.appendChild(img);
    div.appendChild(p);
    msg && $("#msg-con").append(div);

    // clear textarea
    $("textarea").val("");

    // scroll to bottom
    scroll();
  });

  // create message container
  const createMsg = (msg) => {
    let div = document.createElement("div");
    let img = document.createElement("img");
    img.setAttribute("src", "img/istockphoto-1221348467-612x612.jpg");
    img.setAttribute("class", "rounded-circle shadow");
    img.setAttribute("style", "height: 50px; width: 50px;");
    let p = document.createElement("p");
    p.innerHTML = msg;
    div.setAttribute("class", "msg");

    //append message
    div.appendChild(img);
    div.appendChild(p);
    $("#msg-con").append(div);
    scroll();
  };
  // AI messages
  let msg = [
    "Hello I'm a Chatbot AI, I'm here to help you. How was your day? I hope you're good.",
    `May I know your name?`,
  ];

  let name = null;

  $("#submit_btn").on("click", () => {
    let input = $("textarea").val().trim().toLowerCase().split(" ");

    // trace the name from input
    let isFound =
      input.indexOf(`im`) >= 0
        ? input.indexOf(`im`)
        : input.indexOf(`i'm`) >= 0
        ? input.indexOf(`i'm`)
        : input.indexOf(`i am`) >= 0
        ? input.indexOf(`i am`)
        : $("textarea").val().trim().toLowerCase().match("my name is")
        ? input.indexOf("is")
        : false;

    if (isFound && !name) {
      name = input[isFound + 1];

      // push new message
      msg.push(`Hello ${name}, nice meeting you! How are doing?`);
      setTimeout(() => {
        createMsg(msg[msg.length - 1]);
      }, 2000);
    } else {
      // check if name already provided then proceed to the next question
      if (name) {
        msg.push(
          `Wow! thats great ${name}! Can you tell me more about yourself?`
        );
        setTimeout(() => {
          createMsg(msg[msg.length - 1]);
        }, 2000);
      } else {
        // if name is not provided, push new message
        msg.push(`Sorry what's your name again?`);
        setTimeout(() => {
          createMsg(msg[msg.length - 1]);
        }, 2000);
      }
    }
  });

  // Generate reply
  let i = 0;
  function startConversation() {
    if (i < msg.length) {
      createMsg(msg[i]);
      i++;
      setTimeout(startConversation, 2000);
    }
  }

  startConversation();
});
