
// const URL = "https://062b-37-133-87-18.ngrok-free.app"
// const URL = "http://localhost:3000"
const URL = "http://34.125.109.24"

export async function fetchEssays(usrData) {
    return await fetch(`${URL}/retrieve-data`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: "1",
      })
    })
      .then(response => response.text())
      .then(data => {
        return JSON.parse(data);
      })
      .catch(error => {
        console.log(error)
        return { error: error }
      });
  }




  export async function createAccount(name,email,password) {
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
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
       }),
      
    })
      .then(response => response.text())
      .then(data => {
        localStorage.setItem("data",  JSON.stringify(JSON.parse(data)))
        return JSON.parse(data);
      })
      .catch(error => {
        return error;
      });
  }

export async function createEssay(usrData, formData) {
    return await fetch(`${URL}/create_essay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({prompt: formData})
    },)
      .then(response => response.text())
      .then(data => {})
      .catch(error => console.error(error));
  }


export async function getConfig(usrData) {
  return await fetch(`${URL}/config`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',

    },
    credentials: 'include'
  
  },).then(async (r) => {
      
      const { publishableKey } = await r.json();
      return publishableKey;
    }).catch((error) => {console.log(error)});
}

export async function createPaymentIntent(usrData, plan, token) {
  return await fetch(`${URL}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      credentials: 'include',
      body: JSON.stringify({
        purchaser: {user: usrData, plan: plan}
      })
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      return clientSecret;
    });
}

export async function updateEssay(usrData, essay_id) {

      return await fetch(`${URL}/update-essay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          data: { essay_id: essay_id }

        })
      })
        .then(response => response.text())
        .then(data => {
        })
        .catch(error => {
          console.log(error)
        });

}


export async function changePassword(usrData,oldPassword,newPassword) {

  return await fetch(`${URL}/change-password`, {
    method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: usrData.data.email,
          oldPassword: oldPassword,
          newPassword: newPassword
        })
      })
        .then(response => response.text())
        .then(data => {
          return JSON.parse(data)
        })
        .catch(error => {
          console.log(error)
          return error

        });
}

export async function updateEssayFeedBack(essay_id, feedback) {
  return await fetch(`${URL}/essay_feedback`, {
    method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          feedback: feedback,
          essay_id: `${essay_id}`
        })
      })
        .then(response => response.text())
        .then(data => {
          console.log(JSON.parse(data))
          return JSON.parse(data)
        })
        .catch(error => {
          console.log(error)
          return error
        });
}


export async function forgotPassword(email) {
  return await fetch(`${URL}/forgot-password`, {
    method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: email
        })
      })
        .then(response => response.text())
        .then(data => {
          console.log(JSON.parse(data))
          return JSON.parse(data)
        })
        .catch(error => {
          console.log(error)
          return error
        });
}

export async function confirmForgotPassword(newPassword, token) {
  return await fetch(`${URL}/confirm-forgot-password`, {
    method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          newPassword: newPassword,
          token: token
        })
      })
        .then(response => response.text())
        .then(data => {
          console.log("respo")
          console.log(data)
          console.log(JSON.parse(data))
          return JSON.parse(data)
        })
        .catch(error => {
          console.log(error)
          return error
        });
}