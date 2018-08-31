$(document).ready(function () {
  const LOCAL_API_CREATE_URL = '/api/users'
  const GOOGLE_CLIENT_ID = '89833703730-q99g26m9i2silsvrap9ajdcuv1r7jcao.apps.googleusercontent.com';
  const GOOGLE_SECRET_ID = 'ZYtVRayhPK0faphjnVCpYyu6';
  const FAT_API_REST_KEY = '41b943fd6f7f479b913c569598d51c04';


  function showLoginSelection () {
    $('#loginScreenSelect').on('click', function (e) {
      e.preventDefault()
      $('#create-account-form').fadeOut(500, function (e) {
        $('#login-form').fadeIn(500)
      })
    })
  }

  function showCreateAccSelection () {
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
      url: '/api/users',
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


  function checkAuth(callback, errorCallBack){
    const auth = localStorage.getItem('authToken');

    const settings =
    {
      url: '/checkAuth',
      type: 'GET',
      contentType: 'application/json',
      success: callback,
      error: errorCallBack,
      header: {Authorization: `Bearer ${auth}`}
    }
    $.ajax(settings)
  }

  function checkJwtHome (callback, errorCallBack) {
    const auth = localStorage.getItem('authToken');
    console.log(auth);

    const settings =
    {
      url: '/dashboard',
      type: 'GET',
      contentType: 'application/json',
      success: callback,
      error: errorCallBack
      // header: {Authorization: `Bearer ${auth}`}
    }
    $.ajax(settings)
  }

  function checkJwtAbout (callback, errorCallBack) {
    const auth = localStorage.getItem('authToken');

    const settings =
    {
      url: '/authenticated/about',
      type: 'GET',
      contentType: 'application/json',
      success: callback,
      error: errorCallBack,
      headers: {Authorization: `Bearer ${auth}`}
    }

    $.ajax(settings)
  }

  function checkJwtContact (callback, errorCallBack) {
    const auth = localStorage.getItem('authToken');

    const settings =
    {
      url: '/authenticated/contact',
      type: 'GET',
      contentType: 'application/json',
      success: callback,
      error: errorCallBack,
      headers: {Authorization: `Bearer ${auth}`}
    }
    $.ajax(settings)
  }

  function checkJwtFoodCalc (callback, errorCallBack) {
    const auth = localStorage.getItem('authToken');

    const settings =
    {
      url: '/authenticated/foodcalc',
      type: 'GET',
      contentType: 'application/json',
      success: callback,
      error: errorCallBack,
      headers: {Authorization: `Bearer ${auth}`}
    }

    $.ajax(settings)
  }

  function watchNavAuthBtns () {

    $('#logoBtn').click(event => {
      checkJwtHome(function (response) {
        $('body').html(response)
      }, function (response) {
        window.location.href = '/index.html'
      })
    })

    $('#homeBtn').click(event => {
      checkJwtHome(function (response) {
        $('body').html(response)
      }, function (response) {
        console.log('failure! :(');
        // window.location.href = '/index.html'
      })
    })

    $('#aboutBtn').click(event => {
      checkJwtAbout(function (response) {
        console.log(response);
        // window.location.href = response;
        // $('body').html(response)
      }, function (response) {
        window.location.href = '/about'
      })
    })

    $('#healthBtn').click(event => {

      // console.log('hai');

      checkJwtFoodCalc(function (response) {
        $('body').html(response)
      }, function (response) {
        // console.log('ERROR!');
        window.location.href = '/contact.html'
      })
    })

    $('#contactBtn').click(event => {
      checkJwtContact(function (response) 
      {
        // window.location = response;
        // $('body').html(response)
      }, function (response) {
        // console.log('ERROR!');
        window.location.href = '/contact.html'
      })
    })

    // REDIRECTS USER TO LOGIN PAGE AND REMOVES LOCAL STORAGE(JWT)
    $('#signOutBtn').click(event => {
      localStorage.removeItem("authToken");
      window.location.href = '/index.html';
    })

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

  function watchLoginSubmit () {
    $('#login-form').submit(event => {
      event.preventDefault()

      const targetOne = $(event.currentTarget).find('#username-form-login')
      const targetTwo = $(event.currentTarget).find('#password-form-login')

      const queryOne = targetOne.val()
      const queryTwo = targetTwo.val()

      targetOne.val('')
      targetTwo.val('')

      requestLoginAccount(queryOne, queryTwo, function (response) {
        
        localStorage.setItem("authToken", response.authToken);
        window.location.href = '/dashboard'
      })
    })
  }

  function init () {
    $(showLoginSelection)
    $(showCreateAccSelection)
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

});
