function sendMail() {
  let params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    mobile: document.getElementById("mobile").value,
    message: document.getElementById("message").value,
  };

  const serviceID = "service_w50tomj";
  const templateID = "template_0c4h4b9";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("mobile").value = "";
      document.getElementById("message").value = "";
      console.log(res);

      let contactContent = document.getElementById("contact-form");
      contactContent.innerHTML =
        '<div style="width: 300px; height: 300px; color:green; padding:20px; margin: 0 auto; border-radius: 50%; border: 5px solid green; text-align: center;">' +
        '<svg id="tick-image" width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 12L10 22l-4-4" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>' + '<p>Message sent</p>'
        '</div>';
    })
    .catch((err) => console.log(err));
}



  const menuItems = document.querySelectorAll('.menu__item');

for (let menuItem of menuItems) {
  menuItem.addEventListener('click', () => {
    document.getElementById('menu__toggle').checked = false;
  });
}
