console.log("Confirmation page loaded.");

const storedData =
sessionStorage.getItem("formData");

console.log(
"Stored data:",
storedData
);

// If no form data exists, return to contact page
if (!storedData) {

window.location.href = "contact.html";

} else {

// Convert stored text back into a JavaScript object
const data =
    JSON.parse(storedData);


// Display name
document.getElementById("confirm-name")
    .textContent =
    data.firstname + " " + data.lastname;


// Display address
document.getElementById("confirm-address")
    .textContent =
    data.address + ", " +
    data.city + ", " +
    data.state + " " +
    data.zip;


// Display phone
document.getElementById("confirm-phone")
    .textContent =
    data.phone;


// Display email
document.getElementById("confirm-email")
    .textContent =
    data.email;


// Display birth date
document.getElementById("confirm-birthdate")
    .textContent =
    data.birthdate;


// Display message
document.getElementById("confirm-message")
    .textContent =
    data.message;



// CONFIRM AND SEND BUTTON
document
    .getElementById("confirm-submit")
    .addEventListener("click", function () {


        const subject =
            encodeURIComponent(
                "Website Contact Form"
            );


        const body =
            encodeURIComponent(

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
                data.birthdate +
                "\n\n" +

                "Message:\n" +
                data.message

            );


        window.location.href =
            "mailto:xavier_warner@daytonastate.edu" +
            "?subject=" +
            subject +
            "&body=" +
            body;

    });

}
