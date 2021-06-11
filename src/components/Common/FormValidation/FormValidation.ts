export type ValidatorType = (value: string) => string | undefined;

export const validators = {
  required: (value: string): string | undefined => (value ? undefined : 'Required'),
  emailValidation: (value: string): string | undefined => {
    return (value && value.match(/^\S+@\S+\.\S+$/) ? undefined : 'Wrong Email adress')
  },
  minLength: (min: number): ValidatorType => value =>
      value && value.length > min ? undefined : `Should be more than ${min} symbols`,
  maxLength: (max: number): ValidatorType => value => value && value.length > max ? `Should be less then ${max} symbols` : undefined
}

export const composeValidators = (...validators:Array<ValidatorType>) => (value:string) =>
    validators.reduce((error:string | undefined, validator) => error || validator(value), undefined)
