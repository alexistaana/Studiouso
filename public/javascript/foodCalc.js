$(document).ready(function () {
  let weightChoice // VAR USED TO STORE WEIGHT CHOICE (KG OR LB)
  let heightChoice // VAR USED TO STORE HEIGHT CHOICE (FT/IN OR CM)
  let genderChoice // VAR USED TO STORE GENDER CHOICE (MALE OR FEMALE)

  // FUNCTION THAT SHOWS BMR FORM
  function showBmrSelection() {
    $('#bmrScreenSelect').click(e => {

      $('#bmi-form').fadeOut(500, function (e) {
        $('#bmr-form').fadeIn(500)
      })
    })
  }

  // FUNCTION THAT SHOWS THE BMI FORM
  function showBmiSelection() {
    $('#bmiScreenSelect').click(e => {
      $('#bmr-form').fadeOut(500, function (e) {
        $('#bmi-form').fadeIn(500)
      })
    })
  }

  // ON CLICK FUNCTIONS THAT SHOW FORMS WITH THE SELECTED PARAMETER
  function showParameterSelectionBmr() {

    // SHOWS LB WEIGHT FORM
    $('#poundSelect').click(e => {
      weightChoice = 'lb'
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

    // SHOWS KG WEIGHT FORM
    $('#kilogramSelect').click(e => {
      weightChoice = 'kg'
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

    // SHOWS CM HEIGHT FORM
    $('#centimeterSelect').click(e => {
      heightChoice = 'cm'
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

    // SHOWS FT HEIGHT FORM
    $('#feetSelect').click(e => {
      heightChoice = 'ft'
      document.getElementById('heightBmrBox').innerHTML =
        `<i id="heightBmrArrow" class="far fa-arrow-alt-circle-left"></i>
          <div class="foodForms" style="width:
              400px;">
              <div>
                <input type="text" class="logForms
                    inputHeight"
                    id="height-form-calc"
                    aria-labelledby="Height
                    of user feet" required="">
                <label for="height-form-calc">Height
                    (ft)</label>
              </div>  
          </div>`
      $('#checkHeightDiv').fadeOut(500, function (e) {
        $('#heightBmrBox').fadeIn(500)
      })
    })

    // SHOWS MALE GENDER SELECTED
    $('#maleBmrSelect').click(e => {
      genderChoice = 'male'
      $('#checkGenderDiv').fadeOut(500, function (e) {
        $('#genderBmrBox').fadeIn(500)
        document.getElementById('genderBmrBox').innerHTML =
          `<i id="gendBmrArrow" class="far fa-arrow-alt-circle-left" style="top: 30px;"></i>
        <h2 style="font-size: 35px; width: 460px; left: -19.8px; position: relative;" id="gendSelected">Male Selected</h2>`
        $('#genderBmrBox').css('display', 'inline-flex')
      })
    })

    // SHOWS FEMALE GENDER SELECTED
    $('#femaleBmrSelect').click(e => {
      genderChoice = 'female'
      $('#checkGenderDiv').fadeOut(500, function (e) {
        $('#genderBmrBox').fadeIn(500)
        document.getElementById('genderBmrBox').innerHTML =
          `<i id="gendBmrArrow" class="far fa-arrow-alt-circle-left" style="top: 30px;"></i>
          <h2 style="font-size: 35px; width: 460px; left: -19.8px; position: relative;" id="gendSelected">Female Selected</h2>`
        $('#genderBmrBox').css('display', 'inline-flex')
      })
    })

    // < -- SHOWS BACK SELECTION VALUES (ARROW BACK) -- >

    // WEIGHT BACK ARROW
    $('#weightBmrBox').on('click', '#weightBmrArrow', function (e) {
      e.preventDefault()

      $('#weightBmrBox').fadeOut(500, function (e) {
        $('#checkWeightDiv').fadeIn(500)
      })
    })

    // GENDER BACK ARROW
    $('#genderBmrBox').on('click', '#gendBmrArrow', function (e) {
      e.preventDefault()

      $('#genderBmrBox').fadeOut(500, function (e) {
        $('#checkGenderDiv').fadeIn(500)
      })
    })

    // HEIGHT BACK ARROW
    $('#heightBmrBox').on('click', '#heightBmrArrow', function (e) {
      e.preventDefault()
      $('#heightBmrBox').fadeOut(500, function (e) {
        $('#checkHeightDiv').fadeIn(500)
      })
    })

    $('#resetBtnBmr').on('click', function (e) {
      $('#bmrResultsBox').fadeOut(500, function (e) {
        $('#bmr-calculate-btn').fadeIn(500)
      })
      $('#heightBmrBox').fadeOut(500, function (e) {
        $('#checkHeightDiv').fadeIn(500)
      })
      $('#genderBmrBox').fadeOut(500, function (e) {
        $('#checkGenderDiv').fadeIn(500)
      })
      $('#weightBmrBox').fadeOut(500, function (e) {
        $('#checkWeightDiv').fadeIn(500)
      })
    })

    $('#bmrResultsBox').on('click', '#submitBackArrow', function (e) {
      e.preventDefault()

      $('#bmrResultsBox').fadeOut(500, function (e) {
        $('#bmr-calculate-btn').fadeIn(500)
      })
      $('#heightBmrBox').fadeOut(500, function (e) {
        $('#checkHeightDiv').fadeIn(500)
      })
      $('#genderBmrBox').fadeOut(500, function (e) {
        $('#checkGenderDiv').fadeIn(500)
      })
      $('#weightBmrBox').fadeOut(500, function (e) {
        $('#checkWeightDiv').fadeIn(500)
      })
    })
  }

  // CHECKS TO SEE IF FORMS HAVE BEEN FILLED
  function checkIfFilled() {
    let weightCheck = false
    let heightCheck = false
    let genderCheck = false
    let ageCheck = false

    $('#weightBmrBox').on('keyup', '#weight-form-calc', function (e) {
      e.preventDefault()
      let formCheck = document.getElementById('weight-form-calc').value

      if (formCheck.length >= 1) {
        weightCheck = true
      } else {
        weightCheck = false
      }
    })

    $('#heightBmrBox').on('keyup', '#height-form-calc', function (e) {
      e.preventDefault()
      let checkFt = false
      let formCheck = document.getElementById('height-form-calc').value

      if (document.getElementById('height-form-calc-in')) {
        let formCheckTwo = document.getElementById('height-form-calc-in')
        checkFt = true

        if (formCheck.length >= 1 && formCheckTwo >= 1) {
          heightCheck = true
        } else {
          heightCheck = false
        }
      }

      if (formCheck.length >= 1) {
        heightCheck = true
      } else {
        heightCheck = false
      }
    })

    $('#maleBmrSelect').click(e => {
      genderCheck = true
    })

    $('#femaleBmrSelect').click(e => {
      genderCheck = true
    })
  }

  //WATCHES BMR SUBMIT BTN
  function watchBmrCalculateSubmit() {
    $('#bmr-form').submit(event => {
      event.preventDefault()
      const targetOne = $(event.currentTarget).find('#weight-form-calc')
      const targetTwo = $(event.currentTarget).find('#height-form-calc')
      const targetThree = $(event.currentTarget).find('#age-form-calc')

      const weightInfo = targetOne.val()
      const heightInfo = targetTwo.val()
      const ageInfo = targetThree.val()
      genderInfo = genderChoice

      targetOne.val('')
      targetTwo.val('')
      targetThree.val('')

      //CALLS CALCULATE BMR
      calculateBmr(weightInfo, heightInfo, ageInfo, genderChoice, function (results) {
        $('#bmr-calculate-btn').fadeOut(500, function (e) {
          $('#bmrResultsBox').fadeIn(500, function (e) {

            document.getElementById('resultBmrDiv').innerHTML =
              `
              <div style="display: inline-flex;"
                  id="bmrDynamic">
                  <h1 id="resultsH">Your BMR is
                      <b>${results}</b></h1>
                  <h2 id="storeBmrBtn">Store?</h2>
              </div>
            `
          })

        })

        $('#bmrResultsBox').on('click', '#storeBmrBtn', function (e) {
          bmrStoreData(results, function (e) {
            $('#storeBmrBtn').fadeOut(500, function (e) {
              tempHtml = `<h2 style="font-size: 30px;
              position: relative; top: 7px; color: #33cc33;
              text-transform: uppercase;">STORED!</h2>`
              $('#bmrDynamic').append(tempHtml)
              $('#submitBackArrow').css({ 'left': '-1px' })
            })
          })
        })
      })
    })
  }

  //CALCULATES BASAL METABOLIC RATE
  function calculateBmr(w, h, a, g, callback) {
    let bmrResult

    // FORMULA USED ----
    // Women: BMR = 655 + (9.6 x weight in kg) + (1.8 x height in cm) - (4.7 x age in years)
    // Men: BMR = 66 + (13.7 x weight in kg) + (5 x height in cm) - (6.8 x age in years)

    // CHANGES POUNDS TO KILOGRAMS
    if (weightChoice == 'lb') {
      w = (w * 0.45359237)
    }

    // CHANGES FEET TO CENTIMETERS
    if (heightChoice == 'ft') {
      // h = (h * 12)
      // h = (h + localStorage.getItem('tempInch'))
      h = (h * 30.48)
    }

    if (g == 'male') {
      bmrResult = 66 + (13.7 * w) + (5 * h) - (6.8 * a)
    } else {
      bmrResult = 655 + (9.6 * w) + (1.8 * h) - (4.7 * a)
    }

    return callback(Math.round(bmrResult))
  }

  //API CALL TO STORE BMR
  function bmrStoreData(results, callback) {
    let jwt = localStorage.getItem('authToken')
    var tokens = jwt.split('.')

    const query =
    {
      id: JSON.parse(atob(tokens[1])).user.id,
      bmrResults: results
    }
    const settings =
    {
      url: '/post/bmr',
      data: JSON.stringify(query),
      contentType: 'application/json',
      dataType: 'json',
      type: 'PUT',
      success: callback,
      error: function (e) {
        window.alert('ERROR IN STORING BMR! TRY AGAIN OR CONTACT DEVELOPER!')
      }
    }

    $.ajax(settings)
  }

  // <-- BMI SECTION -->

  //SHOWS BMI SECTION
  function showParameterSelectionBmi() {
    $('#poundSelectBmi').click(e => {
      weightChoice = 'lb'
      $('#checkWeightBmiDiv').fadeOut(500, function (e) {
        $('#weightBmiBox').fadeIn(500)
        document.getElementById('weightBmiBox').innerHTML =
          `<i id="weightBmiArrow" class="far fa-arrow-alt-circle-left"></i>
            <div class="tempHidden foodForms"
                id="weightDiv">
                <input type="text" class="logForms"
                    id="weight-form-calc-bmi"
                    aria-labelledby="Weight
                    of user" required="">
                <label for="#weight-form-calc-bmi">Weight
                    (lbs)</label>
            </div>`
      })
    })

    // SHOWS KG WEIGHT FORM
    $('#kilogramSelectBmi').click(e => {
      weightChoice = 'kg'
      $('#checkWeightBmiDiv').fadeOut(500, function (e) {
        $('#weightBmiBox').fadeIn(500)
        document.getElementById('weightBmiBox').innerHTML =
          `<i id="weightBmiArrow" class="far fa-arrow-alt-circle-left"></i>
        <div class="tempHidden foodForms"
            id="weightDiv">
            <input type="text" class="logForms"
                id="weight-form-calc-bmi"
                aria-labelledby="Weight
                of user" required="">
            <label for="weight-form-calc-bmi">Weight
                (kg)</label>
        </div>`
      })
    })

    // SHOWS CM HEIGHT FORM
    $('#centimeterSelectBmi').click(e => {
      heightChoice = 'cm'
      $('#checkHeightBmiDiv').fadeOut(500, function (e) {
        $('#heightBmiBox').fadeIn(500)
        document.getElementById('heightBmiBox').innerHTML =
          `<i id="heightBmiArrow" class="far fa-arrow-alt-circle-left"></i>
        <div class="foodForms">
            <input type="text" class="logForms"
                id="height-form-calc-bmi"
                aria-labelledby="Height
                of user" required="">
            <label for="height-form-calc-bmi">Height (cm)</label>
        </div>`
      })
    })

    // SHOWS FT HEIGHT FORM
    $('#feetSelectBmi').click(e => {
      heightChoice = 'ft'
      $('#checkHeightBmiDiv').fadeOut(500, function (e) {
        $('#heightBmiBox').fadeIn(500, function (e) {
          document.getElementById('heightBmiBox').innerHTML =
            `<i id="heightBmiArrow" class="far fa-arrow-alt-circle-left"></i>
              <div class="foodForms" style="width:
                  400px;">
                  <div>
                    <input type="text" class="logForms
                        inputHeight"
                        id="height-form-calc-bmi"
                        aria-labelledby="Height
                        of user feet" required="">
                    <label for="height-form-calc-bmi">Height
                        (ft)</label>
                  </div>
              </div>`
        })
      })
    })

    // < -- BACK SELECTION VALUES (ARROW BACK) -- >
    // WEIGHT BACK ARROW
    $('#weightBmiBox').on('click', '#weightBmiArrow', function (e) {
      e.preventDefault()
      $('#weightBmiBox').fadeOut(500, function (e) {
        $('#checkWeightBmiDiv').fadeIn(500)
      })
    })

    // HEIGHT BACK ARROW
    $('#heightBmiBox').on('click', '#heightBmiArrow', function (e) {
      e.preventDefault()
      $('#heightBmiBox').fadeOut(500, function (e) {
        $('#checkHeightBmiDiv').fadeIn(500)
      })
    })

    //RESET BTN
    $('#resetBtnBmi').on('click', function (e) {
      $('#bmiResultsBox').fadeOut(500, function (e) {
        $('#bmi-calculate-btn').fadeIn(500)
      })
      $('#heightBmiBox').fadeOut(500, function (e) {
        $('#checkHeightBmiDiv').fadeIn(500)
      })
      $('#weightBmiBox').fadeOut(500, function (e) {
        $('#checkWeightBmiDiv').fadeIn(500)
      })
    })

  }

  //WATCHES BMI SUBMIT BTN
  function watchBmiCalculateSubmit() {
    $('#bmi-form').submit(event => {
      event.preventDefault();
      const targetOne = $(event.currentTarget).find('#weight-form-calc-bmi')
      const targetTwo = $(event.currentTarget).find('#height-form-calc-bmi')

      const weightInfo = targetOne.val()
      const heightInfo = targetTwo.val()

      targetOne.val('')
      targetTwo.val('')

      calculateBmi(weightInfo, heightInfo, function (results) {
        $('#bmi-calculate-btn').fadeOut(500, function (e) {
          $('#bmiResultsBox').fadeIn(500, function (e) {
          })
        })
        if (results == "NaN") {
          document.getElementById('resultBmiDiv').innerHTML =
            `
              <div style="display: inline-flex;"
                  id="bmiDynamic">
                  <h1 id="resultsHBmi">Your BMR is
                      HAI</h1>
                  <h2 id="storeBmiBtn">Store?</h2>
              </div>
            `
        } else {
          document.getElementById('resultBmiDiv').innerHTML =
            `
            <div style="display: inline-flex;"
                id="bmiDynamic">
                <h1 id="resultsHBmi">Your BMR is
                    <b>${results}</b></h1>
                <h2 id="storeBmiBtn">Store?</h2>
            </div>
          `

          $('#bmiResultsBox').on('click', '#storeBmiBtn', function (e) {
            bmiStoreData(results, function (e) {
              $('#storeBmiBtn').fadeOut(500, function (e) {
                tempHtml = `<h2 style="font-size: 30px;
                position: relative; top: 7px; color: #33cc33;
                text-transform: uppercase;">STORED!</h2>`
                $('#bmiDynamic').append(tempHtml)
                $('#submitBackArrow').css({ 'left': '-1px' })
              })
            })
          })
        }
      })
    })
  }

  // API RQUEST CALL TO STORE BMI
  function bmiStoreData(results, callback) {
    let jwt = localStorage.getItem('authToken')
    var tokens = jwt.split('.')

    const query =
    {
      id: JSON.parse(atob(tokens[1])).user.id,
      bmiResults: results
    }
    const settings =
    {
      url: '/post/bmi',
      data: JSON.stringify(query),
      contentType: 'application/json',
      dataType: 'json',
      type: 'PUT',
      success: callback,
      error: function (e) {
        window.alert('ERROR IN STORING BMI! TRY AGAIN OR CONTACT DEVELOPER!')
      }
    }
    $.ajax(settings)
  }

  //CALCULATES BMI
  function calculateBmi(w, h, callback) {
    // FORMULA USED ----
    // BMI = kg / m^2 
    // kg = kilogram, m = meters

    if (weightChoice == 'lb') {
      //CONVERTS LB TO KG
      w = (w * 0.45359237)
    }

    if (heightChoice == 'cm') {
      //CONVERTS CM TO METERS
      h = (h * 0.01)
    }
    //CONVERTS FT TO METERS
    else {
      h = (h * 0.3048)
    }

    h = Math.pow(h, 2);

    let bmiResult = w / h

    return callback(bmiResult.toFixed(2))
  }

  // INITIALIZATION
  function init() {
    $(showBmrSelection)
    $(showBmiSelection)
    $(showParameterSelectionBmr)
    $(checkIfFilled)
    $(watchBmrCalculateSubmit)
    $(watchBmiCalculateSubmit)
    $(showParameterSelectionBmi)
  }

  $(init)
})
