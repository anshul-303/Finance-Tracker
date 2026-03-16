import { validateLoginCredentials } from "../../utilities/LoginValidation/loginValidation";

export async function postLoginData(
  email,
  password,
  navigate,
  setIsLoggedIn,
  setErrors
) {
  //not valid email, incorrect password,incorrect , user not found

  if (!validateLoginCredentials(email, password, setErrors)) {
    return;
  }

  try {
    const newErrors = { email: "", password: "" };

    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (res.ok) {
      // const data = await res.json();
      setIsLoggedIn(true);
      navigate("/dashboard");
    } else if (res.status === 401) {
      const data = await res.json();
      // window.alert(data.message);
      newErrors.password = data.message;
    } else if (res.status === 404) {
      const data = await res.json();
      newErrors.email = data.message;
    }
    setErrors(newErrors);
  } catch (error) {
    console.log("Error detected :", error);
  }
}
