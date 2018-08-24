$(document).ready(function () {
  const LOCAL_API_CREATE_URL = '/api/users'

  function ShowLoginSelection () {
    $('#loginScreenSelect').on('click', function (e) {
      e.preventDefault()
      $('#create-account-form').fadeOut(500, function (e) {
        $('#login-form').fadeIn(500)
      })
    })
  }

  function ShowCreateAccSelection () {
    $('#createAccScreenSelect').on('click', function (e) {
      e.preventDefault()
      $('#login-form').fadeOut(500, function (e) {
        $('#create-account-form').fadeIn(500)
      })
    })
  }

  function requestCreateAccount (username, password, email, callback) {
    const query =
    {
      username: `${username}`,
      password: `${password}`,
      email: `${email}`
    }

    const settings =
    {
      url: LOCAL_API_CREATE_URL,
      data: JSON.stringify(query),
      contentType: 'application/json',
      dataType: 'json',
      type: 'POST',
      success: callback
    // header: {Authorization: `Bearer $`}
    }

    $.ajax(settings)
  }

  // REQUESTS SERVER FOR LOGIN
  function requestLoginAccount (username, password, callback) {
    const query = {
      username: `${username}`,
      password: `${password}`
    }

    const auth = localStorage.getItem('authToken')

    const settings =
    {
      url: '/api/auth/login',
      data: JSON.stringify(query),
      contentType: 'application/json',
      dataType: 'json',
      type: 'POST',
      success: callback,
      header: {Authorization: `Bearer ${auth}`}
    }

    $.ajax(settings)
  }

  function checkJwtHome (callback, errorCallBack) {
    const auth = localStorage.getItem('authToken')
    const settings =
    {
      url: '/auth/',
      type: 'GET',
      contentType: 'application/json',
      dataType: 'json',
      success: callback,
      error: errorCallback,
      header: {Authorization: `Bearer ${auth}`}
    }
    $.ajax(settings)
  }

  function checkJwtAbout (callback, errorCallBack) {
    const auth = localStorage.getItem('authToken');

    console.log(auth);

    const settings =
    {
      url: '/auth/about',
      type: 'GET', 
      contentType: 'application/json',
      dataType: 'json',
      success: function(e){console.log('success!')},
      error: function(e){console.log('failure :(')},
      headers: {Authorization: `Bearer ${auth}`}
    }

    $.ajax(settings)
  }

  function watchNavAuthBtns () {
    // $('#logoBtn').click(event => {
    //   checkJWT(function (e) {
    //     window.location.href = '/'
    //   }, function (e) {
    //     window.location.href = 'index.js'
    //   })
    // })

    // $('#homeBtn').click(event => {
    //   checkJWT(function (e) {
    //     window.location.href = '/dashboard'
    //   }, function (e) {
    //     window.location.href = '/index.html'
    //   })
    // })

    $('#aboutBtn').click(event => {

        console.log('hai');
      checkJwtAbout(function (e) {
        // window.location.href = '/authenticated/about'
        console.log(e);
        console.log('Success!');

      }, function (e) {
        // window.location.href = '/about.html'
        console.log(e);
        console.log('you got logged out :(');
      })
    })

    // $('#contactBtn').click(event => {
    //   checkJWT(function (e) {
    //     window.location.href = '/auth/contact'
    //   }, function (e) {
    //     window.location.href = '/contact.html'
    //   })
    // })

  // $('#signOutBtn').click(event => {
  //   checkJWT(function (e) {
  //     window.location.href = '/dashboard'
  //   }, function (e) {
  //     window.location.href = '/about.html'
  //   })
  // })
  }

  // WATCHES THE CREATE ACCOUNT SUBMIT BUTTON
  function watchCreateSubmit () {
    $('#create-account-form').submit(event => {
      event.preventDefault()
      const targetOne = $(event.currentTarget).find('#username-form-create')
      const targetTwo = $(event.currentTarget).find('#password-form-create')
      const targetThree = $(event.currentTarget).find('#email-form-create')

      const queryOne = targetOne.val()
      const queryTwo = targetTwo.val()
      const queryThree = targetThree.val()

      targetOne.val('')
      targetTwo.val('')
      targetThree.val('')

      requestCreateAccount(queryOne, queryTwo, queryThree, function (e) {
        $('#create-account-btn').fadeOut(500, function (e) {
          $('#createSuc').fadeIn(500)
        })
      })
    })
  }

  // $('#login-account-btn').click(console.log('clicked!'))

  function watchLoginSubmit () {
    $('#login-form').submit(event => {
      event.preventDefault()

      const targetOne = $(event.currentTarget).find('#username-form-login')
      const targetTwo = $(event.currentTarget).find('#password-form-login')

      const queryOne = targetOne.val()
      const queryTwo = targetTwo.val()

      targetOne.val('')
      targetTwo.val('')

      requestLoginAccount(queryOne, queryTwo, function () {
        window.location.href = '/dashboard'
      })
    })
  }

  function init () {
    $(ShowLoginSelection)
    $(ShowCreateAccSelection)
    $(watchCreateSubmit)
    $(watchLoginSubmit)
    $(watchNavAuthBtns)
  }

  $(init)

  //   $.ajax({
  //     url: "http://localhost:8080/",
  //     type: 'GET',
  //     // Fetch the stored token from localStorage and set in the header
  //     headers: {"Authorization": localStorage.getItem('token')}
  //   })

})
