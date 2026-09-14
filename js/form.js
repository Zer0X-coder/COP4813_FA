const form = document.getElementById("contact-form");
const form = document.getElementById("phone");

//=================================================
// Phone number Input
// format
//=================================================


phone.addEventListener("input", function () {

    // Remove non-number
    let numbers = phone.value.replace(/\D/g,"");

    //
    if(numbers.length > 6) {

        phone.value =
        "(" +
        numbers.substring(0, 3) +
        ")" +
        numbers.substring(3, 6) +
        "-" +
        numbers.substring(6);
    }
    else if (numbers.length > 3) {

        phone.value =
        "(" +
        numbers.substring(0,3) +
        ")" +
        numbers.substring(3);

    }
    else if (numbers.length > 0) {

        phone.value =
        "(" +
        numbers;

    }
    else {
        phone.value = "";
    }
    
});

    // ==========================================
// FORM SUBMISSION
// ==========================================

form.addEventListener("submit", function (event) {

    // Prevent the form from submitting immediately
    event.preventDefault();


    // Assume the form is valid at first
    let valid = true;


    // ======================================
    // CLEAR PREVIOUS ERROR MESSAGES
    // ======================================

    document.querySelectorAll(".error").forEach(function (error) {

        error.textContent = "";

    });


    // ======================================
    // GET FORM VALUES
    // ======================================

    const firstname =
        document.getElementById("firstname").value.trim();

    const lastname =
        document.getElementById("lastname").value.trim();

    const address =
        document.getElementById("address").value.trim();

    const city =
        document.getElementById("city").value.trim();

    const state =
        document.getElementById("state").value;

    const zip =
        document.getElementById("zip").value.trim();

    const phoneValue =
        document.getElementById("phone").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const birthdate =
        document.getElementById("birthdate").value;

    const message =
        document.getElementById("message").value.trim();

    const confirm =
        document.getElementById("confirm").value.trim();


    // ======================================
    // FIRST NAME VALIDATION
    // ======================================

    if (firstname === "") {

        document.getElementById("firstname-error")
            .textContent = "First name is required.";

        valid = false;

    }


    // ======================================
    // LAST NAME VALIDATION
    // ======================================

    if (lastname === "") {

        document.getElementById("lastname-error")
            .textContent = "Last name is required.";

        valid = false;

    }


    // ======================================
    // STREET ADDRESS VALIDATION
    // ======================================

    const addressPattern =
        /^\d+\s+[A-Za-z0-9\s.'#-]+$/;

    if (!addressPattern.test(address)) {

        document.getElementById("address-error")
            .textContent =
            "Enter a valid street number and street name.";

        valid = false;

    }


    // ======================================
    // CITY VALIDATION
    // ======================================

    const cityPattern =
        /^[A-Za-z\s.'-]+$/;

    if (!cityPattern.test(city)) {

        document.getElementById("city-error")
            .textContent =
            "Enter a valid city name.";

        valid = false;

    }


    // ======================================
    // STATE VALIDATION
    // ======================================

    if (state === "") {

        document.getElementById("state-error")
            .textContent =
            "Please select a state.";

        valid = false;

    }


    // ======================================
    // ZIP CODE VALIDATION
    // Accepts:
    // 32725
    // or
    // 32725-1234
    // ======================================

    const zipPattern =
        /^\d{5}(-\d{4})?$/;

    if (!zipPattern.test(zip)) {

        document.getElementById("zip-error")
            .textContent =
            "Enter a valid ZIP code.";

        valid = false;

    }


    // ======================================
    // PHONE NUMBER VALIDATION
    // Required format: (000)000-0000
    // ======================================

    const phonePattern =
        /^\(\d{3}\)\d{3}-\d{4}$/;

    if (!phonePattern.test(phoneValue)) {

        document.getElementById("phone-error")
            .textContent =
            "Enter a complete 10-digit phone number.";

        valid = false;

    }


    // ======================================
    // EMAIL VALIDATION
    // Expected format:
    // name@domain.extension
    // ======================================

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        document.getElementById("email-error")
            .textContent =
            "Enter a valid email address.";

        valid = false;

    }


    // ======================================
    // BIRTH DATE VALIDATION
    // ======================================

    if (birthdate === "") {

        document.getElementById("birthdate-error")
            .textContent =
            "Birth date is required.";

        valid = false;

    } else {

        const birthDateValue =
            new Date(birthdate + "T00:00:00");

        const today =
            new Date();


        // Check for invalid date
        if (isNaN(birthDateValue.getTime())) {

            document.getElementById("birthdate-error")
                .textContent =
                "Enter a valid birth date.";

            valid = false;

        }

        // Check for a future birth date
        else if (birthDateValue > today) {

            document.getElementById("birthdate-error")
                .textContent =
                "Birth date cannot be in the future.";

            valid = false;

        }

    }


    // ======================================
    // MESSAGE VALIDATION
    // ======================================

    if (message === "") {

        document.getElementById("message-error")
            .textContent =
            "Please enter a message.";

        valid = false;

    }


    // ======================================
    // SECURITY QUESTION
    // Question: What is 4 + 3?
    // ======================================

    if (confirm !== "7") {

        document.getElementById("confirm-error")
            .textContent =
            "Security answer is incorrect.";

        valid = false;

    }


    // ======================================
    // IF ALL INFORMATION IS VALID
    // ======================================

    if (valid) {

        // Put all form information into one object
        const formData = {

            firstname: firstname,
            lastname: lastname,
            address: address,
            city: city,
            state: state,
            zip: zip,
            phone: phoneValue,
            email: email,
            birthdate: birthdate,
            message: message

        };


        // Temporarily save the information
        // inside the browser
        sessionStorage.setItem(
            "formData",
            JSON.stringify(formData)
        );
        
        console.log("Saved data:");
        console.log(sessionStorage.getItem("formData"));


        // Go to the confirmation page
        window.location.href =
            "confirmation.html";

    }

});




