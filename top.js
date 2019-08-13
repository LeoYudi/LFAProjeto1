function testInfo(phoneInput, regexInput) {
  var re = RegExp(regexInput.value);
  var OK = re.exec(phoneInput.value);
  if (OK)
    window.alert("tah certo");
  else
    window.alert("tah errado");
}