# MakepiIframeUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.14.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## config.ts

Before you can compile, you need to create a typescript file with configuration variables.

Sample config.ts

```
export const environment = {
  production: false,
  STRIPE_PUB_KEY: "pk_test_xxxxxxxxxxxxxxxxxxxxxxxx",
  API_URI: 'http://localhost:3000'
};
```

## iframe

Here is a sample html file that you can use to invoke the iframe and return a value. Generate an auth token using the API and set the iframe src accordingly.

```
<html>
<head>
	<title>Checkout</title>
</head>
<body>
	<h1>Checkout Page</h1>
	<iframe id="iframe" width="600" height="600" src="http://localhost:4200" style="border:none;"></iframe>
	<script>
		window.onload = function () {
			var iframe = document.getElementById('iframe');
			iframe.contentWindow.postMessage({ token: `${generate.a.token.with.the.api}`, route: 'credit-source' }, '*');
			window.addEventListener('message', function (event) {
				console.log(event.data);
				iframe.parentNode.removeChild(iframe);
			});
			return false;
		}
	</script>
</body>
</html>
```
