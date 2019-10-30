export const dateRegex = RegExp(/^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/);
export const dateTimeRegex = RegExp(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]$/)
export const emailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
export const phoneRegex = RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/);

export const formValid = (formErrors, fields) => {
    let valid = true;

    Object.values(formErrors).forEach(
        val => {
            val.length > 0 && (valid = false)
        });

    if (fields) {
        Object.values(fields).forEach(
            field => {
                field.value === '' && (valid = false)
            }
        )
    }


    // return valid;
    return true;
}