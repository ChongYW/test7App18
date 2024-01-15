This App is a basic function of:
  - Passport login and signup authenticate with email(default is by username).
  - The file and folder structure of "router" and "controller" when using `render()` and `redirect()`.

# v1:
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

# v2:
  * Remark:
    - Remove unused model.
    - Update some of the `render()` to `redirect()`.

# v3:
  * Focus:
    * Middleware:
      - If only want a target route using the middleware, need to call the middleware function in the target router like `app.use('/admin', authenticationMiddleware.ensureAuthenticated, adminRouter);`.
      - If want to use it as globally, use `app.use(flash());` at the top of the middleware area.
      * `ensureAuthenticated()`:
        - To prevent guest access the page thats is only for login user.
      * `ensureNotAuthenticated`:
        - To prevent user access the page thats is only for guest.
   
  * Remark:
    - Added a middleware folder to handle the "authenticationMiddleware.js".
    - Added some authenticate function in "authenticationMiddleware.js".

# v4:
  * Focus:
    * Authenticate the user role:
      - Using authenticate role to avoid user trying access different role function by using URL.
      - To achieve this feature, using ExpressJS Passport and call the `req.user.role === 'admin';` and modify the condition by needs.
    * Dynamic URL:
      - The button that in EJS can be modify dynamically, just pass the variable to the `render('admin/dashboard', redirectURL);` and at the target EJS file call `<a href="<%= redirectURL %>"></a>` to achieve dynamic button.
      - The `let redirectURL = '/' + req.user.role + '/dashboard';` is also can achieve dynamic role URL.
    * Logout:
      - Use Passport build-in `logout()` function to logout, it updated to using `post` or `delete` method to call it.

  * Remark:
    - Added some role authenticate function like `isAdmin()` in "authenticationMiddleware.js".
    - Updated the the `ensureAuthenticated()` and `ensureNotAuthenticated()` function.
    - Added profile EJS page for all role.
    - Added the `logout()` function.
