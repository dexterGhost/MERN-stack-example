import React from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

import formFields from './formFields';

class SurveyForm extends React.Component {
  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(() => this.props.onSurveySubmit())}
        >
          {this.renderFields()}
          <Link to='/surveys' className='red btn-flat white-text'>
            Cancel
          </Link>
          <button className='teal btn-flat right white-text' type='submit'>
            Next
          </button>
        </form>
      </div>
    );
  }

  renderFields() {
    return formFields.map(({ label, name }) => {
      return (
        <Field
          key={name}
          type='text'
          name={name}
          label={label}
          component={SurveyField}
        />
      );
    });
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide ${name}`;
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
