const uri = "https://jsonplaceholder.typicode.com/posts";
const initDetails = {
  method: "get",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  mode: "cors",
};

function getData() {
  fetch(uri, initDetails)
    .then((response) => {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }

      console.log(response.headers.get("Content-Type"));
      return response.json();
    })
    .then((myJson) => {
      console.log(JSON.stringify(myJson));
    })
    .catch((err) => {
      console.log("Fetch Error :-S", err);
    });
}

window.onload = function () {
  let myButton = document.getElementById("getData");
  myButton.addEventListener("click", getData);
};

for (var i = 0, len = todoSubmit.length; i < len; i++) {
  console.log(todoSubmit[i]);
}




//////////////////
<% if (user) { %>
  <script src="custom_components/js/submitTodo.js"></script>
  <% } %>