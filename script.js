//Wrap in jQuery function

$(document).ready(function () {

    //need arrays for each category.
    var arrUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    var arrLowerCase = "abcdefghijklmnopqrstuvwxyz".split("");
    var arrNumbers = "1234567890".split("");
    var arrSpecial = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~".split("");

    // Assignment Code
    var generateBtn = document.querySelector("#generate");
    var resetBtn = document.querySelector("#resetAll");

    // Write password to the #password input
    function writePassword() {
      var password = generatePassword();
      if (password == undefined) {
        return;
      }
      var passwordText = document.querySelector("#password");

      passwordText.value = password;
    }

    function generatePassword() {
      var passwordLength = getPasswordLength();
      var lowerCase = addLowerCase();
      var upperCase = addUpperCase();
      var passwordNumeric = addNumbers();
      var passwordSpecial = addSpecialCharacters();
      //must call variables in getPasswordCharacters
      var options = getPasswordCharacters(
        upperCase,
        lowerCase,
        passwordNumeric,
        passwordSpecial
      );
      var password = "";

      if (!passwordLength) {
        alert("Invalid entry. Type a number of characters between 8-128.");
        resetAll();
        return;
      }
      //check that at least one option is selected
      if (!upperCase && !lowerCase && !passwordNumeric && !passwordSpecial) {
        alert("No, wait! You have to select at least one option.");
        resetAll();
        return;
        //generatePassword(); //starts prompts over from beginning.
      }

      //increment with for loop until it reaches desired password length.
      for (var i = 0; i < passwordLength; i++) {
        var currentOption = getRandomFromArray(options);
        switch (currentOption) {
          //if 'lowercase' is pushed to options array, add random number of string values from lowerCase array to password.
          case "lowerCase":
            password += getRandomFromArray(arrLowerCase);
            break;
          //if 'uppercase' is pushed to options, add random number of string values from upperCase array.
          case "upperCase":
            password += getRandomFromArray(arrUpperCase);
            break;
          //if 'numbers' is pushed to options, add random number of string values from numbers.
          case "numbers":
            password += getRandomFromArray(arrNumbers);
            break;
          //if 'special' is pushed to options, add random number of string values from special.
          case "special":
            password += getRandomFromArray(arrSpecial);
        }
      }
      return password;
    }

    //Rework the functions to read the input box and check boxes using jQuery
    function getPasswordLength() {
      var passwordLength = $("#numChars").val();//document.getElementById("numChars").value;
      //console.log(passwordLength);
      var stringToNum = parseInt(passwordLength);

      if (!passwordLength) {
        return false;
      }
      //if failed, alert invalid, prompt to re-input
      if (isNaN(stringToNum) || stringToNum < 8 || stringToNum > 128) {
        //alert("Invalid. Pick a number of characters between 8-128.");
        resetAll();
      }

      return stringToNum; //returns user's choice to passwordLength.
    }

    function addUpperCase() {
      var upperCase = $("#upperCase").val(); //document.getElementById("upperCase").checked;
      //console.log(upperCase);
      return upperCase;
    }

    function addLowerCase() {
        var lowerCase = $("#lowerCase").val(); //document.getElementById("lowerCase").checked;
      //console.log(lowerCase);
      return lowerCase;
    }

    function addNumbers() {
        var passwordNumeric = $("#passwordNumeric").val(); //document.getElementById("digits").checked;
      //console.log(passwordNumeric);
      return passwordNumeric;
    }

    function addSpecialCharacters() {
        var passwordSpecial = $("#passwordSpecial").val(); //document.getElementById("specialCharacters").checked;
      //console.log(passwordSpecial);
      return passwordSpecial;
    }

    //with variables as getPasswordCharacters parameters, we can get user's choice and push respective string values in options array.
    //The resulting options are then used in a switch statement within generatePassword() to add the corresponding string values to password.
    //getRandomFromArray() randomizes how many from each option selected.
    function getPasswordCharacters(
      upperCase,
      lowerCase,
      passwordNumeric,
      passwordSpecial
    ) {
      var options = [];
      //if user wants uppercase(is truthy), push to options array
      if (lowerCase) {
        options.push("lowerCase");
      }
      if (upperCase) {
        options.push("upperCase");
      }
      //if truthy, push to options
      if (passwordNumeric) {
        options.push("numbers");
      }
      //if truthy, push to options
      if (passwordSpecial) {
        options.push("special");
      }
      return options;
    }

    //random number of characters per category user chose
    function getRandomFromArray(array) {
      return array[Math.floor(Math.random() * array.length)];
    }

    function resetAll(){
      //document.getElementById("numChars").value = "";
      //document.getElementById("lowerCase").checked = false;
      //document.getElementById("upperCase").checked = false;
      //document.getElementById("digits").checked = false;
      //document.getElementById("specialCharacters").checked = false;
      //document.getElementById("password").value = "";
        //Reworked with jQuery
        $("#numChars").val("");
        $("#lowerCase").prop("checked",false);
        $("#upperCase").prop("checked", false);
        $("#digits").prop("checked", false);
        $("#specialCharacters").prop("checked", false);
        $("#password").val("");
    }

// Add event listener to generate button
//generateBtn.addEventListener("click", writePassword);
//Replace with jQuery .click() method
    $("#generate").click(function () {
        writePassword();
    });
//Add event listener to reset button
//resetBtn.addEventListener("click", resetAll);
//Replace with jQuery .on() method (just another way to do it)
    $("#resetAll").on("click", function () {
        resetAll();
    });

});