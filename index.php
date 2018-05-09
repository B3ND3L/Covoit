<html>
	<head>
		<title>CoVoiturage</title>
		<meta charset='utf-8'>
		<meta name='mobile-web-app-capable' content='yes'>
	    <meta name='apple-mobile-web-app-capable' content='yes'>
	    <meta name='application-name' content='Air Horner'>
	    <meta name='apple-mobile-web-app-status-bar-style' content='black'>
	    <meta name='apple-mobile-web-app-title' content='CoVoiturage'>
	   	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, user-scalable=no">
	    <link rel='stylesheet' href='styles/main.css'>
	    <link rel='stylesheet' href='styles/more.css'>
	    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.12/css/all.css" integrity="sha384-G0fIWCsCzJIMAVNQPfjH08cyYaUtMwjJwqiRKxxE/rx96Uroj1BtIQ6MLJuheaO9" crossorigin="anonymous">
	</head>
	<body>

<?php 

	//date_default_timezone_set('Europe/Paris');setlocale(LC_TIME, 'french');$
	
	$intl_date_formatter = new IntlDateFormatter('fr_FR',
                                             IntlDateFormatter::FULL,
                                             IntlDateFormatter::NONE);

	$date = new DateTime();	

?>

	<div class="row justify-content-center topSpace">
		<div class="col-9 alert alert-dark" role="alert">
		  <?php echo $intl_date_formatter->format($date); ?>
		</div>
	</div>

		<div class="row justify-content-center">
			<div class="col-10 col-lg-6">
				<div class="card">
					<div class="card-header">
						<div class="float-right">
				    		<i class="fas fa-info-circle"></i>
				    	</div>
				    	<p class="h5">Aller : 8h15 Chanzy</p>

				  </div>
				  <img src="images/maps.jpg" class="card-img-top h16-9" alt="Card image cap">
				  <div class="card-body">
				    <div class="row justify-content-center">
						<div class="col-6"><button type="button" class="btn btn-lg btn-block btn-outline-success"><i class="fas fa-thumbs-up"></i> IN</button></div>
						<div class="col-6"><button type="button" class="btn btn-lg btn-block btn-outline-danger"><i class="fas fa-thumbs-down"></i> OUT</button></div>
					</div>
				  </div>
				</div>
			</div>
		</div>
		<div class="row justify-content-center topSpace">
			<div class="col-10 col-lg-6">
				<div class="card">
					<div class="card-header">
				    	<p class="h5">Retour : <?php echo (($date->format('N') == 3 || $date->format('N') == 5)?"17h15":"17h45"); ?> Oudalle</p>
				  	</div>
				  <img src="images/maps.jpg" class="card-img-top h16-9" alt="Card image cap">
				  <div class="card-body">
				    <div class="row justify-content-center">
						<div class="col-6"><button type="button" class="btn btn-lg btn-block btn-outline-success"><i class="fas fa-thumbs-up"></i> IN</button></div>
						<div class="col-6"><button type="button" class="btn btn-lg btn-block btn-outline-danger"><i class="fas fa-thumbs-down"></i> OUT</button></div>
					</div>
				  </div>
				</div>
			</div>

		</div>
		<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
		<script src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
		<script src="scripts/main.js"></script>
	</body>
</html>