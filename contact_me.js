/**
 * ELEVATION Contact Form JavaScript
 * Handles EmailJS integration and form submission
 */

// Initialize EmailJS when the document is ready
document.addEventListener("DOMContentLoaded", () => {
  // Initialize EmailJS with your public key
  emailjs.init("SuV5EkTr2WBBcXHiw")

  // Add submit event listener to the contact form
  const contactForm = document.querySelector(".contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit)
  }

  /**
   * Handle form submission
   * @param {Event} e - The submit event
   */
  function handleFormSubmit(e) {
    e.preventDefault()

    // Get form values
    const name = document.getElementById("name").value.trim()
    const email = document.getElementById("email").value.trim()
    const phone = document.getElementById("phone").value.trim()
    const company = document.getElementById("company").value.trim()
    const message = document.getElementById("message").value.trim()

    // Check if required fields are filled
    if (!name || !email || !message) {
      showMessage("error", "Veuillez remplir tous les champs obligatoires.")
      return
    }

    // Prepare data for EmailJS
    const formData = {
      from_name: name,
      from_email: email,
      phone_number: phone,
      company: company,
      message: message,
    }

    // Disable submit button while sending
    const submitBtn = contactForm.querySelector('button[type="submit"]')
    setButtonState(submitBtn, true, "Envoi en cours...")

    // Send email using EmailJS
    emailjs
      .send("service_ldve3am", "template_q6ftpvg", formData)
      .then(() => {
        // Success
        showMessage("success", "Message envoyé avec succès!")
        contactForm.reset()
      })
      .catch((error) => {
        // Error
        showMessage("error", "Erreur lors de l'envoi du message. Veuillez réessayer.", error.text)
        console.error("EmailJS Error:", error)
      })
      .finally(() => {
        // Reset button state after a delay
        setTimeout(() => {
          setButtonState(submitBtn, false, "Envoyer")
        }, 1000)
      })
  }

  /**
   * Display a success or error message
   * @param {string} type - 'success' or 'error'
   * @param {string} message - The message to display
   * @param {string} [details] - Optional error details
   */
  function showMessage(type, message, details = "") {
    const successDiv = document.getElementById("success")
    if (!successDiv) return

    const alertClass = type === "success" ? "alert-success" : "alert-danger"
    let html = `
      <div class="alert ${alertClass}">
        <strong>${message}</strong>
      </div>
    `

    if (details) {
      html = html.replace("</div>", `<p>${details}</p></div>`)
    }

    successDiv.innerHTML = html

    // Scroll to the message if it's not visible
    successDiv.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }

  /**
   * Set button state (enabled/disabled)
   * @param {HTMLButtonElement} button - The button element
   * @param {boolean} disabled - Whether to disable the button
   * @param {string} text - The button text
   */
  function setButtonState(button, disabled, text) {
    if (!button) return
    button.disabled = disabled
    button.textContent = text
  }
})

/**
 * Toggle process steps in the "How it works" section
 * @param {number} step - The step number to toggle
 */
function toggleStep(step) {
  const content = document.getElementById("content" + step)
  const icon = document.getElementById("icon" + step)

  if (!content || !icon) return

  if (content.style.maxHeight) {
    content.style.maxHeight = null
    content.style.padding = "0 20px"
    icon.style.transform = "rotate(0deg)" // Reset arrow
  } else {
    content.style.maxHeight = content.scrollHeight + "px"
    content.style.padding = "10px 20px"
    icon.style.transform = "rotate(90deg)" // Rotate arrow
  }
}
