import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import { submit } from 'redux-form';

const SurveyReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = formFields.map(({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });
  return (
    <div>
      <h3>Please confirm your entries</h3>
      {reviewFields}
      <button
        className='yellow darken-3 white-text btn-flat'
        onClick={onCancel}
      >
        Back
      </button>
      <button
        className='green btn-flat white-text right'
        onClick={() => submitSurvey(formValues, history)}
      >
        Send Survey
        <i className='material-icons right'>email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values
  };
}
export default connect(mapStateToProps, actions)(withRouter(SurveyReview));
