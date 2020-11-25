const { hooks } = require('@adonisjs/ignitor');

hooks.after.providersBooted(() => {
    use('App/Validators/CustomSanitizors');
    use('App/Validators/CustomValidators');
});
