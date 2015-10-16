Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL_CONFIRM",
    requestPermissions: {},

    extraSignupFields: [{
        fieldName: 'first-name',
        fieldLabel: 'First name',
        inputType: 'text',
        visible: true,
        validate: function (value, errorFunction) {
            if (!value) {
                errorFunction("Please write your first name");
                return false;
            } else {
                return true;
            }
        }
    }, {
        fieldName: 'last-name',
        fieldLabel: 'Last name',
        inputType: 'text',
        visible: true,
    }, {
        fieldName: 'registration',
        showFieldLabel: false,      // If true, fieldLabel will be shown before radio group
        fieldLabel: 'registration',
        inputType: 'radio',
        radioLayout: 'vertical',    // It can be 'inline' or 'vertical'
        data: [{                    // Array of radio options, all properties are required
            id: 1,                  // id suffix of the radio element
            label: 'a Job Seeker',          // label for the radio element
            value: 'jobseeker',              // value of the radio element, this will be saved.
            checked: 'checked'
        }, {
            id: 2,
            label: 'an Employer',
            value: 'employer'
        },
        {
            id: 3,
            label: 'a Staffing Agency',
            value: 'staffing_agency'
        }

        ],
        visible: true
    }]
});


