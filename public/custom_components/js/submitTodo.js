function getCookies() {
  var pairs = document.cookie.split(";");
  var cookies = {};
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split("=");
    cookies[(pair[0] + "").trim()] = unescape(pair.slice(1).join("="));
  }
  return cookies;
}
var submit = () => {
  var todoSubmit = [];
  console.log("Inside FOR");
  var todoList = document.getElementsByClassName("task");
  for (var i = 0, len = todoList.length; i < len; i++) {
    todoSubmit[i] = todoList[i].innerText.replace("\u00D7", "");
  }

  const url = "/todo";
  try {
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ list: todoSubmit }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((response) => {
        var cookie = getCookies();
        console.log(cookie.list);
        return response.json();
      })
      .then((result) => {
        const data = result;
        console.log(data);
      })
      .catch((err) => {
        location.assign("/login");
      });
  } catch (error) {
    location.assign("/login");
  }
};
function submitTask() {
  submit();
}
