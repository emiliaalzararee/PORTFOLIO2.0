<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


require __DIR__ . '/PHPMailer/PHPMailer.php';
require __DIR__ . '/PHPMailer/SMTP.php';
require __DIR__ . '/PHPMailer/Exception.php';


$config = require __DIR__ . '/PHPMailer/config.php';




if ($_SERVER["REQUEST_METHOD"] == "POST") {

    
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $message = htmlspecialchars($_POST["message"]);

    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("<p style='color: red; text-align:center;'>Virheellinen sähköpostiosoite.</p>");
    }

    $mail = new PHPMailer(true);

    try {
       
        $mail->isSMTP();
        $mail->Host       = $config['host'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $config['username'];
        $mail->Password   = $config['password'];
        $mail->SMTPSecure = $config['secure'];
        $mail->Port       = $config['port'];

        
        $mail->setFrom($config['username'], 'Portfolio Contact Form');
        $mail->addAddress($config['username']); 
        $mail->addReplyTo($email, $name);      

        
        $mail->isHTML(false);
        $mail->Subject = 'Uusi viesti portfolio-lomakkeelta';
        $mail->Body    = "Nimi: $name\nSähköposti: $email\n\nViesti:\n$message";

        
       
        

        $mail->send();
        echo "<p style='color: green; text-align:center;'>Viestisi on lähetetty onnistuneesti!</p>";
    } catch (Exception $e) {
        echo "<p style='color: red; text-align:center;'>Viestin lähetys epäonnistui. Virhe: {$mail->ErrorInfo}</p>";
    }

} else {
    echo "<p style='color: red; text-align:center;'>Lomaketta ei lähetetty oikein.</p>";
}

