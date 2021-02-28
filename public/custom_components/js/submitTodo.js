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
  var newList = [];
  var checkedList = [];
  console.log("Inside FOR");
  var taskList = document.getElementsByClassName("task");
  for (var i = 0; i < taskList.length; i++) {
    newList[i] = taskList[i].innerText.replace("\u00D7", "");
  }
  var checkList = document.getElementsByClassName("checked");
  for (var i = 0; i < checkedList.length; i++) {
    checkedList[i] = checkList[i].innerText.replace("\u00D7", "");
    checkedList[i] = checkedList[i].substr(0, checkedList[i].length - 2);
  }

  const url = "/todo";
  try {
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ list: newList, checked: checkedList }),
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
