
const URL = "https://8be9-37-133-87-18.eu.ngrok.io";
// const URL = "http://localhost:3000"

export async function fetchEssays(usrData) {

    return await fetch(`${URL}/retrieve-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usrData.token}`
      },
      body: JSON.stringify({
        id: usrData.data.id,
      })
    })
      .then(response => response.text())
      .then(data => {
        console.log(JSON.parse(data))
        return JSON.parse(data);
      })
      .catch(error => {
        console.log(error)
        return { error: error }
      });
  }




  export async function createAccount(name,email,password) {
    console.log(name)
    console.log(email)

    console.log(password)

    return await fetch(`${URL}/create-account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      })
    })
      .then(response => response.text())
      .then(data => {   
        return JSON.parse(data);         
      })
      .catch(error => {
        console.log(error)
        return error 
      });
  }



export async function fetchLogin(email,password) {

    return await fetch(`${URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
      .then(response => response.text())
      .then(data => {
        
        // setResponse(JSON.parse(data))
        // setAlert(true)
        // console.log(response)
        localStorage.setItem("data",  JSON.stringify(JSON.parse(data)))
        return JSON.parse(data);
        // if (response.status == "success") {nav("/home")}

        
      })
      .catch(error => {
        return error;
        // setResponse(error)
      });
  }

export async function createEssay(token, formData) {

    return await fetch(`${URL}/create-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`

      },
      body: JSON.stringify({prompt: formData})
    })
      .then(response => response.text())
      .then(data => {console.log(data);})
      .catch(error => console.error(error));
  }