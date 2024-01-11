This App is a basic function of:
  - Passport login and signup authenticate with email(default is by username).
  - The file and folder structure of "router" and "controller" when using `render()` and `redirect()`.

* v1:
  * Focus:
    * Passport:
      - User model, add a function for when user login is using email as `usernameField`.
      - Using passport plugin as default login and signup authenticate.
    * File and folder structure or handling:
      - `render()` is use to associated with template engines in Express.js, such as EJS, Pug, or Handlebars.
      - `redirect()` is used to send an HTTP redirect response to the client, asking it to make a new request to a different URL.

  * Remark:
    - `LocalStrategy` and `expressFlash` in "app.js" is not using in this version.
    - Middleware something like `ensureAuthenticated` and `ensureNotAuthenticated` is not using in this version.
