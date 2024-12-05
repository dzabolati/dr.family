<?php
$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
$msg = $_POST['user_message'];
$token = "#";
$chat_id = "#";
$arr = array(
	'Имя : ' => $name,
	'Телефон: ' => $phone,
	'Сообщение: ' => $msg
);

foreach($arr as $key => $value) {
	$txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}
	&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
	header('location: thanks.html');
} else{
	echo "К сожалению произошла ошибка, попробуйте еще раз или свяжитесь с нами напрямую";
}
?>