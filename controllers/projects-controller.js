/* TO DO FOR PROJECTS:
    1. show all projects (project index)
    2. create new project
        2a. be able to select roles needed for project
        2b. have other users be able to signup to contribute to project
        2c. cross of roles as users signup and fill slots
    3. What to do with current projects? communication for project
    4. User skills - must have way for users to display skills
    5. Full projects - have browse open projects or browse current projects

    */

const User = require('../models/user');

module.exports = function(app) {
    //get projects index page ---Browse Projects ---
    app.get('/projects', (req, res) => {
        res.render('projects-index.hbs')
    })

    //Get New Project Form
    app.get('/projects/new', (req, res) => {
        res.render('projects-new.hbs');
    })
}
