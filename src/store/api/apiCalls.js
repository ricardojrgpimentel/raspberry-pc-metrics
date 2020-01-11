class ApiCalls {
  static msiProperties() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    return fetch("http://localhost:8080/", requestOptions).then(response => {
      if (response.status === 200) {
        return response.text()
      }
      return response.json().then(response => { throw (response) })
    }).catch(error => {
      throw (error)
    })
  }
}

export default ApiCalls