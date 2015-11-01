Meteor.publish("jobs", function () {
    //return Jobs.find({});
    return Jobs.find({}, {sort: {createdAt: -1}});
});

Meteor.publish("top10jobs", function () {
    return Jobs.find({}, {limit: 5, sort: {createdAt: -1}});
});


Meteor.methods({
    addJob: function (job) {
        if (!Meteor.userId()) {
            throw new Meteor.Error(503,'not-authorized');
        }
        Jobs.insert({
            job: job,
            isApproved: false,
            createdAt: new Date(),
            owner: Meteor.userId(),
            checked: false,
            username: Meteor.user().username
        });
    },
    updateJob: function (jobObject, jobId) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        Jobs.update({_id: jobId}, {$set: {job: jobObject}});
    },

    deleteJob: function (Id) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        Jobs.remove(Id);
    },
    setChecked: function (taskId, setChecked) {
        Jobs.update(taskId, {$set: {checked: setChecked}});
    }
});


