console.log("Confirmation page loaded.")

console.log(
    "Stored data:",
    sessionStorage.getItem("formData")
);

const storedData =
    sessionStorage.getItem("formData");


    /*
if (!storedData) {

    window.location.href = "contact.html";

}

*/

const data =
    JSON.parse(storedData);


document.getElementById("confirm-name")
    .textContent =
    data.firstname + " " + data.lastname;


document.getElementById("confirm-address")
    .textContent =
    data.address + ", " +
    data.city + ", " +
    data.state + " " +
    data.zip;


document.getElementById("confirm-phone")
    .textContent =
    data.phone;


document.getElementById("confirm-email")
    .textContent =
    data.email;


document.getElementById("confirm-birthdate")
    .textContent =
    data.birthdate;


document.getElementById("confirm-message")
    .textContent =
    data.message;


    document
    .getElementById("confirm-submit")
    .addEventListener("click", function(){

        const subject =
        encodeURLComponent(
            "Website Contact form"
        );


        const body =
        encodeURLComponent(
            "Name: " +
            data.firstname +
            " " +
            data.lastname +
            "\n\n" +
            
            "Address: " +
            data.address +
            ", " +
            data.city +
            ", " +
            data.state +
            " " +
            data.zip +
            "\n\n" +

            "Phone: " +
            data.phone +
            "\n\n" +

            "Email: " +
            data.email +
            "\n\n" +

            "Birth Date: " +
            date.birthdate +
            "\n\n" +

            "Message:\n" +
            data.message
        );

        window.location.href =
        "malito:xavier_warner@daytonastate.edu" +
        "?subject" +
        "&body=" +
        body;
    });
