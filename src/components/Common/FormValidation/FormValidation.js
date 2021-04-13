export const validators = {
  required: value => (value ? undefined : 'Required'),
  emailValidation: value => {
    return (value && value.match(/^\S+@\S+\.\S+$/) ? undefined : 'Wrong Email adress')
  },
  minLength: min => value =>
      value && value.length > min ? undefined : `Should be more than ${min} symbols`,
  maxLength: max => value => value && value.length > max ? `Should be less then ${max} symbols` : undefined
}

export const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined)