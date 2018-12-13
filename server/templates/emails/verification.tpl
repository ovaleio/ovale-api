<!doctype html>
<html>
	<head>
		<title>Confirmation Code for OVALE.io</title>
		<style>
			body {
				height: 100%;
			    margin: 0;
			    padding: 0;
			    width: 100%;
			    font-family: "Helvetica Neue", Helvetica, sans-serif;
			    background-color: #fafafa;
			    font-size: 14px;
			}

			@media
			only screen and (-webkit-min-device-pixel-ratio: 2),
			only screen and (   min--moz-device-pixel-ratio: 2),
			only screen and (     -o-min-device-pixel-ratio: 2/1),
			only screen and (        min-device-pixel-ratio: 2),
			only screen and (                min-resolution: 192dpi),
			only screen and (                min-resolution: 2dppx) {
			 
				img{
				    width: 371px;
                    height:54px;
                    margin: 30px auto;
				}
			}

			h1 {
				color: #6EB487;
			}

			table {
				border-spacing: 0;
			}


			tr, td {
				border: none;
				padding: 0;
			}

			table {
				width: 100%;
			}

			#header{
	            padding:30px auto;
				background-color:#123932;
			}

			#body {
				background: #fafafa none no-repeat center/cover;
			    padding-top: 59px;
			    padding-bottom: 59px;
			}

			.bodyContainer {
				background: #ffffff none no-repeat center/cover;
				padding: 10px;
			}

			#code {
				font-size: 30px;
				font-weight: bold;
				text-align: center;
			}
		</style>
	</head>
	<body>
		<table border="0" cellpadding="0" cellspacing="0" width="100%">
			<tr>
				<td align="center" valign="top" id="header">
					<img height="54" width="371" src="https://ovale.io/_nuxt/img/logo.8441d0e.png" />
				</td>
			</tr>
			<tr>
				<td id="body">
					<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px !important;">
						<tbody>
							<tr>
								<td class="bodyContainer">
									<h1>Confirm your email with the following code</h1>
									<p>
										Thank you for signing up to OVALE. We're happy you're here!
									</p>
									<p>
										Enter the following code in the window where you began creating your account:
									</p>
									<p id="code">
										{digits}
									</p>
									<p>
										If you have any questions, email us at <a href="mailto:team@ovale.io">team@ovale.io</a>.
									</p>
									<p>
										Cheers,
										OVALE.io Team
									</p>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</table>
	</body>
</html>
