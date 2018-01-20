$(function(){
  $('#sendButton').on('click', function(){
    var name = $('#name').val();
    var isCheckedMale = $('input[name=sex]:eq(0)').is(':checked');
    var isCheckedFemale = $('input[name=sex]:eq(1)').is(':checked');
    var mailaddress = $('#email').val();
    var confirmmailaddress = $('#confirmEmail').val();
    var browser = $('#browser').val();
    var message = $('#message').val();
    var isCheckedAgreement = $('#agreement').is(':checked');

    if(validateInputs(name, isCheckedMale, isCheckedFemale, mailaddress, confirmmailaddress, browser, message, isCheckedAgreement)){
        alert("ありがとうございます");
    }
  });

  function validateInputs(name, isMale, isFemale, mail, confirmMail, browser, message, agreement){
    // 全てのinputが正しいならばtrueを返す
    var errorMsg = ""

    $('#errorInfo').html(errorMsg);
    $('#errorInfo').css("color", "black");

    errorMsg += validateName(name);
    errorMsg += validateSex(isMale, isFemale);
    errorMsg += validateMail(mail, confirmMail);
    errorMsg += validateMsg(message);
    errorMsg += validateAgreement(agreement);

    if(errorMsg == ""){
      return true;
    }else {
      $('#errorInfo').html("<span>" + errorMsg + "</span>");
      $('#errorInfo span').css("color", "red");
      return false;
    }
  }

  function validateName(name){
    if(name == ""){
      return "名前は必須項目です<br />";
    }

    if(name.length > 50){
      return "名前は50文字以下で入力してください<br />";
    }

    return "";
  }

  function validateSex(isMale, isFemale){
    if(!isMale && !isFemale){
      return "性別は必須項目です<br />";
    }

    return "";
  }

  function validateMail(mail, confirmMail){
    if(mail == ""){
      return "メールアドレスは必須です<br />";
    }
    if(mail.length > 200){
      return "メールアドレスは200文字以下です<br />";
    }
    if(mail.match(/@/) == null){
      return "正しいメールアドレスの形式ではありません<br />";
    }
    if(mail != confirmMail){
      return "確認用メールアドレスが一致しません<br />";
    }
    return "";
  }

  function validateMsg(message){
    if(message.length > 500){
      return "メッセージは500文字以下です<br />";
    }
    return "";
  }

  function validateAgreement(agreement){
    if(!agreement){
      return "規約を確認し、規約確認にチェックをつけてください<br />";
    }
    return "";
  }
});
