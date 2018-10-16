/*
Projects are put up by users where they are looking to crowsource partners to work on them with.
Projects will be able to:
    - select certain skills needed for project
    - write description of project
    - set expectations
    - are manageable once filled
    - can recieve "work requests" from other users which can be appected or denied by project host
*/
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = new Schema ({
    projectCreated: {type: String, required: true},
    projectName: {type: String, required: true},
    projectDescription: {type: String, required: true},
    rolesNeeded: {type: String, required: true},
    projectCreator: {type: Schema.Types.ObjectId, ref: 'User'}
    //team: [{type: Schema.Types.ObjectId, ref: 'User'}] ---> build out later to display team working on project
})


ProjectSchema.pre('save', function(next) {
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const year = new Date().getFullYear();
    const now = `${month}/${day}/${year}`
    this.projectCreated = now;
    next();
})
