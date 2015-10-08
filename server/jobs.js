Meteor.publish("jobs", function () {
    return Jobs.find({});
});



Meteor.methods({
    addJob: function (job) {
        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Jobs.insert({
            job:job,
            createdAt: new Date(),
            owner: Meteor.userId(),
            checked:false,
            username: Meteor.user().username
        });
    },
    deleteJob: function (taskId) {
        Jobs.remove(taskId);
    },
    setChecked: function (taskId, setChecked) {
        Jobs.update(taskId, { $set: { checked: setChecked} });
    }
});


