$(document).ready(function () {
  const LOCAL_API_CREATE_URL = '/api/users'
  const GOOGLE_CLIENT_ID = '89833703730-q99g26m9i2silsvrap9ajdcuv1r7jcao.apps.googleusercontent.com'
  const GOOGLE_SECRET_ID = 'ZYtVRayhPK0faphjnVCpYyu6'
  const FAT_API_REST_KEY = '41b943fd6f7f479b913c569598d51c04'

  //SHOWS LOGIN PART OF SCREEN
  function showLoginSelection() {
    $('#loginScreenSelect').on('click', function (e) {
      e.preventDefault()
      $('#create-account-form').fadeOut(500, function (e) {
        $('#login-form').fadeIn(500)
      })
    })
  }

  //SHOWS CREATE ACCOUNT PART OF SCREEN
  function showCreateAccSelection() {
    $('#createAccScreenSelect').on('click', function (e) {
      e.preventDefault()
      $('#login-form').fadeOut(500, function (e) {
        $('#create-account-form').fadeIn(500)
      })
    })
  }

  //API CALL TO CREATE ACCOUNT
  function requestCreateAccount(username, password, email, callback) {
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
      success: callback,
      error: function (e){
        alert("ERROR! Please try creating an account again or contact the developer if problem persists!");
      }
    }

    $.ajax(settings)
  }

  // API CALL TO REQUEST SERVER FOR LOGIN
  function requestLoginAccount(username, password, callback) {
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
      header: { Authorization: `Bearer ${auth}` }
    }

    $.ajax(settings)
  }

  // SENDS A REQUEST TO THE SERVER TO CHECK IF JWT IS VALID
  function checkAuth(callback, errorCallBack) {
    const auth = localStorage.getItem('authToken')

    const settings =
    {
      url: '/checkAuth',
      type: 'GET',
      contentType: 'application/json',
      success: callback,
      error: errorCallBack,
      headers: { Authorization: `Bearer ${auth}` }
    }
    $.ajax(settings)
  }

  //API CALL TO REFRESH JWT 
  function refreshToken(){
    const auth = localStorage.getItem('authToken')

    const settings =
    {
      url: '/api/auth/refresh',
      contentType: 'application/json',
      dataType: 'json',
      type: 'POST',
      success: function(e){
        localStorage.setItem('authToken', e.authToken)
        console.log(e);
        console.log('STORED')
      },
      error: function (e){
        console.log(e)
        console.log('ERROR')
      },
      headers: {Authorization: `Bearer ${auth}`}
    }

    $.ajax(settings)
  }

  // CALL FUNCTION FOR BTN REDIRECT WHEN CLICKED
  function checkAuthCall() {
    checkAuth(function (response) {
      const redirectTo = localStorage.getItem('btnClick')

      if (redirectTo == 'about') {
        window.location.href = '/authenticated/about'
      }
      else if (redirectTo == 'contact') {
        window.location.href = '/authenticated/contact'
      }
      else if (redirectTo == 'dash') {
        refreshToken()
        window.location.href = '/authenticated/dashboard'
      }
      else if (redirectTo == 'foodCalc') {
        window.location.href = '/authenticated/foodcalc'
      } else if (redirectTo == 'taskEditor') {
        refreshToken()
        window.location.href = '/authenticated/taskeditor'
      }
      else if(redirectTo == 'scheduleEditor'){
        window.location.href = '/authenticated/schedule'
      }
      else {
        console.log('ERROR!!!');
      }
    }, function (response) {
      window.alert('Session expired! Redirecting back to login page...')
      window.location.href = '/'
    })
  }

 
  //CHECKS WHAT BTN USER CLICKED
  function watchNavAuthBtns() {
    $('#logoBtn').click(event => {
      localStorage.setItem("btnClick", "dash")
      checkAuthCall()
    })

    $('#homeBtn').click(event => {
      localStorage.setItem('btnClick', 'dash')
      checkAuthCall()
    })

    $('#aboutBtn').click(event => {
      localStorage.setItem('btnClick', 'about')
      checkAuthCall()
    })

    $('#healthBtn').click(event => {
      localStorage.setItem('btnClick', 'foodCalc')
      checkAuthCall()
    })

    $('#taskBtn').click(event => {
      localStorage.setItem('btnClick', 'taskEditor')
      checkAuthCall()
    })

    $('#contactBtn').click(event => {
      localStorage.setItem('btnClick', 'contact')
      checkAuthCall()
    })

    $('#scheduleBtn').click(event =>{
      localStorage.setItem('btnClick', 'scheduleEditor')
      checkAuthCall()
    })

    // REDIRECTS USER TO LOGIN PAGE AND REMOVES LOCAL STORAGE(JWT)
    $('#signOutBtn').click(event => {
      localStorage.removeItem('authToken')
      window.location.href = '/'
    })
  }

  // WATCHES THE CREATE ACCOUNT SUBMIT BUTTON
  function watchCreateSubmit() {
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

  //WATCHES LOGIN SUBMIT FORM
  function watchLoginSubmit() {
    $('#login-form').submit(event => {
      event.preventDefault()

      const targetOne = $(event.currentTarget).find('#username-form-login')
      const targetTwo = $(event.currentTarget).find('#password-form-login')

      const queryOne = targetOne.val()
      const queryTwo = targetTwo.val()

      targetOne.val('')
      targetTwo.val('')

      requestLoginAccount(queryOne, queryTwo, function (response) {
        localStorage.setItem('authToken', response.authToken)
        // console.log('success!');
        window.location.href = '/dashboard'
      })
    })
  }

  //INITIALIZATIONS
  function init() {
    $(showLoginSelection)
    $(showCreateAccSelection)
    $(watchCreateSubmit)
    $(watchLoginSubmit)
    $(watchNavAuthBtns)
  }

  $(init)
})
