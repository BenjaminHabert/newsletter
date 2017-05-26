This is the source code for the [Newsletter](https://github.com/BenjaminHabert/newsletter) project. The [live website](https://benjaminhabert.github.io/newsletter/) is  hosted by github.

# Usage

## Deployment

I use gulp to run the website locally and deploy it to github.

### Checking that the website works

```shell
# Run local temporary version
$ gulp serve
# Build actual website
$ gulp build
# Run built version
$ gulp serve:dist
```

### Deploying

I rely on github pages to host the website. I use the [gulp-gh-pages](https://www.npmjs.com/package/gulp-gh-pages) tool to deploy the website to the github-page branch of the repository. When the built website works properly, you have to

 - modify `src/index.html` to match the deployment state
 - build the website again
 - deploy

Here is how the html should be modified:
```html
<html>
  <head>
    <!-- version dist github -->
    <!-- <base href="/newsletter/"> -->
    <!-- version locale -->
    <base href="/">
```

Here are the commands to deploy:
```shell
 # Assuming src/index.html was properly changed
 # Build the website again
 $ gulp build
 # Don't try to `gulp serve:dist` at this point
 # deploy
 $ gulp deploy
```


## Building data

I created a Python script to parse an ensemble of `.docx` files and convert them to a specific JSON format. The script is launched with a bash script:

```shell
$ bash build_newsletter_data.sh
```

Parameters of the Python script are in `newsletter_builder/application/config.ini`. The generated JSON files are to be placed in `src/data/`

**Note**: the Python project uses absolute imports and assumes that this project was added to the `$PYTHONPATH`.
