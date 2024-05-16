let loginDetails;
const errors = document.getElementById('errors');
async function login(e) {
  e.preventDefault();
  loginDetails = {
    mail: e.target.mail.value,
    password: e.target.password.value,
  };
  try {
    const login = await axios.post(
      `http://localhost:3000/user/login`,
      loginDetails
    );
    document.getElementById('mail').value = '';
    document.getElementById('password').value = '';
    alert(login.data.message);
  } catch (error) {
    if (error.response.status === 400) {
      return alert('Enter required details');
    }
    errors.innerHTML += `<li> Error code ${error.response.status}: ${error.response.data.error} </li>`;
  }
}