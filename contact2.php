<?php
// Check if the form is submitted
if (isset($_POST["submit"])) {
  
  // Retrieve form data
  $name = $_POST['name'];
  $email = $_POST['email_address'];
  $subject = $_POST['subject'];
  $message = $_POST['message'];


  $host="localhost";
  $username="Nishi";     3//Enter your database account username here
  $password="abcd1234";         //Enter your database account password here
  $dbname="bookish";         //Enter database name
  //This statement is used for connection to mysql database
  $connection = mysqli_connect($host,$username,$password,$dbname);
  
  if(!$connection)
  {
    echo("An error occured while connecting to database");
  }
  else
  {
      $tableName="contacts";    //Enter tablename
      $sql="INSERT INTO $tableName VALUES('$name','$email','$subject','$message');";
      $result=mysqli_query($connection,$sql);
      if(!$result)
      {
        echo("Error while inserting!");
      }
      alert("Data inserted sucessfully");  
    }
  // Example of what you can do with the form data
  // In a real application, you would likely send this data via email or store it in a database
  //$to = "your-email@example.com"; // Replace with your email address
  //$headers = "From: $name <$email>";
  //$body = "Subject: $subject\n\nMessage:\n$message";
  
  // Send email (example)
  //if (mail($to, $subject, $body, $headers)) {
  //  echo "<p>Message sent successfully!</p>";
  //} else {
  //  echo "<p>Failed to send message. Please try again later.</p>";
  //}
  }
?>
