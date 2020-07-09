import { useEffect, useReducer } from 'react';

const errorMsg = {
  valueMissing: () => 'Please fill in this field',
  typeMismatch: ({name}) => `please enter a valid ${name}`,
  patternMismatch: ({ name, title }) => title ? title :`please enter a valid ${name}`,
  tooLong: ({ name, max }) => `${name} should not be greater than ${max} `,
  tooShort: ({ name, min }) => `${name} should not be less than ${ min } `,
  rangeUnderflow: ({name}) => `${name} is out of range`,
  rangeOverflow: ({name}) => `${name} is out of range`,
  stepMismatch: ({name, step}) => `${name} should be in increments or decrements of ${ step }`,
  badInput: ({name}) => `${name} is invalid`,
  customError: (errorMsg) => `${errorMsg}`,
  valid: false,
};

const C = {
  error: 'ERROR',
  showError: 'SHOW_ERROR',
  formIsValid: 'FORM_IS_VALID',
};

const useValidation = formRef => {
  useEffect(() => {
    formRef.current.setAttribute('novalidate', true);
  }, [formRef]);

  const initialState = {
    errors: {},
    showError: {},
    formIsValid: {},
  };

  function formReducer(state, action) {
    switch (action.type) {
      case C.error:
        return {
          ...state,
          errors: {
            ...state.errors,
            ...action.errorPayload,
          },
        };
      case C.showError:
        return {
          ...state,
          showError: Object.assign(state.showError, {[action.elName]: action[action.elName]})
        };
      case C.formIsValid:
        return {
          ...state,
          formIsValid: {
            ...state.formIsValid,
            [action.elName]: action[action.elName],
          },
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(formReducer, initialState);

  const updateValidFormState = (field) => {
    dispatch({
      type: C.error,
      errorPayload: { [field.name]: '' },
    });
    dispatch({
      type: C.formIsValid,
      elName: field.name,
      [field.name]: true,
    });
    dispatch({
      type: C.showError,
      elName: field.name,
      [field.name]: false,
    });
  };

  const updateInvalidState = field => {
    dispatch({
      type: C.formIsValid,
      elName: field.name,
      [field.name]: false,
    });
  };

  /*
      create an object that has all the possible invalid state
      and respective error message as values
      we filter through where the  valid object property is false,
      we loop through and reurn an object with the field name and message
  */
  
  function hasError(field) {
    if (
      field.disabled
      || field.type === 'file'
      || field.type === 'reset'
      || field.type === 'submit'
      || field.type === 'button'
    ) return;

    const { validity } = field;
    if (validity.valid) {
      updateValidFormState(field);
      return;
    }
    updateInvalidState(field);
    // validity state is not readable, so we get the keys of its properties from its prototype
    // then we access the values from our validity instance
    const message = Object.getOwnPropertyNames(Object.getPrototypeOf(validity))
      .filter(each => validity[each] === true)
      .reduce(
        (ini, acc) => ({
          ...ini,
          [field.name]: errorMsg[acc](field),
        }),
        {}
      );
    return message;
  }

  const validate = e => {
    const currentTarget = e.currentTarget ? e.currentTarget : e;
    const message = hasError(currentTarget);
    if (message) {
      dispatch({
        type: C.showError,
        elName: currentTarget.name,
        [currentTarget.name]: true,
      });

      dispatch({
        type: C.error,
        errorPayload: message,
      });
    } else {
      dispatch({
        type: C.showError,
        elName: currentTarget.name,
        [currentTarget.name]: false,
      });
    }
  };

  return {
    validate,
    state,
    dispatch,
  };
};

export default useValidation;