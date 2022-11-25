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

    let isFound =
      input.indexOf(`im`) >= 0
        ? input.indexOf(`im`)
        : (input.indexOf(`i'm`) >= 0
        ? input.indexOf(`i'm`)
        : (input.indexOf(`i am`) >= 0
        ? input.indexOf(`i am`)
        : ($("textarea").val().trim().toLowerCase().match("my name is")
        ? input.indexOf("is")
        : false)));
    
    if (isFound >= 0 && typeof isFound != "boolean" && !name) {
      name = input[isFound + 1];

      // push new message
      msg.push(`Hello ${name}, nice meeting you! How are doing?`);
      setTimeout(() => {
        createMsg(msg[msg.length - 1]);
      }, 2000);
    } else {
      if (name) {
        // check if name already provided then proceed to the next question
        const msgIncludes = (_msg) => {
          if (!msg.includes(_msg)) {
            msg.push(_msg);
            setTimeout(() => {
              createMsg(msg[msg.length - 1]);
            }, 2000);
          } else {
          }
        };
        msgIncludes(`Wow! thats great ${name}!`);
        setTimeout(() => {
          msgIncludes(
            `Uhmm.. ${name} I have something to share with you. Do you want to know it?`
          );
        }, 2000);
        let _msg = input.join("").toLowerCase();
        if (/ye/i.test(_msg) || /sure/i.test(_msg) || /ok/i.test(_msg)) {
          msgIncludes(
            `You know ${name}, God is always ready to listen anytime you are ready to talk to him. Prayer is simply talking with God`
          );

          setTimeout(() => {
            msgIncludes(
              `Talk with God, no breath is lost. Walk with God, no strength is lost. Wait for God, no time is lost. Trust in God, you will never be lost`
            );

            setTimeout(() => {
              msgIncludes(
                `Bible says on 2 Corinthians 1:3 “Blessed be the God and Father of our Lord Jesus Christ, the Father of mercies and God of all comfort.”`
              );
              setTimeout(() => {
                msgIncludes(
                  `You know ${name}, we are not born on this earth to eat and sleep. We are here to to serve our God, our savior and our Lord`
                );

                setTimeout(() => {
                  msgIncludes(
                    `You know every one of us have different problems, different situations but bible says on 1 Corinthians 10: 13,  “There hath no temptation taken you but such as is common to man: but God is faithful, who will not suffer you to be tempted above that ye are able; but will with the temptation also make a way to escape, that ye may be able to bear it.”`
                  );
                }, 4000);
              }, 4000);
            }, 4000);
          }, 2000);
        }
      } else {
        // if name is not provided, push new message
        if(!name && $('textarea').val()) {
          msg.push(`Sorry what's your name again?`);
          setTimeout(() => {
            createMsg(msg[msg.length - 1]);
          }, 2000);
        }
      }
    }
    $("textarea").focus();
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

  setTimeout(() => {
    startConversation();
  }, 1000);
});
