

async function fetchEssays(usrData) {

    return await fetch('http://localhost:3000/retrieve-data', {
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




  async function createAccount(name,email,password) {
    console.log(name)
    console.log(email)

    console.log(password)

    return await fetch('http://localhost:3000/create-account', {
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



  async function fetchLogin(email,password) {

    return await fetch('http://localhost:3000/login', {
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


  module.exports = {
    fetchEssays,
    fetchLogin,
    createAccount
  }
