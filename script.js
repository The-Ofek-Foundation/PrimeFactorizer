var sieve;
var start_time;
var error;

$('#calculate-btn').click(function() {
  var num = Big($('#input-number').val());
  start_time = new Date().getTime();
  error = false;
  if (num.gt(9007199254740992))
    big_factor(num);
  else factor(Math.round(num));
  $('#time-div').text("Time Elapsed: " + (new Date().getTime() - start_time) / 1000 + " seconds");
  if (error)
    alert("Error possible, try increasing the sieve");
});

function big_factor(num) {
  var diviser = get_big_diviser(num);
  if (num.eq(1))
    $('#calculations-div').text(num + " is pretty cool!");
  else if (num.eq(diviser))
    $('#calculations-div').text(num + " is a prime number!");
  else {
    var power = 1, last_diviser = diviser;
    num = num.div(diviser);
    var factors = diviser + "";
    do {
      diviser = get_big_diviser(num);
      num = num.div(diviser);
      if (diviser.eq(last_diviser))
        power++;
      else {
        if (power > 1)
          factors += "^" + power;
        factors += " * " + diviser;
        power = 1;
        last_diviser = diviser;
      }
    } while (num.gt(1));
    if (power > 1)
      factors += "^" + power;
    $('#calculations-div').text(factors);
  }
}

function factor(num) {
  var diviser = get_diviser(num);
  if (num == 1)
    $('#calculations-div').text(num + " is pretty cool!");
  else if (num == diviser)
    $('#calculations-div').text(num + " is a prime number!");
  else {
    var power = 1, last_diviser = diviser;
    num /= diviser;
    var factors = diviser + "";
    do {
      diviser = get_diviser(num);
      num /= diviser;
      if (diviser == last_diviser)
        power++;
      else {
        if (power > 1)
          factors += "^" + power;
        factors += " * " + diviser;
        power = 1;
        last_diviser = diviser;
      }
    } while (num > 1);
    if (power > 1)
      factors += "^" + power;
    $('#calculations-div').text(factors);
  }
}

$('#create-sieve').click(function() {
  $('#sieve-generated').text("Generating...");
  setTimeout(function() {
    var length = Math.floor(Math.sqrt($('#sieve-size').val()));
    sieve = new Array(length);
    sieve[0] = false;
    for (var i = 1; i < length; i++)
      sieve[i] = true;
    create_sieve();
    $('#sieve-generated').text("Generated");
  }, 20);
});

function create_sieve() {
  for (var i = 0; i < sieve.length; i++)
    if (sieve[i])
      remove_items(i + 1);
}

function remove_items(multiple) {
  for (var i = 2 * multiple - 1; i < sieve.length; i+= multiple)
    sieve[i] = false;
}

function get_big_diviser(num) {
  var end = Math.floor(num.sqrt());
  var end_at = sieve.length < end ? sieve.length - 1:end;
  for (var i = 0; i <= end_at; i++)
    if (sieve[i] && num.mod(i + 1).eq(0))
      return Big(i + 1);
  if (sieve.length < end) {
    error = true;
    console.log("error");
  }
  return num;
}

function get_diviser(num) {
  var end = Math.floor(Math.sqrt(num));
  var end_at = sieve.length < end ? sieve.length - 1:end;
  for (var i = 0; i <= end_at; i++)
    if (sieve[i] && num % (i + 1) === 0)
      return i + 1;
  if (sieve.length < end)
    error = true;
  return num;
}
