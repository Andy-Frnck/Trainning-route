const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

function checkPasswordMatch(input1, input2) {
  if (input1 !== input2) {
    showError(input2, "password does not match");
    return false;
  }
  return true;
}
function checkEmail(email) {
  const emailRegex = /^[^\s@]+@[^s@]+\.[^\s@]+$/;

  if (emailRegex.test(email.value.trim())) {
    showSuccess(email);
    return true;
  } else {
    showError(email, `Email is not valid`);
    return false;
  }
}
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${formatFieldName(input)} must be at least ${min} characters`,
    );
    return false;
  } else if (input.value.length > max) {
    showError(
      input,
      `${formatFieldName(input)} must not be longer than ${max} characters`,
    );
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isRequiredValid = checkRequired([
    username,
    email,
    password,
    confirmPassword,
  ]);

  let isFormValid = isRequiredValid;

  if (isRequiredValid) {
    const isUsernameValid = checkLength(username, 3, 20);
    const isEmailValid = checkEmail(email);
    console.log(isEmailValid)
    const isPasswordValid = checkLength(password, 6, 30);
    const isPasswordMatch = checkPasswordMatch(password, confirmPassword);

    isFormValid =
      isUsernameValid && isEmailValid && isPasswordMatch && isPasswordValid;
  }

  if (isFormValid) {
    alert("registration successful");
    form.reset();

    document.querySelectorAll(".form-group").forEach((group) => {
      group.className = "form-group";
    });
  }
});

/**
 * check if all informations are entered
 * @param {*} inputArray are all inputs
 * @returns boolean
 */
function checkRequired(inputArray) {
  let isValid = true;
  inputArray.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${formatFieldName(input)} is required`);
      isValid = false;
    } else {
      showSuccess(input);
    }
  });
  return isValid;
}

/**
 * Format field name with proper Captilazation
 */
function formatFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function showError(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group error";
  const small = formGroup.querySelector("small");
  small.innerText = message;
}
function showSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group success";
  const small = formGroup.querySelector("small")
  small.innerText = ""
}