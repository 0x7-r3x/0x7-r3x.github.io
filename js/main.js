const $ = id => document.getElementById(id);

const before = $("before"),
      liner = $("liner"),
      command = $("typer"),
      textarea = $("texter"),
      terminal = $("terminal");

let history = [], pos = 0, passMode = false, passOK = false;

setTimeout(() => {
  printLines(banner, "", 80);
  textarea.focus();
}, 100);

window.addEventListener("keyup", handleKey);

console.log("%c find the password! :\\", "color: #04ff00; font-weight: bold; font-size: 24px;");
console.log("%cPassword: '" + password + "' - I wonder what it does? 🤔", "color: grey");

textarea.value = "";
command.innerHTML = textarea.value;

function handleKey(e) {
  if (e.keyCode === 181) location.reload();

  if (passMode) {
    command.innerHTML = "*".repeat(textarea.value.length);
    passOK = textarea.value === password;

    if (e.keyCode === 13) {
      if (passOK) {
        printLines(secret, "color2 margin", 120);
      } else {
        addLine("Wrong password", "error", 0);
      }
      resetInput();
    }
  } else {
    if (e.keyCode === 13) {
      const cmd = command.innerHTML.trim().toLowerCase();
      history.push(cmd);
      pos = history.length;
      addLine("b0t@aihx.dev:~$ " + cmd, "no-animation", 0);
      execute(cmd);
      resetInput();
    }
    if (e.keyCode === 38 && pos > 0) {
      textarea.value = history[--pos];
      command.innerHTML = textarea.value;
    }
    if (e.keyCode === 40 && pos < history.length) {
      textarea.value = history[++pos] || "";
      command.innerHTML = textarea.value;
    }
  }
}

function resetInput() {
  command.innerHTML = "";
  textarea.value = "";
  passMode = passOK = false;
  liner.classList.remove("password");
}

function execute(cmd) {
  switch (cmd) {
    case "help":     printLines(help, "color2 margin", 80); break;
    case "whois":    printLines(whois, "color2 margin", 80); break;
    case "whoami":   printLines(whoami, "color2 margin", 80); break;
    case "video":    openLink("Opening YouTube...", youtube); break;
    case "x":        openLink("Opening X...", x); break;
    case "linkedin": openLink("Opening LinkedIn...", linkedin); break;
    case "instagram":openLink("Opening Instagram...", instagram); break;
    case "github":   openLink("Opening GitHub...", github); break;
    case "social":   printLines(social, "color2 margin", 80); break;
    case "projects": printLines(projects, "color2 margin", 80); break;
    case "banner":   printLines(banner, "", 80); break;
    case "clear":    terminal.innerHTML = '<a id="before"></a>'; break;
    case "email":    openLink("Opening email...", email); break;
    case "history":  printLines(["<br>", ...history, "<br>"], "color2", 80); break;
    case "password": addLine("Lol! You're joking, right? Try harder. 😂", "error", 100); break;
    case "sudo":
      addLine("Oh no, you're not admin...", "color2", 80);
      setTimeout(() => window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ"), 1000);
      break;
    case "secret":
      liner.classList.add("password");
      passMode = true;
      break;
    case "youtube": openLink("Opening YouTube...", youtube); break;
    default:
      addLine(`Command not found. Try <span class="command">'help'</span>.`, "error", 100);
  }
}

function openLink(msg, url) {
  addLine(msg, "color2", 80);
  setTimeout(() => window.open(url, "_blank"), 500);
}

function addLine(text, style = "", time = 0) {
  let html = "";
  for (let i = 0; i < text.length; i++) {
    html += (text[i] === " " && text[i + 1] === " ") ? "&nbsp;&nbsp;" : text[i];
  }
  setTimeout(() => {
    const line = document.createElement("p");
    line.innerHTML = html;
    line.className = style;
    before.parentNode.insertBefore(line, before);
    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function printLines(lines, style = "", delay = 80) {
  lines.forEach((line, i) => addLine(line, style, i * delay));
}
