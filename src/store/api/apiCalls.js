class ApiCalls {
  static msiProperties() {
    var requestOptions = {
      method: 'GET',
    };

    return fetch("/data.json", requestOptions).then(response => {
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