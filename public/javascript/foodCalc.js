$(document).ready(function () {
  let genderChoice

  function showBmrSelection () {
  }

  function showBmiSelection () {
  }

  function showCalorieSelection () {
  }

  function showParameterSelection () {
    $('#poundSelect').click(e => {
      $('#checkWeightDiv').fadeOut(500, function (e) {
        $('#weightBmrBox').fadeIn(500)
        document.getElementById('weightBmrBox').innerHTML =
          `<i id="weightBmrArrow" class="far fa-arrow-alt-circle-left"></i>
            <div class="tempHidden foodForms"
                id="weightDiv">
                <input type="text" class="logForms"
                    id="weight-form-calc"
                    aria-labelledby="Weight
                    of user" required="">
                <label for="#weight-form-calc">Weight
                    (lbs)</label>
            </div>`
      })
    })

    $('#kilogramSelect').click(e => {
      $('#checkWeightDiv').fadeOut(500, function (e) {
        $('#weightBmrBox').fadeIn(500)
        document.getElementById('weightBmrBox').innerHTML =
          `<i id="weightBmrArrow" class="far fa-arrow-alt-circle-left"></i>
            <div class="tempHidden foodForms"
                id="weightDiv">
                <input type="text" class="logForms"
                    id="weight-form-calc"
                    aria-labelledby="Weight
                    of user" required="">
                <label for="weight-form-calc">Weight
                    (kg)</label>
            </div>`
      })
    })

    $('#centimeterSelect').click(e => {
      $('#checkHeightDiv').fadeOut(500, function (e) {
        $('#heightBmrBox').fadeIn(500)
        document.getElementById('heightBmrBox').innerHTML =
          `<i id="heightBmrArrow" class="far fa-arrow-alt-circle-left"></i>
            <div class="foodForms">
                <input type="text" class="logForms"
                    id="height-form-calc"
                    aria-labelledby="Height
                    of user" required="">
                <label for="height-form-calc">Height (cm)</label>
            </div>`
      })
    })

    $('#feetSelect').click(e => {
      document.getElementById('heightBmrBox').innerHTML =
        `<i id="heightBmrArrow" class="far fa-arrow-alt-circle-left"></i>
          <div class="foodForms" style="width:
              400px;">
              <input type="text" class="logForms
                  inputHeight"
                  id="height-form-calc"
                  aria-labelledby="Height
                  of user feet" required="">
              <label for="height-form-calc">Height
                  (ft)</label>

              <div>
                  <input type="text"
                      class="logForms
                      inputHeight"
                      id="height-form-calc-in"
                      aria-labelledby="Height
                      of user inches" required="">
                  <label for="height-form-calc-in"
                      style="left: 243px;">Height
                      (in)</label>
              </div>
          </div>`
      $('#checkHeightDiv').fadeOut(500, function (e) {
        $('#heightBmrBox').fadeIn(500, function (e) {
          $('#height-form-calc').keyup(console.log('hai'))

          $('#height-form-calc').on('load', function (e) {
            $('#height-form-calc').keyup(console.log('hai'))
          })
        })
      })
    })

    $('#maleBmrSelect').click(e => {
      $('#checkGenderDiv').fadeOut(500, function (e) {
        $('#genderBmrBox').fadeIn(500)
        document.getElementById('genderBmrBox').innerHTML =
          `<i id="gendBmrArrow" class="far fa-arrow-alt-circle-left" style="top: 30px;"></i>
        <h2 style="font-size: 35px; width: 460px;">Male Selected</h2>`
        $('#genderBmrBox').css('display', 'inline-flex')
      })
    })

    $('#femaleBmrSelect').click(e => {
      $('#checkGenderDiv').fadeOut(500, function (e) {
        $('#genderBmrBox').fadeIn(500)
        document.getElementById('genderBmrBox').innerHTML =
          `<i id="gendBmrArrow" class="far fa-arrow-alt-circle-left" style="top: 30px;"></i>
          <h2 style="font-size: 35px; width: 460px;">Female Selected</h2>`
        $('#genderBmrBox').css('display', 'inline-flex')
      })
    })
  }

  function checkIfFilled () {
    let weightCheck = false
    let heightCheck = false
    let genderCheck = false
    let ageCheck = false

    $('#weightBmrBox').on('keyup', '#weight-form-calc', function (e) {
      e.preventDefault()
      let formCheck = document.getElementById('weight-form-calc').value

      if (formCheck.length >= 1) {
        weightCheck = true
      }else {
        weightCheck = false
      }
    })

    $('#heightBmrBox').on('keyup', '#height-form-calc', function (e) {
      e.preventDefault()
      let checkFt = false
      let formCheck = document.getElementById('height-form-calc').value
      if (document.getElementById('height-form-calc-in' !== 'undefined')) {
        let formCheckTwo = document.getElementById('height-form-calc-in')
        checkFt = true
      }

      if (checkFt) {
        if (formCheck.length >= 1 && formCheckTwo >= 1) {
          heightCheck = true
        }else {
          heightCheck = false
        }
      }else {
        if (formCheck.length >= 1) {
          heightCheck = true
        }else {
          heightCheck = false
        }
      }
    })

    $('#maleBmrSelect').click(e => {
      genderCheck = true
      genderChoice = 'Male'
    })

    $('#femaleBmrSelect').click(e => {
      genderCheck = true
      genderChoice = 'Female'
    })

    // SHOWS BACK SELECTION VALUES (ARROW BACK)
    $('#weightBmrBox').on('click', '#weightBmrArrow', function (e) {
      e.preventDefault()
    })
  }

  function init () {
    $(showParameterSelection)
    $(checkIfFilled)
  }

  $(init)
})
