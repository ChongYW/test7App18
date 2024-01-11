This App is a basic function of:
  - Passport login and signup authenticate with email(default is by username).
  - The file and folder structure of "router" and "controller" when using `render()` and `redirect()`.

* v1:
  * Focus:
    * Passport:
      - User model, add a function for when user login is using email as `usernameField`.
      - Using passport plugin as default login and signup authenticate.
    * File and folder structure or handling:
      * `render()`:
        - `render()` is use to associated with template engines in Express.js, such as EJS, Pug, or Handlebars.
        - When using `render()`, no need add `/` at the beginning, example `res.render('admin/dashboard');` when trying point to it to "test7App18\views\admin\dashboard.ejs".
        - It also can bring some data to the target EJS file, like `res.render('home', { title: 'Home Page', message: 'Welcome!' });`.
      * `redirect()`:
        - `redirect()` is used to send an HTTP redirect response to the client, asking it to make a new request to a different URL.
        - When using `redirect()`, is a good practice to add `/` at the beginning, example `res.redirect('/admin/dashboard');` when trying change the route example from `authRouter.js` to                 `adminRouter.js`.

  * Remark:
    - `LocalStrategy` and `expressFlash` in "app.js" is not using in this version.
    - Middleware something like `ensureAuthenticated` and `ensureNotAuthenticated` is not using in this version.
