
const URL = "https://4d79-37-133-87-18.eu.ngrok.io" ;
// const URL = "http://localhost:3001"

export async function fetchEssays(usrData) {
    return await fetch(`${URL}/retrieve-data`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: usrData.data.id,
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
  console.log(usrData)
  console.log(usrData.data.email)

  return await fetch(`${URL}/change-password`, {
    method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          data: { email: usrData.data.email, oldPassword: oldPassword, newPassword: newPassword}

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

// export async function handleFeedBack(subject, about) {
    
//   return await fetch(`${URL}/handle-feedback`, {
//     method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify({
//           subject: subject,
//           about: about
//         })
//       })
//         .then(response => response.text())
//         .then(data => {
//           console.log(JSON.parse(data))
//           return JSON.parse(data)
//         })
//         .catch(error => {
//           console.log(error)
//           return error

//         });
// } 
