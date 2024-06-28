document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();
  document.getElementById("loading").classList.remove("d-none");
  document.getElementById("unloading").classList.add("d-none");
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let company = document.getElementById("company").value;
  let mobile = document.getElementById("mobile").value;

  if (!name || !email || !company || !mobile) {
    alert("All fields are required!");
    return;
  }
  document.getElementById("loading").disabled = true;
  let formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("company", company);
  formData.append("mobile", mobile);

  let xhr = new XMLHttpRequest();
  const URl = "https://api.lluminantworks.com/api/add-lluminant-event-data";
  xhr.open("POST", URl, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const pareseData = JSON.parse(xhr.response);
      document.getElementById("success-message").innerHTML = pareseData.message;
      document.getElementById("success-message").classList.remove("d-none");
      document.getElementById("loading").classList.add("d-none");
      document.getElementById("unloading").classList.remove("d-none");
      setTimeout(function () {
        document.getElementById("success-message").classList.add("d-none");
      }, 10000);
      document.getElementById("name").value = '';
      document.getElementById("email").value = '';
      document.getElementById("company").value = '';
      document.getElementById("mobile").value = '';
    } else {
      const pareseData = JSON.parse(xhr.response);
      document.getElementById("error-message").innerHTML = pareseData.message;
      document.getElementById("error-message").classList.remove("d-none");
      document.getElementById("loading").classList.add("d-none");
      document.getElementById("unloading").classList.remove("d-none");
      setTimeout(function () {
        document.getElementById("error-message").classList.add("d-none");
      }, 10000);
    }
  };
  xhr.send(formData);
});
