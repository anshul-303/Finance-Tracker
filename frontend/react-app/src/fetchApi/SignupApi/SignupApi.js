import { ValidateSignUpCredentials } from "../../utilities/SignUpValidation/signupValidation";

export async function postSignUpData(
  name,
  email,
  password,
  navigate,
  setErrors
) {
  if (!ValidateSignUpCredentials(name, email, password, setErrors)) {
    //Returns false if even 1 of the condition for password, email or name is not valid .
    return;
  }
  try {
    const res = await fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      navigate("/login");
      // console.log(data);
    } else {
      console.error("Can't post the sign up data to server.");
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}
