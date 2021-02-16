export const InitialFeedback = {
    firstName: '',
    lastName: '',
    phoneNum: '',
    email: '',
    agree: false,
    contactType: 'Phone',
    feedback: ''
};

//There will updates to the feedback form in the Contact Us page. It will be set up to keep the input the user entered even if he clicks on another page and then comes back to the feedback from. Also the form should clear after submitting.
//We are initializing here as properties all the values of the model attribute used in the LocalForm. The initial value will be set to the initial state.