$(document).ready(() => {
    $("#contactForm").on("submit", async (event) => {
        event.preventDefault()
        const emailAddress = $("#emailAddress").val();
        const subject = $("#subject").val();
        const message = $("#message").val();

        let response = await fetch("/contacts/message", {
            method:"POST",
            headers:{
                "Content-Type": "application/json"  
            },
            body: JSON.stringify({emailAddress, subject, message})   
        })
        console.log(response);
    });
})
