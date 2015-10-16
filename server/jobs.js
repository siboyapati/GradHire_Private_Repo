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
            isApproved:false,
            createdAt: new Date(),
            owner: Meteor.userId(),
            checked:false,
            username: Meteor.user().username
        });
    },
    updateJob : function(jobObject, jobId){
        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        Jobs.update({_id:jobId},{$set:{job:jobObject}});
    },
    deleteJob: function (Id) {
        Jobs.remove(Id);
    },
    setChecked: function (taskId, setChecked) {
        Jobs.update(taskId, { $set: { checked: setChecked} });
    }
});


