function testInfo(texto, regexInput) {
  $('#teste').removeClass('is-valid');
  $('#teste').removeClass('is-invalid');
  var re = RegExp(`${regexInput.value}`);
  var OK = re.exec(texto.value);
  console.log(texto);
  if (OK)
    $('#teste').addClass('is-valid');
  else
    $('#teste').addClass('is-invalid');
}