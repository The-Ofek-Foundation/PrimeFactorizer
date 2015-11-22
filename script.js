var sieve;

$('#calculate-btn').click(function() {
  var num = Big($('#input-number').val());
  var start_time = new Date().getTime();
  var diviser = get_diviser(num);
  if (num.eq(diviser))
    $('#calculations-div').text(num + " is a prime number!");
  else {
    var power = 1, last_diviser = diviser;
    num = num.div(diviser);
    var factors = diviser + "";
    do {
      diviser = get_diviser(num);
      num = num.div(diviser);
      if (diviser == last_diviser)
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
  $('#time-div').text("Time Elapsed: " + (new Date().getTime() - start_time) / 1000 + " seconds");
});

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

function get_diviser(num) {
  var end = Math.floor(num.sqrt());
  for (var i = 0; i <= end; i++)
    if (sieve[i] && num % (i + 1) === 0)
      return i + 1;
  if (sieve.length < end)
    alert("Error possible, try increasing the sieve");
  return Math.round(num);
}
