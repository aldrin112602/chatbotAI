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

  const clickOption = function () {
    $("textarea").val(this.innerHTML);
    $("#submit_btn").click();
    this.parentElement.parentElement.style.pointerEvents = "none";
  };

  const createOptions = (options) => {
    // exepct that the option is a string
    let opts = options.split(",");
    let div = document.createElement("div");

    div.setAttribute(
      "class",
      "d-flex aign-items-center justify-content-center flex-wrap flex-direction-column p-3"
    );
    opts.forEach((v) => {
      let btn = document.createElement("button");
      btn.setAttribute("class", "btn btn-light btn-block mx-3 my-1");
      btn.setAttribute("type", "button");
      btn.innerHTML = v;
      btn.addEventListener("click", clickOption);
      let div_btn_con = document.createElement("div");
      div_btn_con.setAttribute("class", "d-grid");
      div_btn_con.appendChild(btn);
      div.appendChild(div_btn_con);
    });

    $("#msg-con").append(div);
    scroll();
  };

  const _createOptions = (options) => {
    setTimeout(() => {
      if (!msg.includes(options)) {
        msg.push(options);
        createOptions(options);
      }
    }, 3000);
  };

  $("#submit_btn").on("click", () => {
    let input = $("textarea").val().trim().toLowerCase().split(" ");

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

    if (isFound >= 0 && typeof isFound != "boolean" && !name) {
      name = input[isFound + 1].split('').map((l, i) => (i == 0) ? l.toUpperCase() : l).join('');

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
          msgIncludes(`in case you need this words or verse`);
        }, 2000);

        setTimeout(() => {
          msgIncludes(
            `Uhmm.. ${name} I have something to share with you. Do you want to know it?`
          );

          _createOptions("YES, SOMETHING ELSE");
        }, 5000);

        let _msg = input.join("").toLowerCase();
        if (
          (/ye/i.test(_msg) || /sure/i.test(_msg) || /ok/i.test(_msg)) &&
          $("textarea").val().toLowerCase().trim() != "yes!" && 
          $("textarea").val().toLowerCase().trim() != "sure!"
        ) {
          msgIncludes(
            `
            You know ${name}, God is always ready to listen anytime you are ready to talk to him. Prayer is simply talking with God`
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
                  setTimeout(() => {
                    msgIncludes(`Today, these are God's chosen words for you. This might be the word you're looking for and needs to read right now. 
                    `);
                  }, 5000);
                }, 4000);
              }, 4000);
            }, 4000);
          }, 2000);
        } else {
          switch ($("textarea").val().toLowerCase().trim()) {
            case "something else":
              setTimeout(() => {
                msgIncludes(
                  `I think you came here for a reason. How can I help you? You can choose an answer below. `
                );
                _createOptions(
                  "STAY POSITVE, REFRAME THOUGHTS, TRY SOMETHING ELSE"
                );
              }, 2000);
              break;

            case "stay positve":
              setTimeout(() => {
                msgIncludes(`Okay`);
                setTimeout(() => {
                  msgIncludes(
                    `Clear your mind and try to think of the positve things in your life right now.`
                  );
                  setTimeout(() => {
                    msgIncludes(
                      `Tell me the first thing that come into your mind, ${name}.`
                    );
                    _createOptions("EXAMPLE?");
                  }, 3000);
                }, 2000);
              }, 1000);
              break;
            case "example?":
              setTimeout(() => {
                msgIncludes(
                  `Gratittude helps us shift our focus to the silver lining that we've got in our lives.`
                );
                setTimeout(() => {
                  msgIncludes(
                    `For example, being grateful for even a simple, everyday thing living like food we eat or the place we live in, can vastly improve our daily outlook.`
                  );
                  setTimeout(() => {
                    msgIncludes(`Would you like to try this and see?`);
                    _createOptions("Yes!, Not now");
                  }, 3000);
                }, 2000);
              }, 1000);
              break;
            case 'yes!':
              setTimeout(() => {
                msgIncludes(`Alright!`);
                setTimeout(() => {
                  msgIncludes(
                    `${name}, tell me, what's something that you feel appreciated of?`
                  );
                }, 2000);
              }, 1000);
              break;

            case 'not now':
              setTimeout(() => {
                msgIncludes(`Alright!`);
                setTimeout(() => {
                  msgIncludes(
                    `So any way ${name}, How can I help you?`
                  );
                }, 2000);
              }, 1000);
              break;
            case 'reframe thoughts':
              setTimeout(() => {
               msgIncludes(`We're going to look at some of your thoughts that cause stress, and try to replace them with more useful thoughts.`);
               
               setTimeout(() => {
                msgIncludes(`This is like a mind gym and we're now on session no. 1! Ready to start?`);
                
                _createOptions('Sure!, How does this work?');
               }, 2000);
              }, 1000);
              break;
            case 'sure!':
              setTimeout(() => {
               msgIncludes(`Tell me about a situation that upset you recently.`);
               
               setTimeout(() => {
                msgIncludes(`Something that stayed in your mind long after it was over.`);
                
               }, 2000);
              }, 1000);
              
              break;
            default:
              /*setTimeout(() => {
               msgIncludes(`What other things are you grateful for in your life right now?`);
                _createOptions("Nothing!, That's it");
               }, 3000);*/
              console.log('default')
              break;
          }
        }
      } else {
        // if name is not provided, push new message
        if (!name && $("textarea").val()) {
          msg.push(`Sorry what's your name again?`);
          setTimeout(() => {
            createMsg(msg[msg.length - 1]);
          }, 2000);
        } else {
          
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
